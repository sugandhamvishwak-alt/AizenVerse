import React from 'react';

export const WelcomeScreen = ({ onStart }) => {
  return (
    <div style={styles.container}>
      <div style={styles.glowOverlay} />

      <div style={styles.contentBox}>
        {/* Japanese Header Translation */}
        <div style={styles.japaneseHeader}>
          <span style={styles.kanji}>藍染惣右介</span>
          <span style={styles.divider}>•</span>
          <span style={styles.subtext}>AIZEN'S REALM</span>
        </div>

        {/* App Name */}
        <h1 style={styles.title}>
          AIZEN<span style={styles.titleHighlight}>VERSE</span>
        </h1>

        <div style={styles.accentLine} />

        {/* Aizen's Quote */}
        <blockquote style={styles.quoteCard}>
          <p style={styles.quoteText}>
            "No one has stood in the heavens from the beginning. Not you, not me, not even God. But the unbearable vacancy of the throne of heaven shall be filled."
          </p>
          <cite style={styles.quoteAuthor}>— Sosuke Aizen</cite>
        </blockquote>

        {/* Start Watching Button */}
        <button
          onClick={onStart}
          style={styles.startButton}
        >
          START WATCHING
        </button>
      </div>

      <div style={styles.footerTag}>
        AIZENVERSE EXTENSION SHELL v1.0
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#07040d',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '32px 20px',
    boxSizing: 'border-box',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative',
    overflow: 'hidden'
  },
  glowOverlay: {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '280px',
    height: '280px',
    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(0,0,0,0) 70%)',
    pointerEvents: 'none',
    borderRadius: '50%'
  },
  contentBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    maxWidth: '380px',
    width: '100%',
    zIndex: 2,
    textAlign: 'center'
  },
  japaneseHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px'
  },
  kanji: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#c084fc',
    letterSpacing: '3px'
  },
  divider: {
    color: '#6b21a8',
    fontSize: '12px'
  },
  subtext: {
    fontSize: '10px',
    fontWeight: '700',
    color: '#9333ea',
    letterSpacing: '2px'
  },
  title: {
    fontSize: '38px',
    fontWeight: '900',
    letterSpacing: '4px',
    color: '#ffffff',
    margin: '0 0 16px 0',
    textShadow: '0 0 20px rgba(192, 132, 252, 0.3)'
  },
  titleHighlight: {
    color: '#c084fc'
  },
  accentLine: {
    width: '40px',
    height: '2px',
    backgroundColor: '#a855f7',
    borderRadius: '2px',
    marginBottom: '24px',
    boxShadow: '0 0 10px #a855f7'
  },
  quoteCard: {
    margin: '0 0 36px 0',
    padding: '16px 20px',
    backgroundColor: '#110a1f',
    border: '1px solid rgba(168, 85, 247, 0.25)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
  },
  quoteText: {
    fontSize: '13px',
    lineHeight: '1.6',
    color: '#e2e8f0',
    fontStyle: 'italic',
    margin: '0 0 10px 0'
  },
  quoteAuthor: {
    fontSize: '11px',
    color: '#a855f7',
    fontWeight: '600',
    letterSpacing: '1px',
    display: 'block'
  },
  startButton: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#9333ea',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '800',
    letterSpacing: '2px',
    border: 'none',
    borderRadius: '14px',
    cursor: 'pointer',
    boxShadow: '0 0 25px rgba(147, 51, 234, 0.4)'
  },
  footerTag: {
    fontSize: '10px',
    color: 'rgba(168, 85, 247, 0.4)',
    letterSpacing: '1.5px',
    fontWeight: '600',
    zIndex: 2
  }
};

export default WelcomeScreen;
