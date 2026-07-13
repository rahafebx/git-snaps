import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const NextPost = ({ post }) => {
  if (!post) return null;

  return (
    <Link
      to={`/post/${post.slug}`}
      className="group flex flex-col items-end rounded-xl border border-gray-200 p-4 transition-all hover:border-primary-500 hover:shadow-md dark:border-gray-700 dark:hover:border-primary-400"
    >
      <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">Next Post</span>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-sm font-medium text-gray-900 transition-colors group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
          {post.title}
        </span>
        <ChevronRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-primary-500 dark:text-gray-500 dark:group-hover:text-primary-400" />
      </div>
    </Link>
  );
};

export default NextPost;