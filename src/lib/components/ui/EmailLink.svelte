<script lang="ts">
	import type { Snippet } from 'svelte';
	import { site } from '$lib/config/site';

	// Cloudflare's Email Obfuscation rewrites plain mailto links into a JS-only
	// "[email protected]" placeholder. The email_off comments opt this link out.
	// Svelte strips template comments, so they are emitted via {@html}.
	let { class: className = '', children }: { class?: string; children?: Snippet } = $props();
</script>

{@html '<!--email_off-->'}<a href="mailto:{site.email}" class={className}
	>{#if children}{@render children()}{:else}{site.email}{/if}</a
>{@html '<!--/email_off-->'}
