<script lang="ts">
	import '$lib/styles/global.css';
	import Navigation from '$components/layout/Navigation.svelte';
	import MobileMenu from '$components/layout/MobileMenu.svelte';
	import Footer from '$components/layout/Footer.svelte';

	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col">
	<Navigation />
	<MobileMenu />

	<main class="flex-1">
		{@render children()}
	</main>

	<Footer />
</div>
