# Homepage Redesign — Design Spec

## Context

codefred.dev is a SvelteKit portfolio site for an AI Systems Architect targeting enterprise CTOs/VPs for consulting engagements. The current site has 13 homepage sections competing for attention, resulting in a wall-of-content feel, flat interactions, and an unclear conversion path.

## Goals

- Reduce homepage to 5 focused sections using progressive reveal storytelling
- Elevate the existing dark theme and cyan/purple palette through better spacing, typography, and animation craft
- Create a clear narrative arc: claim → proof → validation → depth → action
- Ensure mobile is equally polished with adapted interactions
- Make every animation intentional — fire once, then stop

## Audience

Primary: Enterprise CTOs and VP Engineering evaluating a senior AI consultant. They are time-poor, results-focused, and pattern-match quickly. The design should feel confident and senior — no try-hard decoration.

## Scroll Pattern

**Progressive Reveal** for the overall page — content builds narratively, each section earns the next scroll. **Sticky Narrative** within case studies — key metrics pin in place while details scroll alongside.

## Design Direction

**Surgical Precision** — restrained, typography-driven, content IS the design. Minimal decorative elements. Animations are subtle and serve to guide the eye, not impress.

### Visual Identity (Retained)

- Dark theme: `#09090B` primary bg, `#18181B` secondary, `#27272A` accent
- Text: `#FAFAFA` primary, `#A1A1AA` secondary, `#71717A` muted
- Brand: `#0EA5E9` cyan primary, `#8B5CF6` purple secondary, `#10B981` success green
- Fonts: Clash Display (headlines), Inter (body), JetBrains Mono (code)
- Existing Tailwind config and design tokens remain unchanged

### Animation Principles

- All animations fire once on scroll-enter or load. No loops, no repeats.
- Fade + slide up is the primary entrance motion (0.4-0.6s ease-out)
- Stagger delays at 100ms intervals for grouped elements
- Metrics count up from 0 on scroll-enter
- Respect `prefers-reduced-motion` — skip all motion when set
- GPU-accelerated transforms only (`opacity`, `transform`)

---

## Section 1: Hero

**Purpose:** Make the claim. Establish who you are and what you deliver in under 5 seconds.

**Content:**
- Label: "AI Systems Architect" — uppercase, cyan, letterspaced, small
- Headline: "I turn expensive AI problems into efficient systems" — single statement, no rotation
- 3 metrics below: `92% Cost Reduced` | `$2M+ Saved` | `15+ Systems Built`
- Primary CTA: "See my work" button — smooth-scrolls to case studies
- Secondary: "or get in touch" text link

