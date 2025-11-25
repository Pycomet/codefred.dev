export interface Person {
	'@type': 'Person';
	name: string;
	url: string;
	image?: string;
	jobTitle: string;
	description?: string;
	sameAs?: string[];
	email?: string;
	address?: {
		'@type': 'PostalAddress';
		addressLocality: string;
		addressCountry: string;
	};
	knowsAbout?: string[];
}

export interface Organization {
	'@type': 'Organization';
	name: string;
	url: string;
	logo?: string;
	sameAs?: string[];
}

export function generatePersonSchema(data: {
	name: string;
	url: string;
	image?: string;
	jobTitle: string;
	description?: string;
	email?: string;
	socialLinks?: string[];
	location?: { city: string; country: string };
	skills?: string[];
}): string {
	const schema: { '@context': string; '@type': 'Person'; [key: string]: any } = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: data.name,
		url: data.url,
		jobTitle: data.jobTitle
	};

	if (data.image) schema.image = data.image;
	if (data.description) schema.description = data.description;
	if (data.email) schema.email = data.email;
	if (data.socialLinks) schema.sameAs = data.socialLinks;
	if (data.skills) schema.knowsAbout = data.skills;

	if (data.location) {
		schema.address = {
			'@type': 'PostalAddress',
			addressLocality: data.location.city,
			addressCountry: data.location.country
		};
	}

	return JSON.stringify(schema);
}

export function generateArticleSchema(data: {
	headline: string;
	description: string;
	url: string;
	datePublished: string;
	dateModified?: string;
	author: {
		name: string;
		url: string;
	};
	image?: string;
}): string {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: data.headline,
		description: data.description,
		url: data.url,
		datePublished: data.datePublished,
		dateModified: data.dateModified || data.datePublished,
		author: {
			'@type': 'Person',
			name: data.author.name,
			url: data.author.url
		},
		...(data.image && { image: data.image })
	};

	return JSON.stringify(schema);
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]): string {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url
		}))
	};

	return JSON.stringify(schema);
}
