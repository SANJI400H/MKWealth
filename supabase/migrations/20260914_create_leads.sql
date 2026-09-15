-- MKWealth leads table
-- Run in Supabase Dashboard → SQL Editor → New query → Run
-- Leads are written only from the Next.js server using the service role key.

create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  phone text not null,
  email text not null,
  source text not null,
  intent text,
  country text,
  property_name text,
  purchase_price text,
  expected_rent text,
  market_type text,
  objective text,
  timeline text,
  notes text,
  budget_range text,
  property_type text,
  market text,
  financing text,
  existing_uae_property text,
  content_source text,
  calculator_snapshot jsonb,
  attribution jsonb,
  lead_score_hint text,
  status text not null default 'new'
    check (status in (
      'new',
      'pending_manual',
      'auto_approved',
      'contacted',
      'session_booked',
      'qualified',
      'desk_approved',
      'client',
      'lost',
      'rejected'
    )),
  submitted_at timestamptz
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);
create index if not exists leads_source_idx on public.leads (source);
create index if not exists leads_status_idx on public.leads (status);

alter table public.leads enable row level security;

-- No anon/authenticated policies: browser cannot read or write leads.
-- Server uses service_role, which bypasses RLS.

comment on table public.leads is 'MKWealth lead capture from calculators, guide, strategy session, etc.';
