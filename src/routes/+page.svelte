<script lang="ts">
	import Hero from '$components/sections/Hero.svelte';
	import TrustIndicators from '$components/sections/TrustIndicators.svelte';
	import ProblemSolver from '$components/sections/ProblemSolver.svelte';
	import ConsultationOfferings from '$components/sections/ConsultationOfferings.svelte';
	import ExpertiseVisualization from '$components/sections/ExpertiseVisualization.svelte';
	import FeaturedProjects from '$components/sections/FeaturedProjects.svelte';
	import ContentAuthority from '$components/sections/ContentAuthority.svelte';
	import Differentiators from '$components/sections/Differentiators.svelte';
	import SocialProof from '$components/sections/SocialProof.svelte';
	import Contact from '$components/sections/Contact.svelte';
	import SectionPlaceholder from '$components/sections/SectionPlaceholder.svelte';
</script>

<script context="module">
	import SEO from '$components/SEO.svelte';
	import { generatePersonSchema } from '$lib/utils/structured-data';
</script>

<SEO
	title="Codefred | AI Systems Architect & Full-Stack Engineer"
	description="Senior Software Engineer with 8 years building production AI systems. Cut AI costs by 92%, build computer vision at scale. Based in Nigeria, working globally. Book $500 quick fix audits."
	canonical="https://codefred.dev"
	ogImage="/og-home.png"
/>

<svelte:head>
	{@html `<script type="application/ld+json">
		${generatePersonSchema({
			name: 'Alfred Emmanuel',
			url: 'https://codefred.dev',
			image: 'https://codefred.dev/profile.png',
			jobTitle: 'AI Systems Architect & Full-Stack Engineer',
			description: 'Senior Software Engineer specializing in AI cost optimization, computer vision, and production systems architecture. 8 years experience building scalable systems.',
			email: 'alfred@codefred.dev',
			socialLinks: [
				'https://github.com/pycomet',
				'https://linkedin.com/in/codefred',
				'https://twitter.com/codefred',
				'https://dev.to/pycomet'
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

<Hero />
<TrustIndicators />
<ProblemSolver />
<ConsultationOfferings />
<ExpertiseVisualization />
<FeaturedProjects />
<ContentAuthority />
<Differentiators />
<SocialProof />
<Contact />

<!-- Coming in Week 4 -->
<SectionPlaceholder id="about" title="About Me" description="Learn about my journey from Mechanical Engineering to AI Architecture" />
<SectionPlaceholder id="experience" title="Experience" description="8 years building production systems across multiple companies" />
