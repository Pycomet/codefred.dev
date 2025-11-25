<script lang="ts">
	import Button from '$components/ui/Button.svelte';

	let formData = $state({
		name: '',
		email: '',
		message: ''
	});

	let errors = $state({
		name: '',
		email: '',
		message: ''
	});

	let isSubmitting = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');
	let statusMessage = $state('');

	// Email validation regex
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	function validateForm(): boolean {
		let isValid = true;

		// Reset errors
		errors = {
			name: '',
			email: '',
			message: ''
		};

		// Validate name
		if (!formData.name.trim()) {
			errors.name = 'Name is required';
			isValid = false;
		} else if (formData.name.trim().length < 2) {
			errors.name = 'Name must be at least 2 characters';
			isValid = false;
		}

		// Validate email
		if (!formData.email.trim()) {
			errors.email = 'Email is required';
			isValid = false;
		} else if (!emailRegex.test(formData.email.trim())) {
			errors.email = 'Please enter a valid email address';
			isValid = false;
		}

		// Validate message
		if (!formData.message.trim()) {
			errors.message = 'Message is required';
			isValid = false;
		} else if (formData.message.trim().length < 10) {
			errors.message = 'Message must be at least 10 characters';
			isValid = false;
		}

		return isValid;
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();

		// Reset submit status
		submitStatus = 'idle';
		statusMessage = '';

		// Validate form
		if (!validateForm()) {
			return;
		}

		isSubmitting = true;

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: formData.name.trim(),
					email: formData.email.trim(),
					message: formData.message.trim()
				})
			});

			const result = await response.json();

			if (result.success) {
				submitStatus = 'success';
				statusMessage = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.';

				// Reset form
				formData = {
					name: '',
					email: '',
					message: ''
				};
			} else {
				submitStatus = 'error';
				statusMessage = result.message || 'Failed to send message. Please try again.';
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			submitStatus = 'error';
			statusMessage = 'An error occurred. Please try again or reach out via email directly.';
		} finally {
			isSubmitting = false;
		}
	}

	function handleInput(field: 'name' | 'email' | 'message') {
		// Clear error when user starts typing
		if (errors[field]) {
			errors[field] = '';
		}
		// Clear status message when user starts editing
		if (submitStatus !== 'idle') {
			submitStatus = 'idle';
			statusMessage = '';
		}
	}
</script>

<form onsubmit={handleSubmit} class="space-y-6">
	<!-- Name Field -->
	<div>
		<label for="name" class="block text-sm font-semibold text-text-primary mb-2">
			Your Name <span class="text-brand-primary">*</span>
		</label>
		<input
			type="text"
			id="name"
			bind:value={formData.name}
			oninput={() => handleInput('name')}
			class="w-full px-4 py-3 bg-bg-secondary border rounded-lg focus:outline-none focus:ring-2 transition-all"
			class:border-bg-accent={!errors.name}
			class:focus:ring-brand-primary={!errors.name}
			class:border-red-500={errors.name}
			class:focus:ring-red-500={errors.name}
			placeholder="Codefred"
			disabled={isSubmitting}
		/>
		{#if errors.name}
			<p class="mt-1 text-sm text-red-500">{errors.name}</p>
		{/if}
	</div>

	<!-- Email Field -->
	<div>
		<label for="email" class="block text-sm font-semibold text-text-primary mb-2">
			Email Address <span class="text-brand-primary">*</span>
		</label>
		<input
			type="email"
			id="email"
			bind:value={formData.email}
			oninput={() => handleInput('email')}
			class="w-full px-4 py-3 bg-bg-secondary border rounded-lg focus:outline-none focus:ring-2 transition-all"
			class:border-bg-accent={!errors.email}
			class:focus:ring-brand-primary={!errors.email}
			class:border-red-500={errors.email}
			class:focus:ring-red-500={errors.email}
			placeholder="codefred@example.com"
			disabled={isSubmitting}
		/>
		{#if errors.email}
			<p class="mt-1 text-sm text-red-500">{errors.email}</p>
		{/if}
	</div>

	<!-- Message Field -->
	<div>
		<label for="message" class="block text-sm font-semibold text-text-primary mb-2">
			Your Message <span class="text-brand-primary">*</span>
		</label>
		<textarea
			id="message"
			bind:value={formData.message}
			oninput={() => handleInput('message')}
			rows="6"
			class="w-full px-4 py-3 bg-bg-secondary border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none"
			class:border-bg-accent={!errors.message}
			class:focus:ring-brand-primary={!errors.message}
			class:border-red-500={errors.message}
			class:focus:ring-red-500={errors.message}
			placeholder="Tell me about your project, challenges, or questions..."
			disabled={isSubmitting}
		></textarea>
		{#if errors.message}
			<p class="mt-1 text-sm text-red-500">{errors.message}</p>
		{/if}
	</div>

	<!-- Status Messages -->
	{#if submitStatus === 'success'}
		<div class="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
			<p class="text-sm text-green-400">{statusMessage}</p>
		</div>
	{/if}

	{#if submitStatus === 'error'}
		<div class="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
			<p class="text-sm text-red-400">{statusMessage}</p>
		</div>
	{/if}

	<!-- Submit Button -->
	<Button
		type="submit"
		variant="primary"
		size="lg"
		class="w-full"
		disabled={isSubmitting}
	>
		{#if isSubmitting}
			<span class="flex items-center justify-center gap-2">
				<svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				Sending...
			</span>
		{:else}
			Send Message
		{/if}
	</Button>

	<p class="text-xs text-center text-text-muted">
		I typically respond within 24 hours. For urgent matters, use the Emergency Rescue booking.
	</p>
</form>

<style>
	input,
	textarea {
		color: var(--text-primary);
	}

	input::placeholder,
	textarea::placeholder {
		color: var(--text-muted);
	}

	input:disabled,
	textarea:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
