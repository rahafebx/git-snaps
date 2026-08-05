export const Contribute = ({ isLab }) => {
  return (
    <section className="my-10 p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/40">
      <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">
        -- Contribute to this {isLab ? "Lab" : "Guide"}
      </h2>
      <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4">
        Found a typo or want to add more information? You can contribute to this{" "}
        {isLab ? "lab" : "guide"} by submitting a pull request on GitHub. Your
        contributions are welcome and appreciated!
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <a
          href="https://github.com/rahafebx/git-snaps"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center w-full sm:w-fit bg-primary-600 hover:bg-primary-700 text-white tracking-wider uppercase px-5 py-2.5 text-sm font-medium rounded-full transition duration-300"
        >
          Contribute on GitHub
        </a>
        {/* report an issue button */}
        <a
          href="https://github.com/rahafebx/git-snaps/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center w-full sm:w-fit rounded-full border border-zinc-300 bg-white tracking-wider uppercase px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-primary-400 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-primary-500 dark:hover:text-primary-400 cursor-pointer"
        >
          Report an Issue
        </a>
      </div>
    </section>
  );
};
