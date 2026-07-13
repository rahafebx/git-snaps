import { Link } from "react-router-dom";

export const BlogCard = ({ post }) => {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl dark:border-zinc-800 hover:dark:border-zinc-700 dark:bg-zinc-900">
      {/* Featured Banner Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={post.thumb}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      {/* Card Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.category.map((cat) => (
            <span
              key={cat}
              className="rounded-md bg-primary-50 px-2 py-0.5 text-xs font-semibold text-primary-600 dark:bg-primary-950/50 dark:text-primary-400"
            >
              {cat}
            </span>
          ))}
        </div>
        {/* Title and Description */}
        <h2 className="text-xl font-bold text-zinc-900 line-clamp-2 dark:text-zinc-50 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="mt-2 text-sm text-zinc-600 line-clamp-3 dark:text-zinc-400 flex-1">
          {post.description}
        </p>
        {/* Date and Tags */}
        <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span>{post.date}</span>
          <div className="flex gap-1.5">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-zinc-700 dark:text-zinc-400">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
