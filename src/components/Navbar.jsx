import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Menu, X, GitPullRequestArrow, TestTubeDiagonal, House, Bookmark, Info } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/", icon: House },
  { name: "Labs", path: "/labs", icon: TestTubeDiagonal },
  { name: "Bookmarks", path: "/bookmarks", icon: Bookmark },
  { name: "About", path: "/about", icon: Info }
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const [ isActive, setIsActive ] = useState(document.location.pathname);

  return (
    <nav className="border-b border-zinc-200 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90 sticky top-0 z-50 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="shrink-0">
            <Link
              to="/"
              className="font-mono text-xl font-bold tracking-tight text-primary-600 dark:text-primary-400"
            >
              git_snaps
            </Link>
          </div>

          {/* Right Utility Utilities */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6 mr-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => {
                    setIsActive(link.path);
                  }
                  }
                  className={`text-sm flex items-center gap-2 font-medium  hover:text-primary-600  dark:hover:text-primary-400 uppercase
                    ${isActive === link.path ? "text-primary-600 dark:text-primary-400" : "text-zinc-600 dark:text-zinc-300"}
                    `}
                >
                  <link.icon className="h-4 w-4 inline" />
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Contribute Button https://github.com/rahafebx/git-snaps */}
            <a
              href="https://github.com/rahafebx/git-snaps"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white tracking-wider uppercase text-sm py-2 px-2 md:px-4 rounded-md md:rounded-full transition duration-300"
            >
              <span className="hidden md:inline">Contribute</span>
              <GitPullRequestArrow className="h-5 w-5 md:hidden" />
            </a>

            {/* Theme Toggle Button (Persistent on Mobile & Desktop) */}
            <button
              onClick={toggleTheme}
              type="button"
              className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 focus:outline-none cursor-pointer"
              aria-label="Toggle layout theme color variant"
            >
              {isDark ? (
                <Sun className="h-5 w-5 transition-transform duration-200" />
              ) : (
                <Moon className="h-5 w-5 transition-transform duration-200" />
              )}
            </button>

            {/* Mobile Menu Burger Toggle */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 focus:outline-none dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden border-b border-zinc-100 bg-white dark:border-zinc-800 dark:bg-zinc-900`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pt-2 pb-4 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => {
                setIsOpen(false);
                setIsActive(link.path);
              }}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium  hover:bg-zinc-50 hover:text-primary-600 dark:hover:bg-zinc-800 dark:hover:text-primary-400 uppercase
                ${isActive === link.path ? "text-primary-600 dark:text-primary-400" : "text-zinc-600 dark:text-zinc-300"}
                `}
            >
              <link.icon className="h-4 w-4 inline" />
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
