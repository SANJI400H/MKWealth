# Supabase setup for MKWealth leads

## 1. Create a project

1. Open [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **New project** (any org / region close to UAE or your users)
3. Wait until the project is healthy

## 2. Create the `leads` table

1. Dashboard → **SQL Editor** → New query  
2. Paste the full contents of `supabase/migrations/20260914_create_leads.sql`  
3. **Run**

## 3. Copy API keys into `.env.local`

Dashboard → **Project Settings** → **API** (or Connect):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # service_role — secret, server only
```

Keep using your existing Resend vars so Morgan still gets email:

```bash
RESEND_API_KEY=re_...
LEAD_NOTIFY_EMAIL=itsmorgankaiser@gmail.com
LEAD_FROM_EMAIL=Morgan Kaiser <onboarding@resend.dev>
```

Restart `npm run dev` after saving env.

## 4. Verify

1. Submit a calculator unlock or guide qualification on localhost  
2. Check **Table Editor → leads** for a new row  
3. Check Morgan’s inbox for the Resend notification  

API responses include `saved: true/false` and `emailed: true/false` from `/api/lead` and guide request flows that use `submitLead`.
