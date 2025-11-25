<script lang="ts">
	import { consultationPackages } from '$data/consultation-packages';
	import Badge from '$components/ui/Badge.svelte';
	import Card from '$components/ui/Card.svelte';
</script>

<section id="consultation" class="py-20 lg:py-24 bg-bg-primary">
	<div class="container-custom">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold gradient-text mb-4">
				Work With Me
			</h2>
			<p class="text-lg text-text-secondary max-w-2xl mx-auto">
				Start with a free consultation or book a quick fix for specific problems.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
			{#each consultationPackages as pkg}
				<Card hover class="p-6 flex flex-col relative overflow-hidden group">
					{#if pkg.badge}
						<div class="absolute top-4 right-4">
							<Badge variant="info">{pkg.badge}</Badge>
						</div>
					{/if}

					<div class="mb-4">
						<h3 class="text-2xl font-display font-bold text-text-primary mb-2">
							{pkg.name}
						</h3>
						<div class="flex items-baseline gap-2">
							<span class="text-3xl font-bold text-brand-primary">{pkg.price}</span>
							{#if pkg.duration}
								<span class="text-sm text-text-muted">/ {pkg.duration}</span>
							{/if}
						</div>
					</div>

					<p class="text-sm text-text-secondary mb-6">
						{pkg.description}
					</p>

					<div class="mb-6 flex-1">
						<p class="text-xs text-text-muted uppercase tracking-wide mb-3">Includes:</p>
						<ul class="space-y-2">
							{#each pkg.includes as item}
								<li class="flex items-start text-sm text-text-secondary">
									<svg class="w-5 h-5 text-brand-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
									</svg>
									{item}
								</li>
							{/each}
						</ul>
					</div>

					<div class="space-y-3">
						<a
							href="https://cal.com/{pkg.calLink}"
							target="_blank"
							rel="noopener noreferrer"
							class="block w-full px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-center font-semibold rounded-lg hover:shadow-lg hover:shadow-brand-primary/50 transition-all duration-300 hover:scale-105"
						>
							{pkg.cta}
						</a>
						<p class="text-xs text-center text-text-muted">
							{pkg.availability}
						</p>
					</div>

					<!-- Glow effect on hover -->
					<div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
						<div class="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5"></div>
					</div>
				</Card>
			{/each}
		</div>

		<div class="mt-12 text-center">
			<p class="text-sm text-text-muted">
				💡 All services include follow-up support. Payment handled via invoice after booking (Cal.com FREE plan).
			</p>
		</div>
	</div>
</section>
