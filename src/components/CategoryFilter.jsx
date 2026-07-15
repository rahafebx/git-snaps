export const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  allLabel = "All Posts" 
}) => {
  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      <button
        onClick={() => onCategoryChange(null)}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer 
          ${!selectedCategory 
            ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" 
            : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 hover:dark:bg-zinc-700 dark:text-zinc-300"}`}
      >
        {allLabel}
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
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
  );
};