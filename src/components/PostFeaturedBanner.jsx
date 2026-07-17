export default function PostFeaturedBanner({ title, thumb }) {
  return (
    <div className="mb-12 rounded-2xl overflow-hidden aspect-video bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <img src={thumb} alt={title} className="w-full h-full object-cover bg-primary-50 dark:bg-primary-950/20" />
    </div>
  );
}
