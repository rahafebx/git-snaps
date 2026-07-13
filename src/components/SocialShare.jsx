export const SocialShare = ({ title }) => {
  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(`Check out this guide: "${title}" via git_snaps`);

  // Target Endpoint Maps with exact SVG paths
  const channels = [
    {
      name: 'X',
      href: `https://x.com/intent/tweet?url=${shareUrl}&text=${shareText}`,
      colorClass: 'hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white',
      svg: <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
    },
    {
      name: 'Bluesky',
      href: `https://bsky.app/intent/compose?text=${shareText}%20${shareUrl}`,
      colorClass: 'hover:bg-sky-100 dark:hover:bg-sky-900/40 text-sky-600 dark:text-sky-400',
      svg: <path d="M3.468 1.948C5.303 3.325 7.276 6.118 8 7.616c.725-1.498 2.698-4.29 4.532-5.668C13.855.955 16 .186 16 2.632c0 .489-.28 4.105-.444 4.692-.572 2.04-2.653 2.561-4.504 2.246 3.236.551 4.06 2.375 2.281 4.2-3.376 3.464-4.852-.87-5.23-1.98-.07-.204-.103-.3-.103-.218 0-.081-.033.014-.102.218-.379 1.11-1.855 5.444-5.231 1.98-1.778-1.825-.955-3.65 2.28-4.2-1.85.315-3.932-.205-4.503-2.246C.28 6.737 0 3.12 0 2.632 0 .186 2.145.955 3.468 1.948"/> 
    },
    {
      name: 'WhatsApp',
      href: `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`,
      colorClass: 'hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400',
      svg: <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/> 
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      colorClass: 'hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400',
      svg: <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
    }
  ];

  return (
    <div className="my-10 p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/40">
      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
        -- Share this commit
      </h4>
      <div className="flex flex-wrap gap-2">
        {channels.map((channel) => (
          <a
            key={channel.name}
            href={channel.href}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium border border-zinc-200 dark:border-zinc-800 rounded-full transition-all duration-150 shadow-sm hover:shadow-md ${channel.colorClass}`}
          >
            <svg 
              viewBox="0 0 16 16" 
              fill="currentColor" 
              className="h-4 w-4 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              {channel.svg}
            </svg>
            <span>{channel.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};