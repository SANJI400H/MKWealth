import { createSign } from "node:crypto";
import type { LeadPayload } from "@/lib/leads";

const SHEET_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

export const LEAD_SHEET_HEADERS = [
  "Submitted",
  "Name",
  "Email",
  "Phone",
  "Source",
  "Intent",
  "Country",
  "Budget",
  "Property type",
  "Market",
  "Financing",
  "Existing UAE property",
  "Objective",
  "Timeline",
  "Status",
  "Id",
] as const;

export function leadSheetRow(payload: LeadPayload, leadId: string): string[] {
  return [
    payload.submittedAt,
    payload.name,
    payload.email,
    payload.phone,
    payload.source,
    payload.intent,
    payload.country,
    payload.budgetRange,
    payload.propertyType,
    payload.market,
    payload.financing,
    payload.existingUaeProperty,
    payload.objective,
    payload.timeline,
    "",
    leadId,
  ];
}

export function leadSheetConfigured(): boolean {
  return sheetConfig() !== null;
}

function sheetConfig(): { spreadsheetId: string; clientEmail: string; privateKey: string } | null {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID?.trim() ?? "";
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() ?? "";
  const privateKey = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ?? "").replace(/\\n/g, "\n").trim();
  if (!spreadsheetId || !clientEmail || !privateKey.includes("BEGIN PRIVATE KEY")) return null;
  return { spreadsheetId, clientEmail, privateKey };
}

function signServiceAccountJwt(clientEmail: string, privateKey: string): string {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const claim = Buffer.from(
    JSON.stringify({
      iss: clientEmail,
      scope: SHEET_SCOPE,
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  ).toString("base64url");
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claim}`);
  signer.end();
  const signature = signer.sign(privateKey).toString("base64url");
  return `${header}.${claim}.${signature}`;
}

async function accessToken(clientEmail: string, privateKey: string): Promise<string> {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: signServiceAccountJwt(clientEmail, privateKey),
    }),
  });
  if (!response.ok) {
    throw new Error(`token ${response.status}`);
  }
  const body = (await response.json()) as { access_token?: string };
  if (!body.access_token) throw new Error("token missing");
  return body.access_token;
}

/** Append one lead. Skips quietly when the sheet service account is not configured. */
export async function appendLeadToSheet(payload: LeadPayload, leadId: string): Promise<boolean> {
  const config = sheetConfig();
  if (!config) return false;

  try {
    const token = await accessToken(config.clientEmail, config.privateKey);
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: [leadSheetRow(payload, leadId)] }),
      },
    );
    if (!response.ok) {
      console.error("[lead] sheet append failed", response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[lead] sheet append failed", error instanceof Error ? error.message : "unknown");
    return false;
  }
}
