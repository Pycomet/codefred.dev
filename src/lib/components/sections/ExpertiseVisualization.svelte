<script lang="ts">
	import { expertiseCategories } from '$data/expertise';
	import { inview } from '$lib/actions/inview';
</script>

<section id="skills" class="py-20 lg:py-24 bg-bg-secondary/30">
	<div class="container-custom">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary mb-4">
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
