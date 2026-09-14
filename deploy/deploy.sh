#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

if [[ $# -ne 1 || ! "$1" =~ ^ghcr\.io/[a-z0-9._/-]+@sha256:[a-f0-9]{64}$ ]]; then
  echo 'Usage: bash deploy.sh ghcr.io/owner/repo@sha256:<64 lowercase hex characters>' >&2
  exit 2
fi

cd -- "$(dirname -- "${BASH_SOURCE[0]}")"
test -f runtime.env || { echo 'Missing runtime.env; follow docs/deployment.md.' >&2; exit 1; }
test -f compose.yaml || { echo 'Missing compose.yaml.' >&2; exit 1; }

# Shell environment takes precedence over Compose env files.
export APP_IMAGE="$1"
printf 'APP_IMAGE=%s\n' "$1" > .image.env.pending
trap 'rm -f -- .image.env.pending' EXIT

compose() {
  docker compose --project-name mkwealth --env-file runtime.env \
    --env-file .image.env.pending -f compose.yaml "$@"
}

# --quiet validates required credentials without printing them into Actions logs.
compose config --quiet
compose pull web
compose up -d --wait --wait-timeout 120 web

# Persist a release only after the image passes its Docker health check.
if [[ -f image.env ]]; then
  cp -- image.env image.previous.env
fi
mv -- .image.env.pending image.env
printf 'Healthy deployment: %s\n' "$1"
