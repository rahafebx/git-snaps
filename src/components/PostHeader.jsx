import { TestTubeDiagonal } from "lucide-react";
const PostHeader = ({ title, date, tags, isLab = false }) => {
  return (
    <header className="mb-8">
      <span className="heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
        {title}
      </span>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        {isLab && (
          <span className="inline-block whitespace-nowrap px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <TestTubeDiagonal className="inline-block w-4 h-4 mr-1" /> Lab
          </span>
        )}
        <time dateTime={date}>{date}</time>
        <span>•</span>
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
