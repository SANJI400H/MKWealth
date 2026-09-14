const assert = require("node:assert/strict");
const { mkdtempSync, writeFileSync, copyFileSync, readFileSync, existsSync, rmSync, mkdirSync } = require("node:fs");
const { tmpdir } = require("node:os");
const { join, resolve } = require("node:path");
const { spawnSync } = require("node:child_process");
const { test } = require("node:test");

const bash = process.env.TEST_BASH || "bash";
const image = `ghcr.io/sanji400h/mkwealth@sha256:${"a".repeat(64)}`;
const oldImage = `APP_IMAGE=ghcr.io/sanji400h/mkwealth@sha256:${"b".repeat(64)}\n`;

function deploy(failure, argument = image) {
  const dir = mkdtempSync(join(tmpdir(), "mkwealth-deploy-"));
  try {
    mkdirSync(join(dir, "bin"));
    copyFileSync(resolve("deploy/deploy.sh"), join(dir, "deploy.sh"));
    writeFileSync(join(dir, "runtime.env"), "TOOLS_ACCESS_SECRET=test-only\n");
    writeFileSync(join(dir, "compose.yaml"), "services: {}\n");
    writeFileSync(join(dir, "image.env"), oldImage);
    // Docker is the external boundary. Capture invocations and simulate its exit status.
    writeFileSync(join(dir, "bin/docker"), `#!/usr/bin/env bash
printf '%s\\n' "$*" >> calls.log
printf '%s' "$APP_IMAGE" > selected-image
for arg in "$@"; do
  if [[ "$arg" == "$FAIL_COMMAND" ]]; then exit 42; fi
done
`, { mode: 0o755 });
    const result = spawnSync(bash, ["-c", 'export PATH="$PWD/bin:$PATH"; bash ./deploy.sh "$IMAGE"'], {
      cwd: dir,
      env: { ...process.env, APP_IMAGE: "stale-inherited-image", FAIL_COMMAND: failure, IMAGE: argument },
      encoding: "utf8",
    });
    assert.ifError(result.error);
    return {
      status: result.status,
      output: result.stdout + result.stderr,
      calls: existsSync(join(dir, "calls.log")) ? readFileSync(join(dir, "calls.log"), "utf8") : "",
      current: readFileSync(join(dir, "image.env"), "utf8"),
      previous: existsSync(join(dir, "image.previous.env")) ? readFileSync(join(dir, "image.previous.env"), "utf8") : null,
      pending: existsSync(join(dir, ".image.env.pending")),
      selected: existsSync(join(dir, "selected-image")) ? readFileSync(join(dir, "selected-image"), "utf8") : null,
    };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test("rejects mutable tags without invoking Docker or replacing release state", () => {
  const result = deploy("", "ghcr.io/sanji400h/mkwealth:latest");
  assert.notEqual(result.status, 0);
  assert.equal(result.calls, "");
  assert.equal(result.current, oldImage);
});

for (const failure of ["config", "pull", "up"]) {
  test(`a failed ${failure} keeps the last successful release and propagates failure`, () => {
    const result = deploy(failure);
    assert.equal(result.status, 42, result.output);
    assert.equal(result.current, oldImage);
    assert.equal(result.previous, null);
    assert.equal(result.pending, false);
    if (failure !== "up") assert.doesNotMatch(result.calls, / up /);
    if (failure === "config") assert.doesNotMatch(result.calls, / pull /);
  });
}

test("a healthy deployment persists the digest and retains the previous release", () => {
  const result = deploy("");
  assert.equal(result.status, 0, result.output);
  assert.equal(result.current, `APP_IMAGE=${image}\n`);
  assert.equal(result.previous, oldImage);
  assert.equal(result.pending, false);
  assert.equal(result.selected, image);
  assert.match(result.calls, /up -d --wait --wait-timeout 120 web/);
  assert.doesNotMatch(result.calls, /\bdown\b/);
});
