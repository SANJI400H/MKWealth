# MASTER PROMPT: Morgan Kaiser website revision (round 1)

Paste everything below the line into your build tool (Claude Code, Lovable, Cursor, etc.) with the site repo or project open.

---

## ROLE AND GOAL

You are a senior front end engineer and UX designer revising the existing Morgan Kaiser website (UAE real estate investment advisor, Huspy partner). Morgan reviewed the live site page by page and recorded his feedback. Apply every change below in one pass. Do not rebuild from scratch: keep the existing structure, routes, brand system, forms and integrations, and change only what is listed. Where an instruction is ambiguous, pick the option marked "Default" and list it in your final report.

**Brand system (do not change):** ivory #FBF8F1 background, ink #151310 text, burgundy #722F38 primary accent, silver secondary accent. Tone: premium, investment grade, calm, confident. New elements must use these tokens, not new colours.

**Copy rules:** Plain, confident sentences. Do not use em dashes or en dashes anywhere in new or edited copy. Never write "lead magnet" anywhere on the site (visible text, headings, labels, alt text, meta tags, page titles, breadcrumbs, URLs shown to users). Never state or imply that Morgan's acquisition focus is "100% off-plan".

**Before you start:** crawl the whole site, list every page and component, and note where each item below lives. At the end, give a checklist mapping each numbered change to the files you edited, and flag anything you could not complete or that needs an asset or fact from the client.

---

## A. GLOBAL DESIGN AND LAYOUT

**A1. Reduce the white space and make the site feel richer.** Morgan's overall verdict: "very good, investment grade, but a bit boring, a lot of white space." Across all pages:
- Tighten section padding where there are large empty areas, and fill dead zones with purposeful content (stat bands, icons, imagery, cards, charts, subtle burgundy and silver accents, soft gradients, layered cards, section dividers).
- Add tasteful motion: fade and rise on scroll, hover lift on cards, animated counters on key numbers, chart draw-in animations. Respect `prefers-reduced-motion`.
- Keep it premium, not flashy. Friendlier, cooler, more "wow", but still investment grade.

**A2. Landing page hero (first screen).** The page looks bare. The AI character currently walks off the page at the start. Make the character stay standing on the right side of the hero (or replace that space with an equally strong visual) so the right half is never empty. The hero must look complete on desktop and mobile.

**A3. Persistent exit routes ("off-ramps") on every page.** Today users must press the browser Back button.
- Add a clear, consistent navigation system: a visible header nav on every page and a "Back" button or breadcrumb at the top of every inner page (areas, area detail, developers, developer detail, calculators, guides, comparison pages).
- After the investor guide access form is submitted, the confirmation screen must show clear next steps: for example "Explore the calculators", "Browse micro markets", "View developers", "Back to home", plus the WhatsApp contact. No dead ends anywhere.
- Add a clean footer on all pages with the same exit links.

**A4. Huspy credibility.**
- Add a Huspy mention and logo in the site header (for example "In partnership with Huspy" with the logo, visually quiet but visible on every page).
- Create a new **About Huspy** page (route `/about-huspy`, linked from the header and footer). Purpose: credibility so Morgan does not look like a "lone ranger". Include: who Huspy is, what the partnership means for the client (financing access, regulated mortgage advice, a larger platform behind Morgan), and a call to action to book a strategy session. Use placeholder copy clearly marked `[CONFIRM WITH CLIENT]` for any factual claim about Huspy that is not already on the site, and use the official Huspy logo supplied by the client or the one already in the project. Do not invent statistics.

---

## B. STRATEGY SESSION BOOKING AND FORMS

**B1. Keep as is** (Morgan approved): the three pillar block (Vision, Strategy, Property), the line "numbers led property portfolio strategies that begin with your objectives before any unit", the "Book your 30 minute session" block, the submission form fields (name, email, number, vision, investment portfolio strategy) and the submission copy ("your details go to Morgan, if approved you get access to choose topics, private guide videos and PDFs that will then be emailed to you"). WhatsApp integration works, keep it.