**Visual treatment:**
- Centered layout, generous vertical padding
- Headline: Clash Display, ~48-56px desktop, white, bold
- Metrics: large number in brand color (cyan/purple/green), small muted label below
- Background: subtle radial gradient center (#09090b → #18181b). No orbs, no parallax.

**Animation:**
- Text fades in on load (0.4s)
- Metrics count up from 0 after 0.3s stagger delay
- One moment of motion, then static

**Mobile:**
- Same layout, stacked
- Metrics in a single row of 3, scaled via clamp()
- Font sizes reduce proportionally

---

## Section 2: Featured Case Studies (Sticky Scroll)

**Purpose:** Prove the claim with real results. This is the centerpiece.

**Content:**
- 2-3 case studies: AI Cost Reduction (92%), Retail Security (97%), Semantic Search (<100ms p99)
- Per case study: hero metric, one-sentence result, 2-3 short paragraphs (problem → approach → outcome)
- "See all case studies" link at bottom → `/case-studies`
- No code blocks or comparison tables — depth lives on full case study pages

**Desktop layout:**
- Left 40%: sticky panel with case study title, hero metric (large bold number), one-line result
- Right 60%: scrolling content — problem, approach, outcome paragraphs
- When one case study ends, sticky panel crossfades to next
- Subtle horizontal rule or fade between case studies

**Animation:**
- Sticky panel fades in on first scroll-enter
- Metric counts up once
- Right-side paragraphs fade up with 100ms stagger on viewport entry
- All animations fire once

**Mobile:**
- No sticky layout (unreliable on mobile Safari)
- Each case study becomes a card: hero metric prominent at top, tap-to-expand detail below
- Vertical stack with collapsed detail (tap to expand). No horizontal swipe — keeps scroll direction consistent.

---

## Section 3: Expertise

**Purpose:** Show breadth of technical capability without self-reported vanity metrics.

**Content:**
- Section headline: "What I work with"
- 3-4 domain cards: AI/ML, Backend Architecture, Data Systems, Cloud/Infrastructure
- Per card: domain name, 3-4 key technology tags, one-line descriptor
- No proficiency bars, no percentages, no years count — case studies already proved competence

**Visual treatment:**
- Cards are flat — no borders, no glass, no shadows
- Domain name: white, 16-18px, semibold
- Tech tags: muted gray, small, letterspaced
- Hover: slight text color shift to cyan. No scale, no shadow.

**Animation:**
- Cards fade up with 100ms stagger on scroll-enter

**Mobile:**
- 2-column grid or single column stack
- Same minimal treatment

---

## Section 4: Social Proof

**Purpose:** Third-party validation. Someone else says you're good.

**Content:**
- 1-2 testimonials max — strongest quotes with real names, titles, companies
- If a measurable result ties to the testimonial, pair the quote with the metric

**Visual treatment:**
- Large pull-quote style: 20-24px, lighter weight
- Attribution: name (cyan accent), title, company in smaller muted text
- No quote mark icons, no cards, no borders
- Thin horizontal rule above and below to frame the section
- Generous whitespace

**Animation:**
- Quote fades in on scroll-enter

**Mobile:**
- Same layout, narrower. Quote text scales down.

---

## Section 5: CTA + Contact

**Purpose:** Convert. Clear, frictionless next step.

**Content:**
- Headline: "Let's solve your problem"
- Supporting text: "I'm currently available for consulting engagements"
- Primary CTA button: "Get in touch" — links to contact form or mailto
- Secondary text link: "or book a call" → Cal.com
- Plain text email address below, small, muted — for CTOs who just want to email
- No contact form on the homepage

**Visual treatment:**
- Centered, generous vertical padding
- Headline: white, 28-32px, semibold
- Button: existing primary gradient (cyan → purple), hover brightens slightly. No glow/pulse.

**Animation:**
- Fade in on scroll-enter

**Footer:**
- Minimal single line: name left, 3-4 social icons right (GitHub, LinkedIn, Twitter/X)
- No multi-column layout

**Mobile:**
- Same centered layout, button goes full-width
- Footer stacks if needed

---

## Navigation

- Fixed header: name/logo left, 3-4 links right (Work, About, Contact)
- Glass blur on scroll (existing behavior, retained)
- Mobile: minimal bottom bar instead of hamburger menu

---

## What Moves Off the Homepage

These sections are removed from the homepage. Content is either moved to dedicated pages or cut:

| Current Section | Disposition |
|---|---|
| Trust Indicators | Cut — case studies and testimonials serve this purpose |
| Problem Solver | Cut — hero statement and case studies cover this |
| Consultation Offerings | Moved to `/book` page |
| Content Authority | Cut — case studies demonstrate authority |
| Differentiators | Cut — implicit in the work shown |
| About | Stays on `/about` page (already exists) |
| Experience (full timeline) | Moved to `/about` page |
| Featured Projects | Moved to `/projects` page |

---

## Technical Notes

- Framework: SvelteKit (no change)
- Styling: Tailwind CSS (no change to config or tokens)
- Scroll animations: extend existing `inview` Svelte action or adopt a lightweight scroll-triggered animation approach
- Sticky scroll: CSS `position: sticky` for desktop case studies, with IntersectionObserver for crossfade triggers
- Mobile case study expand: Svelte transitions for collapse/expand
- Count-up animations: requestAnimationFrame-based counter, triggered by IntersectionObserver
- All animations respect `prefers-reduced-motion: reduce`
