<script lang="ts">
	interface Props {
		type?: 'info' | 'success' | 'warning' | 'tip';
		title?: string;
		children?: any;
	}

	let { type = 'info', title, children }: Props = $props();

	const styles = {
		info: {
			bg: 'bg-brand-primary/10',
			border: 'border-brand-primary/30',
			icon: '💡',
			titleColor: 'text-brand-primary'
		},
		success: {
			bg: 'bg-green-500/10',
			border: 'border-green-500/30',
			icon: '✅',
			titleColor: 'text-green-400'
		},
		warning: {
			bg: 'bg-yellow-500/10',
			border: 'border-yellow-500/30',
			icon: '⚠️',
			titleColor: 'text-yellow-400'
		},
		tip: {
			bg: 'bg-purple-500/10',
			border: 'border-purple-500/30',
			icon: '💭',
			titleColor: 'text-purple-400'
		}
	};

	const style = styles[type];
</script>

<div class="my-8 {style.bg} border-l-4 {style.border} rounded-r-xl p-6">
	<div class="flex gap-4">
		<div class="text-2xl flex-shrink-0">{style.icon}</div>
		<div class="flex-1">
			{#if title}
				<h4 class="text-lg font-semibold {style.titleColor} mb-2">{title}</h4>
			{/if}
			<div class="text-text-secondary">
				{@render children?.()}
			</div>
		</div>
	</div>
</div>

