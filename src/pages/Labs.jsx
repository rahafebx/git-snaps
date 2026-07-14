import { useState, useEffect, useRef, useMemo } from "react";
import { useBlog } from "../context/BlogContext";
import LabCard from "../components/LabCard";
import { Loader2, FlaskConical } from "lucide-react";

// Define labs per page chunk
const LABS_PER_PAGE = 10;

export const Labs = () => {
  const {
    getAllLabs,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useBlog();

  // Get all labs from all posts
  const allLabs = useMemo(() => getAllLabs(), [getAllLabs]);

  // Filter labs based on search and category
  const filteredLabs = useMemo(() => {
    const cleanQuery = searchQuery.trim().toLowerCase();

    return allLabs.filter(lab => {
      // Category filter
      const matchesCategory = selectedCategory 
        ? lab.category?.includes(selectedCategory) 
        : true;
      if (!matchesCategory) return false;

      // Search filter
      if (!cleanQuery) return true;

      const matchesTitle = lab.title?.toLowerCase().includes(cleanQuery);
      const matchesDescription = lab.description?.toLowerCase().includes(cleanQuery);
      const matchesCategoryList = lab.category?.some(cat => 
        cat.toLowerCase().includes(cleanQuery)
      );
      const matchesTags = lab.tags?.some(tag => 
        tag.toLowerCase().includes(cleanQuery)
      );
      const matchesParentPost = lab.parentPostTitle?.toLowerCase().includes(cleanQuery);

      return matchesTitle || matchesDescription || matchesCategoryList || matchesTags || matchesParentPost;
    });
  }, [allLabs, searchQuery, selectedCategory]);

  // Track how many items are currently visible
  const [visibleCount, setVisibleCount] = useState(LABS_PER_PAGE);
  const [isFetching, setIsFetching] = useState(false);

  const observerRef = useRef(null);

  // Reset pagination counters whenever filters or search terms change
  useEffect(() => {
    const t = setTimeout(() => setVisibleCount(LABS_PER_PAGE), 0);
    return () => clearTimeout(t);
  }, [searchQuery, selectedCategory]);

  // Derive the precise slice of metadata array to render
  const renderedLabs = useMemo(() => {
    return filteredLabs.slice(0, visibleCount);
  }, [filteredLabs, visibleCount]);

  const hasMore = visibleCount < filteredLabs.length;

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
              Math.min(prev + LABS_PER_PAGE, filteredLabs.length),
            );
            setIsFetching(false);
          }, 800);
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [hasMore, isFetching, filteredLabs.length]);

  // Get unique categories from labs
  const labCategories = useMemo(() => {
    const allCats = allLabs.flatMap(lab => lab.category || []);
    return [...new Set(allCats)];
  }, [allLabs]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FlaskConical className="h-10 w-10 text-primary-600 dark:text-primary-400" />
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
            Git <span className="text-primary-600 dark:text-primary-400">Labs</span>
          </h1>
        </div>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Hands-on exercises to practice and master Git workflows, commands, and collaboration techniques.
        </p>

        {/* Search Bar Input */}
        <div className="mt-8 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search labs, commands, tags, or parent posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-zinc-300 bg-white px-6 py-3 text-zinc-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      {labCategories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer 
              ${!selectedCategory 
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" 
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 hover:dark:bg-zinc-700 dark:text-zinc-300"}`}
          >
            All Labs
          </button>
          {labCategories.map((cat) => (
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
      )}

      {/* Stats Bar */}
      {filteredLabs.length > 0 && (
        <div className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
          Showing {renderedLabs.length} of {filteredLabs.length} lab{filteredLabs.length > 1 ? 's' : ''}
          {selectedCategory && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>
      )}

      {/* Grid Display */}
      {renderedLabs.length > 0 ? (
        <>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {renderedLabs.map((lab) => (
              <LabCard 
                key={lab.id} 
                lab={lab} 
                parentSlug={lab.parentPostSlug}
                showParentInfo={true}
                variant="full" // Use full card variant matching BlogCard
              />
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
                <span>Loading more labs...</span>
              </div>
            )}

            {!hasMore && filteredLabs.length > LABS_PER_PAGE && (
              <div className="w-full flex items-center justify-center gap-4">
                <div className="h-px bg-zinc-200 dark:bg-zinc-800 grow max-w-xs" />
                <span className="text-xs tracking-wider font-mono uppercase text-zinc-400 dark:text-zinc-500">
                  End of labs — practice complete!
                </span>
                <div className="h-px bg-zinc-200 dark:bg-zinc-800 grow max-w-xs" />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-16 text-zinc-700 dark:text-zinc-400">
          <FlaskConical className="h-12 w-12 mx-auto mb-4 text-zinc-400 dark:text-zinc-600" />
          <p className="text-lg">No labs match your search filter criteria.</p>
          <p className="text-sm mt-2">Try adjusting your search or category filter.</p>
        </div>
      )}
    </div>
  );
};