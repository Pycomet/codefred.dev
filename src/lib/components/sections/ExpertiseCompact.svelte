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
