import { error } from '@sveltejs/kit';
import { caseStudies, getCaseStudy } from '$lib/content/case-studies';

export const entries = () => caseStudies.map((c) => ({ slug: c.meta.slug }));

export const load = ({ params }) => {
	const study = getCaseStudy(params.slug);
	if (!study) error(404, 'Case study not found');
	return { meta: study.meta, Body: study.component };
};
