import { Helmet } from "react-helmet-async";

const SITE_NAME = "git_snaps";

// Same fallback used by SocialShare so link previews and the in-app
// share preview always agree on what image gets shown.
const DEFAULT_IMAGE = "/preview.webp";

// Renders all Open Graph / Twitter Card / SEO meta tags for a post or lab.
export const SEO = ({ item }) => {
  if (!item) return null;

  const isLab = Boolean(item.isLab);
  const prefix = isLab ? "Lab" : "Post";
  const pageTitle = `${prefix}: ${item.title} | ${SITE_NAME}`;
  const ogTitle = `${prefix}: ${item.title}`;

  const defaultDescription = isLab
    ? "Hands-on lab exercise for mastering Git & GitHub workflows."
    : "Mastering Git & GitHub workflows.";
  const description = item.description || defaultDescription;

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const imageUrl = `${origin}${item.thumb || DEFAULT_IMAGE}`;

  const keywords =
    item.tags && item.tags.length > 0 ? item.tags.join(", ") : null;
  const category =
    item.category && item.category.length > 0
      ? item.category.join(", ")
      : null;

  // Try to parse the date (assuming a format like "13 July 2026")
  let publishedTime = null;
  if (item.date) {
    const parsedDate = new Date(item.date);
    if (!isNaN(parsedDate.getTime())) {
      publishedTime = parsedDate.toISOString();
    }
  }

  return (
    <Helmet>
      <title>{pageTitle}</title>

      {/* Open Graph */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={shareUrl} />
      <meta property="og:type" content="article" />

      {/* X / Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Lab-specific parent post attribution */}
      {isLab && item.parentPostTitle && (
        <meta property="og:parent-post" content={item.parentPostTitle} />
      )}
      {isLab && item.parentPostTitle && (
        <meta name="twitter:label1" content="Lab from" />
      )}
      {isLab && item.parentPostTitle && (
        <meta name="twitter:data1" content={item.parentPostTitle} />
      )}

      {/* SEO */}
      {keywords && <meta name="keywords" content={keywords} />}
      {category && <meta name="category" content={category} />}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
    </Helmet>
  );
};
