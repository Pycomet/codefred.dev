# Codefred.dev UI/UX Optimization Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix critical bugs, eliminate generic "AI slop" patterns, and elevate the visual identity and UX of codefred.dev into a distinctive, production-grade portfolio.

**Architecture:** Incremental improvements across the existing SvelteKit/Tailwind codebase. No framework changes. Fix bugs first, then upgrade the design system (typography, color, spacing), then improve individual sections, then add missing UX features (scroll animations, accessibility, performance).

**Tech Stack:** SvelteKit 2, Svelte 5 (runes), Tailwind CSS 3, @fontsource packages

---

## File Structure

### Files to Modify
- `package.json` — add Clash Display font package
- `tailwind.config.js` — update color tokens, add background separation, animation keyframes
- `src/lib/styles/global.css` — add Clash Display import, CSS variables for form inputs, scroll-triggered animation utility, skip-to-content, focus styles
- `src/lib/data/personal.ts` — fix stale "December 2025" availability
- `src/lib/data/consultation-packages.ts` — align price to $500
- `src/lib/data/content.ts` — remove orphaned testimonials array, update metrics
- `src/lib/stores/navigation.ts` — fix Writing scrollTarget
- `src/lib/components/layout/Navigation.svelte` — add active link state, skip-to-content link
- `src/lib/components/layout/MobileMenu.svelte` — use personalData for social URLs
- `src/lib/components/sections/Hero.svelte` — fix headline transition, throttle mousemove, remove grayscale effect, add image dimensions, fix CTA price
- `src/lib/components/sections/TrustIndicators.svelte` — add scroll-triggered animation via IntersectionObserver
- `src/lib/components/sections/ProblemSolver.svelte` — remove solution preview spoiler
- `src/lib/components/sections/ExpertiseVisualization.svelte` — replace skill bars with tag-cloud/grid layout
- `src/lib/components/sections/Experience.svelte` — fix stale copy, fix timeline layout at md breakpoint
- `src/lib/components/sections/SocialProof.svelte` — add pause-on-hover, fix 100% stats, add aria-live
- `src/lib/components/sections/ContentAuthority.svelte` — add GitHub fallback UI
- `src/lib/components/sections/ConsultationOfferings.svelte` — simplify Upwork section
- `src/lib/components/forms/ContactForm.svelte` — fix CSS variables
- `src/routes/writing/+page.svelte` — fix dynamic Tailwind class purging
- `src/routes/+page.svelte` — vary section spacing

### Files to Delete
- `next.config.js` — leftover from migration, no effect on SvelteKit

### New Files
- `src/lib/actions/inview.ts` — Svelte action for IntersectionObserver scroll-triggered animations

---

## Task 1: Fix Critical Bugs

**Files:**
- Modify: `src/lib/data/consultation-packages.ts:25`
- Modify: `src/lib/components/sections/Hero.svelte:90`
- Modify: `src/lib/data/personal.ts:12`
- Modify: `src/lib/components/sections/Experience.svelte:114`
- Modify: `src/routes/writing/+page.svelte:192`
- Modify: `src/lib/components/forms/ContactForm.svelte:237-241`
- Delete: `next.config.js`

- [ ] **Step 1: Fix price conflict — align consultation package to $500**

In `src/lib/data/consultation-packages.ts`, change line 25:

```ts
// OLD
price: '$200',
// NEW
price: '$500',
```

- [ ] **Step 2: Fix Hero CTA to match**

In `src/lib/components/sections/Hero.svelte`, line 90 already says `$500` — verify it matches. No change needed here if package is now $500.

- [ ] **Step 3: Fix stale "December 2025" in personal.ts**

In `src/lib/data/personal.ts`, change line 12:

```ts
// OLD
availability: 'Taking 2 new clients for December 2025',
// NEW
availability: 'Taking on new clients — Q2 2026',
```

- [ ] **Step 4: Fix stale copy in Experience.svelte**

In `src/lib/components/sections/Experience.svelte`, change line 114:

```svelte
<!-- OLD -->
I'm currently taking on 2 new clients for December 2025. Available for consulting, fractional CTO roles, or project-based work.
<!-- NEW -->
I'm currently taking on new clients for Q2 2026. Available for consulting, fractional CTO roles, or project-based work.
```

- [ ] **Step 5: Fix dynamic Tailwind class purging on Writing page**