**B2. Google Calendar integration for the 30 minute session. Default:** embed a Google Calendar appointment schedule (booking page) so visitors see Morgan's real available times, placed inside the booking section with a styled container that matches the brand. Keep the existing form as the qualification step (submit details first, then pick a time) and keep a fallback "Request a time" path if the calendar fails to load or the booking URL is not set. Put the booking URL in a single config constant or environment variable named `BOOKING_URL` and leave a clear TODO and a visible-in-dev warning if it is empty. Do not hardcode a made up URL. In the final report, note this was a recommendation and Morgan asked for our view: the trade-off is that showing open slots speeds up booking but also shows how empty or full his diary is, so the form-first, then-calendar flow protects the "if approved" positioning.

---

## C. TOOLS AND CALCULATORS

**C1. "True cost of buying in Dubai" page.** At the top of the portal page it currently shows a label reading "lead magnet" plus a cost label. Remove the "lead magnet" label completely (and audit the whole site, including code comments that are rendered, page titles and meta tags, for the phrase "lead magnet"). Keep the useful cost label.

**C2. Keep as is (Morgan approved the logic):** true yield calculator, purchase cost calculator, off-plan payment calculator, mortgage calculator interest rate field. Only apply the upgrades below.

**C3. Off-plan payment calculator upgrade.** Add an interactive chart: a payment plan timeline (stacked bars or a step area chart) showing the down payment, instalments by milestone, and handover payment, updating live as inputs change, with hover tooltips and a cumulative cash outlay line. Make the client facing result area friendlier: large key figures, clear labels, a short plain language summary sentence under the chart.

**C4. Mortgage calculator: major upgrade.** Make it far more in depth and interactive:
- **Amortization chart:** a stacked area or bar chart across the full loan term showing, per year or month, how much of each payment is interest versus principal, and a line for cumulative equity built (principal repaid) so the user sees how much equity they own and when.
- **Amortization table:** expandable schedule (month or year view) with payment, interest, principal and remaining balance, plus an export or print option if simple.
- **Non-resident rules block:** show the typical loan to value a non-resident receives (international investors get roughly 60% maximum LTV, which with fees means a 40 to 50 percent plus down payment). Make the LTV selectable or defaulted by residency (resident, non-resident) and by property status. Display this clearly beside the inputs, labelled as typical and subject to bank approval.
- **Off-plan mortgage timing:** explain and show when a mortgage can be taken on an off-plan property (at handover, not before), and let the user toggle off-plan versus ready so the calculator shows the correct start of the mortgage timeline.
- **Interest versus principal explainer:** for a standard UAE bank amortization, show the split of every payment (for example "in year 1, X% of your payment is interest"), and show total interest paid over the term and the total cost of the loan.
- Inputs: property price, down payment (amount and percent), loan term, interest rate (keep the existing field), residency, property status. Live recalculation, input validation, sensible UAE defaults, currency formatting in AED.
- Add a short disclaimer: estimates only, not financial advice, rates and LTV vary by bank and profile.
- Make the whole calculator visually richer (cards, big figures, animated chart), consistent with A1.

---

## D. OVERVIEW AND ABOUT / STORY SECTION

**D1. Fill the white space** on the Overview page with real content blocks (credentials band, story, stats, services), per A1.

**D2. Update Morgan's story.** Add these facts, written in the existing voice, third person if the story is third person:
- He managed the sales team of the business, which generated about **£87 million a year in revenue**.
- The finance account was with **Black Horse**, a **£14 million a year** Black Horse finance account.
- Change the road show line to: he attended international road shows **all over the world** selling Dubai property (replace "USA and UK" wording), before transitioning companies.
- In the **last sentence of the story**, include the words **"wealth protection"**, taken from the investment methodology section, so the story closes consistently with the methodology.
- `[VERIFY WITH CLIENT]`: these figures came from a voice transcription. Leave a hidden code comment `TODO verify £87m revenue and £14m Black Horse` and list it in the final report.

**D3. Remove the off-plan-only positioning.** Delete the sentence "Current acquisition focus is 100% off-plan" and every other place that says or implies the acquisition focus is 100% off-plan (page copy, cards, meta descriptions, FAQs, schema). Search the whole codebase for "100%", "off-plan only" and similar. Off-plan can still be described as one strategy among others.

---

## E. SERVICE SECTIONS: REWRITE THREE BLOCKS

Rewrite each block's **Who it is for**, **What Morgan contributes** and **Expected next step** exactly along the lines below (polish grammar, keep Morgan's meaning, keep the existing card or accordion layout).

