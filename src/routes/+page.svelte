<script lang="ts">
	import Hero from '$components/sections/Hero.svelte';
	import TrustIndicators from '$components/sections/TrustIndicators.svelte';
	import SectionPlaceholder from '$components/sections/SectionPlaceholder.svelte';
</script>

<svelte:head>
	<title>Alfred Emmanuel | AI Systems Architect & Full-Stack Engineer</title>
	<meta name="description" content="Senior Software Engineer with 8 years shipping production AI systems. Book $500 AI strategy calls." />
</svelte:head>

<!-- Week 1 Complete -->
<Hero />
<TrustIndicators />

<!-- Week 2-3: To be built -->
<SectionPlaceholder id="about" title="About Me" description="Learn about my journey from Mechanical Engineering to AI Architecture" />
<SectionPlaceholder id="experience" title="Experience" description="8 years building production systems across multiple companies" />
<SectionPlaceholder id="skills" title="Technical Expertise" description="Interactive visualization of my skills across AI, Full-Stack, and Infrastructure" />
<SectionPlaceholder id="projects" title="Featured Projects" description="GrindProof, AI systems, and full-stack applications" />
<SectionPlaceholder id="consultation" title="Consultation Services" description="AI Audit ($500), Implementation Sprint, Fractional CTO, Emergency Rescue" class="bg-bg-secondary/30" />
<SectionPlaceholder id="contact" title="Get In Touch" description="Let's discuss how I can help with your AI implementation" />
