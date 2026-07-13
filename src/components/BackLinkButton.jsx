import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackLinkButton({ to, text }) {
  return (
    <Link
        to={to}
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-primary-600 dark:text-zinc-400 dark:hover:text-primary-400 mb-8 font-medium transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> {text}
      </Link>
  );
}