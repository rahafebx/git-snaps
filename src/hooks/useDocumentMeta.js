import { useEffect } from 'react';

export const useDocumentMeta = (item) => {
  useEffect(() => {
    if (!item) return;

    // Save initial defaults to restore on unmount
    const previousTitle = document.title;
    
    // Determine if this is a lab or a post
    const isLab = item.isLab || false;
    const prefix = isLab ? 'Lab' : 'Post';
    
    // Update structural text parameters
    document.title = `${prefix}: ${item.title} | git_snaps`;

    // Internal lookup configuration helper
    const setMetaTag = (property, value, isName = false) => {
      const attribute = isName ? 'name' : 'property';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    const shareUrl = window.location.href;
    const imageUrl = item.thumb ? window.location.origin + item.thumb : null;

    // Determine the default description based on type
    const defaultDescription = isLab 
      ? 'Hands-on lab exercise for mastering Git & GitHub workflows.' 
      : 'Mastering Git & GitHub workflows.';

    // Apply Standard Open Graph Metrics
    setMetaTag('og:title', `${prefix}: ${item.title}`);
    setMetaTag('og:description', item.description || defaultDescription);
    if (imageUrl) {
      setMetaTag('og:image', imageUrl);
    }
    setMetaTag('og:url', shareUrl);
    setMetaTag('og:type', isLab ? 'article' : 'article');

    // Apply X / Twitter Card Fallbacks
    setMetaTag('twitter:card', 'summary_large_image', true);
    setMetaTag('twitter:title', `${prefix}: ${item.title}`, true);
    setMetaTag('twitter:description', item.description || defaultDescription, true);
    if (imageUrl) {
      setMetaTag('twitter:image', imageUrl, true);
    }

    // Add lab-specific meta tags if applicable
    if (isLab && item.parentPostTitle) {
      // Add parent post information for labs
      setMetaTag('og:parent-post', item.parentPostTitle);
      setMetaTag('twitter:label1', 'Lab from', true);
      setMetaTag('twitter:data1', item.parentPostTitle, true);
    }

    // Add tags as keywords for SEO
    if (item.tags && item.tags.length > 0) {
      const keywords = item.tags.join(', ');
      setMetaTag('keywords', keywords, true);
    }

    // Add category if available
    if (item.category && item.category.length > 0) {
      setMetaTag('category', item.category.join(', '), true);
    }

    // Set article published time
    if (item.date) {
      // Try to parse the date (assuming format like "13 July 2026")
      try {
        const parsedDate = new Date(item.date);
        if (!isNaN(parsedDate.getTime())) {
          setMetaTag('article:published_time', parsedDate.toISOString());
        }
      } catch (e) {
        // If date parsing fails, skip
      }
    }

    // Cleanup hook resets properties upon returning back out to the main home grid
    return () => {
      document.title = previousTitle;
      
      // Remove any dynamically added meta tags (optional cleanup)
      // don't remove them to avoid flickering, but restore the title
    };
  }, [item]);
};