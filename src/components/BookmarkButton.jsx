import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { useBookmarks } from "../hooks/useBookmarks";

// post only needs { id, slug } but is typically passed the full post object.
export const BookmarkButton = ({ post, size = "md", className = "" }) => {
  const { isBookmarked, toggle } = useBookmarks();
  const bookmarked = isBookmarked(post.id, post.slug);
  const [justToggled, setJustToggled] = useState(false);

  const sizeClasses = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const iconClasses = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  const handleClick = (e) => {
    // BookmarkButton is often nested inside a <Link>, so stop the click
    // from triggering navigation.
    e.preventDefault();
    e.stopPropagation();
    toggle(post);
    setJustToggled(true);
  };

  useEffect(() => {
    if (!justToggled) return;
    const timeout = setTimeout(() => setJustToggled(false), 450);
    return () => clearTimeout(timeout);
  }, [justToggled]);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={bookmarked}
      aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
      title={bookmarked ? "Remove bookmark" : "Add bookmark"}
      className={`inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full shadow-sm backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-90 ${
        bookmarked
          ? "bg-primary-600 text-white hover:bg-primary-700"
          : "bg-white/90 text-zinc-600 hover:text-primary-600 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:text-primary-400"
      } ${sizeClasses} ${className}`}
    >
      <Bookmark
        className={`${iconClasses} ${justToggled ? "animate-bookmark-pop" : ""}`}
        fill={bookmarked ? "currentColor" : "none"}
        strokeWidth={2}
      />
    </button>
  );
};
