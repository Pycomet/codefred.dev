import { caseStudies, areas } from '$lib/content/case-studies';

export const load = () => ({
	studies: caseStudies.map((c) => c.meta),
	areas
});
