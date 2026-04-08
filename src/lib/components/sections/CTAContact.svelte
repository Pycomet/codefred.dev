<script lang="ts">
	import { inview } from '$lib/actions/inview';
	import { personalData } from '$data/personal';
</script>

<section id="contact" class="py-32 md:py-40 bg-bg-primary">
	<div class="container-custom text-center fade-up" use:inview>
		<div class="max-w-xl mx-auto space-y-6">
			<h2 class="text-2xl md:text-3xl font-display font-semibold text-text-primary">
				Let's solve your problem
			</h2>
			<p class="text-text-secondary">
				I'm currently available for consulting engagements.
			</p>
			<div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
				<a
					href="mailto:{personalData.email}"
					class="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg hover:brightness-110 transition-all duration-300 text-center"
				>
					Get in touch
				</a>
				<a
					href="/book"
					class="text-text-secondary hover:text-brand-primary transition-colors text-sm"
				>
					or book a call
				</a>
			</div>
			<p class="text-xs text-text-muted pt-4">
				{personalData.email}
			</p>
		</div>
	</div>
</section>
