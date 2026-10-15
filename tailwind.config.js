/** @type {import('tailwindcss').Config} */

// Colors come from CSS variables in src/lib/styles/tokens.css (light + dark).
// Stored as "R G B" so Tailwind opacity modifiers (bg-ink/10) still work.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
	content: ['./src/**/*.{html,js,svelte,ts,md}'],
	theme: {
		extend: {
			colors: {
				canvas: token('canvas'),
				surface: token('surface'),
				line: token('line'),
				ink: {
					DEFAULT: token('ink'),
					muted: token('ink-muted'),
					subtle: token('ink-subtle')
				},
				accent: {
					DEFAULT: token('accent'),
					ink: token('accent-ink')
				}
			},
			fontFamily: {
				sans: ['Geist', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
				mono: ['Geist Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
				display: ['Geist', 'system-ui', 'sans-serif']
			},
			borderRadius: {
				// One radius for the whole site (buttons, images, inputs)
				DEFAULT: '6px'
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
