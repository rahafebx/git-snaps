import { Clock } from 'lucide-react';

const ReadingTime = ({ readingTime, className = '' }) => {
  if (!readingTime) return null;

  return (
    <div className={`flex items-center text-sm text-zinc-500 dark:text-zinc-400 ${className}`}>
      <Clock className="h-4 w-4 mr-1.5" />
      <span>{readingTime.text}</span>
    </div>
  );
};

export default ReadingTime;