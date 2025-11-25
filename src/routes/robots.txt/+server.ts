import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const robots = `User-agent: *
Allow: /

Sitemap: https://codefred.dev/sitemap.xml`;

	return new Response(robots, {
		headers: {
			'Content-Type': 'text/plain',
			'Cache-Control': 'max-age=0, s-maxage=86400'
		}
	});
};
