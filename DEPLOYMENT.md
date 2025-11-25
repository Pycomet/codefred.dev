# Deployment Guide - codefred.dev

## Performance Metrics (Current)

### Build Output
- **Total JS (gzipped)**: 90.16 KB ✅ (Target: <200KB)
- **Largest chunk**: 28KB (CgwVQNMX.js)
- **Build time**: ~2-3 seconds
- **Routes**: 15+ pages

### Performance Status
✅ **Excellent** - Well under budget
- Fast build times
- Small bundle sizes
- Code splitting working
- Font files optimized

---

## Pre-Deployment Checklist

### 1. Environment Variables (Required)

Create these in Vercel dashboard:

```env
# Contact Form - Telegram
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# Contact Form - Email
EMAIL_ADDRESS=your_gmail@gmail.com
GMAIL_PASSKEY=your_gmail_app_password

# Optional - GitHub API (higher rate limits)
# GITHUB_TOKEN=your_github_token

# Public Variables
PUBLIC_APP_URL=https://codefred.dev
```

### 2. Domain Setup

**Vercel:**
1. Go to Project Settings → Domains
2. Add custom domain: `codefred.dev`
3. Add www redirect: `www.codefred.dev` → `codefred.dev`
4. Configure DNS (A/CNAME records provided by Vercel)

**DNS Records:**
```
Type    Name    Value
A       @       76.76.21.21 (Vercel IP)
CNAME   www     cname.vercel-dns.com
```

### 3. Cal.com Setup

**Create Event Types:**
1. Login to Cal.com
2. Create 2 event types:
   - Free Consultation (15 min)
   - Quick Fix Audit ($500)
3. Get booking URLs
4. Update `consultation-packages.ts` with actual links

**Current Placeholders:**
- `codefred/consultation` → Replace with actual
- `codefred/quick-fix` → Replace with actual

### 4. Email Setup (Gmail)

1. Enable 2-Step Verification in Google Account
2. Go to Security → App Passwords
3. Generate password for "Mail"
4. Use in `GMAIL_PASSKEY` env var

### 5. Telegram Setup

1. Chat with [@BotFather](https://t.me/BotFather)
2. Create bot: `/newbot`
3. Get token (TELEGRAM_BOT_TOKEN)
4. Get chat ID:
   - Send message to your bot
   - Visit: `https://api.telegram.org/bot<TOKEN>/getUpdates`
   - Copy chat.id value

---

## Deployment Steps

### Option 1: Vercel (Recommended)

**One-time Setup:**
```bash
npm install -g vercel
vercel login
```

**Deploy:**
```bash
# Production deployment
vercel --prod

# Preview deployment
vercel
```

**Or via GitHub:**
1. Push to GitHub
2. Import project in Vercel
3. Auto-deploys on push to main

### Option 2: Manual Build + Deploy

```bash
# Build
npm run build

# Output in: .svelte-kit/output
# Upload to any static host
```

---

## Post-Deployment

### 1. Verify Integrations

**Test Contact Form:**
- Fill form on `/contact`
- Check Telegram notification received
- Check email received

**Test Cal.com:**
- Click booking links
- Verify calendar loads
- Test booking flow

**Test API Routes:**
- `/api/github` - Returns GitHub data
- `/sitemap.xml` - Returns valid XML
- `/robots.txt` - Returns robots file

### 2. SEO Setup

**Google Search Console:**
1. Add property: `https://codefred.dev`
2. Verify ownership (HTML file or DNS)
3. Submit sitemap: `https://codefred.dev/sitemap.xml`

**Optional - Analytics:**
- Plausible.io (privacy-friendly)
- Google Analytics 4
- Fathom

### 3. Performance Testing

**Lighthouse (Chrome DevTools):**
```
Target Scores:
- Performance: >95
- Accessibility: 100
- Best Practices: 100
- SEO: 100
```

**Test URLs:**
- Homepage: https://codefred.dev
- Case study: https://codefred.dev/case-studies/cost-reduction
- About: https://codefred.dev/about

---

## Monitoring

### Key Metrics to Track

1. **Uptime**: Use UptimeRobot or Vercel Analytics
2. **Core Web Vitals**: Vercel Speed Insights
3. **Conversion**: Cal.com bookings
4. **Traffic**: Plausible or Google Analytics

### Performance Budgets

| Metric | Budget | Current |
|--------|--------|---------|
| Total JS | <200KB | 90KB ✅ |
| Total CSS | <100KB | ~60KB ✅ |
| FCP | <1.2s | TBD |
| LCP | <2.5s | TBD |
| TTI | <3.5s | TBD |

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .svelte-kit node_modules
npm install
npm run build
```

### Environment Variables Not Working
- Vercel: Redeploy after adding env vars
- Check variable names (no typos)
- Private vars: no `PUBLIC_` prefix
- Public vars: must have `PUBLIC_` prefix

### Contact Form Not Sending
1. Check Telegram bot token is correct
2. Verify chat ID is correct
3. Check Gmail app password (not regular password)
4. Check logs in Vercel dashboard

### Cal.com Links Broken
1. Update `consultation-packages.ts` with real links
2. Rebuild and redeploy
3. Test in incognito window

---

## Rollback

**Vercel:**
```bash
vercel rollback
```

Or via dashboard:
1. Go to Deployments
2. Find previous working deployment
3. Click "Promote to Production"

---

## Support

**Issues?**
1. Check Vercel logs
2. Test locally: `npm run preview`
3. Verify environment variables
4. Check API routes directly

**Resources:**
- SvelteKit Docs: https://kit.svelte.dev
- Vercel Docs: https://vercel.com/docs
- Cal.com Docs: https://cal.com/docs
