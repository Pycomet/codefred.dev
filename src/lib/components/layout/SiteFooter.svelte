<script lang="ts">
	import { site, footerSocial } from '$lib/config/site';
	import EmailLink from '$components/ui/EmailLink.svelte';
	import ThemeToggle from '$components/ui/ThemeToggle.svelte';

	const year = new Date().getFullYear();
</script>

<footer class="mt-24 border-t border-line">
	<div class="wrap flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between">
		<div class="space-y-2">
			<p class="font-semibold tracking-tight">{site.name}</p>
			<p class="text-sm text-ink-muted">
				<EmailLink class="link" />
			</p>
		</div>

		<ul class="grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:flex sm:gap-6" aria-label="Elsewhere">
			{#each footerSocial as s}
				<li>
					<a
						href={s.url}
						rel="me noopener"
						target="_blank"
						class="text-ink-muted transition-colors hover:text-ink"
						data-track={s.label.toLowerCase()}
						data-track-from="footer">{s.label}</a
					>
				</li>
			{/each}
		</ul>
	</div>
	<div class="wrap flex items-center justify-between border-t border-line py-5 text-xs text-ink-subtle">
		<p>&copy; {year} {site.name}</p>
		<ThemeToggle />
	</div>
</footer>
