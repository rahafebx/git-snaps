import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { extractTOC } from '../utils/tocExtractor';

export default function FloatingTOC({ content, className, themeChangeKey }) {
  const [activeId, setActiveId] = useState('');
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const tocItems = useMemo(() => extractTOC(content), [content]);

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) setActiveId(hash);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Simple scroll handler with throttling
  const updateActiveHeading = useCallback(() => {
    if (isScrolling) return;

    const headings = document.querySelectorAll('h1[id], h2[id], h3[id]');
    if (headings.length === 0) return;

    let closestHeading = null;
    let closestDistance = Infinity;

    headings.forEach((heading) => {
      const rect = heading.getBoundingClientRect();
      // Calculate distance from the top of viewport (with offset)
      const distance = Math.abs(rect.top - 100);
      
      if (distance < closestDistance && rect.top < window.innerHeight * 0.8) {
        closestDistance = distance;
        closestHeading = heading;
      }
    });

    if (closestHeading && closestHeading.id !== activeId) {
      setActiveId(closestHeading.id);
      // Update URL without triggering scroll
      if (window.history.replaceState) {
        window.history.replaceState(null, null, `#${closestHeading.id}`);
      }
    }
  }, [activeId, isScrolling]);

  // Throttled scroll listener
  useEffect(() => {
    let ticking = false;
    let initialCheckFrame = null;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveHeading();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    initialCheckFrame = window.requestAnimationFrame(() => {
      updateActiveHeading();
    });

    return () => {
      if (initialCheckFrame) {
        window.cancelAnimationFrame(initialCheckFrame);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateActiveHeading]);

  // Handle clicks on TOC items
  const scrollToHeading = useCallback((slug, e) => {
    if (e) e.preventDefault();
    
    const element = document.getElementById(slug);
    if (!element) return;

    setActiveId(slug);
    
    if (window.history.pushState) {
      window.history.pushState(null, null, `#${slug}`);
    }

    setIsScrolling(true);
    
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      // Update active heading after scroll completes
      updateActiveHeading();
    }, 500); // Reduced timeout for better responsiveness
  }, [updateActiveHeading]);

  // Re-initialize on theme change
  useEffect(() => {
    if (themeChangeKey) {
      // Small delay to ensure DOM updates
      setTimeout(() => {
        updateActiveHeading();
      }, 50);
    }
  }, [themeChangeKey, updateActiveHeading]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  if (tocItems.length === 0) return null;

  return (
    <section className={`fixed left-3 top-20 w-64 max-h-[calc(100vh-6rem)] overflow-y-auto hide-scrollbar ${className}`}>
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
          Table of Contents
        </h2>
        <nav>
          <ul className="space-y-1">
            {tocItems.map((item, index) => {
              const paddingLeft = (item.level - 1) * 12;
              const isActive = activeId === item.slug;
              
              return (
                <li key={index}>
                  <button
                    onClick={(e) => scrollToHeading(item.slug, e)}
                    className={`
                      w-full text-left transition-colors duration-150 
                      hover:text-primary-600 dark:hover:text-primary-400 
                      cursor-pointer text-sm
                      ${isActive 
                        ? 'text-primary-600 dark:text-primary-400 font-medium' 
                        : 'text-zinc-600 dark:text-zinc-400'
                      }
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
    </section>
  );
}