import { caseStudies } from '$lib/data/case-studies';
import type { RequestHandler } from './$types';

const site = 'https://codefred.dev';

export const GET: RequestHandler = async () => {
	const pages = [
		{ url: '', priority: '1.0', changefreq: 'weekly' },
		{ url: '/about', priority: '0.8', changefreq: 'monthly' },
		{ url: '/projects', priority: '0.8', changefreq: 'weekly' },
		{ url: '/case-studies', priority: '0.9', changefreq: 'weekly' },
		{ url: '/writing', priority: '0.7', changefreq: 'weekly' },
		{ url: '/book', priority: '0.9', changefreq: 'monthly' }
	];

	// Add case study pages
	const caseStudyPages = caseStudies.map((study) => ({
		url: `/case-studies/${study.slug}`,
		priority: '0.8',
		changefreq: 'monthly'
	}));

	const allPages = [...pages, ...caseStudyPages];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
	.map(
		(page) => `  <url>
    <loc>${site}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
