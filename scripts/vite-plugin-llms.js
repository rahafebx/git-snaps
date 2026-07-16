import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Vite plugin to automatically generate llms.txt during build and development
 */
export default function llmsPlugin() {
  return {
    name: 'vite-plugin-llms',
    
    // Generate during build start (keeps file in public for preview/dev)
    buildStart() {
      const rootDir = getRoot();
      const content = generateLLMSContent(rootDir);
      writeOutput(rootDir, content);
    },
    
    // Generate during development
    configureServer(server) {
      const rootDir = getRoot();
      const content = generateLLMSContent(rootDir);
      writeOutput(rootDir, content);
      
      // Watch for changes to metadata or markdown files
      server.watcher.add([
        'src/data/blogMetadata.js',
        'public/markdown/posts/**/*.md',
        'public/markdown/labs/**/*.md'
      ]);
      
      server.watcher.on('change', (file) => {
        if (file.includes('blogMetadata.js') || file.includes('.md')) {
          console.log('📝 Detected changes, regenerating llms.txt...');
          const updated = generateLLMSContent(rootDir);
          writeOutput(rootDir, updated);
        }
      });
    },
    
    // Generate during bundle and emit as build asset
    generateBundle() {
      const rootDir = getRoot();
      const content = generateLLMSContent(rootDir);
      writeOutput(rootDir, content);
      
      // Emit to build output so llms.txt is present in dist root
      this.emitFile({
        type: 'asset',
        fileName: 'llms.txt',
        source: content
      });
    }
  };
}

/**
 * Helpers
 */
function getRoot() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.resolve(__dirname, '..');
}

function writeOutput(rootDir, content) {
  try {
    // Prefer writing to public so it's served in dev/preview and copied to dist
    const publicPath = path.join(rootDir, 'public', 'llms.txt');
    fs.writeFileSync(publicPath, content, 'utf8');

    // Also write to project root for visibility if desired
    const rootOutput = path.join(rootDir, 'llms.txt');
    fs.writeFileSync(rootOutput, content, 'utf8');
    console.log(`✅ llms.txt written to public/ and project root`);
  } catch (err) {
    console.error('❌ Error writing llms.txt:', err);
  }
}

/**
 * Main generation function (returns content string)
 */