In `src/routes/writing/+page.svelte`, replace line 192:

```svelte
<!-- OLD -->
<span class="px-2 py-1 bg-{article.source === 'dev.to' ? 'purple' : 'green'}-500/10 text-{article.source === 'dev.to' ? 'purple' : 'green'}-500 text-xs rounded font-semibold">

<!-- NEW -->
<span class="px-2 py-1 text-xs rounded font-semibold {article.source === 'dev.to' ? 'bg-purple-500/10 text-purple-500' : 'bg-green-500/10 text-green-500'}">
```

- [ ] **Step 6: Fix CSS variables in ContactForm**

In `src/lib/components/forms/ContactForm.svelte`, replace the `<style>` block (lines 237-253):

```svelte
<style>
	input,
	textarea {
		color: #ffffff;
	}

	input::placeholder,
	textarea::placeholder {
		color: #71717A;
	}

	input:disabled,
	textarea:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
```

- [ ] **Step 7: Delete leftover next.config.js**

```bash
rm next.config.js
```

- [ ] **Step 8: Remove orphaned testimonials from content.ts**

In `src/lib/data/content.ts`, delete lines 91-125 (the entire orphaned `testimonials` export):

```ts
// DELETE this entire block:
// Testimonials (to be collected from user)
export const testimonials = [
	// ... entire array ...
];
```

- [ ] **Step 9: Fix navigation Writing scrollTarget**

In `src/lib/stores/navigation.ts`, line 20, remove the scrollTarget that points to a non-existent element on `/writing`:

```ts
// OLD
{ href: '/writing', label: 'Writing', scrollTarget: '#content' },
// NEW
{ href: '/writing', label: 'Writing' },
```

- [ ] **Step 10: Build and verify no errors**

```bash
npm run build
```
Expected: Build succeeds with no errors. Tailwind classes for `bg-purple-500/10`, `text-purple-500`, `bg-green-500/10`, `text-green-500` are now preserved in production.

- [ ] **Step 11: Commit**

```bash
git add src/lib/data/consultation-packages.ts src/lib/data/personal.ts src/lib/data/content.ts src/lib/components/sections/Hero.svelte src/lib/components/sections/Experience.svelte src/routes/writing/+page.svelte src/lib/components/forms/ContactForm.svelte src/lib/stores/navigation.ts
git rm next.config.js
git commit -m "fix: resolve critical bugs — price conflict, stale dates, Tailwind purging, CSS vars, dead files"
```

---

## Task 2: Install Clash Display Font & Fix Typography

**Files:**
- Modify: `package.json`
- Modify: `src/lib/styles/global.css`
- Modify: `tailwind.config.js:26-28`

- [ ] **Step 1: Install fontsource Clash Display**

```bash
npm install @fontsource-variable/clash-display
```

- [ ] **Step 2: Import the font in global.css**

In `src/lib/styles/global.css`, add after line 2 (`@import '@fontsource/jetbrains-mono';`):

```css
@import '@fontsource-variable/clash-display';
```

- [ ] **Step 3: Update Tailwind font family config**

In `tailwind.config.js`, replace lines 25-29:

```js
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
  display: ['Clash Display Variable', 'Clash Display', 'Inter', 'sans-serif'],
},
```

- [ ] **Step 4: Build and verify fonts load**

```bash
npm run build
```
Expected: Build succeeds. `font-display` headings now render in Clash Display, creating clear typographic contrast with Inter body text.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/lib/styles/global.css tailwind.config.js
git commit -m "feat: install Clash Display font — fix display typography across site"
```

---

## Task 3: Improve Color System & Background Separation

**Files:**
- Modify: `tailwind.config.js:6-23`
- Modify: `src/lib/styles/global.css:11-15`

- [ ] **Step 1: Widen background color separation**

In `tailwind.config.js`, replace lines 6-23:

```js
colors: {
  bg: {
    primary: '#09090B',
    secondary: '#18181B',
    accent: '#27272A',
  },
  text: {
    primary: '#FAFAFA',
    secondary: '#A1A1AA',
    muted: '#71717A',
  },
  brand: {
    primary: '#0EA5E9',
    secondary: '#8B5CF6',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
  },
},
```

The key changes: `bg-secondary` moves from `#131316` to `#18181B` (zinc-900) and `bg-accent` from `#1A1A1F` to `#27272A` (zinc-800). This creates visible separation between background tiers. `text-primary` moves to `#FAFAFA` for slightly softer white.

