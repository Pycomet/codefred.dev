# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 portfolio website for Alfred Emmanuel, built with React 18, Tailwind CSS, and SCSS. The portfolio showcases sections including Hero, About, Experience, Skills, Projects, Education, Blog, and Contact.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Docker Commands

```bash
# Build and run with Docker Compose
docker-compose up --build

# Build Docker image manually
docker build -t nextjs-app -f Dockerfile.dev .

# Run Docker container
docker run -p 3000:3000 nextjs-app
```

## Architecture

### Directory Structure

- `app/` - Next.js 15 App Router structure
  - `api/` - API routes for contact form, data fetching, and Google integrations
  - `components/` - React components organized by feature
    - `homepage/` - Main portfolio sections (hero, about, experience, skills, projects, education, blog, contact)
    - `helper/` - Utility components (animations, scroll-to-top, glow effects)
    - `navbar.jsx` and `footer.jsx` - Layout components
  - `css/` - SCSS stylesheets (card.scss, globals.scss)
  - `page.js` - Main homepage that composes all sections
  - `layout.js` - Root layout with Google Tag Manager, Toast notifications, and global styles
- `utils/` - Utility functions and data configuration
  - `data/` - Configuration files for portfolio content (personal-data, projects, experience, education, skills, contacts)
  - `skill-image.js` - Skill icon mappings
  - `check-email.js` - Email validation
  - `time-converter.js` - Time formatting utilities
- `public/` - Static assets (images, profile pictures, etc.)

### Key Architectural Patterns

**App Router with Server Components**: The app uses Next.js 15's App Router. The main page (`app/page.js`) is a Server Component that fetches blog data from dev.to API at build/request time before rendering.

**Component Organization**: Homepage components are feature-based, with each section (hero, about, experience, etc.) in its own directory under `app/components/homepage/`. Each section typically has an `index.jsx` and may include child components like `project-card.jsx` or `contact-form.jsx`.

**Data Configuration Pattern**: Portfolio content is centralized in `utils/data/` as JavaScript objects. To customize the portfolio, modify these files:
- `personal-data.js` - Name, designation, contact info, social links, resume link
- `projects-data.js` - Project showcases
- `experience.js` - Work history
- `education.js` - Educational background
- `skills.js` - Technical skills
- `contactsData.js` - Contact information

**API Routes**: Three API routes handle backend functionality:
- `/api/contact` - Sends contact form submissions via Nodemailer (Gmail) and Telegram bot
- `/api/data` - Internal data fetching endpoint
- `/api/google` - Google-related integrations

**Styling Architecture**: Uses a hybrid approach:
- Tailwind CSS for utility-first styling
- SCSS modules for complex component styles (card effects, global styles)
- Custom Tailwind config with extended breakpoints (4k: 1980px) and container settings

### Contact Form Integration

The contact form sends messages through two channels:
1. Email via Nodemailer using Gmail SMTP (requires `GMAIL_PASSKEY` app password)
2. Telegram notification via bot API (requires `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`)

Both integrations are handled in `app/api/contact/route.js` with formatted HTML email templates.

### Blog Integration

The portfolio fetches blog posts from dev.to using the username specified in `personalData.devUsername`. The fetch happens in the server component (`app/page.js`) and filters for posts with cover images, then randomly sorts them.

## Environment Configuration

Required environment variables (create `.env` from `.env.example`):

```env
NEXT_PUBLIC_GTM=              # Google Tag Manager ID (optional)
NEXT_PUBLIC_APP_URL=          # Application URL for metadata
TELEGRAM_BOT_TOKEN=           # Telegram bot token for contact notifications
TELEGRAM_CHAT_ID=             # Telegram chat ID to receive notifications
GMAIL_PASSKEY=                # Gmail app password for sending emails
EMAIL_ADDRESS=                # Gmail address to send/receive emails
```

### Setting up Contact Form

1. **Gmail App Password**: Enable 2-Step Verification in Google Account, then generate an App Password from Security settings
2. **Telegram Bot**: Chat with @BotFather on Telegram, use `/newbot` to create a bot and get the token. Get chat ID by sending a message to your bot and visiting `https://api.telegram.org/bot<TOKEN>/getUpdates`

## Image Configuration

Next.js Image component is configured to allow remote images from:
- `res.cloudinary.com` (for uploaded assets)
- `media.dev.to` and `media2.dev.to` (for blog post images)

Add additional domains to `next.config.js` under `images.remotePatterns` if needed.

## Deployment

The project is configured for Vercel deployment (see `.vercel/` directory). When deploying:
1. Configure all environment variables in the platform dashboard
2. Vercel auto-detects Next.js and builds automatically
3. Automatic redeployment occurs on git push to connected branch
