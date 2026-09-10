import React, { useState, useEffect } from 'react';
import VideoPlayer from './components/VideoPlayer';
import { fetchCleanStream } from './services/animeApi';

const QUOTES = [
  "In the end, everything is nothing more than an illusion.",
  "Fear is not evil. It tells you what your weakness is.",
  "Power comes in response to a need, not a desire.",
  "You should have looked underneath the underneath.",
  "The winner is always the one who has the least regrets.",
  "There is no such thing as coincidence in this world.",
  "Once I decide something, I never change my mind."
];

const GENRES = {
  "Action": [
    { title: "Bleach: TYBW", slug: "bleach-thousand-year-blood-war", meta: "Ep 1" },
    { title: "Chainsaw Man", slug: "chainsaw-man", meta: "Ep 1" },
    { title: "Jujutsu Kaisen S2", slug: "jujutsu-kaisen-2nd-season", meta: "Ep 1" },
    { title: "Demon Slayer S4", slug: "kimetsu-no-yaiba-hashira-geiko-hen", meta: "Ep 1" }
  ],
  "Fantasy": [
    { title: "Frieren", slug: "sousou-no-frieren", meta: "Ep 1" },
    { title: "Solo Leveling", slug: "sololeveling", meta: "Ep 1" },
    { title: "Overlord IV", slug: "overlord-iv", meta: "Ep 1" },
    { title: "Mushoku Tensei S2", slug: "mushoku-tensei-isekai-itstart-season-2", meta: "Ep 1" }
  ],
  "Drama": [
    { title: "Oshi no Ko", slug: "oshi-no-ko", meta: "Ep 1" },
    { title: "Vinland Saga S2", slug: "vinland-saga-season-2", meta: "Ep 1" },
    { title: "Monster", slug: "monster", meta: "Ep 1" },
    { title: "Steins;Gate", slug: "steinsgate", meta: "Ep 1" }
  ]
};

const CONTINUE_WATCHING = [
  { title: "Bleach: TYBW", slug: "bleach-thousand-year-blood-war", meta: "Ep 12" },
  { title: "Chainsaw Man", slug: "chainsaw-man", meta: "Ep 4" },
  { title: "Frieren", slug: "sousou-no-frieren", meta: "Ep 8" },
  { title: "Oshi no Ko", slug: "oshi-no-ko", meta: "Ep 1" }
];

export default function App() {
  const [view, setView] = useState('splash');
  const [dailyQuote, setDailyQuote] = useState('');
  const [activeAnime, setActiveAnime] = useState({ title: '', meta: '', slug: '' });
  const [streamUrl, setStreamUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [activePill, setActivePill] = useState("Action");

  useEffect(() => {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    setDailyQuote(QUOTES[dayOfYear % QUOTES.length]);
  }, []);

  const openPlayer = async (title, meta, slug, epNum = 1) => {
    setActiveAnime({ title, meta, slug });
    setStreamUrl('');
    setView('player');
    setLoading(true);
    window.scrollTo(0, 0);

    const url = await fetchCleanStream(slug, epNum);
    setStreamUrl(url);
    setLoading(false);
  };

  const scrollToGenre = (genre) => {
    setActivePill(genre);
    const el = document.getElementById(`genre-${genre}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      {/* SPLASH VIEW */}
      {view === 'splash' && (
        <div id="splash">
          <h1 className="splash-title">AizenVerse</h1>
          <p className="splash-quote">"{dailyQuote}"</p>
          <p className="splash-attribution">— Sōsuke Aizen</p>
          <button id="start-watching" onClick={() => setView('home')}>
            Start watching
          </button>
        </div>
      )}

      {/* HOME VIEW */}
      {view === 'home' && (
        <div id="main">
          <nav>
            <span className="logo" onClick={() => setView('home')}>AizenVerse</span>
            <div className="nav-icons">
              <span>Search</span>
              <span>Menu</span>
            </div>
          </nav>

          <div className="hero">
            <div className="hero-content">
              <p className="hero-title serif">Bleach: Thousand-Year Blood War</p>
              <p className="hero-desc">
                The peace is suddenly broken when warning sirens chime through the Soul Society.
              </p>
              <div className="hero-actions">
                <button 
                  className="btn-primary" 
                  onClick={() => openPlayer('Bleach: TYBW', 'Episode 1', 'bleach-thousand-year-blood-war', 1)}
                >
                  Watch now
                </button>
                <button className="btn-secondary">More info</button>
              </div>
            </div>
          </div>

          <div className="section">
            <p className="section-title">Continue watching</p>
            <div className="row">
              {CONTINUE_WATCHING.map((item, idx) => (
                <div key={idx} className="card" onClick={() => openPlayer(item.title, item.meta, item.slug)}>
                  <div className="card-thumb"></div>
                  <p className="card-title">{item.title}</p>
                  <p className="card-meta">{item.meta}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="section">
            <p className="section-title">Genres</p>
            <div className="genre-pills">
              {Object.keys(GENRES).map((genre) => (
                <span 
                  key={genre} 
                  className={`pill ${activePill === genre ? 'active' : ''}`}
                  onClick={() => scrollToGenre(genre)}
                >
                  {genre}
                </span>
              ))}
            </div>

            <div id="genre-blocks">
              {Object.keys(GENRES).map((genre) => (
                <div key={genre} className="genre-block" id={`genre-${genre}`}>
                  <p className="genre-block-title serif">{genre}</p>
                  <div className="row">
                    {GENRES[genre].map((item, idx) => (
                      <div key={idx} className="card" onClick={() => openPlayer(item.title, item.meta, item.slug)}>
                        <div className="card-thumb"></div>
                        <p className="card-title">{item.title}</p>
                        <p className="card-meta">{item.meta}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PLAYER VIEW */}
      {view === 'player' && (
        <div id="player">
          <div className="back-btn" onClick={() => setView('home')}>← Back</div>
          <VideoPlayer streamUrl={streamUrl} loading={loading} />
          <p className="player-title">{activeAnime.title}</p>
          <p className="player-meta">{activeAnime.meta}</p>
        </div>
      )}
    </div>
  );
}
