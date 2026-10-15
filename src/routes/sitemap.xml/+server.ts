import { caseStudies } from '$lib/content/case-studies';
import { site } from '$lib/config/site';

export const prerender = true;

export const GET = () => {
	const paths = ['', '/work', '/content', '/about', '/book', ...caseStudies.map((c) => `/work/${c.meta.slug}`)];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${site.url}${p}</loc></url>`).join('\n')}
</urlset>`;

	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
