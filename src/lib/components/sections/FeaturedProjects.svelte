<script lang="ts">
	import { getFeaturedProjects } from '$data/projects';
	import Card from '$components/ui/Card.svelte';
	import Badge from '$components/ui/Badge.svelte';

	const projects = getFeaturedProjects();
</script>

<section id="projects" class="py-20 lg:py-24 bg-bg-primary">
	<div class="container-custom">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold gradient-text mb-4">
				Featured Projects
			</h2>
			<p class="text-lg text-text-secondary max-w-2xl mx-auto">
				From my architecture lab to production AI systems serving thousands
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8">
			{#each projects as project}
				<Card hover class="p-6 lg:p-8 flex flex-col group">
					<div class="mb-4">
						{#if project.status}
							<Badge variant={project.category === 'laboratory' ? 'info' : 'success'} class="mb-3">
								{project.status}
							</Badge>
						{/if}
						<h3 class="text-2xl font-display font-bold text-text-primary mb-2 group-hover:text-brand-primary transition-colors">
							{project.name}
						</h3>
						<p class="text-sm text-brand-primary font-semibold mb-3">
							{project.tagline}
						</p>
					</div>

					<p class="text-base text-text-secondary mb-6 flex-1">
						{project.description}
					</p>

					{#if project.positioning}
						<div class="mb-6 p-4 bg-bg-accent/50 border-l-4 border-brand-primary rounded">
							<p class="text-sm text-text-secondary italic">
								💡 {project.positioning}
							</p>
						</div>
					{/if}

					{#if project.metrics}
						<div class="mb-6 grid grid-cols-2 gap-3">
							{#each Object.entries(project.metrics) as [key, value]}
								<div class="text-center p-3 bg-bg-accent rounded-lg">
									<div class="text-sm font-bold text-brand-primary">{value}</div>
									<div class="text-xs text-text-muted capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
								</div>
							{/each}
						</div>
					{/if}

					<div class="mb-6">
						<div class="flex flex-wrap gap-2">
							{#each project.tools.slice(0, 6) as tool}
								<span class="px-3 py-1 bg-bg-accent text-xs font-mono text-text-secondary rounded-full border border-brand-primary/10">
									{tool}
								</span>
							{/each}
							{#if project.tools.length > 6}
								<span class="px-3 py-1 text-xs text-text-muted">
									+{project.tools.length - 6} more
								</span>
							{/if}
						</div>
					</div>

					<div class="flex gap-3 mt-auto">
						{#if project.links.github}
							<a
								href={project.links.github}
								target="_blank"
								rel="noopener noreferrer"
								class="flex-1 px-4 py-2 border border-brand-primary text-brand-primary text-center rounded-lg hover:bg-brand-primary hover:text-white transition-all text-sm font-semibold"
							>
								View Code
							</a>
						{/if}
						{#if project.links.demo}
							<a
								href={project.links.demo}
								target="_blank"
								rel="noopener noreferrer"
								class="flex-1 px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-center rounded-lg hover:shadow-lg hover:shadow-brand-primary/50 transition-all text-sm font-semibold"
							>
								Live Demo
							</a>
						{/if}
						{#if project.links.caseStudy}
							<a
								href={project.links.caseStudy}
								class="flex-1 px-4 py-2 bg-bg-accent text-text-primary text-center rounded-lg hover:bg-brand-primary/10 transition-all text-sm font-semibold"
							>
								Case Study
							</a>
						{/if}
					</div>
				</Card>
			{/each}
		</div>
	</div>
</section>
