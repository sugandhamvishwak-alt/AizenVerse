import React from 'react';

export const AnimeCard = ({ anime, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(anime)}
      className="group relative bg-[#090d16] rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] flex flex-col"
    >
      {/* Anime Poster Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-950">
        <img
          src={anime.image}
          alt={anime.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-black/30 opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Status Badge */}
        <div className="absolute top-2 left-2 flex gap-1">
          {anime.subOrDub && (
            <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 rounded uppercase">
              {anime.subOrDub}
            </span>
          )}
        </div>

        {/* Episode Count */}
        {anime.episodeNumber && (
          <div className="absolute bottom-2 right-2 px-2 py-0.5 text-[10px] font-mono bg-fuchsia-950/80 text-fuchsia-300 border border-fuchsia-500/40 rounded">
            EP {anime.episodeNumber}
          </div>
        )}
      </div>

      {/* Title & Metadata */}
      <div className="p-3 flex-1 flex flex-col justify-between gap-1">
        <h3 className="text-xs font-semibold text-gray-200 group-hover:text-cyan-300 transition-colors line-clamp-2">
          {anime.title}
        </h3>
        {anime.releaseDate && (
          <span className="text-[10px] font-mono text-gray-500">
            {anime.releaseDate}
          </span>
        )}
      </div>
    </div>
  );
};
