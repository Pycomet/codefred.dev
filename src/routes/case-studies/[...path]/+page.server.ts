import { redirect } from '@sveltejs/kit';
import { getCaseStudy } from '$lib/content/case-studies';

// Old /case-studies URLs (shared links, search results) move permanently to /work
export const prerender = false;

export const load = ({ params }) => {
	const slug = params.path.split('/')[0];
	redirect(301, slug && getCaseStudy(slug) ? `/work/${slug}` : '/work');
};
