import { useState, useEffect, useMemo, useRef } from 'react';

export const useInfiniteScroll = (items, itemsPerPage = 6) => {
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

  return {
    renderedItems,
    hasMore,
    isFetching,
    observerRef,
    visibleCount,
    setVisibleCount
  };
};