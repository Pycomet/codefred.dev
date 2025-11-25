<script lang="ts">
	import { projects } from '$data/projects';
	import Card from '$components/ui/Card.svelte';
	import Badge from '$components/ui/Badge.svelte';
	import SEO from '$components/SEO.svelte';
</script>

<SEO
	title="Projects | Codefred - AI & Full-Stack Portfolio"
	description="Explore all my projects: from AI accountability SaaS to computer vision systems, semantic search, and full-stack applications. Built with Python, SvelteKit, and modern AI tools."
	canonical="https://codefred.dev/projects"
	ogImage="/og-projects.png"
/>

<div class="py-20 bg-bg-primary">
	<div class="container-custom">
		<!-- Header -->
		<div class="text-center mb-16">
			<h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold gradient-text mb-6">
				All Projects
			</h1>
			<p class="text-xl text-text-secondary max-w-3xl mx-auto">
				From production AI systems to personal experiments. Each project taught me something valuable that I now apply to client work.
			</p>
		</div>

		<!-- Projects Grid -->
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each projects as project}
				<Card hover class="p-6 flex flex-col group">
					<!-- Status Badge -->
					{#if project.status}
						<Badge
							variant={project.category === 'laboratory' ? 'info' : 'success'}
							size="sm"
							class="mb-4 self-start"
						>
							{project.status}
						</Badge>
					{/if}

					<!-- Title -->
					<h2 class="text-2xl font-display font-bold text-text-primary mb-2 group-hover:text-brand-primary transition-colors">
						{project.name}
					</h2>

					<!-- Tagline -->
					<p class="text-sm text-brand-primary font-semibold mb-3">
						{project.tagline}
					</p>

					<!-- Description -->
					<p class="text-base text-text-secondary mb-4 flex-1">
						{project.description}
					</p>

					<!-- Positioning -->
					{#if project.positioning}
						<div class="mb-4 p-3 bg-bg-accent/50 border-l-4 border-brand-primary rounded">
							<p class="text-sm text-text-secondary">
								{project.positioning}
							</p>
						</div>
					{/if}

					<!-- Metrics -->
					{#if project.metrics}
						<div class="grid grid-cols-2 gap-3 mb-4">
							{#each Object.entries(project.metrics) as [key, value]}
								<div class="text-center p-3 bg-bg-accent rounded-lg">
									<div class="text-sm font-bold text-brand-primary">{value}</div>
									<div class="text-xs text-text-muted capitalize">
										{key.replace(/([A-Z])/g, ' $1').trim()}
									</div>
								</div>
							{/each}
						</div>
					{/if}

					<!-- Tech Stack -->
					<div class="mb-4">
						<div class="flex flex-wrap gap-2">
							{#each project.tools.slice(0, 4) as tool}
								<span class="px-2 py-1 bg-bg-accent text-xs font-mono text-text-secondary rounded border border-brand-primary/10">
									{tool}
								</span>
							{/each}
							{#if project.tools.length > 4}
								<span class="px-2 py-1 text-xs text-text-muted">
									+{project.tools.length - 4}
								</span>
							{/if}
						</div>
					</div>

					<!-- Links -->
					<div class="flex gap-3 mt-auto">
						{#if project.links.github}
							<a
								href={project.links.github}
								target="_blank"
								rel="noopener noreferrer"
								class="flex-1 px-4 py-2 border border-brand-primary text-brand-primary text-center rounded-lg hover:bg-brand-primary hover:text-white transition-all text-sm font-semibold"
							>
								Code
							</a>
						{/if}
						{#if project.links.demo}
							<a
								href={project.links.demo}
								target="_blank"
								rel="noopener noreferrer"
								class="flex-1 px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-center rounded-lg hover:shadow-lg hover:shadow-brand-primary/50 transition-all text-sm font-semibold"
							>
								Demo
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

		<!-- CTA -->
		<div class="mt-16 text-center p-8 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-lg border border-brand-primary/20 max-w-3xl mx-auto">
			<h3 class="text-2xl font-display font-bold text-text-primary mb-4">
				Need Something Built?
			</h3>
			<p class="text-text-secondary mb-6">
				Whether it's an AI system, full-stack application, or technical architecture - let's discuss your project.
			</p>
			<a
				href="https://cal.com/codefred/consultation"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-block px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-brand-primary/50 transition-all"
			>
				Book Free Consultation
			</a>
		</div>
	</div>
</div>
