#!/bin/bash
set -u
export PATH="/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/opt/homebrew/bin:/Users/ninurisumathipala/.nvm/versions/node/v24.19.0/bin:$PATH"
BASE="${1:-http://localhost:3000}"
ROOT="/Users/ninurisumathipala/Documents/SANJI/Morgan/MKWealth"
cd "$ROOT"
FAIL=0

echo "=== PAGES ==="
for path in "/" "/strategy-session" "/guide" "/video-guides" "/true-cost" "/invest" "/about" "/contact" "/portal" "/resources" "/tools"; do
  code=$(/usr/bin/curl -s -o /tmp/mk_page.html -w "%{http_code}" --max-time 25 "$BASE$path" || echo ERR)
  bytes=$(/usr/bin/wc -c < /tmp/mk_page.html | /usr/bin/tr -d ' ')
  if [ "$code" != "200" ]; then echo "FAIL $path -> $code"; FAIL=1; else echo "OK   $path ($bytes bytes)"; fi
done

echo ""
echo "=== ASSETS ==="
for path in "/images/mk-logo.png" "/images/markets/dubai.jpg" "/images/markets/dubai-skyline.jpg" "/images/markets/abu-dhabi-skyline.jpg" "/images/markets/rak-coast.jpg"; do
  code=$(/usr/bin/curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$BASE$path")
  echo "$code $path"
  [ "$code" = "200" ] || FAIL=1
done

echo ""
echo "=== CONTENT MARKERS ==="
/usr/bin/curl -s "$BASE/guide" | /usr/bin/grep -qiE "Investor Guide|qualify|Unlock|What should we send" && echo "OK /guide" || { echo "FAIL /guide"; FAIL=1; }
/usr/bin/curl -s "$BASE/video-guides" | /usr/bin/grep -qiE "youtube|Video Guides" && echo "OK /video-guides" || { echo "FAIL /video-guides"; FAIL=1; }
/usr/bin/curl -s "$BASE/true-cost" | /usr/bin/grep -qiE "True Cost|email|worksheet" && echo "OK /true-cost" || { echo "FAIL /true-cost"; FAIL=1; }
/usr/bin/curl -s "$BASE/strategy-session" | /usr/bin/grep -qiE "strategy|session" && echo "OK /strategy-session" || { echo "FAIL /strategy-session"; FAIL=1; }
/usr/bin/curl -s "$BASE/" | /usr/bin/grep -qi "Morgan" && echo "OK / home" || { echo "FAIL / home"; FAIL=1; }
/usr/bin/curl -s "$BASE/" | /usr/bin/grep -qi "From the feed" && { echo "FAIL home still has From the feed"; FAIL=1; } || echo "OK home no From the feed"
/usr/bin/curl -s "$BASE/" | /usr/bin/grep -qiE "video-guides|Video Guides" && echo "OK home video guides preview" || echo "WARN home may lack video guides preview text"

echo ""
echo "=== ENV KEYS (names only) ==="
/Users/ninurisumathipala/.nvm/versions/node/v24.19.0/bin/node -e '
const fs=require("fs");
fs.readFileSync(".env.local","utf8").split(/\n/).forEach(l=>{
  const m=l.match(/^([A-Z0-9_]+)=(.*)$/);
  if(!m) return;
  const v=m[2].trim().replace(/^["'\'']|["'\'']$/g,"");
  console.log((v.length?"SET  ":"EMPTY")+m[1]);
});
'

echo ""
echo "=== API: session/request ==="
/usr/bin/curl -s -o /tmp/mk_session.json -w "HTTP %{http_code}\n" --max-time 30 \
  -X POST "$BASE/api/session/request" \
  -H "Content-Type: application/json" \
  -d '{"name":"Smoke Test","email":"smoke-test@example.com","phone":"+971500000000","existingUaeProperty":"No","budgetRange":"AED 1M, 2M","intent":"30-minute-strategy-session"}'
/bin/cat /tmp/mk_session.json; echo

echo ""
echo "=== API: guide/request ==="
/usr/bin/curl -s -o /tmp/mk_guide.json -w "HTTP %{http_code}\n" --max-time 30 \
  -X POST "$BASE/api/guide/request" \
  -H "Content-Type: application/json" \
  -d '{"name":"Smoke Guide","email":"smoke-guide@example.com","phone":"+971500000001","budgetRange":"AED 1M, 2M","intent":"Investor Guide qualification"}'
/bin/cat /tmp/mk_guide.json; echo

echo ""
echo "=== API: lead (contact) ==="
/usr/bin/curl -s -o /tmp/mk_lead.json -w "HTTP %{http_code}\n" --max-time 30 \
  -X POST "$BASE/api/lead" \
  -H "Content-Type: application/json" \
  -d '{"name":"Smoke Lead","email":"smoke-lead@example.com","phone":"+971500000002","message":"smoke test","source":"contact","intent":"contact"}'
/bin/cat /tmp/mk_lead.json; echo

echo ""
echo "=== API: lead (true-cost) ==="
/usr/bin/curl -s -o /tmp/mk_tc.json -w "HTTP %{http_code}\n" --max-time 30 \
  -X POST "$BASE/api/lead" \
  -H "Content-Type: application/json" \
  -d '{"name":"True Cost Smoke","email":"truecost-smoke@example.com","phone":"+971500000003","source":"analyse","intent":"true-cost-worksheet"}'
/bin/cat /tmp/mk_tc.json; echo

echo ""
echo "=== GuideExperience source ==="
/usr/bin/grep -n "email your materials\|email me these topics" "$ROOT/app/guide/GuideExperience.tsx" || FAIL=1

echo ""
echo "EXIT_FAIL=$FAIL"
exit $FAIL
