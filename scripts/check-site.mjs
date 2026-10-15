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
	check(path, 'footer links the CV', /href="\/cv\/codefred-cv\.pdf"[^>]*data-track-from="footer"/.test(body));

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
