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
	
	<!-- Robots Meta -->
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow" />
	{/if}

	<!-- Canonical URL -->
	<link rel="canonical" href={fullCanonical} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={ogType} />
	<meta property="og:url" content={fullCanonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={fullOgImage} />
	<meta property="og:image:alt" content={title} />
	<meta property="og:site_name" content="Codefred" />
	<meta property="og:locale" content="en_US" />

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
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={fullCanonical} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={fullOgImage} />
	<meta name="twitter:image:alt" content={title} />
	<meta name="twitter:creator" content={twitterHandle} />

	<!-- Additional SEO -->
	<meta name="author" content="Alfred Emmanuel (Codefred)" />
	<meta name="theme-color" content="#0EA5E9" />
</svelte:head>
