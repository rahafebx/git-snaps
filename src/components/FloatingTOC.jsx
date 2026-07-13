import { useEffect, useMemo, useState } from 'react';
import { extractTOC } from '../utils/tocExtractor';

export default function FloatingTOC({ content, className }) {
  const [activeId, setActiveId] = useState('');
  const tocItems = useMemo(() => extractTOC(content), [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -80% 0px',
        threshold: 0.1,
      }
    );

    // Observe all heading elements
    const headings = document.querySelectorAll('h2, h3');
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, [content]);

  const scrollToHeading = (slug) => {
    const element = document.getElementById(slug);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <div className={`fixed left-3 bottom-4 w-64 max-h-[calc(100vh-6rem)] overflow-y-auto hide-scrollbar ${className}`}>
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
          Table of Contents
        </h4>
        <nav>
          <ul className="space-y-1">
            {tocItems.map((item, index) => {
              const paddingLeft = (item.level - 1) * 12;
              const isActive = activeId === item.slug;
              
              return (
                <li key={index}>
                  <button
                    onClick={() => scrollToHeading(item.slug)}
                    className={`
                      w-full text-left transition-all duration-200 hover:text-primary-600 dark:hover:text-primary-400
                      ${isActive 
                        ? 'text-primary-600 dark:text-primary-400 font-medium' 
                        : 'text-zinc-600 dark:text-zinc-400'
                      }
                      ${item.level === 1 ? 'font-semibold text-sm' : 'text-xs'}
                    `}
                    style={{ paddingLeft: `${paddingLeft}px` }}
                  >
                    <span className="line-clamp-2">{item.cleanText}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}