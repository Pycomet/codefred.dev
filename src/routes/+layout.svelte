<script lang="ts">
	import '$lib/styles/global.css';
	import { onMount } from 'svelte';
	import Header from '$components/layout/Header.svelte';
	import SiteFooter from '$components/layout/SiteFooter.svelte';
	import { initAnalytics } from '$lib/analytics';
	import { PUBLIC_POSTHOG_KEY, PUBLIC_POSTHOG_HOST } from '$env/static/public';

	let { children } = $props();

	onMount(() => initAnalytics(PUBLIC_POSTHOG_KEY, PUBLIC_POSTHOG_HOST));
</script>

<div class="flex min-h-[100dvh] flex-col">
	<Header />
	<main id="main" class="flex-1" tabindex="-1">
		{@render children()}
	</main>
	<SiteFooter />
</div>
