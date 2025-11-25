<script lang="ts">
	interface Props {
		quote: string;
		author: string;
		role?: string;
	}

	let { quote, author, role }: Props = $props();
</script>

<div class="my-12 relative">
	<div class="absolute -left-4 top-0 text-6xl text-brand-primary/20 font-serif">"</div>
	
	<blockquote class="relative bg-gradient-to-br from-bg-secondary to-bg-accent rounded-xl p-8 border border-brand-primary/20 shadow-lg">
		<p class="text-lg md:text-xl text-text-primary italic leading-relaxed mb-6">
			{quote}
		</p>
		
		<footer class="flex items-center gap-4">
			<div class="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold text-lg">
				{author.charAt(0)}
			</div>
			<div>
				<div class="font-semibold text-text-primary">{author}</div>
				{#if role}
					<div class="text-sm text-text-muted">{role}</div>
				{/if}
			</div>
		</footer>
	</blockquote>
</div>

