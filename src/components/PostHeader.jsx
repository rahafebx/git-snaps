import { TestTubeDiagonal, Asterisk } from "lucide-react";
import { BookmarkButton } from "./BookmarkButton";
const PostHeader = ({ title, date, tags, isLab = false, post = null }) => {
  return (
    <header className="mb-8">
      <span className="heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
        {title}
      </span>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        {isLab && (
          <span className="inline-flex items-center gap-2 whitespace-nowrap px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <TestTubeDiagonal className="inline-block w-4 h-4" /> Lab
          </span>
        )}
        {post && !isLab && (
          <BookmarkButton post={post} size="sm" className="shrink-0" />
        )}

        <Asterisk className="inline-block w-4 h-4 text-primary-600 dark:text-primary-500" />
        <time dateTime={date}>{date}</time>
        <Asterisk className="inline-block w-4 h-4 text-primary-600 dark:text-primary-500" />
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
};

export default PostHeader;
