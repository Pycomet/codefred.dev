<script lang="ts">
	type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
	type Size = 'sm' | 'md' | 'lg';

	interface Props {
		variant?: Variant;
		size?: Size;
		href?: string;
		class?: string;
		onclick?: () => void;
		children?: any;
	}

	let { variant = 'primary', size = 'md', href, class: className = '', onclick, children }: Props = $props();

	const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

	const variantStyles = {
		primary: 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:shadow-lg hover:shadow-brand-primary/50 hover:scale-105',
		secondary: 'bg-bg-secondary text-text-primary border border-brand-primary/30 hover:border-brand-primary hover:bg-bg-accent',
		outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white',
		ghost: 'text-brand-primary hover:bg-brand-primary/10'
	};

	const sizeStyles = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-6 py-3 text-base',
		lg: 'px-8 py-4 text-lg'
	};

	const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
</script>

{#if href}
	<a {href} class={classes} {onclick}>
		{@render children?.()}
	</a>
{:else}
	<button class={classes} {onclick}>
		{@render children?.()}
	</button>
{/if}
