<script lang="ts">
	import { onMount } from 'svelte';

	// 'system' follows prefers-color-scheme; the others pin a theme (see app.html + tokens.css)
	type Theme = 'system' | 'light' | 'dark';
	const order: Theme[] = ['system', 'light', 'dark'];
	let theme: Theme = $state('system');

	onMount(() => {
		const saved = document.documentElement.dataset.theme;
		if (saved === 'light' || saved === 'dark') theme = saved;
	});

	function cycle() {
		theme = order[(order.indexOf(theme) + 1) % order.length];
		const root = document.documentElement;
		try {
			if (theme === 'system') {
				delete root.dataset.theme;
				localStorage.removeItem('theme');
			} else {
				root.dataset.theme = theme;
				localStorage.setItem('theme', theme);
			}
		} catch {
			// Storage blocked: the choice still applies for this page view
		}
	}
</script>

<button type="button" onclick={cycle} class="min-h-11 rounded px-2 hover:text-ink">
	Theme: {theme === 'system' ? 'auto' : theme}
</button>
