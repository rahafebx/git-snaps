import { FileText, Info } from "lucide-react";
import { Link } from "react-router-dom";
const ContentLoadingError = ({ error }) => {
  // Check if this is a "not found" or "empty" error
  const isNotFound =
    error?.includes("not found") ||
    error?.includes("moved") ||
    error?.includes("deleted");

  const isEmpty = error?.includes("empty");

  return (
    <section className="py-12 text-center">
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-4">
          {isNotFound || isEmpty ? (
            <FileText className="mx-auto h-16 w-16 text-primary-400 dark:text-primary-500" />
          ) : (
            <Info className="mx-auto h-16 w-16 text-red-400 dark:text-red-500" />
          )}
        </div>

        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
          {isNotFound && "Content Not Found"}
          {isEmpty && "Empty Content"}
          {!isNotFound && !isEmpty && "Error Loading Content"}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-300">
          {error || "An unexpected error occurred while loading the content."}
        </p>
        {isNotFound && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Please check the file path or try navigating back to the main page.
          </p>
        )}
        <Link
          to="/"
          className="mt-4 inline-block text-primary-600 dark:text-primary-400 font-medium"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
};

export default ContentLoadingError;
