import { Link } from "react-router-dom";
export default function NoContent({message, linkText, linkTo}) {
  return (
    <div className="text-center py-24">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
        {message}
      </h2>
      <Link
        to={linkTo}
        className="mt-4 inline-block text-primary-600 dark:text-primary-400 font-medium"
      >
        {linkText}
      </Link>
    </div>
  );
}
