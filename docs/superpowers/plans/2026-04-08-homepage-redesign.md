# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the homepage from 13 sections to 5 focused sections using progressive reveal storytelling with surgical precision aesthetics.

**Architecture:** Replace the current section-heavy homepage with a narrative arc: Hero (claim) → Case Studies with sticky scroll (proof) → Expertise (depth) → Social Proof (validation) → CTA + Contact (action). New components built from scratch. Existing components remain in codebase for use on dedicated subpages. Navigation simplified, footer minimalized.

**Tech Stack:** SvelteKit, Svelte 5 (runes), Tailwind CSS, existing `inview` action, IntersectionObserver for sticky scroll triggers, requestAnimationFrame for count-up animations.

**Spec:** `docs/superpowers/specs/2026-04-08-homepage-redesign-design.md`

---

## File Structure

### New Files
- `src/lib/components/sections/HeroRedesign.svelte` — New hero with single statement, count-up metrics, single reveal animation
- `src/lib/components/sections/FeaturedCaseStudiesSticky.svelte` — Sticky scroll case study section with crossfade
- `src/lib/components/sections/ExpertiseCompact.svelte` — Minimal 4-domain expertise cards
- `src/lib/components/sections/SocialProofMinimal.svelte` — 1-2 pull-quote testimonials
- `src/lib/components/sections/CTAContact.svelte` — Direct CTA with contact links
- `src/lib/components/layout/FooterMinimal.svelte` — Single-line minimal footer
- `src/lib/actions/countup.ts` — Count-up animation action using requestAnimationFrame + IntersectionObserver

### Modified Files
- `src/routes/+page.svelte` — Replace 13 section imports with 5 new ones
- `src/routes/+layout.svelte` — Swap Footer for FooterMinimal on homepage (conditional)
- `src/lib/stores/navigation.ts` — Simplify nav links to Work, About, Contact
- `src/lib/components/layout/Navigation.svelte` — Remove "Book a Call" gradient CTA button, simplify links
- `src/lib/styles/global.css` — Add `.count-up` utility class, sticky scroll helpers

### Unchanged Files (remain for subpages)
All existing section components stay in `src/lib/components/sections/` — they're used by `/about`, `/projects`, `/case-studies`, etc.

---

## Task 1: Count-Up Animation Action

**Files:**
- Create: `src/lib/actions/countup.ts`

- [ ] **Step 1: Create the count-up action**

```ts
// src/lib/actions/countup.ts
export function countup(
	node: HTMLElement,
	options: { target: number; duration?: number; suffix?: string; prefix?: string; delay?: number }
) {
	const { target, duration = 1200, suffix = '', prefix = '', delay = 0 } = options;

	let hasAnimated = false;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && !hasAnimated) {
					hasAnimated = true;
					observer.unobserve(node);
					setTimeout(() => animate(), delay);
				}
			});
		},
		{ threshold: 0.5 }
	);

	function animate() {
		const start = performance.now();

		function step(now: number) {
			const elapsed = now - start;
			const progress = Math.min(elapsed / duration, 1);
			// Ease-out cubic
			const eased = 1 - Math.pow(1 - progress, 3);
			const current = Math.round(eased * target);
			node.textContent = `${prefix}${current}${suffix}`;

			if (progress < 1) {
				requestAnimationFrame(step);
			} else {
				node.textContent = `${prefix}${target}${suffix}`;
			}
		}

		// Respect reduced motion
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			node.textContent = `${prefix}${target}${suffix}`;
			return;
		}

		requestAnimationFrame(step);
	}

	// Set initial value
	node.textContent = `${prefix}0${suffix}`;
	observer.observe(node);

	return {
		destroy() {
			observer.unobserve(node);
		}
	};
}
```

- [ ] **Step 2: Verify the file compiles**

Run: `cd /Users/codefred/Documents/codefred.dev && npx svelte-check --threshold error 2>&1 | head -20`
Expected: No errors related to countup.ts

- [ ] **Step 3: Commit**

```bash
git add src/lib/actions/countup.ts
git commit -m "feat: add count-up animation action with IntersectionObserver"
```

---

## Task 2: Hero Redesign

**Files:**
- Create: `src/lib/components/sections/HeroRedesign.svelte`

- [ ] **Step 1: Create the hero component**

