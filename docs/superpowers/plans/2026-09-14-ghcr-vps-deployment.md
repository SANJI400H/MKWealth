# GHCR and VPS Deployment Implementation Plan

> **For agentic workers:** Use executing-plans to implement this plan task-by-task. Review the completed workflow independently before finishing.

**Goal:** Build this Next.js app in GitHub Actions, publish its image to GHCR, and deploy the published digest to a VPS with SSH and Compose.

**Architecture:** A multi-stage Dockerfile produces a standalone Node server. Pull requests build and smoke-test the image; main builds also publish it. A separate deployment job copies Compose configuration and invokes a versioned deployment script over verified SSH.

**Tech Stack:** Next.js 14, Node 22, Docker Buildx, GHCR, GitHub Actions, OpenSSH, Docker Compose.

## Global constraints

- Automatic deployment only on main; manual deployment also restricted to main.
- Secrets stay in GitHub deployment secrets or the VPS runtime environment.
- NEXT_PUBLIC_* configuration is supplied at build time, preserving existing defaults for unset values.
- Deploy immutable image digests; retain SHA tags for manual rollback.
- Serialize production workflows; no compose down or volume deletion.
- Defaults: Linux amd64, /opt/mkwealth, 127.0.0.1:3000, SSH port 22.

## Task 1: Container packaging

- [x] Add sharp to production dependencies and lockfile for standalone image optimization.
- [x] Add `output: "standalone"` to next.config.mjs.
- [x] Create Dockerfile with Node 22 slim dependency/build/runtime stages, `npm ci`, build arguments for every public variable, lint/build, copied standalone/static/public output, non-root node user, and HTTP health check.
- [x] Create .dockerignore excluding environment files, repository metadata, local dependencies/builds, and source media.
- [x] Run `npm run lint` and `npm run build`; verify standalone server creation. Smoke-test Docker where available.

## Task 2: Compose and SSH deployment

- [x] Create compose.yaml requiring APP_IMAGE and runtime.env; bind localhost, configure restart/health/log limits, and pass required runtime credentials.
- [x] Create deploy/deploy.sh accepting only an image digest, validating configuration before pulling, using `docker compose pull` then `docker compose up -d --wait --wait-timeout 120`.
- [x] Persist successful image selection for subsequent ordinary Compose commands and retain the previous successful selection for rollback.
- [x] Add deploy/runtime.env.example and docs/deployment.md with actual setup commands, GitHub settings, proxy assumptions, health verification and rollback.
- [x] Validate Compose success and missing-configuration failure without exposing runtime secrets; run shell syntax and behavior checks for deployment failure propagation.

## Task 3: GitHub Actions

- [x] Add .github/workflows/deploy.yml with pull_request, main push, workflow_dispatch, explicit permissions, timeouts, and concurrency.
- [x] Pin checkout and Docker actions to verified commit SHAs. Build/load and smoke-test images before publishing on main with GITHUB_TOKEN.
- [x] In a separate deployment job use SSH key/known hosts from secrets, validate configurable SSH/path inputs, copy the release files and execute the deployment script with the published digest.
- [x] Validate workflow using actionlint, inspect secret/PR isolation, and request read-only code review while finishing documentation and verification.
- [x] Record local verification and any unavailable live checks; leave changes ready for user review.
