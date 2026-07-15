import { useEffect, useMemo, useState, useRef } from 'react';
import { extractTOC } from '../utils/tocExtractor';

export default function FloatingTOC({ content, className }) {
  const [activeId, setActiveId] = useState('');
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const tocItems = useMemo(() => extractTOC(content), [content]);

  // Handle URL hash changes and initial load
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveId(hash);
      }
    };

    // Set initial active state from URL hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Intersection Observer for scroll-based updates
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Skip updates during programmatic scroll
        if (isScrolling) return;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveId(id);
            // Update URL hash without triggering scroll
            if (window.history.replaceState && id) {
              window.history.replaceState(null, null, `#${id}`);
            }
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
  }, [content, isScrolling]);

  // Handle clicks on TOC items
  const scrollToHeading = (slug, e) => {
    if (e) e.preventDefault();
    
    const element = document.getElementById(slug);
    if (element) {
      // Update active state immediately
      setActiveId(slug);
      
      // Update URL hash without causing page jump
      if (window.history.pushState) {
        window.history.pushState(null, null, `#${slug}`);
      }
      
      // Mark that we're in a programmatic scroll
      setIsScrolling(true);
      
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Re-enable observer after scroll completes
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        scrollTimeoutRef.current = null;
      }, 800); // Adjust based on scroll duration
    }
  };

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
                      w-full text-left transition-all duration-200 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer
                      ${isActive 
                        ? 'text-primary-600 dark:text-primary-400' 
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
    </section>
  );
}