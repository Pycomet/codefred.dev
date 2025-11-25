<script lang="ts">
	import { testimonials } from '$data/testimonials';
	import Card from '$components/ui/Card.svelte';
	import { onMount } from 'svelte';

	let currentIndex = $state(0);
	let intervalId: number | undefined;

	function nextTestimonial() {
		currentIndex = (currentIndex + 1) % testimonials.length;
	}

	function prevTestimonial() {
		currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
	}

	onMount(() => {
		// Auto-rotate testimonials every 8 seconds
		intervalId = window.setInterval(() => {
			nextTestimonial();
		}, 8000);

		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	});
</script>

<section id="testimonials" class="py-20 lg:py-24 bg-bg-primary">
	<div class="container-custom">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold gradient-text mb-4">
				Client Results
			</h2>
			<p class="text-lg text-text-secondary max-w-2xl mx-auto">
				Don't just take my word for it. Here's what clients say about working with me.
			</p>
		</div>

		<!-- Testimonial Carousel -->
		<div class="max-w-4xl mx-auto mb-16">
			<Card class="p-8 lg:p-12 relative">
				<!-- Quote Icon -->
				<div class="absolute top-6 left-6 text-brand-primary/20">
					<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
						<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
					</svg>
				</div>

				<!-- Testimonial Content -->
				<div class="mt-8">
					<p class="text-xl text-text-primary mb-6 leading-relaxed">
						{testimonials[currentIndex].content}
					</p>

					<div class="flex items-center gap-4">
						<div class="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
							{testimonials[currentIndex].author.charAt(0)}
						</div>
						<div>
							<p class="font-semibold text-text-primary">
								{testimonials[currentIndex].author}
							</p>
							<p class="text-sm text-text-secondary">
								{testimonials[currentIndex].role} • {testimonials[currentIndex].company}
							</p>
						</div>
					</div>

					<div class="mt-4">
						<span class="inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-semibold rounded-full">
							{testimonials[currentIndex].projectType}
						</span>
					</div>
				</div>

				<!-- Navigation Arrows -->
				<div class="flex items-center justify-center gap-4 mt-8">
					<button
						onclick={prevTestimonial}
						class="w-10 h-10 rounded-full bg-bg-accent hover:bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center transition-colors"
						aria-label="Previous testimonial"
					>
						<svg class="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
						</svg>
					</button>

					<!-- Dots Indicator -->
					<div class="flex gap-2">
						{#each testimonials as _, i}
							<button
								onclick={() => currentIndex = i}
								class="w-2 h-2 rounded-full transition-all"
								class:bg-brand-primary={i === currentIndex}
								class:w-8={i === currentIndex}
								class:bg-bg-accent={i !== currentIndex}
								aria-label="Go to testimonial {i + 1}"
							></button>
						{/each}
					</div>

					<button
						onclick={nextTestimonial}
						class="w-10 h-10 rounded-full bg-bg-accent hover:bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center transition-colors"
						aria-label="Next testimonial"
					>
						<svg class="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</button>
				</div>
			</Card>
		</div>

		<!-- Stats Grid -->
		<div class="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
			<div class="text-center p-6 bg-bg-secondary rounded-lg border border-bg-accent">
				<div class="text-4xl font-bold text-brand-primary mb-2">92%</div>
				<div class="text-sm text-text-muted">Average Cost Reduction</div>
			</div>
			<div class="text-center p-6 bg-bg-secondary rounded-lg border border-bg-accent">
				<div class="text-4xl font-bold text-brand-primary mb-2">3-8</div>
				<div class="text-sm text-text-muted">Weeks to Ship</div>
			</div>
			<div class="text-center p-6 bg-bg-secondary rounded-lg border border-bg-accent">
				<div class="text-4xl font-bold text-brand-primary mb-2">100%</div>
				<div class="text-sm text-text-muted">Uptime Track Record</div>
			</div>
			<div class="text-center p-6 bg-bg-secondary rounded-lg border border-bg-accent">
				<div class="text-4xl font-bold text-brand-primary mb-2">8+</div>
				<div class="text-sm text-text-muted">Years Experience</div>
			</div>
		</div>
	</div>
</section>
