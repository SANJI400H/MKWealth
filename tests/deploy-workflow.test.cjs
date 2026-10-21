const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const { test } = require("node:test");

test("deploy workflow reads VPS_DEPLOY_PATH from repository variables", () => {
  const workflow = readFileSync(resolve(".github/workflows/deploy.yml"), "utf8");
  assert.match(
    workflow,
    /VPS_DEPLOY_PATH:\s*\$\{\{\s*vars\.VPS_DEPLOY_PATH\s*\|\|\s*'\/opt\/mkwealth'\s*\}\}/,
  );
  assert.doesNotMatch(workflow, /VPS_DEPLOY_PATH:\s*\$\{\{\s*secrets\.VPS_DEPLOY_PATH/);
});
