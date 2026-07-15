import { useMemo, useEffect, useState } from "react";
import { useBlog } from "../context/BlogContext";
import LabCard from "../components/LabCard";
import { PageHeader } from "../components/PageHeader";
import { CategoryFilter } from "../components/CategoryFilter";
import { StatsBar } from "../components/StatsBar";
import { InfiniteScrollContainer } from "../components/InfiniteScrollContainer";
import { FlaskConical } from "lucide-react";

// Define labs per page chunk
const LABS_PER_PAGE = 6;

export const Labs = () => {
  const {
    getAllLabs,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useBlog();

  const [displayedCount, setDisplayedCount] = useState(0);

  useEffect(() => {
    setSearchQuery("");
    setSelectedCategory(null);
  }, [setSearchQuery, setSelectedCategory]);

  // Get all labs from all posts
  const allLabs = useMemo(() => getAllLabs(), [getAllLabs]);

  // Filter labs based on search and category
  const filteredLabs = useMemo(() => {
    const cleanQuery = searchQuery.trim().toLowerCase();

    return allLabs.filter((lab) => {
      // Category filter
      const matchesCategory = selectedCategory
        ? lab.category?.includes(selectedCategory)
        : true;
      if (!matchesCategory) return false;

      // Search filter
      if (!cleanQuery) return true;

      const matchesTitle = lab.title?.toLowerCase().includes(cleanQuery);
      const matchesDescription = lab.description
        ?.toLowerCase()
        .includes(cleanQuery);
      const matchesCategoryList = lab.category?.some((cat) =>
        cat.toLowerCase().includes(cleanQuery),
      );
      const matchesTags = lab.tags?.some((tag) =>
        tag.toLowerCase().includes(cleanQuery),
      );
      const matchesParentPost = lab.parentPostTitle
        ?.toLowerCase()
        .includes(cleanQuery);

      return (
        matchesTitle ||
        matchesDescription ||
        matchesCategoryList ||
        matchesTags ||
        matchesParentPost
      );
    });
  }, [allLabs, searchQuery, selectedCategory]);

  useEffect(() => {
    setDisplayedCount(Math.min(LABS_PER_PAGE, filteredLabs.length));
  }, [filteredLabs.length]);

  // Get unique categories from labs
  const labCategories = useMemo(() => {
    const allCats = allLabs.flatMap((lab) => lab.category || []);
    return [...new Set(allCats)];
  }, [allLabs]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <PageHeader
        icon={FlaskConical}
        title="Git"
        highlightedText="Labs"
        description="Hands-on exercises to practice and master Git workflows, commands, and collaboration techniques."
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search labs, commands, tags, or parent posts..."
      />

      {/* Category Filter Pills */}
      <CategoryFilter
        categories={labCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        allLabel="All Labs"
      />

      {/* Stats Bar */}
      <StatsBar
        total={filteredLabs.length}
        displayed={displayedCount}
        itemLabel="lab"
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
      />

      {/* Grid Display with Infinite Scroll */}
      <InfiniteScrollContainer
        items={filteredLabs}
        itemsPerPage={LABS_PER_PAGE}
        renderItem={(lab) => (
          <LabCard
            key={lab.slug}
            lab={lab}
            parentSlug={lab.parentPostSlug}
            showParentInfo={true}
            variant="full"
          />
        )}
        loadingMessage="Loading more labs..."
        endMessage="End of labs — practice complete!"
        emptyMessage="No labs match your search filter criteria."
        emptySubMessage="Try adjusting your search or category filter."
        showEmptyIcon={true}
        EmptyIcon={FlaskConical}
        onVisibleCountChange={setDisplayedCount}
      />
    </div>
  );
};
