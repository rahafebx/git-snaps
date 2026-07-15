export const StatsBar = ({ 
  total, 
  displayed, 
  itemLabel = "post", 
  selectedCategory, 
  searchQuery 
}) => {
  if (total === 0) return null;

  return (
    <div className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
      Showing {displayed} of {total} {itemLabel}{total > 1 ? 's' : ''}
      {selectedCategory && ` in ${selectedCategory}`}
      {searchQuery && ` matching "${searchQuery}"`}
    </div>
  );
};