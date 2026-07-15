
import { Link } from "react-router-dom";
import BackToTop from "./BackToTop";
export const Footer = () => {
  

  return (
    <>
      <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 transition-colors duration-200">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            {/* Brand/Pitch */}
            <div className="space-y-4">
              <span className="font-mono text-lg font-bold tracking-tight text-primary-600 dark:text-primary-400">
                git_snaps
              </span>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xs mt-4">
                Demystifying decentralized version control and open-source
                collaboration tools. One push at a time.
              </p>
            </div>

            {/* Resource Links Column */}
            <div className="mt-8 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white tracking-wider uppercase">
                  Resources
                </h3>
                <ul className="mt-4 space-y-2">
                  {/* Official Git Documentation */}
                  <li>
                    <a
                      href="https://git-scm.com/doc"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-zinc-600 hover:text-primary-600 dark:text-zinc-400 dark:hover:text-primary-400"
                    >
                      Official Git Docs
                    </a>
                  </li>
                  {/* Github guides */}
                  <li>
                    <a
                      href="https://docs.github.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-zinc-600 hover:text-primary-600 dark:text-zinc-400 dark:hover:text-primary-400"
                    >
                      GitHub Guides
                    </a>
                  </li>
                  {/* Github learn */}
                  <li>
                    <a
                      href="https://learn.github.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-zinc-600 hover:text-primary-600 dark:text-zinc-400 dark:hover:text-primary-400"
                    >
                      GitHub Learn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://learn.microsoft.com/en-us/training/browse/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-zinc-600 hover:text-primary-600 dark:text-zinc-400 dark:hover:text-primary-400"
                    >
                      Microsoft Training
                    </a>
                  </li>
                </ul>
              </div>

              {/* Meta Info */}
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white tracking-wider uppercase">
                  Navigation
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link
                      to="/"
                      className="text-sm text-zinc-600 hover:text-primary-600 dark:text-zinc-400 dark:hover:text-primary-400"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/labs"
                      className="text-sm text-zinc-600 hover:text-primary-600 dark:text-zinc-400 dark:hover:text-primary-400"
                    >
                      Labs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="text-sm text-zinc-600 hover:text-primary-600 dark:text-zinc-400 dark:hover:text-primary-400"
                    >
                      About Project
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom copyright barrier */}
          <div className="mt-12 border-t border-zinc-100 pt-6 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              &copy; {new Date().getFullYear()} git_snaps Dev Blog. Built with
              React and Tailwind CSS v4.
            </p>
            <a
              href="https://github.com/rahafebx/git-snaps"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors p-1"
              aria-label="View the official project source repository hosted on GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
      {/* back to top floating button */}
      <BackToTop />
    </>
  );
};
