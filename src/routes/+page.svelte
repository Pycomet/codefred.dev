<script lang="ts">
	import SEO from '$components/SEO.svelte';
	import Result from '$components/work/Result.svelte';
	import LiteYouTube from '$components/content/LiteYouTube.svelte';
	import PostStrip from '$components/content/PostStrip.svelte';
	import BookCall from '$components/BookCall.svelte';
	import { site } from '$lib/config/site';
	import type { Area } from '$lib/content/case-studies';
	import { portrait, roadPhotos } from '$lib/data/photos';
	import { testimonials } from '$lib/data/testimonials';
	import { generatePersonSchema } from '$lib/utils/structured-data';

	let { data } = $props();

	const services: { area: Area; title: string; line: string }[] = [
		{ area: 'ai-cost', title: 'AI cost optimisation', line: 'Caching, model routing and leaner prompts for LLM bills that grow faster than users.' },
		{ area: 'agents', title: 'Agents and LLM pipelines', line: 'Evaluation harnesses first, then faster, cheaper, multilingual agents and RAG.' },
		{ area: 'computer-vision', title: 'Computer vision', line: 'Real-time detection on edge devices that keeps working when the network does not.' },
		{ area: 'full-stack', title: 'Full-stack product builds', line: 'Python and TypeScript products from first commit to production.' }
	];

	const road = roadPhotos[0];
	const person = generatePersonSchema({
		name: site.name,
		url: site.url,
		image: `${site.url}${portrait.src}`,
		jobTitle: 'AI engineer',
		email: site.email,
		socialLinks: Object.values(site.social).map((s) => s.url)
	});
</script>

<SEO
	title="Codefred: AI engineer who cuts LLM costs and ships production AI"
	description="Senior AI engineer, 8+ years. Cut a FinTech's OpenAI bill 92%, halved worst-case LLM agent conversations, real-time computer vision on 50+ cameras. Book a call."
	canonical={site.url}
/>

<svelte:head>
	{@html `<script type="application/ld+json">${person}<\/script>`}
</svelte:head>

<!-- 1. Hero -->
<section class="wrap pt-12 sm:pt-20">
	<div class="grid items-start gap-10 md:grid-cols-[1fr_auto] md:gap-16">
		<div class="max-w-2xl">
			<h1 class="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
				I turn expensive AI problems into efficient systems.
			</h1>
			<p class="mt-6 max-w-xl text-lg text-ink-muted">
				AI engineer, 8+ years in production. I cut LLM costs, speed up agents and ship computer vision that holds up.
			</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<a href="/book" class="btn-primary" data-track="book" data-track-from="hero">Book a call</a>
				<a
					href={data.latest ? '#latest' : site.social.youtube.url}
					class="btn-quiet"
					data-track="youtube"
					data-track-from="hero">Watch my latest video</a
				>
			</div>
		</div>
		<img
			src={portrait.src}
			srcset={portrait.srcset}
			sizes="(min-width: 768px) 16rem, 8rem"
			width={portrait.width}
			height={portrait.height}
			alt={portrait.alt}
			fetchpriority="high"
			class="order-first aspect-square w-28 rounded object-cover sm:w-36 md:order-none md:w-64"
		/>
	</div>
</section>

