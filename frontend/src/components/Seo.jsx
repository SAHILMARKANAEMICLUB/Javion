import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
} from '../seo/site';
import { organizationJsonLd, websiteJsonLd } from '../seo/aeo';

/**
 * Per-page SEO + AEO: title, description, OG, and JSON-LD for answer engines.
 * @param {{ title?: string, description?: string, path?: string, image?: string, noindex?: boolean, type?: string, jsonLd?: object|object[] }} props
 */
export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  noindex = false,
  type = 'website',
  jsonLd = [],
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonical = absoluteUrl(path);
  const ogImage = image?.startsWith('http') ? image : absoluteUrl(image || DEFAULT_OG_IMAGE);

  const graphs = [
    organizationJsonLd(),
    websiteJsonLd(),
    ...(Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []),
  ].filter(Boolean);

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {graphs.map((graph, i) => (
        <script key={`ld-${i}`} type="application/ld+json">
          {JSON.stringify(graph)}
        </script>
      ))}
    </Helmet>
  );
}
