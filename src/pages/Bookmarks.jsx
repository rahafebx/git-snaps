import { useState, useRef, useMemo, useCallback } from "react";
import {
  Bookmark,
  Download,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useBlog } from "../context/BlogContext";
import { useBookmarks } from "../hooks/useBookmarks";
import { BlogCard } from "../components/BlogCard";
import { InfiniteScrollContainer } from "../components/InfiniteScrollContainer";
import { importBookmarks } from "../utils/bookmarks";

const BOOKMARKS_PER_PAGE = 6;

export const Bookmarks = () => {
  const { blogs } = useBlog();
  const { bookmarks } = useBookmarks();
  const fileInputRef = useRef(null);

  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // { type: "success" | "error", text }
  const [displayedCount, setDisplayedCount] = useState(0);

  // Resolve full post objects for every bookmarked { id, slug } reference,
  // matching against the live blog data. Anything that no longer exists
  // in blogMetadata (e.g. a post that was removed) is silently dropped.
  const bookmarkedPosts = useMemo(() => {
    return bookmarks
      .map((b) => blogs.find((post) => post.id === b.id && post.slug === b.slug))
      .filter(Boolean);
  }, [bookmarks, blogs]);

  const handleExport = useCallback(() => {
    if (bookmarkedPosts.length === 0) return;

    setStatusMessage(null);
    setIsExporting(true);

    // Wrapped in a timeout so the spinner is visible even though the
    // export itself is effectively instant.
    setTimeout(() => {
      try {
        const exportData = bookmarkedPosts.map((post) => ({
          id: post.id,
          slug: post.slug,
          title: post.title,
        }));

        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `git-snaps-bookmarks-${new Date()
          .toISOString()
          .slice(0, 10)}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setStatusMessage({
          type: "success",
          text: `Exported ${exportData.length} bookmarked post${
            exportData.length !== 1 ? "s" : ""
          } to a JSON file.`,
        });
      } catch {
        setStatusMessage({
          type: "error",
          text: "Something went wrong while exporting your bookmarks. Please try again.",
        });
      } finally {
        setIsExporting(false);
      }
    }, 600);
  }, [bookmarkedPosts]);

  const handleImportClick = () => {
    setStatusMessage(null);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    // Reset the input so selecting the same file again still fires onChange
    e.target.value = "";
    if (!file) return;

    setStatusMessage(null);
    setIsImporting(true);

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (!Array.isArray(parsed)) {
          throw new Error("Invalid bookmarks file format");
        }

        const { imported, skippedInvalid, skippedDuplicate } =
          importBookmarks(parsed, blogs);

        if (imported === 0 && skippedInvalid === 0 && skippedDuplicate === 0) {
          setStatusMessage({
            type: "error",
            text: "That file didn't contain any bookmarks to import.",
          });
        } else {
          const parts = [
            `Imported ${imported} new bookmark${imported !== 1 ? "s" : ""}.`,
          ];
          if (skippedDuplicate > 0) {
            parts.push(
              `${skippedDuplicate} already bookmarked.`,
            );
          }
          if (skippedInvalid > 0) {
            parts.push(
              `${skippedInvalid} skipped (post no longer exists).`,
            );
          }

          setStatusMessage({
            type: imported > 0 ? "success" : "error",
            text: parts.join(" "),
          });
        }
      } catch {
        setStatusMessage({
          type: "error",
          text: "Couldn't read that file. Please choose a valid bookmarks JSON export.",
        });
      } finally {
        setIsImporting(false);
      }
    };

    reader.onerror = () => {
      setIsImporting(false);
      setStatusMessage({
        type: "error",
        text: "Couldn't read that file. Please try again.",
      });
    };

    reader.readAsText(file);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-primary-50 rounded-2xl dark:bg-primary-950/50 mb-4">
          <Bookmark className="h-8 w-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl mb-4">
          Your <span className="text-primary-600 dark:text-primary-400">Bookmarks</span>
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Posts you've saved for later, stored right here in your browser.
        </p>
      </div>

      {/* Export / Import Toolbar */}
      <div className="mb-8 flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleExport}
            disabled={isExporting || bookmarkedPosts.length === 0}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-primary-400 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-primary-500 dark:hover:text-primary-400"
          >
            {isExporting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {isExporting ? "Exporting..." : "Export Bookmarks"}
          </button>

          <button
            type="button"
            onClick={handleImportClick}
            disabled={isImporting}
            className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isImporting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {isImporting ? "Importing..." : "Import Bookmarks"}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {statusMessage && (
          <div
            role="status"
            className={`flex max-w-xl items-center justify-center gap-2 rounded-lg px-4 py-2 text-center text-sm ${
              statusMessage.type === "success"
                ? "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}
      </div>

      {/* Stats Bar */}
      {bookmarkedPosts.length > 0 && (
        <div className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
          Showing {displayedCount} of {bookmarkedPosts.length} bookmarked post
          {bookmarkedPosts.length !== 1 ? "s" : ""}
        </div>
      )}

      {/* Grid Display with Infinite Scroll */}
      <InfiniteScrollContainer
        items={bookmarkedPosts}
        itemsPerPage={BOOKMARKS_PER_PAGE}
        renderItem={(post) => <BlogCard key={post.id} post={post} />}
        loadingMessage="Loading more bookmarks..."
        endMessage="End of your bookmarks"
        emptyMessage="You haven't bookmarked any posts yet."
        emptySubMessage="Tap the bookmark icon on any post card to save it here."
        showEmptyIcon={true}
        EmptyIcon={Bookmark}
        onVisibleCountChange={setDisplayedCount}
      />
    </div>
  );
};
