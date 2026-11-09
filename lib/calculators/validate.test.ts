import assert from "node:assert/strict";
import test from "node:test";
import {
  parseDecimal,
  percentAboveWarning,
  percentsTotal100,
  requireNonNegativeAmount,
  requirePercent,
  requirePositiveAmount,
} from "./validate.ts";

test("rejects blank and non-numeric amounts", () => {
  assert.equal(parseDecimal(""), null);
  assert.equal(parseDecimal("abc"), null);
  assert.equal(parseDecimal("1e2"), null);
  assert.equal(parseDecimal("2,000,000"), 2000000);
  assert.equal(requirePositiveAmount("0"), "Enter an amount above zero.");
  assert.equal(requirePositiveAmount("-5"), "Enter an amount above zero.");
  assert.equal(requireNonNegativeAmount("0"), null);
  assert.equal(requireNonNegativeAmount("-1"), "Enter zero or a positive amount.");
});

test("percent bounds and schedule total", () => {
  assert.equal(requirePercent("150"), "Enter a percentage from 0 to 100.");
  assert.equal(requirePercent("15", 20), null);
  assert.equal(requirePercent("21", 20), "Enter a percentage from 0 to 20.");
  assert.match(percentAboveWarning("12", 10) ?? "", /above 10%/);
  assert.equal(percentAboveWarning("4", 10), null);
  assert.equal(percentsTotal100([10, 50, 40]), true);
  assert.equal(percentsTotal100([10, 50, 60]), false);
});
