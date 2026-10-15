import { site } from '$lib/config/site';

export const prerender = true;

export const GET = () =>
	new Response(`User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`, {
		headers: { 'Content-Type': 'text/plain' }
	});
