import { useState, useEffect, useCallback } from "react";
import {
  getBookmarks,
  toggleBookmark as toggleBookmarkStorage,
  BOOKMARKS_UPDATED_EVENT,
} from "../utils/bookmarks";

// Provides the current bookmarks array plus helpers, and keeps itself
// in sync across every component that uses it (same tab) and across
// browser tabs via the native "storage" event.
export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState(() => getBookmarks());

  useEffect(() => {
    const sync = () => setBookmarks(getBookmarks());

    window.addEventListener(BOOKMARKS_UPDATED_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(BOOKMARKS_UPDATED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const isBookmarked = useCallback(
    (id, slug) => bookmarks.some((b) => b.id === id && b.slug === slug),
    [bookmarks],
  );

  const toggle = useCallback((post) => {
    toggleBookmarkStorage(post);
  }, []);

  return { bookmarks, isBookmarked, toggle };
};
