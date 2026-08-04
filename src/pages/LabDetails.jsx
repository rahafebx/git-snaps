import { useParams, Link } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import { useTheme } from "../context/ThemeContext";
import { useMarkdown } from "../hooks/useMarkdown";
import { SocialShare } from "../components/SocialShare";
import { Contribute } from "../components/Contribute";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import BackLinkButton from "../components/BackLinkButton";
import PostHeader from "../components/PostHeader";
import PostFeaturedBanner from "../components/PostFeaturedBanner";
import MarkdownContent from "../components/MarkdownContent";
import NoContent from "../components/NoContent";
import ContentLoading from "../components/ContentLoading";
import ContentLoadingError from "../components/ContentLoadingError";
import PostAuthor from "../components/PostAuthor";

export const LabDetails = () => {
  const showFloatingTOC = false;
  const { slug } = useParams();
  const { getLabBySlug, getPostBySlug } = useBlog();
  const { isDark } = useTheme();

  const labMetadata = getLabBySlug(slug);
  const postMetadata = labMetadata ? getPostBySlug(labMetadata.parentPostSlug) : null;
  const { content, loading, error } = useMarkdown(slug, 'labs'); // Assuming labs are in a 'labs' folder

  useDocumentMeta(labMetadata);

  if (!labMetadata) {
    return (
      <NoContent title="Lab Not Found" message="Sorry, the lab you are looking for is not available." linkText="Return Home" linkTo="/" />
    );
  }

  return (
    <article className={`${showFloatingTOC ? 'xl:ml-64' : ''} mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8`}>
      {/* Back Link Button */}
      <div className="flex items-center gap-4 flex-wrap justify-between mb-8">
        <BackLinkButton to={`/post/${postMetadata?.slug}`} text="Back to Post" />
        {postMetadata && (
          <span className="text-sm text-gray-500 dark:text-gray-400 block">
            Lab from: <Link to={`/post/${postMetadata.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline">
              {postMetadata.title}
            </Link>
          </span>
        )}
      </div>

      {/* Lab Header Meta metadata */}
      {!loading && !error && (
        <PostHeader
          title={labMetadata.title}
          date={labMetadata.date}
          tags={labMetadata.tags}
          isLab={true}
          post={labMetadata}
        />
      )}

      {/* Featured Banner Image */}
      {!loading && !error && labMetadata.thumb && (
        <PostFeaturedBanner
          title={labMetadata.title}
          thumb={labMetadata.thumb}
        />
      )}

      {/* Render share tools panel right before primary reading text block */}
      {!loading && !error && <SocialShare title={labMetadata.title} />}
      
      {/* Content Rendering Control Triggers */}
      {loading && (
        <ContentLoading text="Parsing lab markdown blueprint..." />
      )}

      {error && <ContentLoadingError error={error} />}

      {/* Fully styled HTML Markdown view wrapper via atomic element targets */}
      {!loading && !error && (
        <MarkdownContent content={content} isDark={isDark} showFloatingTOC={showFloatingTOC} />
      )}

      {/* Author Section */}
      {!loading && !error && (
        <PostAuthor
          username={labMetadata.author.username}
          name={labMetadata.author.name}
          position={labMetadata.author.position}
        />
      )}

      {/* Social Share */}
      {!loading && !error && <SocialShare title={labMetadata.title} />}

      {/* Contribute Section */}
      {!loading && !error && <Contribute isLab={true} />}

      {/* Back to post button at bottom */}
      {postMetadata && (
        <div className="mt-8">
          <BackLinkButton to={`/post/${postMetadata?.slug}`} text="Back to Post" />
        </div>
      )}
    </article>
  );
};