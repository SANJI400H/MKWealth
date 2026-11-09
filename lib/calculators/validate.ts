/** Shared calculator input checks. Non-numeric text is rejected, never treated as zero. */

export function parseDecimal(raw: string): number | null {
  const cleaned = raw.trim().replace(/,/g, "").replace(/\s/g, "");
  if (!/^-?\d+(\.\d+)?$/.test(cleaned)) return null;
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}

export function requirePositiveAmount(raw: string): string | null {
  const value = parseDecimal(raw);
  if (value == null) return "Enter a number.";
  if (!(value > 0)) return "Enter an amount above zero.";
  return null;
}

export function requireNonNegativeAmount(raw: string): string | null {
  const value = parseDecimal(raw);
  if (value == null) return "Enter a number.";
  if (value < 0) return "Enter zero or a positive amount.";
  return null;
}

export function requirePercent(raw: string, max = 100): string | null {
  const value = parseDecimal(raw);
  if (value == null) return "Enter a number.";
  if (value < 0 || value > max) return `Enter a percentage from 0 to ${max}.`;
  return null;
}

/** Still valid, but worth a second look. Used for fees that are rarely above 10%. */
export function percentAboveWarning(raw: string, warnAbove: number): string | null {
  const value = parseDecimal(raw);
  if (value == null || value <= warnAbove) return null;
  return `This is above ${warnAbove}%. Confirm it matches the transaction.`;
}

export function percentsTotal100(values: number[]): boolean {
  const total = values.reduce((sum, value) => sum + value, 0);
  return Math.abs(total - 100) < 0.001;
}
