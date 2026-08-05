import { useState, useEffect } from 'react';
import { useReadingTime } from './useReadingTime';

export const useMarkdown = (slug, type = 'posts') => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const readingTime = useReadingTime(content);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const path = type === 'labs' 
          ? `/markdown/labs/${slug}.md?raw` 
          : `/markdown/posts/${slug}.md?raw`;
        
        const response = await fetch(path);
        
        if (!response.ok) {
          throw new Error(`The ${type === 'labs' ? 'lab' : 'post'} content file was not found.`);
        }
        
        const text = await response.text();
        
        if (!text || text.trim() === '' || text.trim().startsWith('<!doctype html>')) {
          throw new Error(`The ${type === 'labs' ? 'lab' : 'post'} content file is empty or unavailable.`);
        }
        
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

  return { content, loading, error, readingTime };
};