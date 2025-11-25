<script lang="ts">
	import { onMount } from 'svelte';
	import { personalData } from '$data/personal';
	import Card from '$components/ui/Card.svelte';
	import SEO from '$components/SEO.svelte';

	let articles = $state<any[]>([]);
	let loading = $state(true);
	let error = $state(false);

	onMount(async () => {
		try {
			const response = await fetch(
				`https://dev.to/api/articles?username=${personalData.devUsername}&per_page=20`
			);
			if (response.ok) {
				articles = await response.json();
			} else {
				error = true;
			}
		} catch (err) {
			console.error('Error fetching articles:', err);
			error = true;
		} finally {
			loading = false;
		}
	});

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<SEO
	title="Writing | Codefred - Technical Articles & Insights"
	description="Technical articles on AI systems, full-stack development, and production engineering. Real-world insights from building systems that scale."
	canonical="https://codefred.dev/writing"
	ogImage="/og-writing.png"
/>

<div class="py-20 bg-bg-primary">
	<div class="container-custom">
		<!-- Header -->
		<div class="text-center mb-16">
			<h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold gradient-text mb-6">
				Writing
			</h1>
			<p class="text-xl text-text-secondary max-w-3xl mx-auto">
				Technical insights, lessons learned, and thoughts on building AI systems that actually work in production. No fluff, just real-world experience.
			</p>
		</div>

		{#if loading}
			<div class="text-center py-12">
				<div class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-brand-primary border-r-transparent"></div>
				<p class="mt-4 text-text-muted">Loading articles...</p>
			</div>
		{:else if error}
			<div class="text-center py-12">
				<p class="text-text-secondary mb-4">Failed to load articles. Visit my dev.to profile directly:</p>
				<a
					href="https://dev.to/{personalData.devUsername}"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-block px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition-colors"
				>
					View on dev.to
				</a>
			</div>
		{:else if articles.length === 0}
			<div class="text-center py-12">
				<p class="text-text-secondary mb-4">No articles found yet. Check back soon!</p>
				<a
					href="https://dev.to/{personalData.devUsername}"
					target="_blank"
					rel="noopener noreferrer"
					class="text-brand-primary hover:text-brand-secondary transition-colors"
				>
					Follow on dev.to →
				</a>
			</div>
		{:else}
			<!-- Articles Grid -->
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each articles as article}
					<Card hover class="flex flex-col group overflow-hidden">
						<!-- Cover Image -->
						{#if article.cover_image}
							<div class="aspect-video overflow-hidden">
								<img
									src={article.cover_image}
									alt={article.title}
									class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								/>
							</div>
						{/if}

						<div class="p-6 flex flex-col flex-1">
							<!-- Tags -->
							<div class="flex flex-wrap gap-2 mb-3">
								{#each article.tag_list.slice(0, 3) as tag}
									<span class="px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded">
										#{tag}
									</span>
								{/each}
							</div>

							<!-- Title -->
							<h2 class="text-xl font-display font-bold text-text-primary mb-3 group-hover:text-brand-primary transition-colors line-clamp-2">
								{article.title}
							</h2>

							<!-- Description -->
							<p class="text-sm text-text-secondary mb-4 flex-1 line-clamp-3">
								{article.description || 'Read more on dev.to'}
							</p>

							<!-- Meta Info -->
							<div class="flex items-center justify-between text-xs text-text-muted mb-4">
								<span>{formatDate(article.published_at)}</span>
								<span>{article.reading_time_minutes} min read</span>
							</div>

							<!-- Stats -->
							<div class="flex items-center gap-4 text-xs text-text-muted mb-4">
								<span class="flex items-center gap-1">
									<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
										<path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
									</svg>
									{article.public_reactions_count}
								</span>
								<span class="flex items-center gap-1">
									<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
									</svg>
									{article.comments_count}
								</span>
							</div>

							<!-- Read More Link -->
							<a
								href={article.url}
								target="_blank"
								rel="noopener noreferrer"
								class="block w-full px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-center rounded-lg hover:shadow-lg hover:shadow-brand-primary/50 transition-all font-semibold"
							>
								Read Article
							</a>
						</div>
					</Card>
				{/each}
			</div>

			<!-- View More -->
			<div class="mt-12 text-center">
				<a
					href="https://dev.to/{personalData.devUsername}"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-block px-8 py-4 border border-brand-primary text-brand-primary rounded-lg hover:bg-brand-primary hover:text-white transition-all font-semibold"
				>
					View All on dev.to →
				</a>
			</div>
		{/if}
	</div>
</div>
