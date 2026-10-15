import { useEffect, useRef, useState } from 'react';

// Paste your own quotes here. "audio" is optional, e.g. '/audio/q1.mp3'.
const QUOTES = [
  { text: 'Your first quote goes here.', audio: null },
  { text: 'Your second quote goes here.', audio: null },
];
const SHOW_MS = 6000;

export function WelcomeScreen({ onStart }) {
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setVisible(true);
    const q = QUOTES[i];
    if (q.audio && audioRef.current) {
      audioRef.current.src = q.audio;
      audioRef.current.play().catch(() => {});
    }
    const hide = setTimeout(() => setVisible(false), SHOW_MS - 700);
    const next = setTimeout(() => setI((n) => (n + 1) % QUOTES.length), SHOW_MS);
    return () => { clearTimeout(hide); clearTimeout(next); };
  }, [i]);

  return (
    <div className="intro">
      <div className="intro-glow" />
      <img className="intro-char" src="/aizen.png" alt="" onError={(e) => (e.currentTarget.style.display = 'none')} />
      <h1 className="intro-name">AIZENVERSE</h1>
      <p className={`intro-sub ${visible ? 'in' : ''}`}>“{QUOTES[i].text}”</p>
      <button className="btn crimson" onClick={onStart}>▶&nbsp; START WATCHING</button>
      <audio ref={audioRef} />
    </div>
  );
}
