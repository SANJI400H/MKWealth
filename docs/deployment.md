# Deploy with GitHub Actions

The workflow is **[.github/workflows/deploy.yml](../.github/workflows/deploy.yml)**.

Push to `main` → build and lint → start and smoke-test the container → publish to **ghcr.io/sanji400h/mkwealth** → SSH to the VPS → `docker compose pull` → `docker compose up -d --wait`.

Pull requests to `main` build and smoke-test without publishing or connecting to the VPS. The Actions **Build and deploy → Run workflow** button also works on `main`. The image name follows the repository name automatically, in lowercase.

## 1. Prepare the VPS once

Use a Linux VPS with Docker Engine, the Docker Compose plugin supporting `up --wait --wait-timeout` and multiple `--env-file` arguments, Bash, and OpenSSH/SFTP. The default image architecture is **amd64**. For an ARM VPS, set the repository variable `IMAGE_PLATFORM=linux/arm64`; the workflow enables QEMU for that build and smoke test.

Create a dedicated SSH deployment user with access to Docker and ownership of the deployment directory. Docker access is effectively root access; reserve this account/key for deployment. For an existing user named `deploy`:

```bash
sudo usermod -aG docker deploy
sudo install -d -o deploy -g deploy -m 750 /opt/mkwealth
```

Reconnect as `deploy` after changing group membership and check:

```bash
docker version
docker compose version
docker compose up --help
```

Install the public half of a dedicated, unencrypted SSH key in this user's `~/.ssh/authorized_keys`. Keep the private half in the GitHub secret described below. The workflow uses non-interactive SSH and cannot prompt for a key passphrase or sudo password.

Copy [deploy/runtime.env.example](../deploy/runtime.env.example) to `/opt/mkwealth/runtime.env` and fill in the four required application values:

```dotenv
TOOLS_ACCESS_SECRET=your-generated-random-secret
RESEND_API_KEY=your-resend-api-key
LEAD_NOTIFY_EMAIL=your-real-inbox@example.com
LEAD_FROM_EMAIL='Morgan Kaiser <leads@your-verified-domain.com>'
APP_BIND_ADDRESS=127.0.0.1
APP_PORT=3000
```

Generate the cookie secret with `openssl rand -hex 32` and preserve it across releases. Quote values containing `$` with single quotes to prevent Compose interpolation. Restrict the file:

```bash
chmod 600 /opt/mkwealth/runtime.env
```

Missing or empty required values fail Compose validation before an image is pulled. The deployment never uploads or overwrites this file.

## 2. Configure GitHub

In **Settings → Secrets and variables → Actions**, add these repository secrets (or put them in the `production` environment):

| Secret | Value |
| --- | --- |
| `VPS_HOST` | VPS DNS hostname or IPv4 address |
| `VPS_USER` | SSH deployment user, such as `deploy` |
| `VPS_SSH_KEY` | Complete private SSH key, including BEGIN/END lines |
| `VPS_KNOWN_HOSTS` | Verified OpenSSH known_hosts entry for this VPS |

Obtain the SSH host key from a trusted connection, and verify its fingerprint against the VPS console. You can collect a candidate with `ssh-keyscan -p 22 YOUR_VPS_HOST`; do not trust an unverified scan. For a custom port, the known_hosts name must use `[YOUR_VPS_HOST]:PORT`. The workflow requires strict host-key checking; it does not scan and trust a key during deployment.

Optional **repository variables**:

| Variable | Default / meaning |
| --- | --- |
| `VPS_PORT` | `22` |
| `VPS_DEPLOY_PATH` | `/opt/mkwealth`; absolute path, segments containing only letters, digits, underscores or hyphens |
| `IMAGE_PLATFORM` | `linux/amd64`; use `linux/arm64` for ARM |
| `NEXT_PUBLIC_SITE_URL` | Existing canonical URL default |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Existing WhatsApp default |
| `NEXT_PUBLIC_CALENDLY_URL` | Existing booking URL default |
| `NEXT_PUBLIC_META_PIXEL_ID` | Empty / disabled |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Empty / disabled |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Existing social URL default |
| `NEXT_PUBLIC_LINKEDIN_URL` | Existing social URL default |
| `NEXT_PUBLIC_TIKTOK_URL` | Existing social URL default |
| `NEXT_PUBLIC_YOUTUBE_URL` | Existing social URL default |
| `NEXT_PUBLIC_FACEBOOK_URL` | Existing social URL default |

Use **repository** variables for public build configuration: the build job does not use the production environment. Empty variables retain the defaults in `lib/site-config.ts`. Changes to public variables require another build; setting them only on the VPS does not update browser bundles. Never put private credentials in `NEXT_PUBLIC_*` variables or Docker build arguments.

Actions must be enabled and allowed to use the pinned checkout and Docker actions. Publishing uses the automatic `GITHUB_TOKEN` with `packages: write`; no personal publish token is needed. Organization policies must permit this permission. The separate SSH job has only repository read permission.

The deployment job uses the GitHub environment `production`. You can configure branch restrictions and optional required reviewers in **Settings → Environments**. The workflow itself restricts publishing/deployment to `main` and skips a deployment if a newer main commit is already present.

## 3. Allow the VPS to pull from GHCR

New GHCR packages are private by default. Before the first deployment, either authenticate the deployment user to GHCR or make the package public after its first publication.

For a private image, use a GitHub personal access token (classic) with `read:packages` from an account allowed to read this package, including organization SSO authorization if required. Run as the same VPS user used by SSH:

```bash
read -rsp 'GHCR read token: ' GHCR_TOKEN
printf '\n'
printf '%s' "$GHCR_TOKEN" | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
unset GHCR_TOKEN
```

For a new package, ensure this account can read it once the first build publishes it. If the first deployment cannot pull, correct package access and rerun the workflow. A public package can be pulled anonymously and needs no VPS registry token.

## 4. Deploy

Merge/push the workflow and container files to `main`, or select **Build and deploy → Run workflow → main** after the workflow exists on the default branch.

Each release receives `sha-<full-commit-sha>` and `latest` tags. Deployment uses the immutable digest reported by the publish step, rather than relying on `latest`. The workflow copies `compose.yaml` and `deploy.sh` to the deployment directory, then runs:

```bash
bash /opt/mkwealth/deploy.sh ghcr.io/sanji400h/mkwealth@sha256:THE_PUBLISHED_DIGEST
```

The script validates required runtime settings, pulls the image, runs `up -d --wait --wait-timeout 120`, and writes the successful reference to `image.env`. The previous successful reference is saved as `image.previous.env`. Failed pulls do not recreate the existing container. Failed health checks fail the workflow and leave release reference files unchanged, but the new container may already be running or unhealthy: rollback is manual.

Workflows are serialized to prevent overlapping automatic deployments. Do not run a manual deployment/rollback while an Actions deployment is active. There can be a brief interruption while Compose replaces the single container; this setup does not provide zero-downtime deployment.

From `/opt/mkwealth`, inspect or restart the selected release with:

```bash
docker compose --env-file runtime.env --env-file image.env ps
docker compose --env-file runtime.env --env-file image.env logs --tail 100 web
docker compose --env-file runtime.env --env-file image.env pull
docker compose --env-file runtime.env --env-file image.env up -d --wait --wait-timeout 120
```

The container runs as a non-root user and checks HTTP readiness every 10 seconds. Logs are capped at three 10 MB files. No database or application data volume is currently required. Next.js image caches are disposable.

## 5. HTTPS proxy

By default, the app is reachable only at `127.0.0.1:3000` on the VPS. Point an existing host Nginx/Caddy proxy at that address and configure HTTPS for the site domain. Preserve the original Host and forwarded protocol headers. Confirm lead submissions and Secure cookies through the public HTTPS URL before launch.

If your proxy runs in Docker, put it and this service on a shared external Docker network and target `web:3000`; localhost inside the proxy container refers to that container. Adjust and version `compose.yaml` for that setup before deployment. The workflow replaces the VPS Compose file on every release, so persistent Compose changes belong in this repository. Manage the proxy separately from this app's Compose project.

## Rollback

Pause automatic deployments while rolling back. On the VPS:

```bash
cd /opt/mkwealth
PREVIOUS_IMAGE=$(sed -n 's/^APP_IMAGE=//p' image.previous.env)
bash ./deploy.sh "$PREVIOUS_IMAGE"
```

After a failed release, `image.env` still names the last successful image, so use it instead:

```bash
cd /opt/mkwealth
LAST_GOOD_IMAGE=$(sed -n 's/^APP_IMAGE=//p' image.env)
bash ./deploy.sh "$LAST_GOOD_IMAGE"
```

Keep the referenced images in GHCR. These commands roll back the application image using the current Compose configuration; if a release changed Compose incompatibly, restore its prior version from Git first. No previous image exists before the first successful deployment.

## Local validation

```bash
npm ci
npm run lint
npm run build
node --test tests/deploy.test.cjs
docker build -t mkwealth:local .
docker run --rm -p 127.0.0.1:3000:3000 mkwealth:local
```

The deployment-script tests require Bash. On Windows, set `TEST_BASH` to the Git for Windows Bash executable. They test failure propagation and release-state preservation using a simulated Docker executable; the workflow separately builds and runs the real container, checks HTTP readiness, a public image, and the Next.js image optimizer.

### Verification performed on 2026-09-14

- `npm run lint`: passed without warnings or errors.
- `npm run build`: passed TypeScript validation and generated all 58 pages.
- Deployment script tests: 5 passed, including failure propagation, previous-release preservation, and protection against an inherited APP_IMAGE overriding the requested digest.
- actionlint 1.7.12: workflow syntax and expressions passed (ShellCheck was not installed).
- Compose configuration: accepted the configured environment and rejected an empty required cookie secret.
- `docker build -t mkwealth:verification .`: passed on Linux amd64 with Node 22.
- Isolated Compose startup with `up -d --wait`: healthy. Home page, generated CSS, public PNG, video, and Next.js image optimizer all returned HTTP 200. Runtime user was uid 1000 (`node`).
- Independent source review: approved after fixing historical reruns overwriting the latest image tag.

The actual GitHub-hosted workflow, GHCR publication, ARM build, VPS SSH connection, and public HTTPS proxy have not been exercised. The local verification used dummy runtime credentials and did not send lead emails.

## Review findings outside deployment scope

The source review is recorded in [deployment-proposal.md](deployment-proposal.md). Lead email failures currently return success and log personal data without durable storage. The legacy guide endpoint does not validate JSON object shape. These application behaviors are unchanged by the deployment work.

## References

- [GitHub: publishing Docker images](https://docs.github.com/en/actions/tutorials/publish-packages/publish-docker-images)
- [GitHub: container registry authentication](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Next.js: build-time public variables](https://nextjs.org/docs/14/pages/building-your-application/configuring/environment-variables)
- [Next.js: sharp in standalone deployments](https://nextjs.org/docs/messages/sharp-missing-in-production)