```svelte
<!-- src/lib/components/sections/HeroRedesign.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { countup } from '$lib/actions/countup';

	let visible = $state(false);

	onMount(() => {
		// Trigger fade-in on load
		requestAnimationFrame(() => {
			visible = true;
		});
	});
</script>

<section
	id="home"
	class="relative min-h-screen flex items-center justify-center bg-bg-primary"
>
	<!-- Subtle radial gradient background -->
	<div
		class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#18181b_0%,_#09090b_70%)]"
	></div>

	<!-- Content -->
	<div class="container-custom relative z-10 text-center py-20">
		<div
			class="max-w-3xl mx-auto space-y-8 transition-all duration-500 ease-out"
			class:opacity-0={!visible}
			class:translate-y-4={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
		>
			<!-- Label -->
			<p class="text-brand-primary font-mono text-sm tracking-[0.2em] uppercase">
				AI Systems Architect
			</p>

			<!-- Headline -->
			<h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-text-primary">
				I turn expensive AI problems
				<br />
				into <span class="gradient-text">efficient systems</span>
			</h1>

			<!-- Metrics -->
			<div class="flex justify-center gap-12 md:gap-16 pt-4">
				<div class="text-center">
					<div
						class="text-3xl md:text-4xl font-bold font-display text-brand-primary"
						use:countup={{ target: 92, suffix: '%', delay: 300 }}
					></div>
					<div class="text-xs text-text-muted mt-1">Cost Reduced</div>
				</div>
				<div class="text-center">
					<div
						class="text-3xl md:text-4xl font-bold font-display text-brand-secondary"
						use:countup={{ target: 2, prefix: '$', suffix: 'M+', delay: 400 }}
					></div>
					<div class="text-xs text-text-muted mt-1">Saved</div>
				</div>
				<div class="text-center">
					<div
						class="text-3xl md:text-4xl font-bold font-display text-brand-success"
						use:countup={{ target: 15, suffix: '+', delay: 500 }}
					></div>
					<div class="text-xs text-text-muted mt-1">Systems Built</div>
				</div>
			</div>

			<!-- CTAs -->
			<div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
				<a
					href="#case-studies"
					class="px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg hover:brightness-110 transition-all duration-300 text-center"
				>
					See my work
				</a>
				<a
					href="#contact"
					class="text-text-secondary hover:text-brand-primary transition-colors text-sm"
				>
					or get in touch
				</a>
			</div>
		</div>
	</div>
</section>
```

- [ ] **Step 2: Verify the file compiles**

Run: `cd /Users/codefred/Documents/codefred.dev && npx svelte-check --threshold error 2>&1 | head -20`
Expected: No errors related to HeroRedesign.svelte

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/sections/HeroRedesign.svelte
git commit -m "feat: add redesigned hero with single statement and count-up metrics"
```

---

## Task 3: Featured Case Studies with Sticky Scroll

**Files:**
- Create: `src/lib/components/sections/FeaturedCaseStudiesSticky.svelte`

- [ ] **Step 1: Create the sticky case studies component**

```svelte
<!-- src/lib/components/sections/FeaturedCaseStudiesSticky.svelte -->
<script lang="ts">
	import { inview } from '$lib/actions/inview';
	import { countup } from '$lib/actions/countup';
	import { caseStudies } from '$data/case-studies';

	// Pick the 3 strongest case studies for the homepage
	const featured = [
		caseStudies.find((cs) => cs.slug === 'cost-reduction')!,
		caseStudies.find((cs) => cs.slug === 'retail-security')!,
		caseStudies.find((cs) => cs.slug === 'semantic-search')!
	];

	// Hero metric config per case study
	const metricConfig: Record<string, { target: number; suffix: string; prefix: string; label: string }> = {
		'cost-reduction': { target: 92, suffix: '%', prefix: '', label: 'cost reduction' },
		'retail-security': { target: 97, suffix: '%', prefix: '', label: 'threat detection accuracy' },
		'semantic-search': { target: 100, suffix: 'ms', prefix: '<', label: 'p99 latency' }
	};

	// Case study narrative content (problem → approach → outcome)
	const narratives: Record<string, { problem: string; approach: string; outcome: string }> = {
		'cost-reduction': {
			problem:
				'A Series B FinTech startup was burning $60,000/month on OpenAI API calls. Their AI features worked but the unit economics were unsustainable — every new user made the problem worse.',
			approach:
				'I implemented a semantic caching layer that recognized when similar questions had already been answered, and built a "Model Routing" architecture that sent simple tasks to cheaper models while reserving GPT-4 for complex reasoning.',
			outcome:
				'Monthly AI spend dropped from $60,000 to $4,800. Response times actually improved by 400ms because cached responses are instant. The system is now faster, smarter about model selection, and 92% cheaper.'
		},
		'retail-security': {
			problem:
				'A multi-location retail chain needed real-time threat detection across 50+ cameras simultaneously. Existing solutions couldn\'t handle the throughput without dropping frames or missing events.',
			approach:
				'I architected an ML pipeline that processes 30fps video streams in parallel, using a tiered detection system — fast lightweight models for initial screening, accurate models for confirmation. Redis handles inter-camera event correlation.',
			outcome:
				'97% threat detection accuracy across all cameras at full frame rate. The system prevented an estimated $2M in annual losses and runs reliably 24/7 with automated alerting.'
		},
		'semantic-search': {
			problem:
				'An international knowledge platform needed search that understood meaning, not just keywords — across Spanish and English documents. Traditional search was missing relevant results constantly.',
			approach:
				'I built a vector search pipeline using multilingual embeddings, with Pinecone for similarity search and a PostgreSQL hybrid layer for metadata filtering. Query preprocessing handles language detection and expansion automatically.',
			outcome:
				'Sub-100ms p99 latency across 1M+ documents in two languages. Lawyers using the system spend 67% less time searching and find cases they would have missed with keyword search.'
		}
	};

	// Mobile expand state
	let expandedMobile: string | null = $state(null);

	function toggleMobileExpand(slug: string) {
		expandedMobile = expandedMobile === slug ? null : slug;
	}
