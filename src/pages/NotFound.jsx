import NoContent from "../components/NoContent";
import { SEO } from "../components/SEO";
export const NotFound = () => {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <SEO isPage={true} />

        <NoContent
          title="Page Not Found"
          message="Sorry, the page you are looking for is not available."
          linkText="Return Home"
          linkTo="/"
        />
      </div>
    );
};