function generateLLMSContent(rootDir) {
  try {
    // Try to import metadata dynamically
    let metadata = [];
    try {
      const metadataPath = path.join(rootDir, 'src/data/blogMetadata.js');
      if (fs.existsSync(metadataPath)) {
        const metadataContent = fs.readFileSync(metadataPath, 'utf8');
        const match = metadataContent.match(/export default \[([\s\S]*?)\];/);
        if (match) {
          const items = match[1].split(/\},\s*\{/).map((item, index) => {
            try {
              let cleaned = item.trim();
              if (!cleaned.startsWith('{')) cleaned = '{' + cleaned;
              if (!cleaned.endsWith('}')) cleaned = cleaned + '}';
              cleaned = cleaned.replace(/(\w+):/g, '"$1":');
              cleaned = cleaned.replace(/'/g, '"');
              cleaned = cleaned.replace(/(new Date\([^)]+\))/g, '"$1"');
              return JSON.parse(cleaned);
            } catch (e) {
              return null;
            }
          }).filter(Boolean);
          metadata = items;
        }
      }
    } catch (e) {
      console.warn('⚠️ Could not parse metadata, using fallback');
    }
    
    // Get markdown files
    const postsDir = path.join(rootDir, 'public/markdown/posts');
    const labsDir = path.join(rootDir, 'public/markdown/labs');
    
    const postFiles = fs.existsSync(postsDir) 
      ? fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
      : [];
    const labFiles = fs.existsSync(labsDir)
      ? fs.readdirSync(labsDir).filter(f => f.endsWith('.md'))
      : [];
    
    // Build the content
    let content = `# Git Snaps — LLM Agent Browsing Manifest

## Site Information
- **Title:** Git Snaps — Mastering Git & GitHub
- **Primary URL:** https://git-snaps.rahafebx.workers.dev
- **Repository:** https://github.com/rahafebx/git-snaps
- **Contact:** rahaf@rahafebx.workers.dev
- **Site language:** en-US
- **Purpose:** Educational tutorials on Git and GitHub

## Content Overview
Bite-sized visual production tutorials, tracking version controls, workflows, and teamwork mechanics.

`;
    
    // Posts section
    content += `## Posts (${postFiles.length} total)\n\n`;
    
    postFiles.forEach((file, index) => {
      const slug = file.replace('.md', '');
      const meta = metadata.find(m => m.slug === slug);
      
      if (meta) {
        const title = meta.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const description = meta.description || 'Learn Git fundamentals';
        const tags = meta.tags ? ` (${meta.tags.join(', ')})` : '';
        content += `${index + 1}. [${title}](https://git-snaps.rahafebx.workers.dev/post/${slug}) - ${description}${tags}\n`;
      } else {
        const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        content += `${index + 1}. [${title}](https://git-snaps.rahafebx.workers.dev/post/${slug})\n`;
      }
    });
    
    // Labs section
    if (labFiles.length > 0) {
      content += `\n## Labs (${labFiles.length} total)\n\n`;
      
      labFiles.forEach((file, index) => {
        const slug = file.replace('.md', '');
        const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        content += `${index + 1}. [${title}](https://git-snaps.rahafebx.workers.dev/lab/${slug})\n`;
      });
    }
    
    // Agent instructions
    content += `
## Agenting / Browsing Instructions

### Crawl Scope (Allowed)
- \`/\` (home)
- \`/about\`
- \`/labs\`
- \`/post/:slug\`
- \`/lab/:slug\`
- \`/markdown/posts/*.md?raw\`
- \`/markdown/labs/*.md?raw\`
- \`/images/*\` (thumbnails)

### Fetch Pattern
- **Posts:** \`https://git-snaps.rahafebx.workers.dev/markdown/posts/{slug}.md?raw\`
- **Labs:** \`https://git-snaps.rahafebx.workers.dev/markdown/labs/{slug}.md?raw\`

### Routing Mapping
- \`/post/:slug\` → \`/public/markdown/posts/{slug}.md\`
- \`/lab/:slug\` → \`/public/markdown/labs/{slug}.md\`

## Metadata Source
**Primary:** \`src/data/blogMetadata.js\`
- Fields: \`id, title, slug, thumb, category, tags, description, date, author {name, username, position}, labs[]\`
- Thumbnails: \`/images/...\` (relative to public folder)

### Agent Extraction Rules
1. **Prefer** \`blogMetadata.js\` for structured metadata
2. **Fallback** to markdown frontmatter if available
3. **Last resort:** filename/slug and first headings
4. **Invalid content:** Treat as missing if starts with \`<!doctype html>\` or is empty
5. **Always use** \`?raw\` parameter for markdown to avoid HTML wrappers

## Health Checks
1. \`GET /\` returns 200 with links to \`/post/:slug\` or \`/labs\`
2. \`GET /post/getting-started\` renders content
3. Raw markdown fetch returns non-HTML with markdown headings
4. \`blogMetadata.js\` contains entries for all markdown files
5. All thumbnail paths resolve correctly

## Technical Notes
- **Framework:** React Router (routes in \`src/App.jsx\`)
- **Markdown location:** \`public/markdown/\` folder
- **Rate limiting:** Keep requests reasonable
- **Static assets:** \`/images/\` and other static folders

## Example Fetch (PowerShell)
\`\`\`powershell
Invoke-WebRequest "https://git-snaps.rahafebx.workers.dev/markdown/posts/getting-started.md?raw" -OutFile getting-started.md
\`\`\`

## Sitemap/Robots
- Prefer \`/sitemap.xml\` if available
- Check \`/robots.txt\` before large crawls
- Fallback to file lists above as canonical crawl targets

## Generated
- **Date:** ${new Date().toISOString()}
- **Posts:** ${postFiles.length}
- **Labs:** ${labFiles.length}
`;
    
    return content;
    
  } catch (error) {
    console.error('❌ Error generating LLM Agent Browsing Manifest:', error.message);
    return '';
  }
}