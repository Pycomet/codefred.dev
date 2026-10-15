# Design Review Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the CI link check and ship every actionable finding from the three-reviewer design review (anti-ui-slop, design-taste-frontend, UX + WCAG) on one branch, `fix/design-review`, opened as a PR against `feat/phase-1-funnel-revamp`.

**Architecture:** Same SvelteKit 5 + Tailwind 3 prerendered site. Changes are confined to the existing pages, a few shared components and one CSS file. No new dependencies. Each task adds its own assertions to `scripts/check-site.mjs` first (the repo has no unit-test runner; the site check against the built preview is the test), watches them fail, then implements. Visual tasks are also verified with headless screenshots.

**Tech Stack:** SvelteKit 5 (runes), Tailwind 3 with CSS-variable tokens, mdsvex, Node 22 scripts, GitHub Actions (lychee, Lighthouse CI).

**Spec:** The consolidated design-review report (this session, 2026-10-15), summarised in "Source findings" below, plus the revamp plan `docs/superpowers/plans/2026-10-15-funnel-revamp.md`.

## Global Constraints

- Base branch: `fix/design-review` is cut from `feat/builds-list` (identical content to `feat/phase-1-funnel-revamp` after PR #5 merged). Open the PR with `--base feat/phase-1-funnel-revamp`.
- No em dashes (U+2014) or en dashes (U+2013) in any visible text. Use a hyphen.
- The person is "Codefred" in all visible text. The email address may stay as is.
- One accent colour (`accent` token), one 6px radius (`rounded`), Geist + Geist Mono only.
- "Book a call" is the only label for the booking intent, everywhere.
- Keep the problem-first H1 "I turn expensive AI problems into efficient systems." (original spec: "Keep: the problem-first headline"). Rewording it is the owner's call, not this plan's.
- Testimonials stay verbatim except trims marked with "...".
- Every page must still pass `npm run build` (prerender crawl fails on broken internal links) and `node scripts/check-site.mjs`.
- Headless screenshots in this environment: `~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell --single-process --no-zygote --no-sandbox --disable-gpu --hide-scrollbars --user-data-dir=<tmp> --window-size=<w>,<h> --screenshot=<out> <url>` (run with the Bash sandbox disabled; add `--blink-settings=preferredColorScheme=0` for dark). External URLs do not resolve from this job; only `localhost` works.

## Review Focus

1. A `?area=` deep link to an area with no case studies (or a typo) must show every study with "All" selected, never the "Nothing in this area yet." dead end. Test in Task 2.
2. A visitor without JavaScript must still see every case study and video, and filter buttons must not look clickable before they work. Test in Task 9.
3. With an empty YouTube feed (offline builds, a missing API key, a YouTube outage), Home's "Latest from the channel" must still read as intentional, not broken, and the build log must say why it's empty. Warning added in Task 10; checked by screenshot in Task 11.
4. Long result lines ("2-48 hours → under 30s to detect an incident") at 390px must not overflow or produce mismatched cell heights. Checked by screenshot in Task 5.
5. Text on `bg-surface` (the new closing panel, code blocks) must use `ink-muted` or `ink`, never `ink-subtle` (4.40:1 in light mode, below AA). Test in Task 9.

## Source findings → tasks

| Finding (reviewer) | Task |
| --- | --- |
| CI lychee: Upwork 403, canonical URLs 404 against old production, deprecated `--base` | 1 |
| "Full-stack product builds" links to an empty filter (A, B) | 2 |
| No CV route from Home or footer (A, B, C) | 2 |
| `/work` has no closing call to action (C) | 2 |
| No Book button in the phone header; menu ignores Escape/outside tap (C) | 3 |
| Pre-title line above the H1; small portrait; flat type scale; even rhythm; closing CTA not contained (A, B) | 4 |
| Proof strip: equal three-up, wrapping labels, arrow invisible on touch (A, B, C) | 5 |
| "What I do" and testimonials share a layout; quotes 4-5 lines; "Alfred" in a quote; "wifi" line duplicated; mixed post aspect ratios (A, B) | 6 |
| Case studies repeat Problem/Approach in the body (A, B) | 7 |
| No images on `/work` builds (B) | 8 (code here; screenshots supplied by the owner) |
| Contrast fail on code comments, theme toggle label mismatch, small targets, no filter status, focus lost on video play, filter layout shift, late Cal load, iframe title (A, C) | 9 |
| Latest YouTube video never shows on Home (feed blocked from cloud builds) | 10 |
| Verify, screenshots, PR | 11 |

Out of scope, needs the owner: case-study diagrams (no source assets), headline rewording, an email alias such as hello@codefred.dev.

---

### Task 1: Fix the CI link check

**Files:**
- Modify: `.github/workflows/ci.yml` (the "External links" step)

**Interfaces:**
- Consumes: the preview server already started earlier in the job on `http://localhost:4173`.
- Produces: nothing used by later tasks.

- [ ] **Step 1: Replace the External links step**

In `.github/workflows/ci.yml`, replace the whole `- name: External links` step with:

```yaml
      - name: External links
        uses: lycheeverse/lychee-action@v2
        with:
          fail: true
          # Links to codefred.dev (canonical, og:url, sitemap) are checked against this build,
          # not production, which still serves the previous version until this branch merges.
          # These sites block automated checkers, so they'd fail even when the link is fine.
          args: >-
            --no-progress
            --base-url http://localhost:4173
            --remap 'https://codefred\.dev http://localhost:4173'
            --exclude linkedin.com --exclude instagram.com --exclude twitter.com --exclude x.com
            --exclude cal.com --exclude upwork.com
            '.svelte-kit/output/prerendered/pages/**/*.html'
```

- [ ] **Step 2: Validate the YAML locally**

Run: `grep -q -- "--remap 'https://codefred" .github/workflows/ci.yml && grep -q -- "--exclude upwork.com" .github/workflows/ci.yml && ! grep -q -- "--base http" .github/workflows/ci.yml && echo ok`
Expected: `ok`

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: check codefred.dev links against the build, skip Upwork in lychee"
```

Verification happens on the PR run (Task 10). If Lighthouse then fails, open the uploaded LHCI report from the job summary and fix the specific audit; do not lower thresholds without the owner's agreement.

---

### Task 2: Funnel routing (dead filter link, CV route, /work closing CTA)

**Files:**
- Modify: `scripts/check-site.mjs`
- Modify: `src/routes/+page.server.ts`, `src/routes/+page.svelte` (services and About teaser)
- Modify: `src/routes/work/+page.svelte`
- Modify: `src/lib/components/layout/SiteFooter.svelte`

**Interfaces:**
- Consumes: `caseStudies` from `$lib/content/case-studies`, `site.cv` from `$lib/config/site`, `BookCall` (`from` prop).
- Produces: `data.usedAreas: Area[]` on the home page load; `data-area="<area>"` on every `/work` study row.

- [ ] **Step 1: Write the failing checks**

In `scripts/check-site.mjs`, inside the `for (const path of paths)` loop after the footer check, add:

```js
	check(path, 'footer links the CV', /href="\/cv\/codefred-cv\.pdf"[^>]*data-track-from="footer"/.test(body));
```

After the loop (before the redirect checks), add:

```js
// Every filter deep link must land on an area that has at least one case study
const home = await (await fetch(`${base}/`)).text();
const workHtml = await (await fetch(`${base}/work`)).text();
for (const [, area] of home.matchAll(/href="\/work\?area=([\w-]+)"/g)) {
	check('/', `area link "${area}" has case studies`, workHtml.includes(`data-area="${area}"`));
}
check('/work', 'ends with Book a call', workHtml.includes('data-track-from="work"'));
check('/', 'About teaser links the CV', /href="\/cv\/codefred-cv\.pdf"[^>]*data-track-from="home-about"/.test(home));
```

- [ ] **Step 2: Run to verify they fail**

Run: `npm run build && (npm run preview -- --port 4173 >/dev/null 2>&1 &) && node scripts/check-site.mjs; pkill -f "vite preview" || true`
Expected: FAIL lines for `footer links the CV` (every page), `area link "full-stack" has case studies`, `ends with Book a call`, `About teaser links the CV`.

- [ ] **Step 3: Pass the areas that have case studies to Home**

`src/routes/+page.server.ts`: change the import and return value:

```ts
import { featuredCaseStudies, caseStudies } from '$lib/content/case-studies';
```

```ts
	return {
		latest: feed.videos[0] ?? null,
		posts,
		proof: featuredCaseStudies,
		// Only areas with case studies get a filtered /work link
		usedAreas: [...new Set(caseStudies.map((c) => c.meta.area))]
	};
```

- [ ] **Step 4: Point services without case studies at the builds list**

`src/routes/+page.svelte`, in the "What I do" `{#each services as s}` block, replace `href="/work?area={s.area}"` with:

```svelte
href={data.usedAreas.includes(s.area) ? `/work?area=${s.area}` : '/work#builds'}
```

and the TypeScript of `services` stays as is (`area` strings match `Area`).

- [ ] **Step 5: Add a CV link to the About teaser**

In the About teaser, replace

```svelte
			<p class="mt-4"><a href="/about" class="link">More about me</a></p>
```

with

```svelte
			<p class="mt-4 flex flex-wrap gap-x-6 gap-y-2">
				<a href="/about" class="link">More about me</a>
				<a href={site.cv} class="link" download data-track="cv" data-track-from="home-about">CV (PDF)</a>
			</p>
```

- [ ] **Step 6: Tag study rows, guard the deep link, add the closing CTA on /work**

`src/routes/work/+page.svelte`:

1. Import BookCall: `import BookCall from '$components/BookCall.svelte';`
2. In `onMount`, replace `if (q && q in data.areas) area = q as Area;` with
   ```ts
   		// Unknown or empty areas fall back to "All" instead of an empty list
   		if (q && usedAreas.includes(q as Area)) area = q as Area;
   ```
3. On the study `<li>` add the area: `<li data-area={study.area}>`.
4. After the closing `</section>` of "Things I've built", before the final `</div>`, add:
   ```svelte
   	<div class="mt-24 max-w-3xl">
   		<BookCall from="work" heading="Want results like these?" />
   	</div>
   ```

- [ ] **Step 7: Add the CV to the footer**

`src/lib/components/layout/SiteFooter.svelte`, replace the email paragraph block

```svelte
			<p class="text-sm text-ink-muted">
				<EmailLink class="link" />
			</p>
```

with

```svelte
			<p class="flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-muted">
				<EmailLink class="link" />
				<a href={site.cv} class="link" download data-track="cv" data-track-from="footer">CV (PDF)</a>
			</p>
```

- [ ] **Step 8: Run to verify they pass**

Run: `npm run build && (npm run preview -- --port 4173 >/dev/null 2>&1 &) && node scripts/check-site.mjs; pkill -f "vite preview" || true`
Expected: `All checks passed`.

- [ ] **Step 9: Commit**

```bash
git add scripts/check-site.mjs src/routes/+page.server.ts src/routes/+page.svelte src/routes/work/+page.svelte src/lib/components/layout/SiteFooter.svelte
git commit -m "fix(funnel): no dead filter link, CV in footer and Home, Book a call on /work"
```

---

### Task 3: Phone header Book button and menu dismissal

**Files:**
- Modify: `scripts/check-site.mjs`
- Modify: `src/lib/components/layout/Header.svelte`

**Interfaces:**
- Consumes: `site`, `nav` from `$lib/config/site`.
- Produces: a link with `data-track-from="header-mobile"` visible below `md`.

- [ ] **Step 1: Write the failing check**

In the per-page loop of `scripts/check-site.mjs`:

```js
	check(path, 'phone header has Book a call', /href="\/book"[^>]*data-track-from="header-mobile"/.test(body));
```

- [ ] **Step 2: Run to verify it fails**

Run the build + check command from Task 2 Step 2. Expected: FAIL `phone header has Book a call` on every page.

- [ ] **Step 3: Replace the phone block in Header.svelte**

Replace everything from `<!-- Phones: native disclosure, works before hydration -->` to the closing `</details>` with:

```svelte
		<!-- Phones: Book a call always visible; other links in a native disclosure (works before hydration) -->
		<div class="flex items-center gap-2 md:hidden">
			<a href="/book" class="btn-primary px-3" data-track="book" data-track-from="header-mobile">Book a call</a>
			<details bind:this={menu} class="group relative">
				<summary
					class="flex h-11 cursor-pointer list-none items-center rounded px-2 text-sm text-ink [&::-webkit-details-marker]:hidden"
				>
					<span class="group-open:hidden">Menu</span>
					<span class="hidden group-open:inline">Close</span>
				</summary>
				<nav
					aria-label="Main"
					class="absolute right-0 top-12 w-56 rounded border border-line bg-canvas p-2 shadow-lg shadow-ink/5"
				>
					{#each nav as item}
						<a
							href={item.href}
							aria-current={isActive(item.href) ? 'page' : undefined}
							class="block rounded px-3 py-3 text-sm {isActive(item.href) ? 'text-ink' : 'text-ink-muted'}"
							>{item.label}</a
						>
					{/each}
				</nav>
			</details>
		</div>
```

- [ ] **Step 4: Close the menu on Escape and outside taps**

In the `<script>` of `Header.svelte`, after the existing `$effect`, add:

```ts
	function closeMenu(e: Event) {
		if (!menu?.open) return;
		if (e instanceof KeyboardEvent && e.key !== 'Escape') return;
		if (e instanceof MouseEvent && menu.contains(e.target as Node)) return;
		menu.open = false;
		if (e instanceof KeyboardEvent) menu.querySelector('summary')?.focus();
	}
```

and at the top of the markup add:

```svelte
<svelte:window onkeydown={closeMenu} onclick={closeMenu} />
```

- [ ] **Step 5: Run to verify it passes, screenshot at 390px**

Run the build + check command. Expected: `All checks passed`.
Then screenshot `http://localhost:4173/work` at `390,900` and confirm "Book a call" and "Menu" sit on one line inside the 64px header without overlapping the wordmark.

- [ ] **Step 6: Commit**

```bash
git add scripts/check-site.mjs src/lib/components/layout/Header.svelte
git commit -m "fix(header): Book a call visible on phones; menu closes on Escape and outside tap"
```

---

### Task 4: Hero weight, type ladder, rhythm, contained closing CTA, legacy CSS

**Files:**
- Modify: `scripts/check-site.mjs`
- Modify: `src/lib/styles/global.css`, `tailwind.config.js`, `src/app.html`
- Modify: `src/routes/+page.svelte`, `src/routes/work/+page.svelte`, `src/routes/content/+page.svelte`, `src/routes/about/+page.svelte`
- Modify: `src/lib/components/BookCall.svelte`

**Interfaces:**
- Produces: CSS classes `.h-section` (section h2) and `.copy` (17px body); `BookCall` prop `variant?: 'line' | 'panel'` (default `'line'`).

- [ ] **Step 1: Write the failing checks**

Per-page loop in `scripts/check-site.mjs`:

```js
	check(path, 'no small pre-title above the h1', !/<p[^>]*>[^<]*AI engineer<\/p>\s*<h1/.test(body));
	// Case-study bodies are Markdown with their own heading styles, so only check page-level h2s
	if (!path.startsWith('/work/')) {
		check(path, 'section headings use .h-section', !/<h2(?![^>]*sr-only)(?![^>]*h-section)[^>]*>/.test(body));
	}
```

After the loop:

```js
check('/', 'closing CTA is a panel', /data-cta="panel"/.test(home));
```

- [ ] **Step 2: Run to verify they fail**

Run the build + check command. Expected: FAIL for the pre-title on `/`, `.h-section` on most pages, and `closing CTA is a panel`.

- [ ] **Step 3: Add the type classes and remove legacy CSS**

In `src/lib/styles/global.css`, inside `@layer components`, add after `.ledger`:

```css
	/* Section headings: one step below the h1, so sections have a clear ladder */
	.h-section {
		@apply text-2xl font-semibold tracking-tight sm:text-3xl;
	}
	/* Long-form body on marketing pages */
	.copy {
		@apply text-[17px] leading-[1.65];
	}
```

Delete the legacy blocks: the `.container-custom`, `.gradient-text` and `.skip-to-content` rules under "Legacy helpers", and the whole `@layer utilities { ... }` block with `html.js .fade-up` rules plus the `html.js .fade-up` rule inside the reduced-motion media query. First confirm nothing uses them:

Run: `grep -rnE "fade-up|gradient-text|container-custom|skip-to-content|(bg|text)-(bg|text)-(primary|secondary|muted|accent)|brand-(primary|secondary|success)" src --exclude=global.css`
Expected: no output. Then in `tailwind.config.js` delete the `bg`, `text` and `brand` legacy colour keys and their comment.

- [ ] **Step 4: Preload Geist Medium**

`src/app.html`, after the SemiBold preload line:

```html
		<link rel="preload" href="%sveltekit.assets%/fonts/Geist-Medium.woff2" as="font" type="font/woff2" crossorigin />
```

- [ ] **Step 5: Rework the hero**

`src/routes/+page.svelte`, hero section:
- Delete `<p class="text-sm text-ink-muted">{site.name}, AI engineer</p>`.
- H1 classes become `text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl` (remove `mt-4`).
- Subhead text becomes: `AI engineer, 8+ years in production. I cut LLM costs, speed up agents and ship computer vision that holds up.` and its class `mt-6 max-w-xl text-lg text-ink-muted`.
- Grid wrapper: `items-center` → `items-start`.
- Portrait: `sizes="(min-width: 1024px) 20rem, (min-width: 768px) 16rem, 8rem"` and class `order-first aspect-square w-28 rounded object-cover sm:w-36 md:order-none md:w-64 lg:w-80`.

- [ ] **Step 6: Apply the ladder and rhythm everywhere**

Replace every section h2 class string `text-xl font-semibold tracking-tight` with `h-section` in: `src/routes/+page.svelte`, `src/routes/work/+page.svelte` (the "Things I've built" h2), `src/routes/content/+page.svelte`, `src/routes/about/+page.svelte`, and `src/lib/components/BookCall.svelte` (its h2 uses `text-2xl font-semibold tracking-tight`; change that to `h-section` too).

Run: `grep -rn "text-xl font-semibold tracking-tight" src`
Expected: no output.

On Home: proof section `mt-20 sm:mt-28` → `mt-12 sm:mt-16` (hero and proof read as one unit); About teaser and closing CTA wrappers `mt-24 sm:mt-32` → `mt-28 sm:mt-40`; add `copy` to the About teaser paragraph and the services line paragraphs.

- [ ] **Step 7: Give BookCall a panel variant and use it on Home**

Replace `src/lib/components/BookCall.svelte` with:

```svelte
<script lang="ts">
	import { site } from '$lib/config/site';
	import EmailLink from '$components/ui/EmailLink.svelte';

	let {
		heading = 'Have a problem like this?',
		body = `A ${site.booking.minutes}-minute call to look at what you're building and whether I can help.`,
		from,
		variant = 'line'
	}: { heading?: string; body?: string; from: string; variant?: 'line' | 'panel' } = $props();
</script>

<section
	class={variant === 'panel' ? 'rounded bg-surface p-8 md:p-12' : 'border-t border-line pt-12'}
	data-cta={variant}
	aria-labelledby="book-{from}"
>
	<h2 id="book-{from}" class="h-section">{heading}</h2>
	<p class="mt-3 max-w-prose text-ink-muted">{body}</p>
	<div class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
		<a href="/book" class="btn-primary" data-track="book" data-track-from={from}>Book a call</a>
		<span class="text-sm text-ink-muted">or email <EmailLink class="link" /></span>
	</div>
</section>
```

On Home, add `variant="panel"` to the closing `<BookCall ... />`.

- [ ] **Step 8: Run checks and screenshot**

Run the build + check command. Expected: `All checks passed`.
Screenshot `/` at `1280,1100` and `390,1400`, light and dark. Confirm: H1 is the first text in the hero, the portrait is visibly larger on desktop, proof strip sits close under the hero, the closing panel text is readable on `bg-surface` in both themes.

- [ ] **Step 9: Commit**

```bash
git add scripts/check-site.mjs src/lib/styles/global.css tailwind.config.js src/app.html src/routes src/lib/components/BookCall.svelte
git commit -m "feat(design): hero weight, section type ladder, Home rhythm, closing CTA panel"
```

---

### Task 5: Make the proof strip the signature moment

**Files:**
- Modify: `scripts/check-site.mjs`
- Modify: `src/lib/components/work/Result.svelte`
- Modify: `src/routes/+page.svelte` (proof strip section)

**Interfaces:**
- Consumes: `CaseStudyMeta['result']`.
- Produces: `Result` props `size?: 'sm' | 'md' | 'lg' | 'xl'`, `stacked?: boolean` (label on its own line), `accent?: boolean` (after value in accent colour). Existing callers keep working (defaults unchanged).

- [ ] **Step 1: Write the failing checks**

After the loop in `scripts/check-site.mjs`:

```js
check('/', 'proof cards say "Read case study"', (home.match(/Read case study/g) ?? []).length === 3);
check('/', 'lead result is the large size', /data-result-size="xl"/.test(home));
```

- [ ] **Step 2: Run to verify they fail**

Run the build + check command. Expected: both FAIL.

- [ ] **Step 3: Replace Result.svelte**

```svelte
<script lang="ts">
	import type { CaseStudyMeta } from '$lib/content/case-studies';

	// The "before -> after" line used for every headline result on the site
	let {
		result,
		size = 'md',
		stacked = false,
		accent = false
	}: {
		result: CaseStudyMeta['result'];
		size?: 'sm' | 'md' | 'lg' | 'xl';
		stacked?: boolean;
		accent?: boolean;
	} = $props();

	const scale = {
		sm: 'text-sm',
		md: 'text-lg',
		lg: 'text-2xl sm:text-3xl',
		xl: 'text-3xl sm:text-4xl md:text-5xl'
	}[size];
</script>

<div data-result-size={size}>
	<p class="ledger {scale}">
		<span class="text-ink-subtle">{result.before}</span>
		<span aria-hidden="true" class="px-1 text-ink-subtle">→</span><span class="sr-only">to</span>
		<span class="font-medium {accent ? 'text-accent' : 'text-ink'}">{result.after}</span>
		{#if !stacked}
			<span class="ml-1 font-sans text-[0.8em] tracking-normal text-ink-muted">{result.label}</span>
		{/if}
	</p>
	{#if stacked}
		<p class="mt-2 text-sm text-ink-muted">{result.label}</p>
	{/if}
</div>
```

- [ ] **Step 4: Rebuild the proof strip as 1 lead + 2**

Replace the `<ul>...</ul>` in the proof section of `src/routes/+page.svelte` with:

```svelte
	<ul class="grid gap-px overflow-hidden rounded border border-line bg-line md:grid-cols-[1.4fr_1fr] md:grid-rows-2">
		{#each data.proof as study, i}
			<li class="bg-canvas {i === 0 ? 'md:row-span-2' : ''}">
				<a
					href="/work/{study.slug}"
					class="group flex h-full flex-col justify-between gap-6 {i === 0 ? 'p-6 md:p-10' : 'p-6'}"
				>
					<Result result={study.result} size={i === 0 ? 'xl' : 'md'} stacked accent />
					<p class="flex flex-wrap items-baseline justify-between gap-2 text-sm">
						<span class="text-ink-muted">{study.client}</span>
						<span class="text-ink-subtle transition-colors group-hover:text-accent group-focus-visible:text-accent"
							>Read case study <span aria-hidden="true">→</span></span
						>
					</p>
				</a>
			</li>
		{/each}
	</ul>
```

- [ ] **Step 5: Run checks and screenshot**

Run the build + check command. Expected: `All checks passed`.
Screenshot `/` at `1280,1100` and `390,1600`, light and dark. Confirm: the lead result dominates, labels sit on their own line (no "OpenAI / spend" wrap), the after values are accent-coloured in both themes, and at 390px nothing overflows (Review Focus 4).

- [ ] **Step 6: Commit**

```bash
git add scripts/check-site.mjs src/lib/components/work/Result.svelte src/routes/+page.svelte
git commit -m "feat(design): asymmetric proof strip with lead result and visible case-study cue"
```

---

### Task 6: Break layout repetition, tighten copy, one post aspect ratio

**Files:**
- Modify: `scripts/check-site.mjs`
- Modify: `src/routes/+page.svelte` ("What I do", testimonials, About teaser)
- Modify: `src/lib/data/testimonials.ts`
- Modify: `src/lib/components/content/PostStrip.svelte`

**Interfaces:**
- Consumes: `testimonials: Testimonial[]` (shape unchanged).

- [ ] **Step 1: Write the failing checks**

In the per-page loop, after the `visible`-text style checks (add a `visible` variable if missing):

```js
	const visible = body.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
	check(path, 'no "Alfred" in visible text', !/\bAlfred\b/.test(visible));
	for (const [, q] of body.matchAll(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/g)) {
		const words = q.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
		check(path, `quote is 30 words or fewer (${words})`, words <= 30);
	}
```

After the loop:

```js
check('/', '"wifi" line appears only on About', !/wifi/.test(home));
```

- [ ] **Step 2: Run to verify they fail**

Run the build + check command. Expected: FAIL for "Alfred" on `/`, both quote lengths, and the wifi line.

- [ ] **Step 3: Trim the testimonials (verbatim, with "...")**

In `src/lib/data/testimonials.ts` set the two `quote` values to:

```ts
		quote:
			"He didn't just execute the basic requirements; he proactively suggested forward-looking and sustainable code edits...",
```

```ts
		quote:
			'...a great communicator and shows extreme enthusiasm and passion for a project, allowing him to fit into any team and collaborate well with others.',
```

- [ ] **Step 4: Featured quote layout**

Replace the testimonials `<div class="grid gap-12 md:grid-cols-2">...</div>` on Home with:

```svelte
	<div class="max-w-3xl space-y-12">
		{#each testimonials as t, i}
			<figure>
				<blockquote class="{i === 0 ? 'text-xl md:text-2xl' : 'text-lg'} leading-relaxed text-ink">“{t.quote}”</blockquote>
				<figcaption class="mt-4 text-sm">
					<span class="font-medium">{t.name}</span><span class="text-ink-muted">, {t.role}</span>
					<a href={t.source.url} class="link ml-2" target="_blank" rel="noopener">{t.source.label}</a>
				</figcaption>
			</figure>
		{/each}
	</div>
```

- [ ] **Step 5: "What I do" as rows**

Replace the services `<ul class="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-2">...</ul>` with:

```svelte
	<ul class="mt-8 divide-y divide-line border-y border-line">
		{#each services as s}
			<li>
				<a
					href={data.usedAreas.includes(s.area) ? `/work?area=${s.area}` : '/work#builds'}
					class="group grid gap-1 py-5 sm:grid-cols-[16rem_1fr_auto] sm:items-baseline sm:gap-8"
				>
					<h3 class="font-medium group-hover:text-accent">{s.title}</h3>
					<p class="copy text-ink-muted">{s.line}</p>
					<span aria-hidden="true" class="hidden text-ink-subtle group-hover:text-accent sm:inline">→</span>
				</a>
			</li>
		{/each}
	</ul>
```

- [ ] **Step 6: Drop the duplicated wifi line on Home**

About teaser paragraph text becomes:

```svelte
				Eight years of remote work for teams in the US, Canada and Australia. These days I build AI systems and make
				videos about the work.
```

- [ ] **Step 7: One aspect ratio for posts**

In `src/lib/components/content/PostStrip.svelte`, replace the image's conditional aspect class block

```svelte
class="w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] {post.kind ===
						'short'
							? 'aspect-[9/16]'
							: 'aspect-square'}"
```

with

```svelte
class="aspect-[4/5] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
```

- [ ] **Step 8: Run checks and screenshot**

Run the build + check command. Expected: `All checks passed`.
Screenshot `/` at `1280,3000`: confirm "What I do" (rows) and testimonials (stacked, featured first) no longer share a layout.

- [ ] **Step 9: Commit**

```bash
git add scripts/check-site.mjs src/routes/+page.svelte src/lib/data/testimonials.ts src/lib/components/content/PostStrip.svelte
git commit -m "feat(design): distinct layouts for services and quotes, trimmed quotes, one post ratio"
```

---

### Task 7: Stop case studies repeating the spec sheet

**Files:**
- Modify: `scripts/check-site.mjs`
- Modify: `src/content/case-studies/cost-reduction.md`, `compass-kenya.md`, `retail-security.md`, `semantic-search.md`

- [ ] **Step 1: Write the failing check**

In the per-page loop:

```js
	if (path.startsWith('/work/')) {
		check(path, 'body does not repeat the spec sheet headings', !/<h2[^>]*>The (problem|approach|outcome)<\/h2>/.test(body));
	}
```

- [ ] **Step 2: Run to verify it fails**

Run the build + check command. Expected: FAIL on all four case studies.

- [ ] **Step 3: Rename the body headings**

In each of the four Markdown files, rename exactly:
- `## The problem` → `## What I found`
- `## The approach` → `## What I built`
- `## The outcome` → `## The numbers`

Run: `grep -nE "^## The (problem|approach|outcome)$" src/content/case-studies/*.md`
Expected: no output.

- [ ] **Step 4: Run to verify it passes**

Run the build + check command. Expected: `All checks passed`.

- [ ] **Step 5: Commit**

```bash
git add scripts/check-site.mjs src/content/case-studies
git commit -m "fix(case-studies): body headings no longer repeat the spec sheet"
```

---

### Task 8: Screenshots for the builds list (code; images from the owner)

**Files:**
- Modify: `src/lib/data/builds.ts`
- Modify: `src/routes/work/+page.svelte` ("Things I've built")
- Create: `scripts/capture-builds.sh`

**Interfaces:**
- Produces: optional `image?: { src: string; alt: string }` on `Build`; images live at `static/builds/<slug>.webp` (1280x800 source, saved at 800x500).

- [ ] **Step 1: Extend the type and render the image when present**

In `src/lib/data/builds.ts`, add to `interface Build`:

```ts
	image?: { src: string; alt: string }; // 16:10 screenshot in static/builds/
```

In `src/routes/work/+page.svelte`, inside the builds `<li>`, before the name row:

```svelte
					{#if b.image}
						<img
							src={b.image.src}
							alt={b.image.alt}
							width="800"
							height="500"
							loading="lazy"
							decoding="async"
							class="mb-4 aspect-[16/10] w-full rounded border border-line object-cover object-top"
						/>
					{/if}
```

- [ ] **Step 2: Add the capture script for the owner**

Create `scripts/capture-builds.sh`:

```bash
#!/bin/bash
# Captures 16:10 screenshots of the live builds into static/builds/ as WebP.
# Run from a normal terminal (needs internet): bash scripts/capture-builds.sh
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
```

- [ ] **Step 3: Verify the page builds with and without images**

Run: `npm run build`
Expected: passes with no images present (none are referenced yet).

When the owner has run the script, add `image: { src: '/builds/<slug>.webp', alt: '<Name> home page' }` to each matching entry, rebuild, and screenshot `/work` at `1280,3000`.

- [ ] **Step 4: Commit**

```bash
git add src/lib/data/builds.ts src/routes/work/+page.svelte scripts/capture-builds.sh
git commit -m "feat(work): optional build screenshots and a capture script"
```

---

### Task 9: Accessibility and interaction fixes

**Files:**
- Modify: `scripts/check-site.mjs`
- Modify: `src/lib/styles/global.css`
- Modify: `src/lib/components/ui/ThemeToggle.svelte`
- Modify: `src/lib/components/content/LiteYouTube.svelte`
- Modify: `src/routes/work/+page.svelte`, `src/routes/content/+page.svelte`, `src/routes/book/+page.svelte`

**Interfaces:**
- Produces: filter buttons rendered in static HTML with `disabled` until hydration, and a `role="status"` result count on `/work` and `/content`.

- [ ] **Step 1: Write the failing checks**

Per-page loop:

```js
	check(path, 'theme toggle has no mismatched aria-label', !/aria-label="Colour theme/.test(body));
```

After the loop:

```js
check('/work', 'filter result count is announced', /role="status"/.test(workHtml));
check('/work', 'filter buttons are in the static HTML', /aria-label="Filter by area"/.test(workHtml));
check('/work', 'filter buttons start disabled', /<button[^>]*aria-pressed[^>]*disabled/.test(workHtml));
const css = await (await fetch(`${base}${home.match(/href="(\/_app\/immutable\/assets\/[^"]+\.css)"/)[1]}`)).text();
check('css', 'code comments are not ink-subtle on surface', !/\.token\.comment\{[^}]*--ink-subtle/.test(css.replace(/\s/g, '')));
```

- [ ] **Step 2: Run to verify they fail**

Run the build + check command. Expected: FAIL for the toggle label, the status, the static filter, disabled state and the comment colour.

- [ ] **Step 3: Contrast and target sizes**

In `src/lib/styles/global.css`:
- `.prose-cf .token.comment` → `@apply italic text-ink-muted;`
- `.btn` → add `min-h-11` to its `@apply` list.

- [ ] **Step 4: Theme toggle label and size**

In `ThemeToggle.svelte`, replace the button with:

```svelte
<button type="button" onclick={cycle} class="min-h-11 rounded px-2 hover:text-ink">
	Theme: {theme === 'system' ? 'auto' : theme}
</button>
```

- [ ] **Step 5: Keep focus when a video starts**

In `LiteYouTube.svelte`:
- Script: `import { tick } from 'svelte';` and `let frame: HTMLIFrameElement | undefined = $state();`
- Iframe: add `bind:this={frame}`.
- Link `onclick` body becomes:
  ```ts
  				e.preventDefault();
  				playing = true;
  				tick().then(() => frame?.focus());
  ```

- [ ] **Step 6: Static, disabled-until-ready filters with a status line on /work**

In `src/routes/work/+page.svelte`, replace the `{#if ready && usedAreas.length > 1} ... {/if}` filter block with:

```svelte
	{#if usedAreas.length > 1}
		<div role="group" aria-label="Filter by area" class="mt-8 flex flex-wrap gap-2">
			{#each ['all', ...usedAreas] as a}
				<button
					type="button"
					aria-pressed={area === a}
					disabled={!ready}
					onclick={() => choose(a as Area | 'all')}
					class="min-h-11 rounded border px-3 text-sm transition-colors disabled:opacity-60 {area === a
						? 'border-ink bg-ink text-canvas'
						: 'border-line text-ink-muted hover:border-ink-subtle hover:text-ink'}"
				>
					{a === 'all' ? 'All' : data.areas[a as Area]}
				</button>
			{/each}
		</div>
	{/if}
	<p role="status" class="sr-only">{visible.length} case {visible.length === 1 ? 'study' : 'studies'}</p>
```

- [ ] **Step 7: Same pattern on /content**

In `src/routes/content/+page.svelte`:
- Script: `import { onMount } from 'svelte';`, `let ready = $state(false);`, `onMount(() => (ready = true));`
- Filter buttons: add `disabled={!ready}`, replace `px-3 py-1.5` with `min-h-11 px-3`, add `disabled:opacity-60`.
- After the filter group add `<p role="status" class="sr-only">{visible.length} videos</p>`.

- [ ] **Step 8: Load Cal.com straight away and title its iframe**

In `src/routes/book/+page.svelte`:
- Replace
  ```ts
  		if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 2000 });
  		else setTimeout(start, 500);
  ```
  with `start();`
- In the `MutationObserver` callback, after `observer.disconnect();` add:
  ```ts
  				if (!frame.title) frame.title = 'Booking calendar';
  ```

- [ ] **Step 9: Run checks**

Run the build + check command. Expected: `All checks passed`.
Then run `npx svelte-kit sync && node ~/.npm/_npx/db2207bf930d61c8/node_modules/svelte-check/bin/svelte-check --tsconfig ./tsconfig.json --threshold error` (or `npx svelte-check@4` with network). Expected: `0 errors`.

- [ ] **Step 10: Commit**

```bash
git add scripts/check-site.mjs src/lib/styles/global.css src/lib/components/ui/ThemeToggle.svelte src/lib/components/content/LiteYouTube.svelte src/routes/work/+page.svelte src/routes/content/+page.svelte src/routes/book/+page.svelte
git commit -m "fix(a11y): contrast, target sizes, toggle label, focus on play, static filters with status, faster Cal"
```

---

### Task 10: Reliable YouTube feed (latest video missing on Home)

**Why:** Home never shows the latest video. From cloud fetchers, YouTube redirects `youtube.com/@CodefredHQ` to `consent.youtube.com` (so the channel ID can't be scraped) and returns 404 for every public RSS feed, including Google's own channel (`UC_x5XG1OV2P6uZZ5FSM9Ttw`), checked 2026-10-15. Vercel builds therefore get an empty feed and silently render the fallback text.

**Fix:** Use the YouTube Data API v3 (API keys don't expire). It resolves the channel straight from the handle `@CodefredHQ` (`channels?forHandle=`), so no channel ID has to be looked up by hand. Keep RSS as a fallback and log loudly when a build gets no videos.

**Owner input (blocking for this task only):**
- API key: Google Cloud console > enable "YouTube Data API v3" > Credentials > API key, restricted to that API. Add it in Vercel as `YOUTUBE_API_KEY` (Production and Preview), and in local `.env`.

**Files:**
- Modify: `src/lib/server/youtube.ts`
- Modify: `.env.example` (document `YOUTUBE_API_KEY`)

**Interfaces:**
- Consumes: `channel.handle` (`@CodefredHQ`), optional `channel.id`, `channel.types[].playlistId`, `env.YOUTUBE_API_KEY` from `$env/dynamic/private`.
- Produces: the same `getFeed(): Promise<Feed>` with `videos` and `shorts`; no change for callers.

- [ ] **Step 1: Add an API source to youtube.ts**

Add near the top:

```ts
import { env } from '$env/dynamic/private';

const API = 'https://www.googleapis.com/youtube/v3';

/** Newest items of a playlist via the Data API (uploads: UU..., long-form: UULF..., Shorts: UUSH...) */
async function apiPlaylist(playlistId: string, key: string): Promise<Omit<Video, 'types'>[]> {
	const json = await get(
		`${API}/playlistItems?part=snippet,contentDetails&maxResults=15&playlistId=${playlistId}&key=${key}`
	);
	if (!json) return [];
	try {
		const data = JSON.parse(json) as {
			items?: { snippet: { title: string }; contentDetails: { videoId: string; videoPublishedAt?: string } }[];
		};
		return (data.items ?? [])
			.filter((i) => i.contentDetails.videoPublishedAt) // skip private/deleted
			.map((i) => ({
				id: i.contentDetails.videoId,
				title: i.snippet.title,
				published: i.contentDetails.videoPublishedAt!,
				url: `https://www.youtube.com/watch?v=${i.contentDetails.videoId}`,
				thumbnail: `https://i.ytimg.com/vi/${i.contentDetails.videoId}/hqdefault.jpg`
			}));
	} catch {
		return [];
	}
}
```

Replace `resolveChannelId()` so the handle is resolved through the API when a key is set (the page scrape stays as the no-key fallback):

```ts
async function resolveChannelId(): Promise<string | null> {
	if (channel.id) return channel.id;
	const key = env.YOUTUBE_API_KEY;
	if (key) {
		const json = await get(`${API}/channels?part=id&forHandle=${encodeURIComponent(channel.handle)}&key=${key}`);
		try {
			const id = json ? (JSON.parse(json) as { items?: { id: string }[] }).items?.[0]?.id : undefined;
			if (id) return id;
		} catch {
			// fall through to the page scrape
		}
	}
	const html = await get(`https://www.youtube.com/${channel.handle}`);
	return html?.match(/"(?:channelId|externalId)":"(UC[\w-]{22})"/)?.[1] ?? null;
}
```

- [ ] **Step 2: Prefer the API in `load()`, fall back to RSS, and warn when empty**

In `load()`, after `const tail = id.slice(2);`, branch on the key:

```ts
	const key = env.YOUTUBE_API_KEY;
	const fetchList = (playlistId: string) =>
		key ? apiPlaylist(playlistId, key) : get(`${FEED}?playlist_id=${playlistId}`).then(parse);
```

and replace the RSS-only `Promise.all` with:

```ts
	const [long, shortsRaw, ...typeLists] = await Promise.all([
		fetchList(`UULF${tail}`),
		fetchList(`UUSH${tail}`),
		...typed.map((t) => fetchList(t.playlistId))
	]);
```

then build `typesById` from `typeLists[i]` (already parsed) instead of `parse(typeXml[i])`, use `shortsRaw` for `shorts`, and `long` for `videos` (drop the `allXml` channel-feed fallback, which hits the same 404). Before returning:

```ts
	if (!videos.length && !shorts.length) {
		console.warn(`[youtube] No videos for ${channel.handle} (source: ${key ? 'Data API' : 'RSS'}). Home shows the fallback text.`);
	}
```

- [ ] **Step 3: Set the channel ID and document the key**

`src/lib/data/channel.ts`: set `id: 'UCUqZH6DgHbhK06dwlmsvscQ'` (supplied by the owner; skips the handle lookup entirely).
`.env.example`: keep `YOUTUBE_API_KEY=` with the comment `# YouTube Data API v3 key (no expiry). Without it the site falls back to RSS, which YouTube blocks from cloud builders.`

- [ ] **Step 4: Verify where the network allows it**

This job cannot reach YouTube. Verify on the Vercel preview build of this branch: the build log has no `[youtube] No videos` warning, and Home's "Latest from the channel" shows a thumbnail with a Play link. Locally (owner's terminal, with the key in `.env`): `npm run build && grep -c 'i.ytimg.com' .svelte-kit/output/prerendered/pages/index.html` prints a number greater than 0.

- [ ] **Step 5: Commit**

```bash
git add src/lib/server/youtube.ts src/lib/data/channel.ts .env.example
git commit -m "fix(content): read YouTube via the Data API (by handle) so the latest video shows on Home"
```

---

### Task 11: Verify and open the PR

- [ ] **Step 1: Full local verification**

Run, in order:
```bash
npm run build
npx svelte-kit sync && node ~/.npm/_npx/db2207bf930d61c8/node_modules/svelte-check/bin/svelte-check --tsconfig ./tsconfig.json --threshold error
(npm run preview -- --port 4173 >/dev/null 2>&1 &) && node scripts/check-site.mjs
```
Expected: build passes, `0 errors`, `All checks passed`.

- [ ] **Step 2: Screenshot every page**

With the headless shell (Global Constraints), capture `/`, `/work`, `/work/cost-reduction`, `/content`, `/about`, `/book` at `1280x2400` and `390x3600`, light and dark (`--blink-settings=preferredColorScheme=0`). Review against the Source findings table; every row except Task 8's images should be visibly resolved. Check Review Focus 3 (empty feed on Home) explicitly. Stop the preview server.

- [ ] **Step 3: Push and open the PR (owner's terminal; this job has no route to GitHub)**

```bash
git push -u origin fix/design-review
gh pr create --base feat/phase-1-funnel-revamp --head fix/design-review \
  --title "fix: design review findings and CI link check" \
  --body-file docs/superpowers/plans/2026-10-15-design-review-fixes.md
```

- [ ] **Step 4: Confirm CI is green**

All steps of the `CI` workflow pass, including lychee and Lighthouse. If Lighthouse fails, read the failing audit in the LHCI report linked from the job summary and fix that audit specifically.
