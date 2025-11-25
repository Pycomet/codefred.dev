<script lang="ts">
	type Variant = 'default' | 'success' | 'warning' | 'danger' | 'info';

	interface Props {
		variant?: Variant;
		class?: string;
		children?: any;
	}

	let { variant = 'default', class: className = '', children }: Props = $props();

	const variantStyles = {
		default: 'bg-bg-accent text-text-primary border border-brand-primary/20',
		success: 'bg-brand-success/20 text-brand-success border border-brand-success/30',
		warning: 'bg-brand-warning/20 text-brand-warning border border-brand-warning/30',
		danger: 'bg-brand-danger/20 text-brand-danger border border-brand-danger/30',
		info: 'bg-brand-primary/20 text-brand-primary border border-brand-primary/30'
	};

	const classes = `inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${variantStyles[variant]} ${className}`;
</script>

<span class={classes}>
	{@render children?.()}
</span>
