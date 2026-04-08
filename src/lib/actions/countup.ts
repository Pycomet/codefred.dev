// src/lib/actions/countup.ts
export function countup(
	node: HTMLElement,
	options: { target: number; duration?: number; suffix?: string; prefix?: string; delay?: number }
) {
	const { target, duration = 1200, suffix = '', prefix = '', delay = 0 } = options;

	let hasAnimated = false;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && !hasAnimated) {
					hasAnimated = true;
					observer.unobserve(node);
					setTimeout(() => animate(), delay);
				}
			});
		},
		{ threshold: 0.5 }
	);

	function animate() {
		const start = performance.now();

		function step(now: number) {
			const elapsed = now - start;
			const progress = Math.min(elapsed / duration, 1);
			// Ease-out cubic
			const eased = 1 - Math.pow(1 - progress, 3);
			const current = Math.round(eased * target);
			node.textContent = `${prefix}${current}${suffix}`;

			if (progress < 1) {
				requestAnimationFrame(step);
			} else {
				node.textContent = `${prefix}${target}${suffix}`;
			}
		}

		// Respect reduced motion
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			node.textContent = `${prefix}${target}${suffix}`;
			return;
		}

		requestAnimationFrame(step);
	}

	// Set initial value
	node.textContent = `${prefix}0${suffix}`;
	observer.observe(node);

	return {
		destroy() {
			observer.unobserve(node);
		}
	};
}