</script>

<section id="case-studies" class="py-24 md:py-32 bg-bg-primary">
	<div class="container-custom">
		<!-- Desktop: Sticky scroll layout -->
		<div class="hidden md:block">
			{#each featured as study, i}
				{@const config = metricConfig[study.slug]}
				{@const narrative = narratives[study.slug]}
				<div
					class="flex gap-16 min-h-[80vh] {i < featured.length - 1 ? 'mb-24 pb-24 border-b border-bg-accent' : ''}"
					use:inview={{ threshold: 0.1 }}
				>
					<!-- Sticky left panel -->
					<div class="w-[40%] flex-shrink-0">
						<div class="sticky top-32 space-y-4 fade-up">
							<p class="text-brand-primary font-mono text-xs tracking-[0.15em] uppercase">
								Case Study
							</p>
							<h3 class="text-xl font-display font-semibold text-text-primary">
								{study.title}
							</h3>
							<div
								class="text-5xl lg:text-6xl font-bold font-display text-brand-success"
								use:countup={{ target: config.target, suffix: config.suffix, prefix: config.prefix, delay: 200 }}
							></div>
							<p class="text-sm text-text-muted">{config.label}</p>
							<a
								href="/case-studies/{study.slug}"
								class="inline-block text-sm text-brand-primary hover:underline mt-4"
							>
								Read full case study &rarr;
							</a>
						</div>
					</div>

					<!-- Scrolling right content -->
					<div class="w-[60%] border-l border-bg-accent pl-16 space-y-12 py-8">
						<div class="fade-up" use:inview={{ threshold: 0.3 }}>
							<p class="text-xs text-text-muted uppercase tracking-wider mb-3">The Problem</p>
							<p class="text-text-secondary leading-relaxed">{narrative.problem}</p>
						</div>
						<div class="fade-up" use:inview={{ threshold: 0.3 }}>
							<p class="text-xs text-text-muted uppercase tracking-wider mb-3">The Approach</p>
							<p class="text-text-secondary leading-relaxed">{narrative.approach}</p>
						</div>
						<div class="fade-up" use:inview={{ threshold: 0.3 }}>
							<p class="text-xs text-text-muted uppercase tracking-wider mb-3">The Outcome</p>
							<p class="text-text-secondary leading-relaxed">{narrative.outcome}</p>
						</div>
						<!-- Tech stack tags -->
						<div class="fade-up flex flex-wrap gap-2" use:inview={{ threshold: 0.3 }}>
							{#each study.techStack as tech}
								<span class="text-xs text-text-muted bg-bg-accent/50 px-3 py-1 rounded-full">
									{tech}
								</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Mobile: Expandable cards -->
		<div class="md:hidden space-y-6">
			{#each featured as study}
				{@const config = metricConfig[study.slug]}
				{@const narrative = narratives[study.slug]}
				{@const isExpanded = expandedMobile === study.slug}
				<div
					class="fade-up"
					use:inview
				>
					<button
						class="w-full text-left p-6 rounded-lg border border-bg-accent bg-bg-secondary/30 transition-colors"
						class:border-brand-primary/30={isExpanded}
						onclick={() => toggleMobileExpand(study.slug)}
					>
						<div class="flex items-start justify-between gap-4">
							<div class="space-y-2">
								<p class="text-brand-primary font-mono text-xs tracking-wider uppercase">Case Study</p>
								<h3 class="text-lg font-display font-semibold text-text-primary">{study.title}</h3>
							</div>
							<div class="text-right flex-shrink-0">
								<div class="text-2xl font-bold font-display text-brand-success">
									{config.prefix}{config.target}{config.suffix}
								</div>
								<div class="text-xs text-text-muted">{config.label}</div>
							</div>
						</div>

						{#if isExpanded}
							<div class="mt-6 space-y-6 border-t border-bg-accent pt-6">
								<div>
									<p class="text-xs text-text-muted uppercase tracking-wider mb-2">The Problem</p>
									<p class="text-sm text-text-secondary leading-relaxed">{narrative.problem}</p>
								</div>
								<div>
									<p class="text-xs text-text-muted uppercase tracking-wider mb-2">The Approach</p>
									<p class="text-sm text-text-secondary leading-relaxed">{narrative.approach}</p>
								</div>
								<div>
									<p class="text-xs text-text-muted uppercase tracking-wider mb-2">The Outcome</p>
									<p class="text-sm text-text-secondary leading-relaxed">{narrative.outcome}</p>
								</div>
								<div class="flex flex-wrap gap-2">
									{#each study.techStack as tech}
										<span class="text-xs text-text-muted bg-bg-accent/50 px-2 py-0.5 rounded-full">{tech}</span>
									{/each}
								</div>
								<a
									href="/case-studies/{study.slug}"
									class="inline-block text-sm text-brand-primary hover:underline"
								>
									Read full case study &rarr;
								</a>
							</div>
						{/if}
					</button>
				</div>
			{/each}
		</div>

		<!-- See all link -->
		<div class="text-center mt-16 fade-up" use:inview>
			<a
				href="/case-studies"
				class="text-sm text-text-secondary hover:text-brand-primary transition-colors"
			>
				See all case studies &rarr;
			</a>
		</div>
	</div>
</section>
```

- [ ] **Step 2: Verify the file compiles**

Run: `cd /Users/codefred/Documents/codefred.dev && npx svelte-check --threshold error 2>&1 | head -20`
Expected: No errors related to FeaturedCaseStudiesSticky.svelte

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/sections/FeaturedCaseStudiesSticky.svelte
git commit -m "feat: add sticky scroll case studies section with mobile expand"
```

---

## Task 4: Compact Expertise Section

**Files:**
- Create: `src/lib/components/sections/ExpertiseCompact.svelte`

- [ ] **Step 1: Create the expertise component**

```svelte
<!-- src/lib/components/sections/ExpertiseCompact.svelte -->
<script lang="ts">
	import { inview } from '$lib/actions/inview';

	const domains = [
		{
			name: 'AI & Machine Learning',
			description: 'LLMs, computer vision, vector search, model optimization',
			tags: ['OpenAI', 'TensorFlow', 'Pinecone', 'HuggingFace']
		},
		{
			name: 'Backend Architecture',
			description: 'High-throughput APIs, real-time systems, data pipelines',
			tags: ['Python', 'FastAPI', 'Node.js', 'PostgreSQL']
		},
		{
			name: 'Data Systems',
			description: 'Search infrastructure, caching layers, event streaming',
			tags: ['Redis', 'MongoDB', 'Vector DBs', 'SQL']
		},
		{
			name: 'Cloud & Infrastructure',
			description: 'Container orchestration, CI/CD, monitoring, cost optimization',
			tags: ['AWS', 'Docker', 'Kubernetes', 'Nginx']
		}
	];
</script>

<section id="expertise" class="py-24 md:py-32 bg-bg-primary">
	<div class="container-custom">
		<h2
			class="text-lg text-text-secondary font-display mb-12 fade-up"
			use:inview
		>
			What I work with
		</h2>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 stagger-children">
			{#each domains as domain, i}
				<div class="space-y-3 fade-up" use:inview={{ threshold: 0.2 }}>
					<h3 class="text-base font-semibold text-text-primary">
						{domain.name}
					</h3>
					<p class="text-sm text-text-muted leading-relaxed">
						{domain.description}
					</p>
					<div class="flex flex-wrap gap-2 pt-1">
						{#each domain.tags as tag}
							<span class="text-xs text-text-muted tracking-wide">
								{tag}
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
```

- [ ] **Step 2: Verify the file compiles**

Run: `cd /Users/codefred/Documents/codefred.dev && npx svelte-check --threshold error 2>&1 | head -20`
Expected: No errors related to ExpertiseCompact.svelte

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/sections/ExpertiseCompact.svelte
git commit -m "feat: add compact expertise section with domain cards"
```

---

## Task 5: Minimal Social Proof Section

**Files:**
- Create: `src/lib/components/sections/SocialProofMinimal.svelte`

- [ ] **Step 1: Create the social proof component**

```svelte
<!-- src/lib/components/sections/SocialProofMinimal.svelte -->
<script lang="ts">
	import { inview } from '$lib/actions/inview';
	import { testimonials } from '$data/testimonials';

	// Pick the 2 strongest testimonials — the CTO and the Product Lead
	const featured = [
		testimonials.find((t) => t.id === '3')!, // James K., CTO
		testimonials.find((t) => t.id === '4')! // Sarah M., Product Lead
	];
</script>

<section id="social-proof" class="py-24 md:py-32 bg-bg-primary">
	<div class="container-custom max-w-3xl">
		<div class="border-t border-bg-accent pt-16 space-y-16">
			{#each featured as testimonial}
				<div class="fade-up" use:inview>
					<blockquote class="text-lg md:text-xl text-text-primary leading-relaxed font-light">
						"{testimonial.content}"
					</blockquote>
					<div class="mt-6">
						<span class="text-brand-primary text-sm font-medium">{testimonial.author}</span>
						<span class="text-text-muted text-sm">&nbsp;&mdash;&nbsp;{testimonial.role}, {testimonial.company}</span>
					</div>
				</div>
			{/each}
		</div>
		<div class="border-t border-bg-accent mt-16"></div>
	</div>
</section>
```

- [ ] **Step 2: Verify the file compiles**

Run: `cd /Users/codefred/Documents/codefred.dev && npx svelte-check --threshold error 2>&1 | head -20`
Expected: No errors related to SocialProofMinimal.svelte

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/sections/SocialProofMinimal.svelte
git commit -m "feat: add minimal pull-quote social proof section"
```

---

## Task 6: CTA + Contact Section

**Files:**
- Create: `src/lib/components/sections/CTAContact.svelte`

- [ ] **Step 1: Create the CTA section**

```svelte
<!-- src/lib/components/sections/CTAContact.svelte -->
<script lang="ts">
	import { inview } from '$lib/actions/inview';
	import { personalData } from '$data/personal';
</script>

<section id="contact" class="py-32 md:py-40 bg-bg-primary">
	<div class="container-custom text-center fade-up" use:inview>
		<div class="max-w-xl mx-auto space-y-6">
			<h2 class="text-2xl md:text-3xl font-display font-semibold text-text-primary">
				Let's solve your problem
			</h2>
			<p class="text-text-secondary">
				I'm currently available for consulting engagements.
			</p>
			<div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
				<a
					href="mailto:{personalData.email}"
					class="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg hover:brightness-110 transition-all duration-300 text-center"
				>
					Get in touch
				</a>
				<a
					href="/book"
					class="text-text-secondary hover:text-brand-primary transition-colors text-sm"
				>
					or book a call
				</a>
			</div>
			<p class="text-xs text-text-muted pt-4">
				{personalData.email}
			</p>
		</div>
	</div>
</section>
```

- [ ] **Step 2: Verify the file compiles**

Run: `cd /Users/codefred/Documents/codefred.dev && npx svelte-check --threshold error 2>&1 | head -20`
Expected: No errors related to CTAContact.svelte

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/sections/CTAContact.svelte
git commit -m "feat: add CTA + contact section"
```

---

## Task 7: Minimal Footer

**Files:**
- Create: `src/lib/components/layout/FooterMinimal.svelte`

- [ ] **Step 1: Create the minimal footer**

```svelte
<!-- src/lib/components/layout/FooterMinimal.svelte -->
<script lang="ts">
	import { personalData } from '$data/personal';

	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{ label: 'GitHub', href: personalData.social.github, icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
		{ label: 'LinkedIn', href: personalData.social.linkedin, icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
		{ label: 'Twitter', href: personalData.social.twitter, icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' }
	];
</script>

<footer class="border-t border-bg-accent py-8 bg-bg-primary">
	<div class="container-custom">
		<div class="flex flex-col sm:flex-row items-center justify-between gap-4">
			<p class="text-sm text-text-muted">
				&copy; {currentYear} {personalData.name}
			</p>
			<div class="flex items-center gap-4">
				{#each socialLinks as link}
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						class="text-text-muted hover:text-brand-primary transition-colors"
						aria-label={link.label}
					>
						<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
							<path d={link.icon} />
						</svg>
					</a>
				{/each}
			</div>
		</div>
	</div>
</footer>
```

- [ ] **Step 2: Verify the file compiles**

Run: `cd /Users/codefred/Documents/codefred.dev && npx svelte-check --threshold error 2>&1 | head -20`
Expected: No errors related to FooterMinimal.svelte

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/layout/FooterMinimal.svelte
git commit -m "feat: add minimal single-line footer"
```

---

## Task 8: Update Navigation

**Files:**
- Modify: `src/lib/stores/navigation.ts`
- Modify: `src/lib/components/layout/Navigation.svelte`

- [ ] **Step 1: Simplify nav links in store**

In `src/lib/stores/navigation.ts`, replace the `navLinks` array:

```ts
// Replace lines 16-22
export const navLinks: NavLink[] = [
	{ href: '/case-studies', label: 'Work' },
	{ href: '/about', label: 'About' },
	{ href: '#contact', label: 'Contact', scrollTarget: '#contact' }
];
```

- [ ] **Step 2: Simplify the Navigation component**

In `src/lib/components/layout/Navigation.svelte`, remove the gradient CTA button from the desktop nav. Replace lines 94-101 (the `<!-- CTA Button -->` block) with nothing — delete the entire block:

```svelte
				<!-- Remove the CTA Button block entirely -->
				<!-- Lines 93-101 deleted: the "Book a Call" gradient button -->
```

The remaining `{#each navLinks as link}` loop already renders all nav items including "Contact".

- [ ] **Step 3: Verify the changes compile**

Run: `cd /Users/codefred/Documents/codefred.dev && npx svelte-check --threshold error 2>&1 | head -20`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/lib/stores/navigation.ts src/lib/components/layout/Navigation.svelte
git commit -m "feat: simplify navigation to Work, About, Contact"
```

---

## Task 9: Wire Up Homepage + Layout

**Files:**
- Modify: `src/routes/+page.svelte`
- Modify: `src/routes/+layout.svelte`

- [ ] **Step 1: Replace homepage sections**

Replace the entire content of `src/routes/+page.svelte`:

```svelte
<script lang="ts">
	import HeroRedesign from '$components/sections/HeroRedesign.svelte';
	import FeaturedCaseStudiesSticky from '$components/sections/FeaturedCaseStudiesSticky.svelte';
	import ExpertiseCompact from '$components/sections/ExpertiseCompact.svelte';
	import SocialProofMinimal from '$components/sections/SocialProofMinimal.svelte';
	import CTAContact from '$components/sections/CTAContact.svelte';
</script>

<script context="module">
	import SEO from '$components/SEO.svelte';
	import { generatePersonSchema } from '$lib/utils/structured-data';
</script>

<SEO
	title="Codefred | AI Systems Architect & Full-Stack Engineer"
	description="Senior Software Engineer with 8 years building production AI systems. Cut AI costs by 92%, build computer vision at scale. Based in Nigeria, working globally."
	canonical="https://codefred.dev"
	ogImage="/og-home.png"
/>

<svelte:head>
	{@html `<script type="application/ld+json">
		${generatePersonSchema({
			name: 'Alfred Emmanuel',
			url: 'https://codefred.dev',
			image: 'https://codefred.dev/profile.png',
			jobTitle: 'AI Systems Architect & Full-Stack Engineer',
			description: 'Senior Software Engineer specializing in AI cost optimization, computer vision, and production systems architecture. 8 years experience building scalable systems.',
			email: 'alfred@codefred.dev',
			socialLinks: [
				'https://github.com/pycomet',
				'https://linkedin.com/in/codefred',
				'https://twitter.com/codefred',
				'https://dev.to/pycomet'
			],
			location: { city: 'Abuja', country: 'Nigeria' },
			skills: [
				'AI Systems Architecture',
				'Python',
				'FastAPI',
				'SvelteKit',
				'Machine Learning',
				'Computer Vision',
				'Cost Optimization',
				'Production Systems'
			]
		})}
	<\/script>`}
</svelte:head>

<HeroRedesign />
<FeaturedCaseStudiesSticky />
<ExpertiseCompact />
<SocialProofMinimal />
<CTAContact />
```

- [ ] **Step 2: Use minimal footer on homepage**

In `src/routes/+layout.svelte`, conditionally render the minimal footer on the homepage and the full footer elsewhere:

```svelte
<script lang="ts">
	import '$lib/styles/global.css';
	import Navigation from '$components/layout/Navigation.svelte';
	import MobileMenu from '$components/layout/MobileMenu.svelte';
	import Footer from '$components/layout/Footer.svelte';
	import FooterMinimal from '$components/layout/FooterMinimal.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { PUBLIC_POSTHOG_KEY, PUBLIC_POSTHOG_HOST } from '$env/static/public';
	import posthog from 'posthog-js';

	let { children } = $props();

	let isHomepage = $derived($page.url.pathname === '/');

	if (browser && PUBLIC_POSTHOG_KEY) {
		posthog.init(PUBLIC_POSTHOG_KEY, {
			api_host: PUBLIC_POSTHOG_HOST,
			person_profiles: 'identified_only'
		});
	}
</script>

<div class="min-h-screen flex flex-col">
	<Navigation />
	<MobileMenu />

	<main id="main-content" class="flex-1">
		{@render children()}
	</main>

	{#if isHomepage}
		<FooterMinimal />
	{:else}
		<Footer />
	{/if}
</div>
```

- [ ] **Step 3: Verify everything compiles**

Run: `cd /Users/codefred/Documents/codefred.dev && npx svelte-check --threshold error 2>&1 | head -20`
Expected: No errors

- [ ] **Step 4: Run the dev server and visually verify**

Run: `cd /Users/codefred/Documents/codefred.dev && npm run dev`
Open http://localhost:5173 and verify:
- Hero shows single statement, metrics count up once
- Case studies section has sticky left panel (desktop) or expandable cards (mobile)
- Expertise shows 4 flat domain cards
- Social proof shows 2 pull-quotes
- CTA section has centered headline + button
- Minimal footer at bottom
- Navigation shows Work, About, Contact only
- All fade-up animations fire once on scroll

- [ ] **Step 5: Commit**

```bash
git add src/routes/+page.svelte src/routes/+layout.svelte
git commit -m "feat: wire up redesigned 5-section homepage with minimal footer"
```

---

## Task 10: Visual Polish Pass

**Files:**
- Modify: `src/lib/styles/global.css` (if needed)
- Modify: any section components that need spacing/animation tweaks

This task is a manual review after running the dev server. Check and fix:

- [ ] **Step 1: Check vertical rhythm and spacing**

Open http://localhost:5173 and scroll through the entire page. Verify:
- Each section has enough breathing room (py-24 to py-40)
- No two sections feel too close or too far apart
- The transition from hero to case studies feels natural

If spacing needs adjustment, update the `py-*` classes in the relevant section components.

- [ ] **Step 2: Check mobile layout**

Open browser devtools and test at 375px width (iPhone SE) and 390px width (iPhone 14). Verify:
- Hero text is readable, metrics don't overflow
- Case study cards are tappable, expand smoothly
- Expertise cards stack properly
- CTA button goes full-width
- Footer is clean

Fix any overflow or spacing issues.

- [ ] **Step 3: Check reduced motion**

In browser devtools, enable "Prefers reduced motion" in Rendering tab. Verify:
- No animations play
- Count-up shows final values immediately
- Fade-up elements are visible without animation

- [ ] **Step 4: Commit any fixes**

```bash
git add -u
git commit -m "fix: visual polish — spacing, mobile layout, reduced motion"
```

Only commit if changes were made. Skip if everything looked good.
