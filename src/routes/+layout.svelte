<script lang="ts">
	import '$lib/styles/global.css';
	import Navigation from '$components/layout/Navigation.svelte';
	import MobileMenu from '$components/layout/MobileMenu.svelte';
	import Footer from '$components/layout/Footer.svelte';
	import { browser } from '$app/environment';
	import { PUBLIC_POSTHOG_KEY, PUBLIC_POSTHOG_HOST } from '$env/static/public';
	import posthog from 'posthog-js';

	let { children } = $props();

	if (browser && PUBLIC_POSTHOG_KEY) {
		posthog.init(PUBLIC_POSTHOG_KEY, {
			api_host: PUBLIC_POSTHOG_HOST,
			person_profiles: 'identified_only'
		});
	}
</script>

<div class="min-h-screen flex flex-col">
	<Navigation />
	<MobileMenu />

	<main class="flex-1">
		{@render children()}
	</main>

	<Footer />
</div>
