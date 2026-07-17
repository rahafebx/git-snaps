import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { MermaidDiagram } from "../components/MermaidDiagram";
import FloatingTOC from "../components/FloatingTOC";

// Helper utility function to slugify header text strings into standard browser anchor tags
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-"); // Replace multiple dashes with a single dash
};

export default function MarkdownContent({
  className,
  content,
  isDark,
  showFloatingTOC = true,
}) {
  // Intercept clicks on internal anchor links within the markdown content
  useEffect(() => {
    const handleInternalLinkClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        const href = link.getAttribute('href');
        const slug = href.replace('#', '');
        
        // Prevent default anchor behavior
        e.preventDefault();
        
        // Find the target element
        const element = document.getElementById(slug);
        if (element) {
          // Update URL hash without causing page jump
          if (window.history.pushState) {
            window.history.pushState(null, null, `#${slug}`);
          }
          
          // Dispatch a custom event that FloatingTOC can listen to
          window.dispatchEvent(new CustomEvent('tocNavigate', { detail: { slug } }));
          
          // Smooth scroll to element
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    };

    // Add event listener to the document
    document.addEventListener('click', handleInternalLinkClick);
    
    return () => {
      document.removeEventListener('click', handleInternalLinkClick);
    };
  }, []);

  return (
    <div className="relative">
      {/* Floating TOC - hidden on mobile/tablet */}
      {showFloatingTOC && (
        <div className="hidden xl:block">
          <FloatingTOC content={content} />
        </div>
      )}
      <div
        className={` 
          max-w-none 
          [&>h1]:text-3xl [&>h1]:font-black [&>h1]:mt-10 [&>h1]:mb-4 [&>h1]:text-zinc-900 dark:[&>h1]:text-white
          [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-3 [&>h2]:text-zinc-900 dark:[&>h2]:text-zinc-100
          [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-2 [&>h3]:text-zinc-900 dark:[&>h3]:text-zinc-200
          [&>p]:text-zinc-700 dark:[&>p]:text-zinc-300 [&>p]:leading-relaxed [&>p]:mb-5
          [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-5 [&>ul]:space-y-2 [&>ul]:text-zinc-700 dark:[&>ul]:text-zinc-300
          [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-5 [&>ol]:space-y-2 [&>ol]:text-zinc-700 dark:[&>ol]:text-zinc-300
          [&>blockquote]:border-l-4 [&>blockquote]:border-primary-500 [&>blockquote]:bg-primary-50/40 dark:[&>blockquote]:bg-primary-950/20 [&>blockquote]:p-4 [&>blockquote]:rounded-r-xl [&>blockquote]:my-6 [&>blockquote_p]:m-0 [&>blockquote_p]:italic [&>blockquote_p]:text-primary-900 dark:[&>blockquote_p]:text-primary-300
          [&_a]:text-primary-600 dark:[&_a]:text-primary-400 [&_a]:underline [&_a]:font-medium
          [&>img]:rounded-xl [&>img]:my-6 [&>img]:w-full [&>img]:border [&>img]:border-zinc-200 dark:[&>img]:border-zinc-800
          [&>table]:min-w-full [&>table]:divide-y [&>table]:divide-zinc-200 dark:[&>table]:divide-zinc-800 [&>table]:border [&>table]:border-zinc-200 dark:[&>table]:border-zinc-800 [&>table]:rounded-lg [&>table]:overflow-hidden [&>table]:my-6
          [&>table>thead]:bg-zinc-50 dark:[&>table>thead]:bg-zinc-900/50
          [&>table>tbody]:divide-y [&>table>tbody]:divide-zinc-200 dark:[&>table>tbody]:divide-zinc-800
          [&>table>tbody>tr]:even:bg-zinc-50/50 dark:[&>table>tbody>tr]:even:bg-zinc-900/30
          [&>table>thead>tr>th]:px-4 [&>table>thead>tr>th]:py-3 [&>table>thead>tr>th]:text-left [&>table>thead>tr>th]:text-xs [&>table>thead>tr>th]:font-semibold [&>table>thead>tr>th]:text-zinc-700 dark:[&>table>thead>tr>th]:text-zinc-300 [&>table>thead>tr>th]:uppercase [&>table>thead>tr>th]:tracking-wider
          [&>table>tbody>tr>td]:px-4 [&>table>tbody>tr>td]:py-3 [&>table>tbody>tr>td]:text-sm [&>table>tbody>tr>td]:text-zinc-700 dark:[&>table>tbody>tr>td]:text-zinc-300
          [&_ul_ul]:ml-4 [&_ul_ul]:mt-1
          [&_ol_ol]:ml-4 [&_ol_ol]:mt-1
          [&_ul_ul_ul]:ml-4
          [&_ol_ol_ol]:ml-4
          // TOC wrapper styling
          [&_.toc]:bg-zinc-50 dark:[&_.toc]:bg-zinc-900/30 [&_.toc]:p-4 [&_.toc]:rounded-xl [&_.toc]:border [&_.toc]:border-zinc-200 dark:[&_.toc]:border-zinc-800 [&_.toc]:mb-8
          [&_.toc_ul]:list-none [&_.toc_ul]:pl-0
          [&_.toc_li]:mb-1
          [&_.toc_a]:no-underline [&_.toc_a]:hover:underline [&_.toc_a]:text-primary-600 dark:[&_.toc_a]:text-primary-400 [&_.toc_a]:font-medium
          [&_.toc-level-1]:font-bold [&_.toc-level-1]:text-base
          [&_.toc-level-2]:pl-4 [&_.toc-level-2]:text-sm
          [&_.toc-level-3]:pl-8 [&_.toc-level-3]:text-sm [&_.toc-level-3]:text-zinc-600 dark:[&_.toc-level-3]:text-zinc-400
        ${className}`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Inject standard slugified IDs into dynamic H2 elements for jump link scrolling
            h2({ children, ...props }) {
              const headingText = React.Children.toArray(children).join("");
              const id = slugify(headingText);
              return (
                <h2 id={id} {...props}>
                  {children}
                </h2>
              );
            },
            // Inject standard slugified IDs into dynamic H3 elements for sub-item jumps
            h3({ children, ...props }) {
              const headingText = React.Children.toArray(children).join("");
              const id = slugify(headingText);
              return (
                <h3 id={id} {...props}>
                  {children}
                </h3>
              );
            },

            // Custom image component to handle theme-based images
            img({ src, alt, ...props }) {
              // Check if the image is theme-specific
              if (src && src.includes("#gh-light-mode-only")) {
                const cleanSrc = src.replace("#gh-light-mode-only", "");
                // Only show in light mode
                if (!isDark) {
                  return (
                    <img
                      src={cleanSrc}
                      alt={alt}
                      {...props}
                      className="rounded-xl my-6 w-full border border-zinc-200 dark:border-zinc-800"
                    />
                  );
                }
                return null; // Hide in dark mode
              }

              if (src && src.includes("#gh-dark-mode-only")) {
                const cleanSrc = src.replace("#gh-dark-mode-only", "");
                // Only show in dark mode
                if (isDark) {
                  return (
                    <img
                      src={cleanSrc}
                      alt={alt}
                      {...props}
                      className="rounded-xl my-6 w-full border border-zinc-200 dark:border-zinc-800"
                    />
                  );
                }
                return null; // Hide in light mode
              }

              // Default image rendering
              return (
                <img
                  src={src}
                  alt={alt}
                  {...props}
                  className="rounded-xl my-6 w-full border border-zinc-200 dark:border-zinc-800"
                />
              );
            },

            // Custom element mapping rules routing syntax blocks directly to Prism modules
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");

              // Check if it's a Mermaid diagram
              if (!inline && match && match[1] === "mermaid") {
                const chart = String(children).replace(/\n$/, "");
                return <MermaidDiagram chart={chart} isDark={isDark} />;
              }

              // Regular code block with syntax highlighting
              if (!inline && match) {
                return (
                  <div className="rounded-xl overflow-hidden my-6 border border-zinc-200 dark:border-zinc-800 text-sm shadow-sm">
                    {/* Simulated terminal buffer header component */}
                    <div className="bg-zinc-100 dark:bg-zinc-900 px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-700 dark:text-zinc-400 flex justify-between items-center select-none">
                      <span>{match[1]}</span>
                      <span className="text-[10px] uppercase opacity-90">
                        local_buffer
                      </span>
                    </div>
                    <SyntaxHighlighter
                      {...props}
                      children={String(children).replace(/\n$/, "")}
                      style={isDark ? oneDark : oneLight}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        padding: "1rem",
                      }}
                    />
                  </div>
                );
              }

              // Inline standard inline accent formatting wrappers
              return (
                <code
                  {...props}
                  className="bg-zinc-100 dark:bg-zinc-800 text-primary-700 dark:text-primary-300 px-1.5 py-0.5 rounded text-sm font-mono font-medium lg:whitespace-nowrap"
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}