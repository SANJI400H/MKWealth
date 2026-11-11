import assert from "node:assert/strict";
import test from "node:test";
import { LEAD_SHEET_HEADERS, leadSheetRow } from "./lead-sheet.ts";
import type { LeadPayload } from "./leads.ts";

const payload: LeadPayload = {
  name: "Ada",
  phone: "+971500000000",
  email: "ada@example.com",
  source: "guide",
  intent: "Investor Guide qualification",
  country: "",
  propertyName: "",
  purchasePrice: "",
  expectedRent: "",
  marketType: "",
  objective: "off-plan",
  timeline: "0-3m",
  notes: "",
  budgetRange: "1-2m",
  propertyType: "",
  market: "Dubai",
  financing: "not stated",
  existingUaeProperty: "",
  contentSource: "",
  calculatorSnapshot: "",
  attribution: "",
  leadScoreHint: "",
  submittedAt: "2026-11-11T00:00:00.000Z",
};

test("lead sheet row matches the header order", () => {
  const row = leadSheetRow(payload, "lead-1");
  assert.equal(row.length, LEAD_SHEET_HEADERS.length);
  assert.equal(row[0], payload.submittedAt);
  assert.equal(row[1], "Ada");
  assert.equal(row[4], "guide");
  assert.equal(row[15], "lead-1");
});
