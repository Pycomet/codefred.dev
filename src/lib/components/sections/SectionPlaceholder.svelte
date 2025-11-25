<script lang="ts">
	interface Props {
		id: string;
		title: string;
		description?: string;
		class?: string;
	}

	let { id, title, description = 'Coming soon in Week 2-3', class: className = '' }: Props = $props();
</script>

<section {id} class="py-20 lg:py-24 bg-bg-primary {className}">
	<div class="container-custom">
		<div class="max-w-3xl mx-auto text-center">
			<h2 class="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">
				{title}
			</h2>
			<p class="text-lg text-text-secondary mb-8">
				{description}
			</p>
			<div class="inline-flex items-center space-x-2 px-6 py-3 bg-bg-secondary border border-brand-primary/20 rounded-lg">
				<div class="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>
				<span class="text-sm text-text-muted">In Progress</span>
			</div>
		</div>
	</div>
</section>
