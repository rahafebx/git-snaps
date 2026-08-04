import { useParams } from "react-router-dom";
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
import NextPost from "../components/NextPost";
import PreviousPost from "../components/PreviousPost";
import LabCard from "../components/LabCard";

export const PostDetail = () => {
  const showFloatingTOC = true;
  const { slug } = useParams();
  const { getPostBySlug, getAdjacentPosts, getLabsForPost } = useBlog();
  const { isDark } = useTheme();

  const postMetadata = getPostBySlug(slug);
  const { previous, next } = getAdjacentPosts(slug);
  const labs = getLabsForPost(slug);
  const { content, loading, error } = useMarkdown(slug);

  useDocumentMeta(postMetadata);

  if (!postMetadata) {
    return (
      <NoContent
        title="Post Not Found"
        message="Sorry, the post you are looking for is not available."
        linkText="Return Home"
        linkTo="/"
      />
    );
  }

  return (
    <article
      className={`${showFloatingTOC ? "xl:ml-72" : ""} mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8`}
    >
      {/* Back Link Button */}
      <BackLinkButton to="/" text="Back to Home" className="mb-8" />

      {/* Post Header Meta metadata */}
      {!loading && !error && (
        <PostHeader
          title={postMetadata.title}
          date={postMetadata.date}
          tags={postMetadata.tags}
          post={postMetadata}
        />
      )}

      {/* Featured Banner Image */}
      {!loading && !error && postMetadata.thumb && (
        <PostFeaturedBanner
          title={postMetadata.title}
          thumb={postMetadata.thumb}
        />
      )}

      {/* Render share tools panel right before primary reading text block */}
      {!loading && !error && <SocialShare title={postMetadata.title} />}

      {/* Content Rendering Control Triggers */}
      {loading && (
        <ContentLoading text="Parsing repository markdown blueprint..." />
      )}

      {error && <ContentLoadingError error={error} />}

      {/* Fully styled HTML Markdown view wrapper via atomic element targets */}
      {!loading && !error && (
        <MarkdownContent
          content={content}
          isDark={isDark}
          showFloatingTOC={showFloatingTOC}
        />
      )}

      {/* Labs Section */}
      {!loading && !error && labs && labs.length > 0 && (
        <section className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-700">
          <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">
            -- Labs & Exercises
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 mb-6">
            Practice what you've learned with these hands-on labs:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {labs.map((lab) => (
              <LabCard
                key={lab.id}
                lab={lab}
                parentSlug={slug}
                variant="compact" // Use compact variant for PostDetails
              />
            ))}
          </div>
        </section>
      )}

      {/* Author Section */}
      {!loading && !error && (
        <PostAuthor
          username={postMetadata.author.username}
          name={postMetadata.author.name}
          position={postMetadata.author.position}
        />
      )}

      {/* Social Share Section */}
      {!loading && !error && <SocialShare title={postMetadata.title} />}

      {/* Contribute Section */}
      {!loading && !error && <Contribute />}

      {/* Navigation between posts */}
      {!loading && !error && (previous || next) && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">
            -- Continue Reading
          </h2>
          <div className=" grid grid-cols-1 gap-4 md:grid-cols-2">
            <PreviousPost post={previous} />
            <NextPost post={next} />
          </div>
        </section>
      )}
    </article>
  );
};
