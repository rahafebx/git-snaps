import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Import your metadata
const blogMetadata = (await import('../src/data/blogMetadata.js')).default;

// Get all markdown files
const postsDir = path.join(rootDir, 'public/markdown/posts');
const labsDir = path.join(rootDir, 'public/markdown/labs');

const postFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
const labFiles = fs.readdirSync(labsDir).filter(f => f.endsWith('.md'));

// Build the llms.txt content
let content = `# Git Snaps — LLM Agent Browsing Manifest

## Site Information
- **Title:** Git Snaps — Mastering Git & GitHub
- **Primary URL:** https://git-snaps.rahafebx.workers.dev
- **Repository:** https://github.com/rahafebx/git-snaps
- **Site language:** en-US

## Posts (${postFiles.length} total)\n`;

// Generate post list
postFiles.forEach(file => {
  const slug = file.replace('.md', '');
  const meta = blogMetadata.find(m => m.slug === slug);
  if (meta) {
    content += `${postFiles.indexOf(file) + 1}. [${meta.title}](https://git-snaps.rahafebx.workers.dev/post/${slug}) - ${meta.description}\n`;
  }
});

// Add labs section
content += `\n## Labs (${labFiles.length} total)\n`;
labFiles.forEach((file, index) => {
  const slug = file.replace('.md', '');
  content += `${index + 1}. [${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}](https://git-snaps.rahafebx.workers.dev/lab/${slug})\n`;
});

// Add agent instructions
content += `
## Agenting Instructions

### Crawl Scope
- \`/\` (home), \`/about\`, \`/labs\`
- \`/post/:slug\`, \`/lab/:slug\`
- \`/markdown/posts/*.md?raw\`
- \`/markdown/labs/*.md?raw\`

### Fetch Patterns
- Posts: \`https://git-snaps.rahafebx.workers.dev/markdown/posts/{slug}.md?raw\`
- Labs: \`https://git-snaps.rahafebx.workers.dev/markdown/labs/{slug}.md?raw\`

## Metadata Source
Primary: \`src/data/blogMetadata.js\`
- Fields: id, title, slug, thumb, category, tags, description, date, author

## Generated: ${new Date().toISOString().split('T')[0]}
`;

// Write the file
fs.writeFileSync(path.join(rootDir, 'llms.txt'), content);
console.log('✅ LLM Agent Browsing Manifest generated successfully!');