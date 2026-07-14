/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useMemo } from "react";
import { blogs as initialBlogs } from "../data/blogMetadata";

const BlogContext = createContext(null);

export const BlogProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Derive unique categories across all posts
  const categories = useMemo(() => {
    const allCats = initialBlogs.flatMap((blog) => blog.category || []);
    return [...new Set(allCats)];
  }, []);

  // Comprehensive multi-field filter logic for home dashboard
  const filteredBlogs = useMemo(() => {
    const cleanQuery = searchQuery.trim().toLowerCase();

    return initialBlogs.filter((blog) => {
      // Cross-validate category capsule selection filter first
      const matchesCategory = selectedCategory
        ? blog.category?.includes(selectedCategory)
        : true;
      if (!matchesCategory) return false;

      // Short-circuit if search bar query input is completely empty
      if (!cleanQuery) return true;

      // Normalize string fields for match verification
      const matchesTitle = blog.title?.toLowerCase().includes(cleanQuery);
      const matchesDescription = blog.description
        ?.toLowerCase()
        .includes(cleanQuery);

      // Scan the category array items for matching strings
      const matchesCategoryList = blog.category?.some((cat) =>
        cat.toLowerCase().includes(cleanQuery),
      );

      // Scan the tag array items for matching strings
      const matchesTags = blog.tags?.some((tag) =>
        tag.toLowerCase().includes(cleanQuery),
      );

      // Return true if any metadata attribute yields a positive search match string
      return (
        matchesTitle || matchesDescription || matchesCategoryList || matchesTags
      );
    });
  }, [searchQuery, selectedCategory]);

  const getPostBySlug = (slug) => {
    return initialBlogs.find((blog) => blog.slug === slug);
  };

  const getAdjacentPosts = (slug) => {
    const currentIndex = initialBlogs.findIndex((blog) => blog.slug === slug);

    if (currentIndex === -1) {
      return { previous: null, next: null };
    }

    const previous = currentIndex > 0 ? initialBlogs[currentIndex - 1] : null;
    const next =
      currentIndex < initialBlogs.length - 1
        ? initialBlogs[currentIndex + 1]
        : null;

    return { previous, next };
  };

  // Get all labs from all posts (for search/filtering)
  const getAllLabs = () => {
    const allLabs = [];
    initialBlogs.forEach((post) => {
      if (post.labs && post.labs.length > 0) {
        post.labs.forEach((lab) => {
          allLabs.push({
            ...lab,
            parentPostSlug: post.slug,
            parentPostTitle: post.title,
          });
        });
      }
    });
    return allLabs;
  };

  // Get lab by slug (search across all posts)
  const getLabBySlug = (slug) => {
    for (const post of initialBlogs) {
      if (post.labs) {
        const lab = post.labs.find((l) => l.slug === slug);
        if (lab) {
          return {
            ...lab,
            parentPostSlug: post.slug,
            parentPostTitle: post.title,
          };
        }
      }
    }
    return null;
  };

  // Get labs for a specific post
  const getLabsForPost = (postSlug) => {
    const post = getPostBySlug(postSlug);
    return post?.labs || [];
  };

  return (
    <BlogContext.Provider
      value={{
        blogs: initialBlogs,
        filteredBlogs,
        categories,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        getPostBySlug,
        getAdjacentPosts,
        getAllLabs,
        getLabBySlug,
        getLabsForPost,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error("useBlog must be used within a BlogProvider");
  return context;
};
