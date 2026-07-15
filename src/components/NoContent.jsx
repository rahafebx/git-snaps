import { Link } from "react-router-dom";
import { Info } from "lucide-react";
export default function NoContent({title, message, linkText, linkTo}) {
  return (
    <section className="text-center py-24 mx-auto max-w-2xl">
      <Info className="mx-auto h-16 w-16 text-primary-400 dark:text-primary-500 mb-4" />
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
        {title || "Content Not Found"}
      </h2>
      <p className="text-zinc-600 dark:text-zinc-300">
        {message || "Sorry, the content you are looking for is not available. Please check the URL or try navigating back to the main page."}
      </p>
      <Link
        to={linkTo}
        className="mt-4 inline-block text-primary-600 dark:text-primary-400 font-medium"
      >
        {linkText}
      </Link>
    </section>
  );
}
