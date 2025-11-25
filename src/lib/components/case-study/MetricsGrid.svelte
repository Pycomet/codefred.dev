<script lang="ts">
	interface Metric {
		value: string;
		label: string;
		highlight?: boolean;
	}

	interface Props {
		metrics: Metric[];
		title?: string;
	}

	let { metrics, title = 'Key Results' }: Props = $props();
</script>

<div class="my-12">
	{#if title}
		<h3 class="text-2xl font-display font-bold text-text-primary mb-6">{title}</h3>
	{/if}
	
	<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each metrics as metric}
			<div
				class="group relative bg-gradient-to-br from-bg-secondary to-bg-accent rounded-xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-xl {metric.highlight ? 'border-brand-primary hover:shadow-brand-primary/20' : 'border-bg-accent'}"
			>
				<!-- Glow effect for highlighted metrics -->
				{#if metric.highlight}
					<div class="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
				{/if}
				
				<div class="relative z-10 text-center">
					<div class="text-3xl lg:text-4xl font-display font-bold mb-2"
						class:gradient-text={metric.highlight}
						class:text-brand-primary={!metric.highlight}
					>
						{metric.value}
					</div>
					<div class="text-sm text-text-muted uppercase tracking-wide">
						{metric.label}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

