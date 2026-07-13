import React from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useBlog } from "../context/BlogContext";
import { useTheme } from "../context/ThemeContext";
import { useMarkdown } from "../hooks/useMarkdown";
import { Loader2, ArrowLeft} from "lucide-react";
import { SocialShare } from "../components/SocialShare";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { MermaidDiagram } from "../components/MermaidDiagram";

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


export const PostDetail = () => {
  const { slug } = useParams();
  const { getPostBySlug } = useBlog();
  const { isDark } = useTheme();

  const postMetadata = getPostBySlug(slug);
  const { content, loading, error } = useMarkdown(slug);

  // Register the OG Metadata sync hook here
  useDocumentMeta(postMetadata);

  if (!postMetadata) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Post Not Found
        </h2>
        <Link
          to="/"
          className="mt-4 inline-block text-primary-600 dark:text-primary-400 font-medium"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Back Link Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-primary-600 dark:text-zinc-400 dark:hover:text-primary-400 mb-8 font-medium transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to all articles
      </Link>

      {/* Post Header Meta metadata */}
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
          {postMetadata.title}
        </h1>
        <div className="mt-4 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
          <span>{postMetadata.date}</span>
          <span>•</span>
          <div className="flex gap-2">
            {postMetadata.tags.map((tag) => (
              <span key={tag} className="text-zinc-700 dark:text-zinc-400">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Featured Banner Image */}
      <div className="mb-12 rounded-2xl overflow-hidden aspect-video bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <img
          src={postMetadata.thumb}
          alt={postMetadata.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Render share tools panel right before primary reading text block */}
      {!loading && !error && <SocialShare title={postMetadata.title} />}

      {/* Content Rendering Control Triggers */}
      {loading && (
        <div className="flex items-center justify-center py-12 gap-2 text-zinc-500">
          <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
          <span>Parsing repository markdown blueprint...</span>
        </div>
      )}

      {error && (
        <div className="text-rose-500 font-medium bg-rose-50 dark:bg-rose-950/20 p-4 rounded-xl border border-rose-100 dark:border-rose-900/30">
          {error}
        </div>
      )}

      {/* Fully styled HTML Markdown view wrapper via atomic element targets */}
      {!loading && !error && (
        <div
          className="max-w-none 
          [&>h1]:text-3xl [&>h1]:font-black [&>h1]:mt-10 [&>h1]:mb-4 [&>h1]:text-zinc-900 dark:[&>h1]:text-white
          [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-3 [&>h2]:text-zinc-900 dark:[&>h2]:text-zinc-100
          [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-2 [&>h3]:text-zinc-900 dark:[&>h3]:text-zinc-200
          [&>p]:text-zinc-700 dark:[&>p]:text-zinc-300 [&>p]:leading-relaxed [&>p]:mb-5
          [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-5 [&>ul]:space-y-2 [&>ul]:text-zinc-700 dark:[&>ul]:text-zinc-300
          [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-5 [&>ol]:space-y-2 [&>ol]:text-zinc-700 dark:[&>ol]:text-zinc-300
          [&>blockquote]:border-l-4 [&>blockquote]:border-primary-500 [&>blockquote]:bg-primary-50/40 dark:[&>blockquote]:bg-primary-950/20 [&>blockquote]:p-4 [&>blockquote]:rounded-r-xl [&>blockquote]:my-6 [&>blockquote_p]:m-0 [&>blockquote_p]:italic [&>blockquote_p]:text-primary-900 dark:[&>blockquote_p]:text-primary-300
          [&_a]:text-primary-600 dark:[&_a]:text-primary-400 [&_a]:underline [&_a]:font-medium
          [&>img]:rounded-xl [&>img]:my-6 [&>img]:w-full [&>img]:border [&>img]:border-zinc-200 dark:[&>img]:border-zinc-800"
        >
          <ReactMarkdown
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
                if (src && src.includes('#gh-light-mode-only')) {
                  const cleanSrc = src.replace('#gh-light-mode-only', '');
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

                if (src && src.includes('#gh-dark-mode-only')) {
                  const cleanSrc = src.replace('#gh-dark-mode-only', '');
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
                    className="bg-zinc-100 dark:bg-zinc-800 text-primary-700 dark:text-primary-300 px-1.5 py-0.5 rounded text-sm font-mono font-medium"
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
      )}
    </article>
  );
};