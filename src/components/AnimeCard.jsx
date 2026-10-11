import React from 'react';

const FALLBACK_POSTER =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 640">
      <rect width="480" height="640" fill="#090d16" />
      <path d="M240 190a62 62 0 1 0 0 124 62 62 0 0 0 0-124Zm-124 250c16-68 66-106 124-106s108 38 124 106" fill="none" stroke="#155e75" stroke-width="18" stroke-linecap="round" />
      <text x="240" y="520" fill="#67e8f9" font-family="sans-serif" font-size="25" text-anchor="middle">POSTER UNAVAILABLE</text>
    </svg>
  `);

export const AnimeCard = ({ anime, onSelect }) => {
  const handleImageError = (event) => {
    const image = event.currentTarget;
    if (image.dataset.fallbackApplied) return;
    image.dataset.fallbackApplied = 'true';
    image.src = FALLBACK_POSTER;
  };

  return (
    <button
      type="button"
      onClick={() => onSelect?.(anime)}
      aria-label={`Show details for ${anime.title}`}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-cyan-500/20 bg-[#090d16] text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-950">
        <img
          src={anime.image || FALLBACK_POSTER}
          alt={`${anime.title} poster`}
          onError={handleImageError}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-black/30 opacity-80 transition-opacity group-hover:opacity-60" />
        <div className="absolute right-2 top-2 rounded border border-cyan-500/30 bg-black/70 px-2 py-0.5 text-[10px] font-mono text-cyan-300">
          ★ {anime.score ?? 'N/A'}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-xs font-semibold text-gray-200 transition-colors group-hover:text-cyan-300">
          {anime.title}
        </h3>
        {anime.genres?.length > 0 && (
          <span className="truncate text-[10px] font-mono text-gray-500">
            {anime.genres.slice(0, 2).join(' · ')}
          </span>
        )}
      </div>
    </button>
  );
};