**E1. Property Acquisition**
- *Who it is for:* People with a vision to build wealth and prosperity in the UAE who are looking for high returning real estate advice.
- *What Morgan contributes:* A formulated plan that lets you achieve the best returns possible while mitigating downside as aggressively as possible, including unit selection and structuring against payment plans, delivery risk and price discovery. Morgan builds a full A to Z plan on how to acquire assets in the UAE that are profitable and, just as importantly, tells you exactly what to avoid so you do not risk losing money.
- *Expected next step (deal underwriting):* Proceed with a position only once the asset clearly fits the investor's vision, goal and direction, or renegotiate the assumptions. At a bare minimum you walk away with 100% clarity on what you do or do not want in the market.
- Also remove the "Hand over timelines" item from this block if present and any off-plan-only line (see D3).

**E2. Portfolio Strategy**
- *Who it is for:* International investors, family offices and institutional conglomerates that prioritise diversification and empire expansion in the UAE.
- *What Morgan contributes:* A UAE wide, unbiased overview, not Dubai first, that lets you compare multiple emirates, multiple markets and multiple asset classes at the same time, backed by a deep understanding of international markets. **Remove the "hand over timelines" content from this block.**
- *Expected next step:* Targeted acquisition for expansion, or rebalancing and recalibration recommendations for existing assets you may or may not hold.

**E3. Financing Coordination**
- *Who it is for:* Buyers considering a mortgage or construction linked drawdowns, as well as investors who use leverage to snowball their portfolios and increase their cash on cash return potential.
- *Foreign ownership line:* Make the statement specific: foreign buyers have been permitted freehold ownership in designated areas of the UAE **since 2002**.
- *What the buyer needs clarity on:* funding, fees, and, if relevant, financing, alongside areas, market movements and potential risks.

---

## F. OFF-PLAN VERSUS READY COMPARISON

Rework the comparison section so it is balanced: **there are pros and cons to both.** Use a two column comparison (cards or table) with a short balanced intro and a closing takeaway. Content:

**Off-plan: pros**
- Capital allocation is significantly lighter, and cash deployment is slower (spread over the payment plan).
- Greater leverage can be assumed, including developer payment plans.
- Typically bought under market value, so the appreciation curve is more aggressive.
- More accessible to international investors.
- Lets you generate funds significantly faster using the leverage the developer provides.
- Newest calibre asset in the UAE: specs, amenities, building quality.

**Off-plan: cons / watch points:** delivery and construction risk, no rent until handover, price discovery depends on the developer (these are standard balanced points, mark with `[CONFIRM WITH CLIENT]`).

**Ready (secondary): pros**
- Useful if you want to live in the residence yourself or want an immediate return.
- Can be lucrative for assets you can renovate.

**Ready (secondary): cons**
- Much more aggressive capital deployment upfront.
- International investors get a maximum loan to value of around 60%, so including fees you are typically 50%, sometimes 60%, down before you begin. This makes it inaccessible to many investors and slows your cash on cash return.
- Renovation opportunities need substantially more cash upfront.

**Closing takeaway:** In many cases the delayed gratification of off-plan yields significantly better results in the future, but the right choice depends on the investor's goals. Link to the mortgage and off-plan calculators from this section.

---

## G. MICRO MARKETS

**G1. Add these Dubai micro markets** (new cards or pages, matching the existing area card and detail page pattern, each with a real image, short description, indicative yield or price band if the data model has fields for them, and the insights described in I2): Dubai Islands, Dubai Harbour, Emaar Beachfront, Dubailand, Dubai South, Jumeirah, Bluewaters.
- `[CONFIRM WITH CLIENT]`: "Emaar Beachfront" was transcribed phonetically ("in my beach run"). Treat as Emaar Beachfront and flag it. Do not invent numbers: leave data fields empty with a `TODO` rather than guessing, or hide empty fields.