<!-- 2. Proof strip -->
<section class="wrap mt-12 sm:mt-16" aria-labelledby="proof">
	<h2 id="proof" class="sr-only">Results</h2>
	<ul class="grid gap-px overflow-hidden rounded border border-line bg-line md:grid-cols-3">
		{#each data.proof as study}
			<li class="bg-canvas">
				<a href="/work/{study.slug}" class="group flex h-full flex-col justify-between gap-6 p-6">
					<Result result={study.result} />
					<p class="text-sm text-ink-muted">
						{study.client}
						<span class="ml-1 text-accent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">→</span>
					</p>
				</a>
			</li>
		{/each}
	</ul>
	<p class="mt-4 text-sm"><a href="/work" class="link">All case studies</a></p>
</section>

<!-- 3. Latest content -->
<section id="latest" class="wrap mt-24 scroll-mt-24 sm:mt-32" aria-labelledby="latest-h">
	<div class="flex flex-wrap items-baseline justify-between gap-4">
		<h2 id="latest-h" class="h-section">Latest from the channel</h2>
		<a
			href="{site.social.youtube.url}?sub_confirmation=1"
			class="link text-sm"
			target="_blank"
			rel="me noopener"
			data-track="youtube"
			data-track-from="home-subscribe">Subscribe on YouTube</a
		>
	</div>
	{#if data.latest}
		<div class="mt-6 grid gap-6 lg:grid-cols-[1fr_20rem] lg:gap-8">
			<div>
				<LiteYouTube video={data.latest} from="home-latest" />
				<p class="mt-3 font-medium">{data.latest.title}</p>
			</div>
			{#if data.posts.length}
				<PostStrip posts={data.posts} from="home-posts" />
			{/if}
		</div>
	{:else}
		<p class="mt-4 max-w-prose text-ink-muted">
			Build logs, AI engineering explainers and remote-work episodes, on
			<a href={site.social.youtube.url} class="link" data-track="youtube" data-track-from="home-empty">YouTube</a>
			and <a href={site.social.instagram.url} class="link" data-track="instagram" data-track-from="home-empty">Instagram</a>.
		</p>
	{/if}
</section>

<!-- 4. What I do -->
<section class="wrap mt-24 sm:mt-32" aria-labelledby="services">
	<h2 id="services" class="h-section">What I do</h2>
	<ul class="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-2">
		{#each services as s}
			<li>
				<a href={data.usedAreas.includes(s.area) ? `/work?area=${s.area}` : '/work#builds'} class="group block">
					<h3 class="font-medium group-hover:text-accent">{s.title}</h3>
					<p class="copy mt-1.5 text-ink-muted">{s.line}</p>
				</a>
			</li>
		{/each}
	</ul>
</section>

<!-- 5. About teaser -->
<section class="wrap mt-28 sm:mt-40" aria-labelledby="about-h">
	<div class="grid items-center gap-8 sm:grid-cols-[14rem_1fr] sm:gap-12">
		{#if road}
			<img
				src={road.src}
				srcset={road.srcset}
				sizes="(min-width: 640px) 14rem, 70vw"
				width={road.width}
				height={road.height}
				alt={road.alt}
				loading="lazy"
				decoding="async"
				class="aspect-[4/5] w-56 rounded object-cover sm:w-full"
			/>
		{/if}
		<div class="max-w-prose">
			<h2 id="about-h" class="h-section">Mechanical engineer turned AI engineer</h2>
			<p class="copy mt-3 text-ink-muted">
				Eight years of remote work for teams in the US, Canada and Australia, from wherever the wifi works. These
				days I build AI systems and make videos about the work.
			</p>
			<p class="mt-4 flex flex-wrap gap-x-6 gap-y-2">
				<a href="/about" class="link">More about me</a>
				<a href={site.cv} class="link" download data-track="cv" data-track-from="home-about">CV (PDF)</a>
			</p>
		</div>
	</div>
</section>

<!-- 6. Testimonials -->
<section class="wrap mt-24 sm:mt-32" aria-labelledby="quotes">
	<h2 id="quotes" class="sr-only">What people say</h2>
	<div class="grid gap-12 md:grid-cols-2">
		{#each testimonials as t}
			<figure>
				<blockquote class="text-lg leading-relaxed text-ink">“{t.quote}”</blockquote>
				<figcaption class="mt-4 text-sm">
					<span class="font-medium">{t.name}</span><span class="text-ink-muted">, {t.role}</span>
					<a href={t.source.url} class="link ml-2" target="_blank" rel="noopener">{t.source.label}</a>
				</figcaption>
			</figure>
		{/each}
	</div>
</section>

<!-- 7. Closing call to action -->
<div class="wrap mt-28 sm:mt-40">
	<BookCall
		variant="panel"
		from="home-closing"
		heading="Is an AI system costing you too much?"
		body="Tell me what you're building. In {site.booking.minutes} minutes you'll know whether I can help and roughly what it would take."
	/>
</div>
