<script lang="ts">
	import Hero from '$components/sections/Hero.svelte';
	import TrustIndicators from '$components/sections/TrustIndicators.svelte';
	import ProblemSolver from '$components/sections/ProblemSolver.svelte';
	import ConsultationOfferings from '$components/sections/ConsultationOfferings.svelte';
	import ExpertiseVisualization from '$components/sections/ExpertiseVisualization.svelte';
	import FeaturedProjects from '$components/sections/FeaturedProjects.svelte';
	import CaseStudies from '$components/sections/CaseStudies.svelte';
	import ContentAuthority from '$components/sections/ContentAuthority.svelte';
	import Differentiators from '$components/sections/Differentiators.svelte';
	import SocialProof from '$components/sections/SocialProof.svelte';
	import About from '$components/sections/About.svelte';
	import Experience from '$components/sections/Experience.svelte';
	import Contact from '$components/sections/Contact.svelte';
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
<CaseStudies />
<ContentAuthority />
<Differentiators />
<SocialProof />
<About />
<Experience />
<Contact />
