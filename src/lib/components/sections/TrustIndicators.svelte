<script lang="ts">
	import { contentData } from '$data/content';
	import Badge from '$components/ui/Badge.svelte';
</script>

<section id="trust" class="py-12 lg:py-16 bg-bg-primary">
	<div class="container-custom">
		<!-- Mobile: Horizontal Scroll -->
		<div class="flex lg:hidden overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
			{#each contentData.trustIndicators as indicator, i}
				<div
					class="flex-shrink-0 w-80 snap-center"
					style="animation: slideUp 0.6s ease-out {i * 0.1}s both"
				>
					<div class="bg-bg-secondary/50 backdrop-blur-sm rounded-lg p-6 border border-brand-primary/10 hover:border-brand-primary/30 transition-all h-full">
						<p class="text-base text-text-primary font-medium">
							{indicator}
						</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Desktop: Grid -->
		<div class="hidden lg:grid lg:grid-cols-3 gap-6">
			{#each contentData.trustIndicators as indicator, i}
				<div
					class="bg-bg-secondary/50 backdrop-blur-sm rounded-lg p-6 border border-brand-primary/10 hover:border-brand-primary/30 transition-all hover:scale-105 cursor-default"
					style="animation: slideUp 0.6s ease-out {i * 0.1}s both"
				>
					<p class="text-base text-text-primary font-medium">
						{indicator}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	/* Hide scrollbar but keep functionality */
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
