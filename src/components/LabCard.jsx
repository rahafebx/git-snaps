import { Link } from "react-router-dom";

const LabCard = ({ lab, parentSlug }) => {
  return (
    <Link 
      to={`/lab/${lab.slug}`}
      className="group block p-6 shadow-md hover:shadow-xl transition-shadow duration-200 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/40"
    >
      <div className="flex items-start gap-4">
        {lab.thumb && (
          <img 
            src={lab.thumb} 
            alt={lab.title}
            className="w-20 h-20 object-cover rounded-lg shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {lab.title}
          </h3>
          {lab.description && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {lab.description}
            </p>
          )}
          <div className="mt-2 flex flex-wrap gap-1">
            {lab.tags?.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
              >
                {tag}
              </span>
            ))}
            {lab.tags && lab.tags.length > 3 && (
              <span className="inline-block px-2 py-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                +{lab.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LabCard;