- [ ] **Step 2: Update CSS variables to match**

In `src/lib/styles/global.css`, replace lines 11-15:

```css
:root {
	--foreground-rgb: 250, 250, 250;
	--background-start-rgb: 9, 9, 11;
	--background-end-rgb: 24, 24, 27;
}
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.js src/lib/styles/global.css
git commit -m "feat: widen background color separation for better section contrast"
```

---

## Task 4: Create Scroll-Triggered Animation System

**Files:**
- Create: `src/lib/actions/inview.ts`
- Modify: `src/lib/styles/global.css`

- [ ] **Step 1: Create the inview Svelte action**

Create `src/lib/actions/inview.ts`:

```ts
export function inview(node: HTMLElement, options: { threshold?: number; rootMargin?: string; once?: boolean } = {}) {
	const { threshold = 0.15, rootMargin = '0px', once = true } = options;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					node.classList.add('in-view');
					if (once) observer.unobserve(node);
				} else if (!once) {
					node.classList.remove('in-view');
				}
			});
		},
		{ threshold, rootMargin }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.unobserve(node);
		}
	};
}
```

- [ ] **Step 2: Add scroll animation CSS classes to global.css**

In `src/lib/styles/global.css`, replace the existing `.animate-on-scroll` rules (lines 105-114) with:

```css
/* Scroll-triggered animations */
.fade-up {
	opacity: 0;
	transform: translateY(24px);
	transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-up.in-view {
	opacity: 1;
	transform: translateY(0);
}

.stagger-children > .fade-up:nth-child(1) { transition-delay: 0ms; }
.stagger-children > .fade-up:nth-child(2) { transition-delay: 80ms; }
.stagger-children > .fade-up:nth-child(3) { transition-delay: 160ms; }
.stagger-children > .fade-up:nth-child(4) { transition-delay: 240ms; }
.stagger-children > .fade-up:nth-child(5) { transition-delay: 320ms; }
.stagger-children > .fade-up:nth-child(6) { transition-delay: 400ms; }
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/actions/inview.ts src/lib/styles/global.css
git commit -m "feat: add scroll-triggered animation system with IntersectionObserver"
```

---

## Task 5: Fix Hero Section

**Files:**
- Modify: `src/lib/components/sections/Hero.svelte`

- [ ] **Step 1: Add headline fade transition, throttle mousemove, remove grayscale, add image dimensions**

Replace the entire `src/lib/components/sections/Hero.svelte`:

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { personalData } from '$data/personal';
	import { contentData } from '$data/content';

	let currentHeadlineIndex = $state(0);
	let headlineVisible = $state(true);
	let mouseX = $state(0);
	let mouseY = $state(0);
	let rafId: number | null = null;

	onMount(() => {
		const interval = setInterval(() => {
			headlineVisible = false;
			setTimeout(() => {
				currentHeadlineIndex = (currentHeadlineIndex + 1) % contentData.heroHeadlines.length;
				headlineVisible = true;
			}, 400);
		}, 3500);

		return () => {
			clearInterval(interval);
			if (rafId) cancelAnimationFrame(rafId);
		};
	});

	function handleMouseMove(e: MouseEvent) {
		if (rafId) return;
		rafId = requestAnimationFrame(() => {
			mouseX = e.clientX;
			mouseY = e.clientY;
			rafId = null;
		});
	}
</script>

<svelte:window on:mousemove={handleMouseMove} />

<section
	id="home"
	class="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary"
