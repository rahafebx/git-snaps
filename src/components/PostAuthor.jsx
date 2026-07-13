export default function PostAuthor({username, name, position}) {
    return (
       <div className="my-10 p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/40">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
                -- Authored by
            </h4>
            <div className="flex items-center gap-4 text-sm">
                <img
                    src={`https://github.com/${username}.png`}
                    alt="Author avatar"
                    className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-950/20 border border-zinc-200 dark:border-zinc-800"
                />
                <div>
                    <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-zinc-800 dark:text-zinc-200 hover:underline">
                        {name}
                    </a>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase mt-1">{position}</p>
                </div>
            </div>
        </div>
    );
}
