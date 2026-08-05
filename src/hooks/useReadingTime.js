import { useMemo } from 'react';

export const useReadingTime = (content) => {
  const readingTime = useMemo(() => {
    if (!content) {
      return null;
    }

    // Calculate reading time
    const calculateReadingTime = (text) => {
      // Remove markdown syntax and HTML tags
      const cleanText = text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links but keep text
        .replace(/[#*_~`>+-]/g, '') // Remove markdown symbols
        .replace(/<[^>]+>/g, '') // Remove HTML tags
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();

      // Count words (split by spaces)
      const wordCount = cleanText.split(/\s+/).length;

      // Average reading speed: 200-250 words per minute
      const wordsPerMinute = 225;
      const minutes = Math.ceil(wordCount / wordsPerMinute);

      return {
        minutes,
        wordCount,
        text: minutes === 1 ? '1 min read' : `${minutes} min read`
      };
    };

    return calculateReadingTime(content);
  }, [content]);

  return readingTime;
};