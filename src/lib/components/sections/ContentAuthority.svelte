<script lang="ts">
	import { onMount } from 'svelte';
	import { personalData } from '$data/personal';

	let githubData = $state<any>(null);
	let devToArticles = $state<any[]>([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			// Fetch GitHub data
			const githubRes = await fetch('/api/github');
			if (githubRes.ok) {
				const data = await githubRes.json();
				githubData = data.data;
			}

			// Fetch dev.to articles
			const devToRes = await fetch(`https://dev.to/api/articles?username=${personalData.devto}&per_page=6`);
			if (devToRes.ok) {
				const articles = await devToRes.json();
				devToArticles = articles.filter((article: any) => article.cover_image);
			}
		} catch (error) {
			console.error('Error fetching content:', error);
		} finally {
			loading = false;
		}
	});
</script>

<section id="content" class="py-20 lg:py-24 bg-bg-primary">
	<div class="container-custom">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold gradient-text mb-4">
				I Share What I Learn
			</h2>
			<p class="text-lg text-text-secondary max-w-2xl mx-auto">
				Open source contributions, technical writing, and building in public. No gatekeeping, just real knowledge transfer.
			</p>
		</div>

		{#if loading}
			<div class="text-center py-12">
				<div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand-primary border-r-transparent"></div>
			</div>
		{:else}
			<div class="grid lg:grid-cols-2 gap-8">
				<!-- GitHub Stats -->
				{#if githubData}
					<div class="bg-bg-secondary rounded-lg p-6 lg:p-8 border border-bg-accent">
						<div class="flex items-center gap-3 mb-6">
							<svg class="w-8 h-8 text-brand-primary" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
							</svg>
							<div>
								<h3 class="text-xl font-display font-bold text-text-primary">GitHub Activity</h3>
								<p class="text-sm text-text-muted">Building in public</p>
							</div>
						</div>

						<div class="grid grid-cols-3 gap-4 mb-6">
							<div class="text-center p-4 bg-bg-accent rounded-lg">
								<div class="text-2xl font-bold text-brand-primary">{githubData.user.publicRepos}</div>
								<div class="text-xs text-text-muted">Public Repos</div>
							</div>
							<div class="text-center p-4 bg-bg-accent rounded-lg">
								<div class="text-2xl font-bold text-brand-primary">{githubData.user.followers}</div>
								<div class="text-xs text-text-muted">Followers</div>
							</div>
							<div class="text-center p-4 bg-bg-accent rounded-lg">
								<div class="text-2xl font-bold text-brand-primary">{githubData.repos.reduce((acc: number, repo: any) => acc + repo.stars, 0)}</div>
								<div class="text-xs text-text-muted">Total Stars</div>
							</div>
						</div>

						<div class="space-y-3">
							<p class="text-sm font-semibold text-text-primary">Top Repositories:</p>
							{#each githubData.repos.slice(0, 3) as repo}
								<a
									href={repo.url}
									target="_blank"
									rel="noopener noreferrer"
									class="block p-3 bg-bg-accent rounded-lg hover:bg-brand-primary/10 transition-colors group"
								>
									<div class="flex items-start justify-between gap-4">
										<div class="flex-1 min-w-0">
											<h4 class="font-semibold text-text-primary group-hover:text-brand-primary transition-colors truncate">
												{repo.name}
											</h4>
											<p class="text-sm text-text-muted line-clamp-1">{repo.description || 'No description'}</p>
										</div>
										<div class="flex items-center gap-3 text-xs text-text-muted">
											{#if repo.language}
												<span class="px-2 py-1 bg-brand-primary/20 rounded">{repo.language}</span>
											{/if}
											<span class="flex items-center gap-1">
												<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
												{repo.stars}
											</span>
										</div>
									</div>
								</a>
							{/each}
						</div>

						<a
							href="https://github.com/{personalData.github}"
							target="_blank"
							rel="noopener noreferrer"
							class="block mt-6 text-center py-2 text-brand-primary hover:text-brand-secondary transition-colors font-semibold"
						>
							View All on GitHub →
						</a>
					</div>
				{/if}

				<!-- Dev.to Blog Posts -->
				<div class="bg-bg-secondary rounded-lg p-6 lg:p-8 border border-bg-accent">
					<div class="flex items-center gap-3 mb-6">
						<svg class="w-8 h-8 text-brand-primary" fill="currentColor" viewBox="0 0 24 24">
							<path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.3zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z"/>
						</svg>
						<div>
							<h3 class="text-xl font-display font-bold text-text-primary">Technical Writing</h3>
							<p class="text-sm text-text-muted">Recent articles</p>
						</div>
					</div>

					{#if devToArticles.length > 0}
						<div class="space-y-4">
							{#each devToArticles.slice(0, 3) as article}
								<a
									href={article.url}
									target="_blank"
									rel="noopener noreferrer"
									class="block group"
								>
									<div class="flex gap-4">
										{#if article.cover_image}
											<img
												src={article.cover_image}
												alt={article.title}
												class="w-20 h-20 object-cover rounded-lg"
											/>
										{/if}
										<div class="flex-1 min-w-0">
											<h4 class="font-semibold text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2 mb-1">
												{article.title}
											</h4>
											<div class="flex items-center gap-3 text-xs text-text-muted">
												<span>{new Date(article.published_at).toLocaleDateString()}</span>
												<span>•</span>
												<span>{article.reading_time_minutes} min read</span>
												<span>•</span>
												<span class="flex items-center gap-1">
													<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
														<path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
													</svg>
													{article.public_reactions_count}
												</span>
											</div>
										</div>
									</div>
								</a>
							{/each}
						</div>

						<a
							href="https://dev.to/{personalData.devUsername}"
							target="_blank"
							rel="noopener noreferrer"
							class="block mt-6 text-center py-2 text-brand-primary hover:text-brand-secondary transition-colors font-semibold"
						>
							Read More Articles →
						</a>
					{:else}
						<p class="text-text-muted text-center py-8">No articles found</p>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</section>
