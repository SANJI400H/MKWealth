-- Who watched which private guide. Written only by the server service role.
-- Browser roles have no policy, so they cannot read or write this table.

create table if not exists public.guide_watch_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_id uuid not null,
  video_id text not null,
  event text not null check (event in ('start', 'progress', 'complete')),
  position_sec numeric,
  duration_sec numeric,
  user_agent text
);

create index if not exists guide_watch_events_lead_idx
  on public.guide_watch_events (lead_id, created_at desc);

create index if not exists guide_watch_events_video_idx
  on public.guide_watch_events (video_id, created_at desc);

alter table public.guide_watch_events enable row level security;

comment on table public.guide_watch_events is
  'Private guide playback. One row per start, progress sample, or completion, tied to website_leads.id.';
