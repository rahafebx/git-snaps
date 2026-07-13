/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useMemo } from 'react';
import { blogs as initialBlogs } from '../data/blogMetadata';

const BlogContext = createContext(null);

export const BlogProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Derive unique categories across all posts
  const categories = useMemo(() => {
    const allCats = initialBlogs.flatMap(blog => blog.category || []);
    return [...new Set(allCats)];
  }, []);

  // Comprehensive multi-field filter logic for home dashboard
  const filteredBlogs = useMemo(() => {
    const cleanQuery = searchQuery.trim().toLowerCase();

    return initialBlogs.filter(blog => {
      // Cross-validate category capsule selection filter first
      const matchesCategory = selectedCategory ? blog.category?.includes(selectedCategory) : true;
      if (!matchesCategory) return false;

      // Short-circuit if search bar query input is completely empty
      if (!cleanQuery) return true;

      // Normalize string fields for match verification
      const matchesTitle = blog.title?.toLowerCase().includes(cleanQuery);
      const matchesDescription = blog.description?.toLowerCase().includes(cleanQuery);
      
      // Scan the category array items for matching strings
      const matchesCategoryList = blog.category?.some(cat => 
        cat.toLowerCase().includes(cleanQuery)
      );

      // Scan the tag array items for matching strings
      const matchesTags = blog.tags?.some(tag => 
        tag.toLowerCase().includes(cleanQuery)
      );

      // Return true if any metadata attribute yields a positive search match string
      return matchesTitle || matchesDescription || matchesCategoryList || matchesTags;
    });
  }, [searchQuery, selectedCategory]);

  const getPostBySlug = (slug) => {
    return initialBlogs.find(blog => blog.slug === slug);
  };

  return (
    <BlogContext.Provider value={{
      blogs: initialBlogs,
      filteredBlogs,
      categories,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      getPostBySlug
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error('useBlog must be used within a BlogProvider');
  return context;
};