**G2. Replace the micro market images with accurate, relevant photos:**
- Palm Jebel Ali: a real Palm Jebel Ali image.
- Dubai Maritime City: a real Dubai Maritime City image.
- JVC (Jumeirah Village Circle): a real JVC image.
- Dubai Marina: currently shows the Burj Al Arab, which is wrong. Replace with a genuine Dubai Marina skyline or marina image.
- Downtown Dubai and Business Bay are fine, keep them.
- Use licensed or client supplied photography only (project assets, the client's Google Drive folder, or properly licensed stock such as Unsplash with attribution where required). Optimise images (WebP or AVIF, responsive sizes, lazy loading, descriptive alt text). If an image cannot be sourced, leave a clearly marked placeholder and list it in the final report. Do not use images of the wrong place.

---

## H. DEVELOPERS SECTION

**H1. Use each developer's real logo**, not a generic picture. Show the logo cleanly on a neutral tile (consistent size, padding, greyscale to colour on hover is acceptable).

**H2. Developer list to show:**
- Existing and to confirm with real logos: Emaar, Nakheel, Meraas, Sobha, Ellington, DAMAC, Global (`[CONFIRM WITH CLIENT]`: the audio named these phonetically as "Iman, Akhil, Maras, Shoba, Ellington, DAG, Global").
- **Add:** Danube (transcribed as "Zaya", confirm), Alta or Altera (transcribed as "Alter", confirm), Beyond, Omniyat, Aldar, Dubai Properties, Select Group.
- **Remove Binghatti** from the site entirely (cards, filters, mentions, links, sitemap). Morgan said add it, hesitated, then confirmed remove: final decision is remove.
- Source official logos from each developer's brand or press page or from client supplied assets. If a logo cannot be sourced legitimately, show a clean text wordmark tile and list it in the final report. Do not use blurry screenshots.

---

## I. AREA AND DEVELOPER DETAIL PAGES: BETTER INSIGHTS

**I1.** Each area page and each developer page currently feels "very bland". Redesign them to carry real analytical value, within the brand.

**I2. Area page contents (minimum):** hero image and one line positioning; key metrics strip (average price per sq ft, typical gross yield range, typical price band, supply pipeline, handover window, if data exists, otherwise structured empty states marked TODO); "Who this area suits" (end user, investor, holiday let, family); strengths and risks; best property types; payment plan and ready market notes; nearby infrastructure and catalysts; a small chart (price or yield trend placeholder wired to a data file); "Morgan's view" box (short quote style take, text field editable); calculators and booking call to action; back button and related areas.

**I3. Developer page contents (minimum):** logo and one line profile; track record (years active, notable projects, delivered versus under construction if data exists); typical product and price positioning; payment plan styles; strengths and risks to underwrite; delivery risk notes; "Morgan's view" box; projects list; call to action and back button.

**I4.** Data lives in one structured file (JSON or the CMS the project already uses) so Morgan's team can edit insights without touching components. Do not fabricate market statistics: use only data already in the project, and where data is missing show a tidy "Data coming soon" state and log it in the final report.

---

## J. TECHNICAL REQUIREMENTS AND QUALITY BAR

- Mobile first, fully responsive, no horizontal scroll, 16px side gutters at phone width.
- Accessibility: semantic headings, focus states, colour contrast AA, alt text, keyboard operable charts and accordions.
- Performance: lazy load images and charts, no layout shift, Lighthouse performance and accessibility each at 90 or above on desktop for the home page.
- SEO: unique title and meta description for new pages (About Huspy, new micro markets), update the sitemap and internal links, add structured data where it already exists, remove all "lead magnet" and "100% off-plan" text from meta and schema.
- Charts: use the library already in the project; if none, use a lightweight option (for example Chart.js 4.4.x or Recharts matching the stack) with brand colours.
- Do not break existing form submissions, WhatsApp links, analytics or integrations. Do not touch the investor centre (separate project) in this task.
- Test: run the build, lint and a link check, click through every page, verify no console errors, and confirm every back button works.

---

## K. FINAL REPORT (required)

When finished, reply with:
1. A checklist of changes A1 through J, each marked Done, Partial or Blocked, with files changed.
2. A list of everything flagged `[CONFIRM WITH CLIENT]` or `[VERIFY WITH CLIENT]` (the £87 million and £14 million Black Horse figures, developer name spellings, Emaar Beachfront, Huspy facts, booking URL).
3. A list of images and logos that could not be sourced and need client supplied files.
4. Any data gaps shown as "Data coming soon".
5. Screenshots (or a local preview URL) of the home page, mortgage calculator, an area page, a developer page and the About Huspy page.
