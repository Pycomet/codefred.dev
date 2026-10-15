# codefred.dev

Personal site for Codefred: consulting work, YouTube and Instagram, and the story behind them.
SvelteKit, every page prerendered to static HTML, deployed on Vercel.

## Updating content

Every routine update is a text edit and a push. No code changes.

| To change | Edit |
| --- | --- |
| Email, handles, booking link, "currently in" line | `src/lib/config/site.ts` |
| Add or edit a case study | `src/content/case-studies/<slug>.md` (copy an existing one; frontmatter drives the cards) |
| Instagram posts (3-6, newest first) | `src/lib/data/instagram.ts` + square image in `static/social/` |
| Video type playlists for the /content filter | `src/lib/data/channel.ts` |
| Photos on Home and About | `src/lib/data/photos.ts` + WebP files in `static/photos/` |
| Career timeline and stack | `src/lib/data/timeline.ts` |
| Testimonials (verified only, with a source link) | `src/lib/data/testimonials.ts` |
| CV | replace `static/cv/codefred-cv.pdf` |
| Colours and fonts | `src/lib/styles/tokens.css` |

New YouTube videos and Shorts appear on their own: the site reads the channel's public RSS
feed at build time, and a daily GitHub Action triggers a rebuild.

## Development

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # prerenders every page; fails on broken internal links
npm run preview      # serve the build on http://localhost:4173
npm run check:site   # checks a running preview (or BASE_URL=https://codefred.dev)
```

`PUBLIC_POSTHOG_KEY` and `PUBLIC_POSTHOG_HOST` must exist in `.env` (empty is fine).

## Automation

- `.github/workflows/ci.yml`: type check, build, site checks, external link check and
  Lighthouse (mobile, 95+) on every PR
- `.github/workflows/daily-rebuild.yml`: calls the Vercel deploy hook daily
  (needs the `VERCEL_DEPLOY_HOOK` repository secret)
- `.github/workflows/post-deploy.yml`: checks the live site after each production deploy
