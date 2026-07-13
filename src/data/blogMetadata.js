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
    title: "Getting Started with Git & GitHub",
    slug: "getting-started",
    thumb: "/images/git-start-thumb.webp",
    category: ["Git", "GitHub"],
    tags: ["Beginner", "Setup", "Version Control"],
    description: "Learn the foundational concepts of Git, how it differs from GitHub, and set up your first repository.",
    date: "2026-07-10"
  },
  {
    id: 2,
    title: "Mastering Git Basics",
    slug: "git-basics",
    thumb: "/images/git-basics-thumb.webp",
    category: ["Git"],
    tags: ["Terminal", "Workflow", "CLI"],
    description: "Deep dive into staging, committing, logging, and understanding the three states of Git.",
    date: "2026-07-12"
  }
];