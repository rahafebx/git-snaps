export default function PostHeader({ title, date, tags }) {
    return (
        <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
          {title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
          <span>{date}</span>
          <span>•</span>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <span key={tag} className="text-zinc-700 dark:text-zinc-400">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </header>
    );
}