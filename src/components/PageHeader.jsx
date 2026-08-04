export const PageHeader = ({
  icon: Icon,
  title,
  highlightedText,
  description,
  hasSearch = true,
  searchQuery,
  onSearchChange,
  searchPlaceholder,
}) => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      {Icon && (
        <div className="inline-flex items-center justify-center p-3 bg-primary-50 rounded-2xl dark:bg-primary-950/50 mb-4">
          <Icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
        </div>
      )}
      <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl mb-4">
        {title}{" "}
        {highlightedText && (
          <span className="text-primary-600 dark:text-primary-400">
            {highlightedText}
          </span>
        )}
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        {description}
      </p>

      {/* Search Bar Input */}
      {hasSearch && (
        <div className="mt-8 max-w-md mx-auto">
          <input
            type="text"
            id="search-input"
            name="search"
            placeholder={searchPlaceholder || "Search..."}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-full border border-zinc-300 bg-white px-6 py-3 text-zinc-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
        </div>
      )}
    </div>
  );
};
