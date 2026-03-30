<script lang="ts">
	import { contentData } from '$data/content';
	import { inview } from '$lib/actions/inview';
</script>

<section id="trust" class="py-12 lg:py-16 bg-bg-primary">
	<div class="container-custom">
		<!-- Mobile: Horizontal Scroll -->
		<div class="flex lg:hidden overflow-x-auto gap-4 pb-4 snap-x snap-mandatory -mx-4 px-4 scrollbar-hide" use:inview>
			{#each contentData.trustIndicators as indicator}
				<div class="flex-shrink-0 w-80 snap-center">
					<div class="bg-bg-secondary/50 backdrop-blur-sm rounded-lg p-6 border border-brand-primary/10 hover:border-brand-primary/30 transition-all h-full">
						<p class="text-base text-text-primary font-medium">
							{indicator}
						</p>
					</div>
				</div>
			{/each}
			<!-- Scroll hint -->
			<div class="flex-shrink-0 w-8 snap-center flex items-center">
				<div class="text-text-muted text-xs rotate-90 whitespace-nowrap">scroll</div>
			</div>
		</div>

		<!-- Desktop: Grid -->
		<div class="hidden lg:grid lg:grid-cols-3 gap-6 stagger-children" use:inview>
			{#each contentData.trustIndicators as indicator}
				<div
					class="fade-up bg-bg-secondary/50 backdrop-blur-sm rounded-lg p-6 border border-brand-primary/10 hover:border-brand-primary/30 transition-all hover:scale-105 cursor-default"
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
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
</style>
