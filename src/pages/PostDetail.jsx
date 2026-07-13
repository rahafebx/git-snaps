import { useParams } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import { useTheme } from "../context/ThemeContext";
import { useMarkdown } from "../hooks/useMarkdown";
import { SocialShare } from "../components/SocialShare";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import BackLinkButton from "../components/BackLinkButton";
import PostHeader from "../components/PostHeader";
import PostFeaturedBanner from "../components/PostFeaturedBanner";
import MarkdownContent from "../components/MarkdownContent";
import NoContent from "../components/NoContent";
import ContentLoading from "../components/ContentLoading";
import ContentLoadingError from "../components/ContentLoadingError";
import PostAuthor from "../components/PostAuthor";

export const PostDetail = () => {
  const showFloatingTOC = true;
  const { slug } = useParams();
  const { getPostBySlug } = useBlog();
  const { isDark } = useTheme();

  const postMetadata = getPostBySlug(slug);
  const { content, loading, error } = useMarkdown(slug);

  useDocumentMeta(postMetadata);

  if (!postMetadata) {
    return (
      <NoContent message="Post Not Found" linkText="Return Home" linkTo="/" />
    );
  }

  return (
    <article className={`${showFloatingTOC ? 'xl:ml-64' : ''} mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8`}>
      {/* Back Link Button */}
      <BackLinkButton to="/" text="Back to Home" />

      {/* Post Header Meta metadata */}
      <PostHeader
        title={postMetadata.title}
        date={postMetadata.date}
        tags={postMetadata.tags}
      />

      {/* Featured Banner Image */}
      <PostFeaturedBanner
        title={postMetadata.title}
        thumb={postMetadata.thumb}
      />

      {/* Render share tools panel right before primary reading text block */}
      {!loading && !error && <SocialShare title={postMetadata.title} />}
      {/* Content Rendering Control Triggers */}
      {loading && (
        <ContentLoading text="Parsing repository markdown blueprint..." />
      )}

      {error && <ContentLoadingError error={error} />}

      {/* Fully styled HTML Markdown view wrapper via atomic element targets */}
      {!loading && !error && (
        <MarkdownContent content={content} isDark={isDark} />
      )}

      {!loading && !error && (
        <PostAuthor
          username={postMetadata.author.username}
          name={postMetadata.author.name}
          position={postMetadata.author.position}
        />
      )}

      {!loading && !error && <SocialShare title={postMetadata.title} />}
    </article>
  );
};
