<script lang="ts">
	import { page } from '$app/state';
	import { site, nav } from '$lib/config/site';

	const isActive = (href: string) =>
		page.url.pathname === href || page.url.pathname.startsWith(href + '/');

	// Close the mobile menu after navigating
	let menu: HTMLDetailsElement | undefined = $state();
	$effect(() => {
		page.url.pathname;
		if (menu) menu.open = false;
	});
</script>

<a href="#main" class="skip-link">Skip to content</a>

<header class="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur-sm">
	<div class="wrap flex h-16 items-center justify-between gap-6">
		<a href="/" class="text-[15px] font-semibold tracking-tight text-ink">{site.name}</a>

		<nav aria-label="Main" class="hidden items-center gap-8 md:flex">
			{#each nav as item}
				<a
					href={item.href}
					aria-current={isActive(item.href) ? 'page' : undefined}
					class="text-sm transition-colors {isActive(item.href)
						? 'text-ink'
						: 'text-ink-muted hover:text-ink'}">{item.label}</a
				>
			{/each}
			<a href="/book" class="btn-primary" data-track="book" data-track-from="header">Book a call</a>
		</nav>

		<!-- Phones: native disclosure, works before hydration -->
		<details bind:this={menu} class="group relative md:hidden">
			<summary
				class="flex h-10 cursor-pointer list-none items-center rounded px-2 text-sm text-ink [&::-webkit-details-marker]:hidden"
			>
				<span class="group-open:hidden">Menu</span>
				<span class="hidden group-open:inline">Close</span>
			</summary>
			<nav
				aria-label="Main"
				class="absolute right-0 top-12 w-56 rounded border border-line bg-canvas p-2 shadow-lg shadow-ink/5"
			>
				{#each nav as item}
					<a
						href={item.href}
						aria-current={isActive(item.href) ? 'page' : undefined}
						class="block rounded px-3 py-2.5 text-sm {isActive(item.href) ? 'text-ink' : 'text-ink-muted'}"
						>{item.label}</a
					>
				{/each}
				<a href="/book" class="btn-primary mt-2 w-full" data-track="book" data-track-from="header">Book a call</a>
			</nav>
		</details>
	</div>
</header>
