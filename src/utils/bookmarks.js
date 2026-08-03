// Bookmarks are stored in localStorage as a simple array of
// { id, slug } references, e.g. [{ id: 1, slug: "git-basics" }, ...]
// We keep only the reference, never the full post payload, so bookmarks
// always stay in sync with the live blog data.

const STORAGE_KEY = "git-snaps-bookmarks";

// Custom event fired whenever bookmarks change, so every component using
// the useBookmarks hook (even ones far apart in the tree) can re-sync in
// the same tab. The native "storage" event only fires in *other* tabs.
export const BOOKMARKS_UPDATED_EVENT = "git-snaps-bookmarks-updated";

const readBookmarks = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeBookmarks = (bookmarks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  window.dispatchEvent(new CustomEvent(BOOKMARKS_UPDATED_EVENT));
  return bookmarks;
};

export const getBookmarks = () => readBookmarks();

export const isBookmarked = (id, slug) =>
  readBookmarks().some((b) => b.id === id && b.slug === slug);

// Adds the post reference if it doesn't exist yet, removes it if it does.
export const toggleBookmark = (post) => {
  const { id, slug } = post;
  const bookmarks = readBookmarks();
  const existingIndex = bookmarks.findIndex(
    (b) => b.id === id && b.slug === slug,
  );

  const next =
    existingIndex > -1
      ? bookmarks.filter((_, i) => i !== existingIndex)
      : [...bookmarks, { id, slug }];

  return writeBookmarks(next);
};

export const removeBookmark = (id, slug) => {
  const next = readBookmarks().filter(
    (b) => !(b.id === id && b.slug === slug),
  );
  return writeBookmarks(next);
};

// Merges a list of imported { id, slug } entries into the current
// bookmarks array. An entry is only added when:
//   1. It resolves to a real post in the blog data (same id AND slug)
//   2. It isn't already present in the current bookmarks array
// Anything else is silently skipped and counted for the caller to report.
export const importBookmarks = (entries, blogPosts) => {
  const current = readBookmarks();
  const currentKeys = new Set(current.map((b) => `${b.id}::${b.slug}`));
  const validKeys = new Set(blogPosts.map((p) => `${p.id}::${p.slug}`));

  const additions = [];
  let imported = 0;
  let skippedInvalid = 0;
  let skippedDuplicate = 0;

  (entries || []).forEach((entry) => {
    if (!entry || typeof entry !== "object") {
      skippedInvalid++;
      return;
    }

    const { id, slug } = entry;
    if (id === undefined || id === null || !slug) {
      skippedInvalid++;
      return;
    }

    const key = `${id}::${slug}`;

    if (!validKeys.has(key)) {
      skippedInvalid++;
      return;
    }

    if (currentKeys.has(key)) {
      skippedDuplicate++;
      return;
    }

    additions.push({ id, slug });
    currentKeys.add(key);
    imported++;
  });

  if (additions.length > 0) {
    writeBookmarks([...current, ...additions]);
  }

  return { imported, skippedInvalid, skippedDuplicate };
};
