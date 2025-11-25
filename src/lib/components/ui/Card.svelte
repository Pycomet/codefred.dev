<script lang="ts">
	interface Props {
		hover?: boolean;
		class?: string;
		children?: any;
	}

	let { hover = false, class: className = '', children }: Props = $props();

	const baseStyles = 'bg-bg-secondary rounded-lg border border-bg-accent';
	const hoverStyles = hover ? 'hover:border-brand-primary/50 hover:shadow-lg hover:shadow-brand-primary/10 transition-all duration-300' : '';
	const classes = `${baseStyles} ${hoverStyles} ${className}`;
</script>

<div class={classes}>
	{@render children?.()}
</div>
