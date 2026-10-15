#!/bin/bash
# Captures 16:10 screenshots of the live builds into static/builds/ as WebP.
# Run from a normal terminal (needs internet): bash scripts/capture-builds.sh
# Then add `image: { src: '/builds/<slug>.webp', alt: '<Name> home page' }` to the
# matching entry in src/lib/data/builds.ts.
set -e
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
mkdir -p static/builds
while read -r slug url; do
  "$CHROME" --headless=new --hide-scrollbars --window-size=1280,800 --screenshot="/tmp/$slug.png" "$url" >/dev/null 2>&1
  cwebp -quiet -q 80 -resize 800 500 "/tmp/$slug.png" -o "static/builds/$slug.webp"
  echo "static/builds/$slug.webp"
done <<'EOF'
grindproof https://www.grindproof.co
cafe-fausse https://cafe-fausse-fe.vercel.app
vibe-coding https://vibe-coding-e2b-trigger.vercel.app
pixelai https://pixelai-weld.vercel.app
tripsplit https://tripsplit-eta.vercel.app
EOF
