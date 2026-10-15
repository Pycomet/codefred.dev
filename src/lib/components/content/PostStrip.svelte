<script lang="ts">
	import type { Post } from '$lib/content/types';

	// Vertical Shorts and square Instagram posts, in a row that scrolls on phones
	let { posts, from }: { posts: Post[]; from: string } = $props();
</script>

{#if posts.length}
	<ul
		class="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0"
	>
		{#each posts as post}
			<li class="w-[42%] shrink-0 snap-start sm:w-auto">
				<a
					href={post.url}
					target="_blank"
					rel="noopener"
					class="group block overflow-hidden rounded bg-surface"
					data-track={post.kind === 'short' ? 'youtube' : 'instagram'}
					data-track-from={from}
				>
					<img
						src={post.image}
						alt={post.alt}
						loading="lazy"
						decoding="async"
						width="480"
						height="360"
						class="aspect-[4/5] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
					/>
				</a>
			</li>
		{/each}
	</ul>
{/if}