>
	<!-- Gradient Mesh Background -->
	<div class="absolute inset-0 opacity-20">
		<div
			class="absolute top-0 -left-4 w-96 h-96 bg-brand-primary rounded-full mix-blend-multiply filter blur-3xl"
			style="transform: translate({mouseX * 0.02}px, {mouseY * 0.02}px)"
		></div>
		<div
			class="absolute top-0 -right-4 w-96 h-96 bg-brand-secondary rounded-full mix-blend-multiply filter blur-3xl"
			style="transform: translate({mouseX * -0.02}px, {mouseY * -0.02}px)"
		></div>
		<div
			class="absolute -bottom-8 left-20 w-96 h-96 bg-brand-primary/50 rounded-full mix-blend-multiply filter blur-3xl"
			style="transform: translate({mouseX * 0.01}px, {mouseY * 0.01}px)"
		></div>
	</div>

	<!-- Content -->
	<div class="container-custom relative z-10 py-20">
		<div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
			<!-- Left Column: Text Content -->
			<div class="space-y-8">
				<div class="space-y-4">
					<p class="text-brand-primary font-mono text-sm lg:text-base">
						Hi, I'm {personalData.name}
					</p>
					<h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight max-w-xl">
						<span
							class="gradient-text inline-block transition-all duration-400"
							class:opacity-0={!headlineVisible}
							class:translate-y-2={!headlineVisible}
							class:opacity-100={headlineVisible}
							class:translate-y-0={headlineVisible}
						>
							{contentData.heroHeadlines[currentHeadlineIndex]}
						</span>
					</h1>
					<p class="text-lg lg:text-xl text-text-secondary max-w-2xl">
						{personalData.bio.short}
					</p>
				</div>

				<!-- Metrics Bar -->
				<div class="grid grid-cols-3 gap-4">
					<div class="bg-bg-secondary/50 backdrop-blur-sm rounded-lg p-4 border border-brand-primary/10">
						<div class="text-2xl font-bold font-display text-brand-primary">{contentData.metrics.yearsExperience}+</div>
						<div class="text-xs text-text-muted">Years Experience</div>
					</div>
					<div class="bg-bg-secondary/50 backdrop-blur-sm rounded-lg p-4 border border-brand-primary/10">
						<div class="text-2xl font-bold font-display text-brand-primary">{contentData.metrics.productionSystems}</div>
						<div class="text-xs text-text-muted">Production Systems</div>
					</div>
					<div class="bg-bg-secondary/50 backdrop-blur-sm rounded-lg p-4 border border-brand-primary/10">
						<div class="text-lg font-bold font-display text-brand-primary">{contentData.metrics.currentRole}</div>
						<div class="text-xs text-text-muted">{contentData.metrics.availability}</div>
					</div>
				</div>

				<!-- CTAs -->
				<div class="flex flex-col sm:flex-row gap-4">
					<a
						href="#consultation"
						class="px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-brand-primary/50 transition-all duration-300 hover:scale-105 text-center"
					>
						Book a Strategy Call
					</a>
					<a
						href="/case-studies"
						class="px-8 py-4 border-2 border-brand-primary/40 text-text-primary font-semibold rounded-lg hover:border-brand-primary hover:bg-brand-primary/10 transition-all duration-300 text-center"
					>
						View Case Studies
					</a>
				</div>

				<!-- Social Links -->
				<div class="flex items-center space-x-4 pt-4">
					<span class="text-sm text-text-muted">Connect:</span>
					<a
						href={personalData.social.github}
						target="_blank"
						rel="noopener noreferrer"
						class="text-text-secondary hover:text-brand-primary transition-colors"
						aria-label="GitHub"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
						</svg>
					</a>
					<a
						href={personalData.social.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						class="text-text-secondary hover:text-brand-primary transition-colors"
						aria-label="LinkedIn"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
						</svg>
					</a>
					<a
						href={personalData.social.twitter}
						target="_blank"
						rel="noopener noreferrer"
						class="text-text-secondary hover:text-brand-primary transition-colors"
						aria-label="Twitter"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
						</svg>
					</a>
				</div>
			</div>

			<!-- Right Column: Profile Image -->
			<div class="flex justify-center lg:justify-end">
				<div class="relative group">
					<div class="absolute -inset-4 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
					<div class="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-brand-primary/30 hover:border-brand-primary transition-all duration-500">
						<img
							src={personalData.profileImage}
							alt={personalData.name}
							width="384"
							height="384"
							class="w-full h-full object-cover"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Scroll Indicator -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
		<a href="#trust" class="flex flex-col items-center text-text-muted hover:text-brand-primary transition-colors">
			<span class="text-xs mb-2">Scroll Down</span>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
			</svg>
		</a>
	</div>
</section>
```

Key changes:
- Headline fades in/out with opacity + translateY transition instead of instant snap
- `mousemove` throttled with `requestAnimationFrame`
- Removed `animate-pulse` from blobs (static parallax only, reduced opacity to 20%)
- Removed grayscale-to-color hover on profile image
- Added `width`/`height` attributes to prevent CLS
- Metrics bar is now 3-column instead of awkward 2+col-span-2
- Removed `$500` from CTA text (price is in the consultation section)
- Secondary CTA uses subtler border style instead of bright blue outline
- Scroll indicator targets `#trust` (next section) instead of `#about` (10 sections down)
- Added `max-w-xl` on h1 to prevent ultra-wide line lengths

- [ ] **Step 2: Build and verify**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/sections/Hero.svelte
git commit -m "feat: redesign hero — smooth headline transitions, throttled parallax, cleaner layout"
```

---

## Task 6: Add Scroll Animations to TrustIndicators

**Files:**
- Modify: `src/lib/components/sections/TrustIndicators.svelte`

- [ ] **Step 1: Replace inline animations with inview action**

Replace the entire `src/lib/components/sections/TrustIndicators.svelte`:

```svelte
<script lang="ts">
	import { contentData } from '$data/content';
	import { inview } from '$lib/actions/inview';
</script>

<section id="trust" class="py-12 lg:py-16 bg-bg-primary">
	<div class="container-custom">
		<!-- Mobile: Horizontal Scroll -->
		<div class="flex lg:hidden overflow-x-auto gap-4 pb-4 snap-x snap-mandatory -mx-4 px-4 scrollbar-hide" use:inview>
			{#each contentData.trustIndicators as indicator}
				<div class="flex-shrink-0 w-80 snap-center">
					<div class="bg-bg-secondary/50 backdrop-blur-sm rounded-lg p-6 border border-brand-primary/10 hover:border-brand-primary/30 transition-all h-full">
						<p class="text-base text-text-primary font-medium">
							{indicator}
						</p>
					</div>
				</div>
			{/each}
			<!-- Scroll hint -->
			<div class="flex-shrink-0 w-8 snap-center flex items-center">
				<div class="text-text-muted text-xs rotate-90 whitespace-nowrap">scroll</div>
			</div>
		</div>

		<!-- Desktop: Grid -->
		<div class="hidden lg:grid lg:grid-cols-3 gap-6 stagger-children" use:inview>
			{#each contentData.trustIndicators as indicator}
				<div
					class="fade-up bg-bg-secondary/50 backdrop-blur-sm rounded-lg p-6 border border-brand-primary/10 hover:border-brand-primary/30 transition-all hover:scale-105 cursor-default"
				>
					<p class="text-base text-text-primary font-medium">
						{indicator}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
</style>
```

Key changes:
- Replaced inline `slideUp` animation with `inview` action + `fade-up` CSS class
- Animations now trigger when section scrolls into view
- Added a small "scroll" hint on mobile so users know the row is scrollable

- [ ] **Step 2: Build and verify**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/sections/TrustIndicators.svelte
git commit -m "feat: scroll-triggered animations on trust indicators, mobile scroll hint"
```

---

## Task 7: Fix ProblemSolver Solution Spoiler

**Files:**
- Modify: `src/lib/components/sections/ProblemSolver.svelte:35-39`

- [ ] **Step 1: Remove the preview that spoils the answer**

In `src/lib/components/sections/ProblemSolver.svelte`, replace lines 33-39:

```svelte
<!-- OLD -->
<h3 class="text-lg font-semibold text-text-primary mb-1">
	{problem.problem}
</h3>
{#if openIndex !== i}
	<p class="text-sm text-text-muted line-clamp-1">
		{problem.solution}
	</p>
{/if}

<!-- NEW -->
<h3 class="text-lg font-semibold text-text-primary">
	{problem.problem}
</h3>
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/components/sections/ProblemSolver.svelte
git commit -m "fix: remove solution preview spoiler from ProblemSolver accordion"
```

---

## Task 8: Replace Skill Percentage Bars with Grouped Tags

**Files:**
- Modify: `src/lib/components/sections/ExpertiseVisualization.svelte`

- [ ] **Step 1: Replace skill bars with a clean tag grid**

Replace the entire `src/lib/components/sections/ExpertiseVisualization.svelte`:

```svelte
<script lang="ts">
	import { expertiseCategories } from '$data/expertise';
	import { inview } from '$lib/actions/inview';
</script>

<section id="skills" class="py-20 lg:py-24 bg-bg-secondary/30">
	<div class="container-custom">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold gradient-text mb-4">
				Technical Expertise
			</h2>
			<p class="text-lg text-text-secondary max-w-2xl mx-auto">
				8 years building production systems across AI, Full-Stack, and Infrastructure
			</p>
		</div>

		<div class="space-y-8 stagger-children" use:inview>
			{#each expertiseCategories as category}
				<div class="fade-up bg-bg-secondary rounded-lg p-6 lg:p-8 border border-bg-accent hover:border-brand-primary/30 transition-colors">
					<div class="flex items-center justify-between mb-6">
						<h3 class="text-xl font-display font-bold text-brand-primary">
							{category.name}
						</h3>
					</div>
					<div class="flex flex-wrap gap-2">
						{#each category.skills as skill}
							<span
								class="px-3 py-1.5 bg-bg-accent text-sm font-mono text-text-secondary rounded-md border border-bg-accent hover:border-brand-primary/40 hover:text-brand-primary transition-colors cursor-default"
								title="{skill.years} years, {skill.projects} projects"
							>
								{skill.name}
								<span class="text-text-muted text-xs ml-1">{skill.years}y</span>
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
```

Key changes:
- Removed percentage bars entirely — replaced with compact tag pills
- Each tag shows skill name + years of experience (on hover: full detail via `title`)
- Drastically reduces visual noise: ~33 individual progress bars become a scannable tag cloud
- Scroll-triggered fade-up animation

- [ ] **Step 2: Build and verify**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/sections/ExpertiseVisualization.svelte
git commit -m "feat: replace skill percentage bars with tag grid — less noise, more credible"
```

---

## Task 9: Fix Experience Timeline & Stale Copy

**Files:**
- Modify: `src/lib/components/sections/Experience.svelte`

- [ ] **Step 1: Fix timeline layout at md breakpoint and update stats**

In `src/lib/components/sections/Experience.svelte`, make these changes:

Replace line 36 (the 100% stat):
```svelte
<!-- OLD -->
<div class="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">100%</div>
<div class="text-sm text-text-muted">Client Satisfaction</div>
<!-- NEW -->
<div class="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">4.9/5</div>
<div class="text-sm text-text-muted">Client Rating</div>
```

Replace line 56 (fix the alternating layout bug — remove col-start-2 which causes empty gap):
```svelte
<!-- OLD -->
<div class="md:grid md:grid-cols-2 md:gap-8 {index % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:col-start-2'}">
<!-- NEW -->
<div class="md:w-[calc(50%-1rem)] {index % 2 === 0 ? 'md:mr-auto md:pr-4' : 'md:ml-auto md:pl-4'}">
```

- [ ] **Step 2: Build and verify**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/sections/Experience.svelte
git commit -m "fix: experience timeline layout at md breakpoint, replace 100% stat with 4.9/5"
```

---

## Task 10: Fix SocialProof — Pause-on-Hover, Accessible Carousel, Realistic Stats

**Files:**
- Modify: `src/lib/components/sections/SocialProof.svelte`

- [ ] **Step 1: Add pause-on-hover and aria-live**

In `src/lib/components/sections/SocialProof.svelte`, add hover pause logic. Replace lines 1-27:

```svelte
<script lang="ts">
	import { testimonials } from '$data/testimonials';
	import Card from '$components/ui/Card.svelte';
	import { onMount } from 'svelte';

	let currentIndex = $state(0);
	let intervalId: number | undefined;
	let paused = $state(false);

	function nextTestimonial() {
		currentIndex = (currentIndex + 1) % testimonials.length;
	}

	function prevTestimonial() {
		currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
	}

	function startAutoRotate() {
		stopAutoRotate();
		intervalId = window.setInterval(() => {
			if (!paused) nextTestimonial();
		}, 8000);
	}

	function stopAutoRotate() {
		if (intervalId) clearInterval(intervalId);
	}

	onMount(() => {
		startAutoRotate();
		return stopAutoRotate;
	});
</script>
```

On the carousel Card (line 42), add mouse handlers:

```svelte
<Card class="p-8 lg:p-12 relative" on:mouseenter={() => paused = true} on:mouseleave={() => paused = false}>
```

Note: If the `Card` component doesn't forward events, add the handlers to a wrapper div instead:

```svelte
<!-- Wrap the Card content -->
<div
	class="max-w-4xl mx-auto mb-16"
	role="region"
	aria-label="Client testimonials"
	aria-live="polite"
	on:mouseenter={() => paused = true}
	on:mouseleave={() => paused = false}
>
```

- [ ] **Step 2: Fix the 100% stats**

Replace lines 117-134 (stats grid):

```svelte
<div class="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
	<div class="text-center p-6 bg-bg-secondary rounded-lg border border-bg-accent">
		<div class="text-4xl font-bold font-display text-brand-primary mb-2">92%</div>
		<div class="text-sm text-text-muted">Average Cost Reduction</div>
	</div>
	<div class="text-center p-6 bg-bg-secondary rounded-lg border border-bg-accent">
		<div class="text-4xl font-bold font-display text-brand-primary mb-2">3-8</div>
		<div class="text-sm text-text-muted">Weeks to Ship</div>
	</div>
	<div class="text-center p-6 bg-bg-secondary rounded-lg border border-bg-accent">
		<div class="text-4xl font-bold font-display text-brand-primary mb-2">99.9%</div>
		<div class="text-sm text-text-muted">Uptime Track Record</div>
	</div>
	<div class="text-center p-6 bg-bg-secondary rounded-lg border border-bg-accent">
		<div class="text-4xl font-bold font-display text-brand-primary mb-2">8+</div>
		<div class="text-sm text-text-muted">Years Experience</div>
	</div>
</div>
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/components/sections/SocialProof.svelte
git commit -m "fix: testimonial carousel pause-on-hover, aria-live, realistic stats"
```

---

## Task 11: Fix ContentAuthority GitHub Fallback

**Files:**
- Modify: `src/lib/components/sections/ContentAuthority.svelte:48-118`

- [ ] **Step 1: Add fallback UI when GitHub data fails**

In `src/lib/components/sections/ContentAuthority.svelte`, replace lines 49-118 (the `{#if githubData}` block):

```svelte
{#if githubData}
	<!-- existing GitHub panel code stays the same -->
{:else}
	<div class="bg-bg-secondary rounded-lg p-6 lg:p-8 border border-bg-accent flex flex-col items-center justify-center text-center">
		<svg class="w-12 h-12 text-text-muted mb-4" fill="currentColor" viewBox="0 0 24 24">
			<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
		</svg>
		<h3 class="text-xl font-display font-bold text-text-primary mb-2">Open Source Work</h3>
		<p class="text-sm text-text-muted mb-4">Check out my repositories and contributions on GitHub.</p>
		<a
			href={personalData.social.github}
			target="_blank"
			rel="noopener noreferrer"
			class="px-6 py-2 border border-brand-primary text-brand-primary rounded-lg hover:bg-brand-primary hover:text-white transition-all font-semibold"
		>
			View on GitHub
		</a>
	</div>
{/if}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/components/sections/ContentAuthority.svelte
git commit -m "fix: add GitHub fallback UI when API fails"
```

---

## Task 12: Fix MobileMenu Hardcoded Social URLs

**Files:**
- Modify: `src/lib/components/layout/MobileMenu.svelte:79-112`

- [ ] **Step 1: Import personalData and use dynamic URLs**

In `src/lib/components/layout/MobileMenu.svelte`, add to the script imports (after line 3):

```ts
import { personalData } from '$data/personal';
```

Then replace the hardcoded social URLs (lines 79-112). Change each `href`:

```svelte
<!-- GitHub: change href -->
href={personalData.social.github}

<!-- LinkedIn: change href -->
href={personalData.social.linkedin}

<!-- Twitter: change href -->
href={personalData.social.twitter}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/components/layout/MobileMenu.svelte
git commit -m "fix: use personalData for mobile menu social URLs instead of hardcoded values"
```

---

## Task 13: Add Active Nav State & Skip-to-Content Link

**Files:**
- Modify: `src/lib/components/layout/Navigation.svelte`
- Modify: `src/lib/styles/global.css`

- [ ] **Step 1: Add skip-to-content CSS to global.css**

In `src/lib/styles/global.css`, add inside `@layer components` (after the `.gradient-border::before` block, around line 85):

```css
.skip-to-content {
	@apply absolute -top-12 left-4 z-[100] px-4 py-2 bg-brand-primary text-white font-semibold rounded-b-lg;
	transition: top 0.2s ease;
}

.skip-to-content:focus {
	@apply top-0;
}
```

Also add focus-visible styles in `@layer base` (after the body block):

```css
/* Focus styles for keyboard navigation */
a:focus-visible,
button:focus-visible {
	@apply outline-2 outline-offset-2 outline-brand-primary;
	outline-style: solid;
}
```

- [ ] **Step 2: Add skip link and active state to Navigation.svelte**

In `src/lib/components/layout/Navigation.svelte`, add the skip link right before the `<nav>` tag:

```svelte
<a href="#main-content" class="skip-to-content">Skip to content</a>
```

For the active nav state, add a `page` import and active class. Add to the `<script>`:

```ts
import { page } from '$app/stores';
```

Then update the nav link (around line 82-86):

```svelte
<a
	href={link.href}
	onclick={(e) => handleNavClick(e, link)}
	class="text-text-secondary hover:text-brand-primary transition-colors duration-200 font-medium relative group"
	class:text-brand-primary={$page.url.pathname === link.href}
>
	{link.label}
	<span
		class="absolute -bottom-1 left-0 h-0.5 bg-brand-primary transition-all duration-300"
		class:w-full={$page.url.pathname === link.href}
		class:w-0={$page.url.pathname !== link.href}
		class:group-hover:w-full={$page.url.pathname !== link.href}
	></span>
</a>
```

Also ensure the main content area has the `id="main-content"` target. This should be added to `+layout.svelte` on the `<main>` or `<slot>` wrapper.

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/components/layout/Navigation.svelte src/lib/styles/global.css
git commit -m "feat: add skip-to-content link, active nav state, focus-visible styles"
```

---

## Task 14: Vary Section Spacing & Reduce Gradient Text Overuse

**Files:**
- Modify: Multiple section components (section padding classes)
- Modify: Select section headings to remove `gradient-text`

- [ ] **Step 1: Vary section padding across the homepage**

The goal is to break the monotone `py-20 lg:py-24` rhythm. Apply these targeted changes:

In `TrustIndicators.svelte`: keep `py-12 lg:py-16` (already tighter — good)

In `ProblemSolver.svelte` line 12: change to `py-16 lg:py-20` (slightly tighter)

In `ConsultationOfferings.svelte` line 8: change to `py-24 lg:py-32` (more breathing room — this is a conversion section)

In `SocialProof.svelte` line 29: change to `py-24 lg:py-32` (social proof needs room to breathe)

In `Contact.svelte`: change to `py-24 lg:py-32` (final CTA section — generous space)

Leave `Experience`, `ExpertiseVisualization`, `FeaturedProjects`, `CaseStudies`, `ContentAuthority`, `Differentiators` at `py-20 lg:py-24`.

- [ ] **Step 2: Reduce gradient-text to key headings only**

Remove `gradient-text` from these section h2 headings, replacing with `text-text-primary`:

- `ExpertiseVisualization.svelte` h2 — change to `text-text-primary`
- `ContentAuthority.svelte` h2 — change to `text-text-primary`
- `Experience.svelte` h2 — change to `text-text-primary`

Keep `gradient-text` on: Hero h1, ProblemSolver h2, ConsultationOfferings h2, SocialProof h2, Contact h2. These are the high-impact conversion moments.

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/components/sections/ProblemSolver.svelte src/lib/components/sections/ConsultationOfferings.svelte src/lib/components/sections/SocialProof.svelte src/lib/components/sections/ExpertiseVisualization.svelte src/lib/components/sections/ContentAuthority.svelte src/lib/components/sections/Experience.svelte
git commit -m "feat: vary section spacing, reduce gradient-text to key conversion headings only"
```

---

## Task 15: Final Build Verification

**Files:** None (verification only)

- [ ] **Step 1: Full build**

```bash
npm run build
```
Expected: Build succeeds with no errors.

- [ ] **Step 2: Run type check**

```bash
npm run check
```
Expected: No type errors.

- [ ] **Step 3: Preview and spot-check**

```bash
npm run preview
```

Verify:
- Clash Display renders on all `font-display` headings
- Hero headline fades smoothly between values
- Trust indicators animate on scroll (not on page load)
- Skill bars are gone, replaced by tag pills
- Experience timeline alternates correctly at md breakpoint
- Testimonial carousel pauses on hover
- Writing page source badges are styled (purple/green)
- Contact form text is visible on dark background
- "December 2025" is gone
- Prices consistently show $500 for Quick Fix
- No `next.config.js` in project root

- [ ] **Step 4: Final commit if any cleanup needed**

```bash
git add -A
git commit -m "chore: final cleanup after UI/UX optimization pass"
```
