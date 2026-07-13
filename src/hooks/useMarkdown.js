import { useState, useEffect } from 'react';

export const useMarkdown = (slug) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(Boolean(slug));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    // Using Vite's dynamic import with raw qualifier
    import(`../data/${slug}.md?raw`)
      .then((res) => {
        setContent(res.default);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load markdown file:", err);
        setError("Could not load blog content. The post file might be missing.");
        setLoading(false);
      });
  }, [slug]);

  return { content, loading, error };
};