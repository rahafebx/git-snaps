import { useEffect, useState } from "react";
import { useBlog } from "../context/BlogContext";
import { BlogCard } from "../components/BlogCard";
import { PageHeader } from "../components/PageHeader";
import { CategoryFilter } from "../components/CategoryFilter";
import { StatsBar } from "../components/StatsBar";
import { InfiniteScrollContainer } from "../components/InfiniteScrollContainer";

// Define posts per page chunk
const POSTS_PER_PAGE = 6;

export const Home = () => {
  const {
    filteredBlogs,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useBlog();

  const [displayedCount, setDisplayedCount] = useState(
    Math.min(POSTS_PER_PAGE, filteredBlogs.length),
  );

  useEffect(() => {
    setSearchQuery('');
    setSelectedCategory(null);
  }, [setSearchQuery, setSelectedCategory]);

  useEffect(() => {
    setDisplayedCount(Math.min(POSTS_PER_PAGE, filteredBlogs.length));
  }, [filteredBlogs.length]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <PageHeader
        title="Mastering"
        highlightedText="Git & GitHub"
        description="Bite-sized visual production tutorials, tracking version controls, workflows, and teamwork mechanics."
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search git workflows, commands, tags..."
      />

      {/* Category Filter Pills */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        allLabel="All Posts"
      />

      {/* Stats Bar */}
      <StatsBar
        total={filteredBlogs.length}
        displayed={displayedCount}
        itemLabel="post"
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
      />

      {/* Grid Display with Infinite Scroll */}
      <InfiniteScrollContainer
        items={filteredBlogs}
        itemsPerPage={POSTS_PER_PAGE}
        renderItem={(post) => <BlogCard key={post.id} post={post} />}
        loadingMessage="Loading more git logs..."
        endMessage="End of results — you're fully synced"
        emptyMessage="No articles match your search filter criteria."
        emptySubMessage="Try adjusting your search or category filter."
        onVisibleCountChange={setDisplayedCount}
      />
    </div>
  );
};