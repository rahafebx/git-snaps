/*
{
  id: unique identifier for the blog post, used for internal referencing  
  title: matches the markdown file name, eg. "getting-started" for getting-started.md
  slug: URL-friendly version of the title, used in routing and links
  thumb: path to the thumbnail image, relative to the public folder
  category: array of categories the post belongs to, used for filtering and navigation
  tags: array of tags for the post, used for search and filtering
  description: short summary of the post, used in previews and meta descriptions
  date: publication date in YYYY-MM-DD format, used for sorting and display 
}
*/

export const blogs = [
  {
    id: 1,
    title: "Getting Started with Git",
    slug: "getting-started",
    thumb: "/images/posts/getting-started/git-basics-thumb.webp",
    category: ["Git"],
    tags: ["Git", "SVN", "Version Control"],
    description:
      "Learn what Git is, why it matters, and how it compares to centralized version control systems like SVN.",
    date: "13 July 2026",
    author: {
      name: "Rahaf Ebx",
      username: "rahafebx",
      position: "Web Developer",
    },
  },
  {
    id: 2,
    title: "Git Basics - Getting Started",
    slug: "getting-basics",
    thumb: "/images/posts/getting-started/git-basics-thumb.webp",
    category: ["Git"],
    tags: [
      "Git",
      "Repository",
      "Clone",
      "Status",
      "Ignore",
      "Version Control",
      "SVN",
    ],
    description:
      "Learn how to start a new Git workflow by cloning a repository, checking file status, and ignoring unwanted files.",
    date: "13 July 2026",
    author: {
      name: "Rahaf Ebx",
      username: "rahafebx",
      position: "Web Developer",
    },
  },
  {
    id: 3,
    title: "Git Basics - Staging and Committing",
    slug: "staging-and-committing",
    thumb: "/images/posts/getting-started/git-basics-thumb.webp",
    category: ["Git"],
    tags: [
      "Git",
      "Staging",
      "Committing",
      "Add Files",
      "Remove Files",
      "Move Files",
      "Commit History",
      "Diff",
    ],
    description:
      "Learn how to stage changes, create commits, and understand the role each step plays in Git history.",
    date: "13 July 2026",
    author: {
      name: "Rahaf Ebx",
      username: "rahafebx",
      position: "Web Developer",
    },
  },
  {
    id: 4,
    title: "Git Basics - Undoing Changes",
    slug: "undoing-changes",
    thumb: "/images/posts/getting-started/git-basics-thumb.webp",
    category: ["Git"],
    tags: [
      "Git",
      "Amend",
      "Unstage",
      "Unmodify",
      "Restore",
      "Reset",
      "Checkout",
    ],
    description:
      "Learn how to undo mistakes in Git with commands for amending, unstaging, restoring, and discarding changes.",
    date: "13 July 2026",
    author: {
      name: "Rahaf Ebx",
      username: "rahafebx",
      position: "Web Developer",
    },
  },
  {
    id: 5,
    title: "Git Basics - Viewing History",
    slug: "viewing-history",
    thumb: "/images/posts/getting-started/git-basics-thumb.webp",
    category: ["Git"],
    tags: ["Git", "Log", "History", "Commit", "Filter", "Search", "Graph"],
    description:
      "Learn how to view and filter commit history using git log with various options for formatting and limiting output.",
    date: "13 July 2026",
    author: {
      name: "Rahaf Ebx",
      username: "rahafebx",
      position: "Web Developer",
    },
  },
  {
    id: 6,
    title: "Git Basics - Remote Repositories",
    slug: "remote-repositories",
    thumb: "/images/posts/getting-started/git-basics-thumb.webp",
    category: ["Git"],
    tags: ["Git", "Remote", "Push", "Pull", "Fetch"],

    description:
      "Learn how to work with remote repositories using push, pull, fetch, and other collaboration commands.",
    date: "13 July 2026",
    author: {
      name: "Rahaf Ebx",
      username: "rahafebx",
      position: "Web Developer",
    },
  },
  {
    id: 7,
    title: "Git Basics - Tagging",
    slug: "tagging",
    thumb: "/images/posts/getting-started/git-basics-thumb.webp",
    category: ["Git"],
    tags: ["Git", "Tag", "Version", "Release"],

    description:
      "Learn how to create and manage Git tags to mark releases, versions, and important checkpoints.",
    date: "13 July 2026",
    author: {
      name: "Rahaf Ebx",
      username: "rahafebx",
      position: "Web Developer",
    },
  },
  {
    id: 8,
    title: "Git Basics - Aliases",
    slug: "aliases",
    thumb: "/images/posts/getting-started/git-basics-thumb.webp",
    category: ["Git"],
    tags: ["Git", "Alias", "Shortcuts"],

    description:
      "Learn how to speed up common Git tasks by creating useful aliases and command shortcuts.",
    date: "13 July 2026",
    author: {
      name: "Rahaf Ebx",
      username: "rahafebx",
      position: "Web Developer",
    },
  },
];
