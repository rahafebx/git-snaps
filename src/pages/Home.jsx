import { useState, useEffect, useRef, useMemo } from "react";
import { useBlog } from "../context/BlogContext";
import { BlogCard } from "../components/BlogCard";
import { Loader2 } from "lucide-react";

// Define posts per page chunk
const POSTS_PER_PAGE = 10;

export const Home = () => {
  const {
    filteredBlogs,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useBlog();

  // Track how many items are currently visible
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [isFetching, setIsFetching] = useState(false);

  const observerRef = useRef(null);

  // Reset pagination counters whenever filters or search terms change
  useEffect(() => {
    // Avoid synchronous setState in effect to prevent cascading renders
    const t = setTimeout(() => setVisibleCount(POSTS_PER_PAGE), 0);
    return () => clearTimeout(t);
  }, [searchQuery, selectedCategory]);

  // Derive the precise slice of metadata array to render
  const renderedBlogs = useMemo(() => {
    return filteredBlogs.slice(0, visibleCount);
  }, [filteredBlogs, visibleCount]);

  const hasMore = visibleCount < filteredBlogs.length;

  // Infinite Scroll Trigger Hook
  useEffect(() => {
    const currentTarget = observerRef.current;
    if (!currentTarget || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isFetching) {
          // Trigger a simulated asynchronous fetch window
          setIsFetching(true);

          setTimeout(() => {
            setVisibleCount((prev) =>
              Math.min(prev + POSTS_PER_PAGE, filteredBlogs.length),
            );
            setIsFetching(false);
          }, 800); // 800ms loading window for simulated network feel
        }
      },
      { threshold: 0.1, rootMargin: "100px" }, // Pre-load 100px before reaching the exact bottom
    );

    observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [hasMore, isFetching, filteredBlogs.length]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
          Mastering{" "}
          <span className="text-primary-600 dark:text-primary-400">
            Git & GitHub
          </span>
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Bite-sized visual production tutorials, tracking version controls,
          workflows, and teamwork mechanics.
        </p>

        {/* Search Bar Input */}
        <div className="mt-8 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search git workflows, commands, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-zinc-300 bg-white px-6 py-3 text-zinc-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer 
            ${!selectedCategory 
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" 
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 hover:dark:bg-zinc-700 dark:text-zinc-300"}`}
        >
          All Posts
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer 
              ${selectedCategory === cat 
                ? "bg-primary-600 text-white" 
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 hover:dark:bg-zinc-700 dark:text-zinc-300"}`
              }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Display */}
      {renderedBlogs.length > 0 ? (
        <>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {renderedBlogs.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* Infinite Scroll Bottom Anchor Guard Element */}
          <div
            ref={observerRef}
            className="mt-16 flex flex-col items-center justify-center min-h-15"
          >
            {isFetching && (
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-medium text-sm">
                <Loader2 className="h-5 w-5 animate-spin text-primary-600 dark:text-primary-400" />
                <span>Loading more git logs...</span>
              </div>
            )}

            {!hasMore && filteredBlogs.length > POSTS_PER_PAGE && (
              <div className="w-full flex items-center justify-center gap-4">
                <div className="h-px bg-zinc-200 dark:bg-zinc-800 grow max-w-xs" />
                <span className="text-xs tracking-wider font-mono uppercase text-zinc-400 dark:text-zinc-500">
                  End of results — you're fully synced
                </span>
                <div className="h-px bg-zinc-200 dark:bg-zinc-800 grow max-w-xs" />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-16 text-zinc-700 dark:text-zinc-400">
          No articles match your search filter criteria.
        </div>
      )}
    </div>
  );
};
