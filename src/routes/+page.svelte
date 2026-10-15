<script lang="ts">
	import HeroRedesign from '$components/sections/HeroRedesign.svelte';
	import FeaturedCaseStudiesSticky from '$components/sections/FeaturedCaseStudiesSticky.svelte';
	import ExpertiseCompact from '$components/sections/ExpertiseCompact.svelte';
	import SocialProofMinimal from '$components/sections/SocialProofMinimal.svelte';
	import CTAContact from '$components/sections/CTAContact.svelte';
</script>

<script context="module">
	import SEO from '$components/SEO.svelte';
	import { generatePersonSchema } from '$lib/utils/structured-data';
	import { personalData } from '$data/personal';
</script>

<SEO
	title="Codefred | AI Systems Architect and Full-Stack Engineer"
	description="Senior Software Engineer with 8 years building production AI systems. Cut AI costs by 92%, build computer vision at scale. Based in Nigeria, working globally."
	canonical="https://codefred.dev"
	ogImage="/og-image.png"
/>

<svelte:head>
	{@html `<script type="application/ld+json">
		${generatePersonSchema({
			name: 'Alfred Emmanuel',
			url: 'https://codefred.dev',
			image: 'https://codefred.dev/profile.png',
			jobTitle: 'AI Systems Architect & Full-Stack Engineer',
			description: 'Senior Software Engineer specializing in AI cost optimization, computer vision, and production systems architecture. 8 years experience building scalable systems.',
			email: personalData.email,
			socialLinks: [
				personalData.social.github,
				personalData.social.linkedin,
				personalData.social.youtube!,
				personalData.social.instagram!,
				personalData.social.twitter,
				`https://dev.to/${personalData.social.devto}`
			],
			location: { city: 'Abuja', country: 'Nigeria' },
			skills: [
				'AI Systems Architecture',
				'Python',
				'FastAPI',
				'SvelteKit',
				'Machine Learning',
				'Computer Vision',
				'Cost Optimization',
				'Production Systems'
			]
		})}
	<\/script>`}
</svelte:head>

<HeroRedesign />
<FeaturedCaseStudiesSticky />
<ExpertiseCompact />
<SocialProofMinimal />
<CTAContact />
