import { useEffect } from 'react';

export const useDocumentMeta = (post) => {
  useEffect(() => {
    if (!post) return;

    // Save initial defaults to restore on unmount
    const previousTitle = document.title;
    
    // Update structural text parameters
    document.title = `${post.title} | git_log --blog`;

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

    // Apply Standard Open Graph Metrics
    setMetaTag('og:title', post.title);
    setMetaTag('og:description', post.description || 'Mastering Git & GitHub workflows.');
    setMetaTag('og:image', window.location.origin + post.thumb);
    setMetaTag('og:url', shareUrl);
    setMetaTag('og:type', 'article');

    // Apply X / Twitter Card Fallbacks
    setMetaTag('twitter:card', 'summary_large_image', true);
    setMetaTag('twitter:title', post.title, true);
    setMetaTag('twitter:description', post.description || 'Mastering Git & GitHub workflows.', true);
    setMetaTag('twitter:image', window.location.origin + post.thumb, true);

    // Cleanup hook resets properties upon returning back out to the main home grid
    return () => {
      document.title = previousTitle;
    };
  }, [post]);
};