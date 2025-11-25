<script lang="ts">
	interface Props {
		title?: string;
		description?: string;
	}

	let { 
		title = 'Want similar results?',
		description = 'Book a free 15-minute consultation to discuss your project, or get a $500 quick audit.'
	}: Props = $props();
</script>

<div class="mt-20 mb-12">
	<div class="relative overflow-hidden bg-gradient-to-br from-brand-primary/10 via-bg-secondary to-brand-secondary/10 rounded-2xl p-8 lg:p-12 border border-brand-primary/20">
		<!-- Background decoration -->
		<div class="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl"></div>
		<div class="absolute bottom-0 left-0 w-64 h-64 bg-brand-secondary/20 rounded-full blur-3xl"></div>
		
		<div class="relative z-10 text-center max-w-3xl mx-auto">
			<h3 class="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
				{title}
			</h3>
			<p class="text-lg text-text-secondary mb-8">
				{description}
			</p>
			
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="https://cal.com/codefred/consultation"
					target="_blank"
					rel="noopener noreferrer"
					class="group px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-brand-primary/50 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
				>
					Book Free Call
					<svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
					</svg>
				</a>
				<a
					href="https://cal.com/codefred/quick-fix"
					target="_blank"
					rel="noopener noreferrer"
					class="px-8 py-4 border-2 border-brand-primary text-brand-primary font-semibold rounded-lg hover:bg-brand-primary hover:text-white transition-all duration-300 inline-flex items-center justify-center gap-2"
				>
					Book $500 Audit
				</a>
			</div>
			
			<p class="mt-6 text-sm text-text-muted">
				💳 No payment required to book • 📅 Free 15-min discovery call
			</p>
		</div>
	</div>
</div>

