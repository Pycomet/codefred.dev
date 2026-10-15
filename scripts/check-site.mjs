#!/usr/bin/env node
// Checks a running copy of the site (local preview or production).
// Pages come from sitemap.xml, so new case studies are covered automatically.
//
//   node scripts/check-site.mjs                      # http://localhost:4173
//   BASE_URL=https://codefred.dev node scripts/check-site.mjs

let base = (process.env.BASE_URL ?? 'http://localhost:4173').replace(/\/$/, '');
const EMAIL = 'mailto:alfredemmanuelinyang@gmail.com';

let failures = 0;
const check = (where, what, ok, detail = '') => {
	if (!ok) {
		failures++;
		console.log(`FAIL  ${where}  ${what}${detail ? `  (${detail})` : ''}`);
	}
};

async function waitForServer() {
	for (let i = 0; i < 60; i++) {
		try {
			// Follow any host redirect (e.g. apex -> www) and test the final origin
			base = new URL((await fetch(base)).url).origin;
			return;
		} catch {
			await new Promise((r) => setTimeout(r, 500));
		}
	}
	throw new Error(`No server at ${base}`);
}

await waitForServer();

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>https:\/\/codefred\.dev([^<]*)<\/loc>/g)].map((m) => m[1] || '/');
check('/sitemap.xml', 'lists pages', paths.length >= 5, `${paths.length}`);

for (const path of paths) {
	const res = await fetch(base + path);
	const html = await res.text();
	check(path, 'returns 200', res.ok, String(res.status));

	const body = html.split(/<body[^>]*>/)[1] ?? '';
	check(path, 'has a title and description', /<title>[^<]{10,}<\/title>/.test(html) && /<meta name="description" content="[^"]{50,}"/.test(html));
	check(path, 'has exactly one h1', (body.match(/<h1[\s>]/g) ?? []).length === 1);

	// The email must always work: present, correct, and opted out of Cloudflare obfuscation
	const mailtos = body.match(/mailto:[^"]+/g) ?? [];
	check(path, 'has a working email link', mailtos.length > 0 && mailtos.every((m) => m === EMAIL));
	check(path, 'email links are inside email_off', !/mailto:/.test(body.replace(/<!--email_off-->[\s\S]*?<!--\/email_off-->/g, '')));
	check(path, 'no obfuscated email placeholder', !/email-protection|\[email&#160;protected\]|\[email protected\]/.test(html));

	check(path, 'header Book a call link', /href="\/book"[^>]*data-track="book"/.test(body));
	check(path, 'footer YouTube and Instagram links', body.includes('youtube.com/@CodefredHQ') && body.includes('instagram.com/codefredhq'));
	check(path, 'phone header has Book a call', /href="\/book"[^>]*data-track-from="header-mobile"/.test(body));
	check(path, 'no small pre-title above the h1', !/<p[^>]*>[^<]*AI engineer<\/p>\s*<h1/.test(body));
	// Case-study bodies are Markdown with their own heading styles, so only check page-level h2s
	if (!path.startsWith('/work/')) {
		check(path, 'section headings use .h-section', !/<h2(?![^>]*sr-only)(?![^>]*h-section)(?![^>]*data-heading=)[^>]*>/.test(body));
	}
	check(path, 'footer links the CV', /href="\/cv\/codefred-cv\.pdf"[^>]*data-track-from="footer"/.test(body));

	if (path.startsWith('/work/')) {
		check(path, 'body does not repeat the spec sheet headings', !/<h2[^>]*>The (problem|approach|outcome)<\/h2>/.test(body));
	}
	const visible = body.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
	check(path, 'no "Alfred" in visible text', !/\bAlfred\b/.test(visible));
	for (const [, q] of body.matchAll(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/g)) {
		const words = q.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
		check(path, `quote is 30 words or fewer (${words})`, words <= 30);
	}

	for (const img of body.match(/<img\b[^>]*>/g) ?? []) {
		check(path, 'image has alt, width and height', /\salt="/.test(img) && /\swidth="/.test(img) && /\sheight="/.test(img), img.slice(0, 80));
	}
}

// Every filter deep link must land on an area that has at least one case study
const home = await (await fetch(`${base}/`)).text();
const workHtml = await (await fetch(`${base}/work`)).text();
for (const [, area] of home.matchAll(/href="\/work\?area=([\w-]+)"/g)) {
	check('/', `area link "${area}" has case studies`, workHtml.includes(`data-area="${area}"`));
}
check('/work', 'ends with Book a call', workHtml.includes('data-track-from="work"'));
check('/', 'closing CTA is a panel', /data-cta="panel"/.test(home));
check('/', 'proof cards say "Read case study"', (home.match(/Read case study/g) ?? []).length === 3);
check('/', 'lead result is the large size', /data-result-size="xl"/.test(home));
check('/', '"wifi" line appears only on About', !/wifi/.test(home));
check('/', 'About teaser links the CV', /href="\/cv\/codefred-cv\.pdf"[^>]*data-track-from="home-about"/.test(home));

for (const [from, to] of [
	['/case-studies', '/work'],
	['/projects', '/work'],
	['/writing', '/content']
]) {
	const r = await fetch(base + from, { redirect: 'manual' });
	check(from, `redirects to ${to}`, [301, 308].includes(r.status) && r.headers.get('location')?.endsWith(to), `${r.status} ${r.headers.get('location')}`);
}

for (const asset of ['/cv/codefred-cv.pdf', '/robots.txt', '/og-image.png']) {
	const r = await fetch(base + asset);
	check(asset, 'is served', r.ok, String(r.status));
}

console.log(failures ? `\n${failures} check(s) failed on ${base}` : `All checks passed on ${base} (${paths.length} pages)`);
process.exit(failures ? 1 : 0);
