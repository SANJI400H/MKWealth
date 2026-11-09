import assert from "node:assert/strict";
import test from "node:test";
import { leadWasDelivered } from "./leads-delivery.ts";

test("fails closed only when both save and email fail", () => {
  assert.equal(leadWasDelivered(false, false), false);
  assert.equal(leadWasDelivered(true, false), true);
  assert.equal(leadWasDelivered(false, true), true);
  assert.equal(leadWasDelivered(true, true), true);
});
