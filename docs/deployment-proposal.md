# GHCR and VPS deployment proposal

Status: approved and implemented locally. See [deployment.md](deployment.md) for setup and verification results. Publishing and VPS rollout require GitHub/VPS configuration.

## Initial deployment-focused code review (before implementation)

- The application uses Next.js 14.2.35 and server-side API routes. It requires a Node runtime; static hosting alone cannot serve lead submissions.
- No Dockerfile, Compose configuration, or GitHub Actions workflow exists. `next.config.mjs` does not yet enable standalone output.
- `lib/site-config.ts` reads public environment variables. These must be supplied during `next build`, since browser bundles freeze their values. Changing only the VPS environment will not update these values.
- `lib/tools-access.ts` requires a stable `TOOLS_ACCESS_SECRET`. Missing configuration prevents issuing unlock cookies. Generate a real secret rather than using the example value.
- `lib/leads.ts:199` returns success when email delivery fails, and logs the full lead payload. Without another persistence mechanism, container replacement/log retention can lose leads and logs contain personal information. This needs a separate application fix or explicit operational acceptance.
- `app/api/guide-lead/route.ts:32` dereferences parsed JSON without checking that it is an object. A JSON `null` request causes an unhandled error rather than a validation response.
- Both lead routes derive cookie security from the internal request URL. Verify the resulting Secure cookie behind the production HTTPS proxy.
- `app/layout.tsx` uses Google fonts at build time; the image builder needs outbound access.
- No automated test script exists in package.json. Build, lint, container smoke checks, and deployment configuration validation are the initial checks.

This was a deployment-focused source review, not a full application security audit. Build and runtime checks were performed during implementation and are recorded in deployment.md.

## Recommended design

1. Pull requests run lint and build checks without deployment secrets. Pushes to `main` and manual runs on `main` build and publish `ghcr.io/sanji400h/mkwealth` using the workflow's GITHUB_TOKEN with packages:write permission.
2. Build a multi-stage, non-root Node image using Next.js standalone output. Include public assets and .next/static. Exclude local environment files, Git data, original media sources, and development output from the Docker context.
3. Tag images with the commit SHA and latest, but deploy the exact published digest so the VPS runs the image from that workflow.
4. SSH with a dedicated deployment key and pinned known-host entry. Copy the versioned Compose file to a configurable deployment directory. Keep runtime secrets in a VPS-owned environment file.
5. On the VPS run Compose configuration validation, `docker compose pull`, then `docker compose up -d --wait` with a bounded health-check timeout. Serialize deployments and fail the workflow if the container fails readiness. Do not run compose down or delete volumes.
6. Bind the app to localhost port 3000 by default, with HTTPS handled by an existing VPS reverse proxy. Document how to adjust the binding/network if the proxy runs in Docker.
7. Document one-time VPS preparation, GitHub secrets/variables, private GHCR read authentication, first deployment, and rollback to a previous image digest.

## Alternatives

- Recommended: digest deployments. An immutable reference makes deployment and manual rollback reproducible.
- Simpler: always pull latest. Fewer moving pieces, but concurrent builds and rollbacks are harder to track.
- Release-tag deployments. More deliberate release control, with an additional release step instead of deploying each main push.

## Configuration

- GitHub SSH secrets: VPS_HOST, VPS_USER, VPS_SSH_KEY, VPS_KNOWN_HOSTS.
- GitHub variables: VPS_PORT (default 22), VPS_DEPLOY_PATH (default /opt/mkwealth), plus the NEXT_PUBLIC_* values listed in .env.example. Preserve existing application defaults for unset optional public variables.
- VPS: Docker Engine and Compose with --wait support, deploy user with Docker permissions, HTTPS proxy, and runtime environment containing TOOLS_ACCESS_SECRET, RESEND_API_KEY, LEAD_NOTIFY_EMAIL, LEAD_FROM_EMAIL.
- For private images: authenticate the VPS to GHCR once with an account/token authorized to read the package. Do not store that token in the image or Compose file.
- Initial platform assumption: Linux amd64 VPS; make image platform configurable if ARM is needed.

## Planned files and validation

Create Dockerfile, .dockerignore, compose.yaml, .github/workflows/deploy.yml, runtime environment example, and deployment instructions; update next.config.mjs for standalone output.

Run dependency installation, lint and production build; validate workflow syntax and Compose interpolation; build/run the image and check HTTP readiness and public assets where local Docker is available. Actual publishing and VPS rollout require configured GitHub/VPS access and will be reported separately from local validation.

## References

- https://nextjs.org/docs/14/pages/building-your-application/configuring/environment-variables
- https://docs.docker.com/guides/nextjs/
- https://docs.github.com/en/actions/tutorials/publish-packages/publish-docker-images
