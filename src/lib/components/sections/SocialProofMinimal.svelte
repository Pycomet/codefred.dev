<script lang="ts">
	import { inview } from '$lib/actions/inview';
	import { testimonials } from '$data/testimonials';

	// Only verified testimonials live in testimonials.ts; show up to two
	const featured = testimonials.slice(0, 2);
</script>

<section id="social-proof" class="py-24 md:py-32 bg-bg-primary">
	<div class="container-custom max-w-3xl">
		<div class="border-t border-bg-accent pt-16 space-y-16">
			{#each featured as testimonial}
				<div class="fade-up" use:inview>
					<blockquote class="text-lg md:text-xl text-text-primary leading-relaxed font-light">
						"{testimonial.content}"
					</blockquote>
					<div class="mt-6">
						{#if testimonial.linkedinUrl}
							<a
								href={testimonial.linkedinUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="text-brand-primary text-sm font-medium hover:underline">{testimonial.author}</a
							>
						{:else}
							<span class="text-brand-primary text-sm font-medium">{testimonial.author}</span>
						{/if}
						<span class="text-text-muted text-sm">&nbsp;&mdash;&nbsp;{testimonial.role}, {testimonial.company}</span>
					</div>
				</div>
			{/each}
		</div>
		<div class="border-t border-bg-accent mt-16"></div>
	</div>
</section>
