<script lang="ts">
	interface Props {
		title: string;
		description: string;
		canonical?: string;
		ogImage?: string;
		ogType?: 'website' | 'article';
		article?: {
			publishedTime?: string;
			modifiedTime?: string;
			author?: string;
			tags?: string[];
		};
		noindex?: boolean;
	}

	let {
		title,
		description,
		canonical = '',
		ogImage = '/og-default.png',
		ogType = 'website',
		article,
		noindex = false
	}: Props = $props();

	const siteUrl = 'https://codefred.dev';
	const fullCanonical = canonical || siteUrl;
	const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;
	const twitterHandle = '@codefred';
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}

	<!-- Canonical URL -->
	<link rel="canonical" href={fullCanonical} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={ogType} />
	<meta property="og:url" content={fullCanonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={fullOgImage} />
	<meta property="og:site_name" content="Codefred" />

	{#if article}
		{#if article.publishedTime}
			<meta property="article:published_time" content={article.publishedTime} />
		{/if}
		{#if article.modifiedTime}
			<meta property="article:modified_time" content={article.modifiedTime} />
		{/if}
		{#if article.author}
			<meta property="article:author" content={article.author} />
		{/if}
		{#if article.tags}
			{#each article.tags as tag}
				<meta property="article:tag" content={tag} />
			{/each}
		{/if}
	{/if}

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={fullCanonical} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={fullOgImage} />
	<meta property="twitter:creator" content={twitterHandle} />

	<!-- Additional SEO -->
	<meta name="author" content="Alfred Emmanuel (Codefred)" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="theme-color" content="#0EA5E9" />
</svelte:head>
