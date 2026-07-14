import { useState, useEffect } from 'react';

export const useMarkdown = (slug, type = 'posts') => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Determine the path based on type
        const path = type === 'labs' 
          ? `/markdown/labs/${slug}.md` 
          : `/markdown/posts/${slug}.md`;
        
        const response = await fetch(path);
        
        if (!response.ok) {
          throw new Error(`Failed to load markdown: ${response.status}`);
        }
        
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err.message);
        console.error('Error loading markdown:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchMarkdown();
    }
  }, [slug, type]);

  return { content, loading, error };
};