import { Helmet } from "react-helmet-async";

const SITE_NAME = "git_snaps";

const DEFAULT_IMAGE = "/preview.webp";

export const SEO = ({ item = null, isPage = false }) => {
  const isLab = Boolean(item?.isLab);
  const prefix = isPage ? "" : isLab ? "Lab" : "Snap";
  const pageTitle = isPage ? SITE_NAME : `${prefix}: ${item?.title}`;
  const ogTitle = isPage ? SITE_NAME : `${prefix}: ${item?.title}`;

  const defaultDescription = isLab
    ? "Hands-on lab exercise for mastering Git & GitHub workflows."
    : "Mastering Git & GitHub workflows.";
  const description = isPage
    ? "Learn Git and GitHub with interactive labs and tutorials."
    : item?.description || defaultDescription;

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const imageUrl = isPage
    ? `${origin}${DEFAULT_IMAGE}`
    : `${origin}${item?.thumb || DEFAULT_IMAGE}`;

  const keywords = isPage
    ? "Git, GitHub, tutorial, lab"
    : item?.tags && item.tags.length > 0
      ? item.tags.join(", ")
      : null;

  const category = isPage
    ? "Git, GitHub, tutorial, lab"
    : item?.category && item.category.length > 0
      ? item.category.join(", ")
      : null;

  // Try to parse the date (assuming a format like "13 July 2026")
  let publishedTime = null;
  if (!isPage && item?.date) {
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
      {!isPage && (
        <>
          {isLab && item.parentPostTitle && (
            <meta property="og:parent-post" content={item.parentPostTitle} />
          )}
          {isLab && item.parentPostTitle && (
            <meta name="twitter:label1" content="Lab from" />
          )}
          {isLab && item.parentPostTitle && (
            <meta name="twitter:data1" content={item.parentPostTitle} />
          )}
        </>
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
