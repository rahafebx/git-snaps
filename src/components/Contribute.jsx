export const Contribute = ({isLab}) => {
  return (
    <section className="my-10 p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/40">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">
            -- Contribute to this {isLab ? 'Lab' : 'Guide'}
        </h2>
        <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4">
            Found a typo or want to add more information? You can contribute to this {isLab ? 'lab' : 'guide'} by submitting a pull request on GitHub. Your contributions are welcome and appreciated!
        </p>
        <a
            href="https://github.com/rahafebx/git-snaps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white tracking-wider uppercase text-sm px-5 py-2.5 rounded-full transition duration-300"
        >
            Contribute on GitHub
        </a>
    </section>
  );
};