export const extractTOC = (markdownContent) => {
  const tocItems = [];
  
  // Split content by code blocks to ignore them
  const lines = markdownContent.split('\n');
  let insideCodeBlock = false;
  let inFrontmatter = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // Check for frontmatter (--- at start of file)
    if (i === 0 && trimmedLine === '---') {
      inFrontmatter = true;
      continue;
    }
    if (inFrontmatter && trimmedLine === '---') {
      inFrontmatter = false;
      continue;
    }
    
    // Skip if inside frontmatter
    if (inFrontmatter) continue;
    
    // Check for code block boundaries
    if (trimmedLine.startsWith('```')) {
      insideCodeBlock = !insideCodeBlock;
      continue;
    }
    
    // Skip if inside code block
    if (insideCodeBlock) continue;
    
    // Check if line is a heading (starts with 1-3 # followed by space)
    const headingMatch = trimmedLine.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      
      // Generate slug matching the same logic as in MarkdownContent
      const slug = text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-");
      
      tocItems.push({
        level,
        text,
        slug,
        // Remove markdown links from heading text if present
        cleanText: text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      });
    }
  }

  return tocItems;
};