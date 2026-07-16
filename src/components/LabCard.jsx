import { Link } from "react-router-dom";
import { BookOpen, FlaskConical } from "lucide-react";

const LabCard = ({ lab, parentSlug, showParentInfo = false, variant = 'compact' }) => {
  // Compact variant: Used in PostDetails (smaller, inline)
  // Full variant: Used in Labs page (card style matching BlogCard)
  const isFull = variant === 'full';

  if (isFull) {
    // Full card variant - matches BlogCard style
    return (
      <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl dark:border-zinc-800 hover:dark:border-zinc-700 dark:bg-zinc-900">
        {/* Featured Banner Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <img
            src={lab.thumb}
            alt={lab.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 bg-primary-50 dark:bg-primary-950/20"
            loading="lazy"
          />
          {/* Lab Badge Overlay */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-primary-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold">
            <FlaskConical className="h-3.5 w-3.5" />
            <span>Lab</span>
          </div>
          {/* Parent Post Badge */}
          {showParentInfo && lab.parentPostTitle && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs">
              <BookOpen className="h-3 w-3" />
              <span>From: {lab.parentPostTitle}</span>
            </div>
          )}
        </div>
        
        {/* Card Content */}
        <div className="flex flex-1 flex-col p-6">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-3">
            {lab.category && lab.category.map((cat) => (
              <span
                key={cat}
                className="rounded-md bg-primary-50 px-2 py-0.5 text-xs font-semibold text-primary-600 dark:bg-primary-950/50 dark:text-primary-400"
              >
                {cat}
              </span>
            ))}
          </div>
          
          {/* Title and Description */}
          <h2 className="text-xl font-bold text-zinc-900 line-clamp-2 dark:text-zinc-50 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            <Link to={`/lab/${lab.slug}`}>{lab.title}</Link>
          </h2>
          <p className="mt-2 text-sm text-zinc-600 line-clamp-3 dark:text-zinc-400 flex-1">
            {lab.description}
          </p>
          
          {/* Date and Tags */}
          <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>{lab.date}</span>
            <div className="flex gap-1.5">
              {lab.tags && lab.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-zinc-700 dark:text-zinc-400 bg-primary-50 dark:bg-primary-950/50 px-2 py-0.5 rounded-md">
                  {tag}
                </span>
              ))}
              {lab.tags && lab.tags.length > 2 && (
                <span className="text-zinc-700 dark:text-zinc-400 py-0.5">
                  +{lab.tags.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Compact variant - Used in PostDetails (original compact design)
  return (
    <Link 
      to={`/lab/${lab.slug}`}
      className="group block p-4 bg-zinc-50/50 dark:bg-zinc-900/40 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border border-zinc-200 dark:border-zinc-800 hover:border-primary-300 dark:hover:border-primary-700"
    >
      <div className="flex items-start gap-4">
        {lab.thumb && (
          <img 
            src={lab.thumb} 
            alt={lab.title}
            className="w-20 h-20 object-cover rounded-lg shrink-0 bg-primary-50 dark:bg-primary-950/20"
            loading="lazy"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <FlaskConical className="h-4 w-4 text-primary-600 dark:text-primary-400" />
            <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
              Lab
            </span>
          </div>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
            {lab.title}
          </h3>
          
          {lab.description && (
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">
              {lab.description}
            </p>
          )}
          
          {/* Tags */}
          {lab.tags && lab.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {lab.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="inline-block px-2 py-0.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded"
                >
                  {tag}
                </span>
              ))}
              {lab.tags.length > 3 && (
                <span className="inline-block px-2 py-0.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  +{lab.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default LabCard;