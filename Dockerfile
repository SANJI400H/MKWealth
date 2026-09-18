# syntax=docker/dockerfile:1
FROM node:22-bookworm-slim AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM dependencies AS builder
ENV NEXT_TELEMETRY_DISABLED=1
COPY . .

# Public settings are compiled into the browser bundle. Never pass secrets here.
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_WHATSAPP_NUMBER
ARG NEXT_PUBLIC_CALENDLY_URL
ARG NEXT_PUBLIC_META_PIXEL_ID
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID
ARG NEXT_PUBLIC_INSTAGRAM_URL
ARG NEXT_PUBLIC_LINKEDIN_URL
ARG NEXT_PUBLIC_TIKTOK_URL
ARG NEXT_PUBLIC_YOUTUBE_URL
ARG NEXT_PUBLIC_FACEBOOK_URL
ARG NEXT_PUBLIC_CLIENT_PORTAL_URL

# Empty GitHub variables should use the defaults in lib/site-config.ts.
RUN for name in NEXT_PUBLIC_SITE_URL NEXT_PUBLIC_WHATSAPP_NUMBER \
      NEXT_PUBLIC_CALENDLY_URL NEXT_PUBLIC_META_PIXEL_ID NEXT_PUBLIC_GA_MEASUREMENT_ID \
      NEXT_PUBLIC_INSTAGRAM_URL NEXT_PUBLIC_LINKEDIN_URL NEXT_PUBLIC_TIKTOK_URL \
      NEXT_PUBLIC_YOUTUBE_URL NEXT_PUBLIC_FACEBOOK_URL NEXT_PUBLIC_CLIENT_PORTAL_URL; do \
      if [ -z "$(printenv "$name")" ]; then unset "$name"; fi; \
    done; \
    npm run lint && npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public
RUN mkdir -p .next/cache && chown -R node:node .next/cache
USER node
EXPOSE 3000
HEALTHCHECK --interval=10s --timeout=5s --start-period=20s --retries=6 \
  CMD node -e "fetch('http://127.0.0.1:3000/', { method: 'HEAD', signal: AbortSignal.timeout(4000) }).then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"
CMD ["node", "server.js"]
