<script lang="ts">
	import SEO from '$components/SEO.svelte';
	import EmailLink from '$components/ui/EmailLink.svelte';
	import { site } from '$lib/config/site';
	import { portrait, roadPhotos } from '$lib/data/photos';
	import { timeline, stack } from '$lib/data/timeline';
	import { generatePersonSchema } from '$lib/utils/structured-data';

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
	title="About Codefred: AI engineer, 8+ years, working remotely"
	description="Mechanical engineer turned AI engineer. 8+ years building production systems for teams in the US, Canada and Australia, plus videos about the work."
	canonical="https://codefred.dev/about"
/>

<svelte:head>
	{@html `<script type="application/ld+json">${person}<\/script>`}
</svelte:head>

<div class="wrap pt-14 sm:pt-20">
	<div class="grid gap-10 md:grid-cols-[1fr_16rem] md:gap-16">
		<div class="max-w-prose">
			<h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">About</h1>
			<div class="mt-6 space-y-5 text-[17px] leading-[1.7] text-ink-muted">
				<p>
					I studied mechanical engineering and wrote my first Python script to automate data collection for my thesis.
					I've been building software ever since: more than eight years now, almost all of it remote, for teams in the
					US, Canada and Australia.
				</p>
				<p>
					Today I'm an AI engineer at O.xyz, working on an enterprise AI IDE. Alongside that I take on a few consulting
					projects at a time: AI systems that cost too much, agents that need to get faster or multilingual, and products
					that need to ship.
				</p>
				<p>
					I also make videos about the work: build logs, plain explanations of AI engineering, and what working from
					wherever the wifi works actually looks like.
				</p>
			</div>

			<div class="mt-8 flex flex-wrap gap-3">
				<a
					href="{site.social.youtube.url}?sub_confirmation=1"
					class="btn-primary"
					target="_blank"
					rel="me noopener"
					data-track="youtube"
					data-track-from="about">Subscribe on YouTube</a
				>
				<a
					href={site.social.instagram.url}
					class="btn-quiet"
					target="_blank"
					rel="me noopener"
					data-track="instagram"
					data-track-from="about">Follow {site.social.instagram.handle}</a
				>
			</div>
			<p class="mt-4 text-sm text-ink-muted">
				Working on something? <EmailLink class="link" /> or <a href="/book" class="link" data-track="book" data-track-from="about"
					>book a call</a
				>.
			</p>
		</div>

		<img
			src={portrait.src}
			srcset={portrait.srcset}
			sizes="(min-width: 768px) 16rem, 60vw"
			width={portrait.width}
			height={portrait.height}
			alt={portrait.alt}
			class="order-first aspect-square w-48 rounded object-cover sm:w-56 md:order-none md:w-full"
		/>
	</div>

	{#if roadPhotos.length}
		<ul
			class="mt-16 grid gap-3 {roadPhotos.length === 1
				? 'max-w-sm'
				: roadPhotos.length === 2
					? 'grid-cols-2'
					: 'grid-cols-2 md:grid-cols-3'}"
			aria-label="Photos"
		>
			{#each roadPhotos as photo}
				<li>
					<figure>
						<img
							src={photo.src}
							srcset={photo.srcset}
							sizes="(min-width: 768px) 22rem, 50vw"
							width={photo.width}
							height={photo.height}
							alt={photo.alt}
							loading="lazy"
							decoding="async"
							class="w-full rounded object-cover"
						/>
						{#if photo.caption}
							<figcaption class="mt-2 text-sm text-ink-subtle">{photo.caption}</figcaption>
						{/if}
					</figure>
				</li>
			{/each}
		</ul>
	{/if}

	<section class="mt-24" aria-labelledby="timeline">
		<div class="flex flex-wrap items-baseline justify-between gap-4">
			<h2 id="timeline" class="h-section">Experience</h2>
			<a href={site.cv} class="link text-sm" download data-track="cv" data-track-from="about">Download CV (PDF)</a>
		</div>
		<ol class="mt-8 space-y-8">
			{#each timeline as m}
				<li class="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-8">
					<p class="font-mono text-sm tabular-nums text-ink-subtle">{m.years}</p>
					<div>
						<p class="font-medium">{m.role}<span class="text-ink-muted">, {m.org}</span></p>
						<p class="mt-1 max-w-prose text-ink-muted">{m.highlight}</p>
					</div>
				</li>
			{/each}
		</ol>
	</section>

	<section class="mt-24" aria-labelledby="stack">
		<h2 id="stack" class="h-section">Stack</h2>
		<dl class="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
			{#each stack as s}
				<div>
					<dt class="text-sm font-medium">{s.group}</dt>
					<dd class="mt-1.5 font-mono text-sm text-ink-muted">{s.items.join(' / ')}</dd>
				</div>
			{/each}
		</dl>
	</section>
</div>
