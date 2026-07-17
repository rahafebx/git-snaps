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
  author: object containing author information, including name, username, and position
  labs: array of lab objects associated with the blog post, each containing its own metadata
}

Example of a post object:

{
    id: 2,
    title: "Git Basics - Getting Started",
    slug: "git-basics",
    thumb: "/images/posts/getting-started/git-basics-thumb.webp",
    category: ["Git", "Git Basics"],
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
    labs: [
      {
        id: 1,
        title: "Git Basics - Cloning a Repository",
        slug: "cloning-a-repository-lab",
        thumb: "/images/posts/getting-started/git-basics-thumb.webp",
        category: ["Git"],
        tags: ["Git", "Clone", "Repository"],
        description:
          "Learn how to clone a Git repository from a remote source to your local machine.",
        date: "13 July 2026",
        author: {
          name: "Rahaf Ebx",
          username: "rahafebx",
          position: "Web Developer",
        },
      },
    ],
}

*/

export const blogs = [
  {
    id: 1,
    title: "Getting Started with Git",
    slug: "getting-started",
    thumb: "/images/posts/getting-started/getting-started.webp",
    category: ["Git", "Version Control"],
    tags: ["Git", "SVN", "Version Control", "Snapshot", "State", "Configuration", "Help"],
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
    slug: "git-basics",
    thumb: "/images/posts/git-basics/git-basics.webp",
    category: ["Git", "Git Basics"],
    tags: [
      "Git",
      "Repository",
      "Clone",
      "Status",
      "Ignore",
      "Tracking",
    ],
    description:
      "Learn how to start a new Git workflow by cloning a repository, checking file status, and ignoring unwanted files.",
    date: "13 July 2026",
    author: {
      name: "Rahaf Ebx",
      username: "rahafebx",
      position: "Web Developer",
    },
    labs: [
      {
        id: 1,
        title: "Git Basics Lab - Hands-On Practice",
        slug: "git-basics-lab-hands-on-practice",
        thumb: "/images/posts/git-basics/git-basics.webp",
        category: ["Git", "Git Basics"],
        tags: ["Git", "Clone", "Status", "Tracking", "Commit", "Ignore", "Log"],
        description:
          "Practice the fundamental Git operations covered in the 'Getting Started' post, including cloning a repository and checking file status.",
        date: "14 July 2026",
        author: {
          name: "Rahaf Ebx",
          username: "rahafebx",
          position: "Web Developer",
        },
      },
    ],
  },
  {
    id: 3,
    title: "Git Basics - Staging and Committing",
    slug: "staging-and-committing",
    thumb: "/images/posts/git-basics/staging-and-committing.webp",
    category: ["Git", "Git Basics"],
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
    labs: [
      {
        id: 1,
        title: "Staging and Committing Changes Lab: Hands-On Practice",
        slug: "staging-and-committing-lab",
        thumb: "/images/posts/git-basics/staging-and-committing.webp",
        category: ["Git", "Git Basics"],
        tags: [
          "Git",
          "Staging",
          "Commit",
          "Diff",
          "Remove Files",
          "Move Files",
          "Log",
        ],
        description:
          "Practice staging and committing changes in Git, including adding, removing, and moving files, as well as reviewing commit history and differences.",
        date: "14 July 2026",
        author: {
          name: "Rahaf Ebx",
          username: "rahafebx",
          position: "Web Developer",
        },
      },
    ],
  },
  {
    id: 4,
    title: "Git Basics - Viewing History",
    slug: "viewing-history",
    thumb: "/images/posts/git-basics/viewing-history.webp",
    category: ["Git", "Git Basics"],
    tags: ["Git", "Log", "History", "Commit", "Filter", "Search", "Graph"],
    description:
      "Learn how to view and filter commit history using git log with various options for formatting and limiting output.",
    date: "13 July 2026",
    author: {
      name: "Rahaf Ebx",
      username: "rahafebx",
      position: "Web Developer",
    },
    labs: [
      {
        id: 1,
        title: "Viewing the Commit History Lab: Hands-On Practice",
        slug: "viewing-history-lab",
        thumb: "/images/posts/git-basics/viewing-history.webp",
        category: ["Git", "Git Basics"],
        tags: ["Git", "Log", "History", "Commit", "Filter", "Search", "Graph"],
        description:
          "Practice viewing and filtering commit history in Git, using git log with various options to format and limit the output.",
        date: "14 July 2026",
        author: {
          name: "Rahaf Ebx",
          username: "rahafebx",
          position: "Web Developer",
        },
      },
    ],
  },
  {
    id: 5,
    title: "Git Basics - Undoing Changes",
    slug: "undoing-changes",
    thumb: "/images/posts/git-basics/undoing-changes.webp",
    category: ["Git", "Git Basics"],
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
    labs: [
      {
        id: 1,
        title: "Undoing Changes Lab: Hands-On Practice",
        slug: "undoing-changes-lab",
        thumb: "/images/posts/git-basics/undoing-changes.webp",
        category: ["Git", "Git Basics"],
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
          "Practice undoing changes in Git, including amending commits, unstaging files, and restoring modified files.",
        date: "14 July 2026",
        author: {
          name: "Rahaf Ebx",
          username: "rahafebx",
          position: "Web Developer",
        },
      },
    ],
  },
  {
    id: 6,
    title: "Git Basics - Remote Repositories",
    slug: "remote-repositories",
    thumb: "/images/posts/git-basics/remote-repositories.webp",
    category: ["Git", "Git Basics"],
    tags: ["Git", "Remote", "Push", "Pull", "Fetch", "Tracking"],

    description:
      "Learn how to work with remote repositories using push, pull, fetch, and other collaboration commands.",
    date: "13 July 2026",
    author: {
      name: "Rahaf Ebx",
      username: "rahafebx",
      position: "Web Developer",
    },
    labs: [
      {
        id: 1,
        title: "Working with Remote Repositories Lab: Hands-On Practice",
        slug: "remote-repositories-lab",
        thumb: "/images/posts/git-basics/remote-repositories.webp",
        category: ["Git", "Git Basics", "GitHub"],
        tags: ["Git", "Remote", "Push", "Pull", "Fetch", "Tracking"],
        description:
          "Practice working with remote repositories in Git, including pushing, pulling, and fetching changes.",
        date: "14 July 2026",
        author: {
          name: "Rahaf Ebx",
          username: "rahafebx",
          position: "Web Developer",
        },
      },
    ],
  },
  {
    id: 7,
    title: "Git Basics - Tagging",
    slug: "tagging",
    thumb: "/images/posts/git-basics/tagging.webp",
    category: ["Git", "Git Basics"],
    tags: ["Git", "Tag", "Version", "Release"],

    description:
      "Learn how to create and manage Git tags to mark releases, versions, and important checkpoints.",
    date: "13 July 2026",
    author: {
      name: "Rahaf Ebx",
      username: "rahafebx",
      position: "Web Developer",
    },
    labs: [
      {
        id: 1,
        title: "Tagging Lab: Hands-On Practice",
        slug: "tagging-lab",
        thumb: "/images/posts/git-basics/tagging.webp",
        category: ["Git", "Git Basics", "GitHub"],
        tags: ["Git", "Tag", "Version", "Release", "push", "checkout"],
        description: "Practice creating and managing Git tags.",
        date: "14 July 2026",
        author: {
          name: "Rahaf Ebx",
          username: "rahafebx",
          position: "Web Developer",
        },
      },
    ],
  },
  {
    id: 8,
    title: "Git Basics - Aliases",
    slug: "aliases",
    thumb: "/images/posts/git-basics/aliases.webp",
    category: ["Git", "Git Basics"],
    tags: ["Git", "Alias", "Shortcuts"],

    description:
      "Learn how to speed up common Git tasks by creating useful aliases and command shortcuts.",
    date: "13 July 2026",
    author: {
      name: "Rahaf Ebx",
      username: "rahafebx",
      position: "Web Developer",
    },
    labs: [
      {
        id: 1,
        title: "Git Aliases Lab: Hands-On Practice",
        slug: "aliases-lab",
        thumb: "/images/posts/git-basics/aliases.webp",
        category: ["Git", "Git Basics"],
        tags: ["Git", "Alias", "Shortcuts"],
        description: "Practice creating and managing Git aliases.",
        date: "14 July 2026",
        author: {
          name: "Rahaf Ebx",
          username: "rahafebx",
          position: "Web Developer",
        },
      },
    ],
    
  },
  {
    id: 9,
    title: "Git Branching - Basics",
    slug: "git-branching",
    thumb: "/images/posts/git-branching/git-branching.webp",
    category: ["Git", "Git Branching"],
    tags: ["Git", "Branch", "Merge", "Checkout"],
    description:
      "Learn the basics of Git branching, including creating, switching, and merging branches.",
    date: "17 July 2026",
    author: {
      name: "Rahaf Ebx",
      username: "rahafebx",
      position: "Web Developer",
    },
    labs: [
      {
        id: 1,
        title: "Git Branching Lab: Hands-On Practice",
        slug: "git-branching-lab",
        thumb: "/images/posts/git-branching/git-branching.webp",
        category: ["Git", "Git Branching"],
        tags: ["Git", "Branch", "Merge", "Checkout"],
        description: "Practice creating, switching, and merging branches in Git.",
        date: "17 July 2026",
        author: {
          name: "Rahaf Ebx",
          username: "rahafebx",
          position: "Web Developer",
        },
      },
    ]
  },
  {
    id: 10,
    title: "Git Branching - Branch Management",
    slug: "branch-management",
    thumb: "/images/posts/git-branching/branch-management.webp",
    category: ["Git", "Git Branching"],
    tags: ["Git", "Branch", "Merge", "Checkout", "Rebase"],
    description:
      "Learn how to manage branches in Git, including creating, deleting, and renaming branches.",
    date: "16 July 2026",
    author: {
      name: "Rahaf Ebx",
      username: "rahafebx",
      position: "Web Developer",
    },
  },
  {
    id: 11,
    title: "Git Branching - Branching Workflows",
    slug: "branching-workflows",
    thumb: "/images/posts/git-branching/branching-workflows.webp",
    category: ["Git", "Git Branching"],
    tags: ["Git", "Branch", "Merge", "Checkout", "Rebase"],
    description:
      "Learn about different branching workflows used in Git.",
    date: "16 July 2026",
    author: {
      name: "Rahaf Ebx",
      username: "rahafebx",
      position: "Web Developer",
    },
  },
  {
    id: 12,
    title: "Git Branching - Remote Branches",
    slug: "remote-branches",
    thumb: "/images/posts/git-branching/remote-branches.webp",
    category: ["Git", "Git Branching"],
    tags: ["Git", "Branch", "Merge", "Checkout", "Rebase"],
    description:
      "Learn how to work with remote branches in Git.",
    date: "16 July 2026",
    author: {
      name: "Rahaf Ebx",
      username: "rahafebx",
      position: "Web Developer",
    },
  },
  {
    id: 13,
    title: "Git Branching - Rebasing",
    slug: "rebasing",
    thumb: "/images/posts/git-branching/rebasing.webp",
    category: ["Git", "Git Branching"],
    tags: ["Git", "Branch", "Merge", "Checkout", "Rebase"],
    description:
      "Learn how to rebase branches in Git.",
    date: "16 July 2026",
    author: {
      name: "Rahaf Ebx",
      username: "rahafebx",
      position: "Web Developer",
    },
  },
  {
    id: 14,
    title: "Git on the Server - Quick Overview",
    slug: "git-on-the-server",
    thumb: "/images/posts/git-on-the-server/git-on-the-server.webp",
    category: ["Git", "Git on the Server"],
    tags: ["Git", "Server", "SSH", "HTTP"],
    description:
      "Learn how to set up and use Git on a server.",
    date: "16 July 2026",
    author: {
      name: "Rahaf Ebx",
      username: "rahafebx",
      position: "Web Developer",
    },
  },
  {
    id: 15,
    title: "Distributed Git - Getting Started",
    slug: "distributed-git",
    thumb: "/images/posts/distributed-git/distributed-git.webp",
    category: ["Git", "Distributed Git"],
    tags: ["Git", "Distributed", "Workflow"],
    description:
      "Learn about the distributed nature of Git and its various workflows.",
    date: "16 July 2026",
    author: {
      name: "Rahaf Ebx",
      username: "rahafebx",
      position: "Web Developer",
    },
  },
  {
    id: 16,
    title: "Distributed Git - Contributing to a Project",
    slug: "contributing-to-a-project",
    thumb: "/images/posts/distributed-git/contributing-to-a-project.webp",
    category: ["Git", "Distributed Git"],
    tags: ["Git", "Distributed", "Workflow"],
    description:
      "Learn how to contribute to a distributed Git project.",
    date: "16 July 2026",
    author: {
      name: "Rahaf Ebx",
      username: "rahafebx",
      position: "Web Developer",
    },
  },
  {
    id: 17,
    title: "Distributed Git - Maintaining a Project",
    slug: "maintaining-a-project",
    thumb: "/images/posts/distributed-git/maintaining-a-project.webp",
    category: ["Git", "Distributed Git"],
    tags: ["Git", "Distributed", "Workflow"],
    description:
      "Learn how to maintain a distributed Git project.",
    date: "16 July 2026",
    author: {
      name: "Rahaf Ebx",
      username: "rahafebx",
      position: "Web Developer",
    },
  },
  {
    id: 18,
    title: "GitHub - Getting Started",
    slug: "github",
    thumb: "/images/posts/github/github.webp",
    category: ["Git", "GitHub"],
    tags: ["Git", "GitHub", "Repository", "Pull Request"],
    description:
      "Learn how to use GitHub for version control and collaboration.",
    date: "16 July 2026",
    author: {
      name: "Rahaf Ebx",
      username: "rahafebx",
      position: "Web Developer",
    },
  }
];
