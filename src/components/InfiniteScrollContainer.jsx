import { useState, useEffect, useRef, useMemo } from "react";
import { Loader2 } from "lucide-react";

export const InfiniteScrollContainer = ({
  items,
  renderItem,
  itemsPerPage = 6,
  loadingMessage = "Loading more...",
  endMessage = "End of results",
  emptyMessage = "No items found",
  emptySubMessage = "Try adjusting your search or category filter.",
  showEmptyIcon = false,
  EmptyIcon = null,
  onVisibleCountChange = null,
}) => {
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef(null);

  // Reset pagination when items change (filters change)
  useEffect(() => {
    const t = setTimeout(() => setVisibleCount(itemsPerPage), 0);
    return () => clearTimeout(t);
  }, [items, itemsPerPage]);

  const renderedItems = useMemo(() => {
    return items.slice(0, visibleCount);
  }, [items, visibleCount]);

  const hasMore = visibleCount < items.length;

  useEffect(() => {
    if (typeof onVisibleCountChange === "function") {
      onVisibleCountChange(Math.min(visibleCount, items.length));
    }
  }, [visibleCount, items.length, onVisibleCountChange]);

  // Infinite Scroll Trigger Hook
  useEffect(() => {
    const currentTarget = observerRef.current;
    if (!currentTarget || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isFetching) {
          setIsFetching(true);

          setTimeout(() => {
            setVisibleCount((prev) =>
              Math.min(prev + itemsPerPage, items.length),
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
  }, [hasMore, isFetching, items.length, itemsPerPage]);

  if (items.length === 0) {
    return (
      <div
        className="text-center py-16 text-zinc-700 dark:text-zinc-400"
      >
        {showEmptyIcon && EmptyIcon && (
          <EmptyIcon className="h-12 w-12 mx-auto mb-4 text-zinc-400 dark:text-zinc-600" />
        )}
        <p className="text-lg">{emptyMessage}</p>
        <p className="text-sm mt-2">{emptySubMessage}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {renderedItems.map((item, index) => renderItem(item, index))}
      </div>

      {/* Infinite Scroll Bottom Anchor Guard Element */}
      <div
        ref={observerRef}
        className="mt-16 flex flex-col items-center justify-center min-h-15"
      >
        {isFetching && (
          <div
            className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-medium text-sm animate-fade-in"
            style={{ animationDelay: "160ms", animationFillMode: "backwards" }}
          >
            <Loader2 className="h-5 w-5 animate-spin text-primary-600 dark:text-primary-400" />
            <span>{loadingMessage}</span>
          </div>
        )}

        {!hasMore && items.length > itemsPerPage && (
          <div
            className="w-full flex items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: "160ms", animationFillMode: "backwards" }}
          >
            <div className="h-px bg-zinc-200 dark:bg-zinc-800 grow max-w-xs" />
            <span className="text-xs tracking-wider font-mono uppercase text-zinc-400 dark:text-zinc-500">
              {endMessage}
            </span>
            <div className="h-px bg-zinc-200 dark:bg-zinc-800 grow max-w-xs" />
          </div>
        )}
      </div>
    </>
  );
};
