<script lang="ts">
	interface Props {
		title: string;
		client: string;
		role: string;
		timeline: string;
		stack: string[];
	}

	let { title, client, role, timeline, stack }: Props = $props();
</script>

<div class="relative overflow-hidden bg-gradient-to-br from-bg-secondary via-bg-primary to-bg-secondary border-b border-brand-primary/20">
	<!-- Background decoration -->
	<div class="absolute inset-0 opacity-20">
		<div class="absolute top-0 right-0 w-96 h-96 bg-brand-primary rounded-full blur-3xl"></div>
		<div class="absolute bottom-0 left-0 w-96 h-96 bg-brand-secondary rounded-full blur-3xl"></div>
	</div>

	<div class="container-custom relative z-10 py-16 lg:py-20">
		<!-- Back button -->
		<a
			href="/case-studies"
			class="inline-flex items-center gap-2 text-text-secondary hover:text-brand-primary transition-colors mb-8 group"
		>
			<svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			Back to Case Studies
		</a>

		<!-- Title -->
		<h1 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold gradient-text mb-6 max-w-4xl">
			{title}
		</h1>

		<!-- Meta info grid -->
		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
			<div class="bg-bg-secondary/50 backdrop-blur-sm rounded-lg p-4 border border-brand-primary/10">
				<div class="text-xs text-text-muted uppercase tracking-wide mb-1">Client</div>
				<div class="text-lg font-semibold text-text-primary">{client}</div>
			</div>
			<div class="bg-bg-secondary/50 backdrop-blur-sm rounded-lg p-4 border border-brand-primary/10">
				<div class="text-xs text-text-muted uppercase tracking-wide mb-1">Role</div>
				<div class="text-lg font-semibold text-text-primary">{role}</div>
			</div>
			<div class="bg-bg-secondary/50 backdrop-blur-sm rounded-lg p-4 border border-brand-primary/10">
				<div class="text-xs text-text-muted uppercase tracking-wide mb-1">Timeline</div>
				<div class="text-lg font-semibold text-text-primary">{timeline}</div>
			</div>
		</div>

		<!-- Tech stack -->
		<div class="bg-bg-secondary/30 backdrop-blur-sm rounded-lg p-6 border border-brand-primary/10">
			<div class="text-xs text-text-muted uppercase tracking-wide mb-3">Tech Stack</div>
			<div class="flex flex-wrap gap-2">
				{#each stack as tech}
					<span class="px-3 py-1.5 bg-bg-accent text-sm font-mono text-text-secondary rounded-full border border-brand-primary/20 hover:border-brand-primary/50 transition-colors">
						{tech}
					</span>
				{/each}
			</div>
		</div>
	</div>
</div>

