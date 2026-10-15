const ICONS = {
  home: 'M3 11l9-8 9 8v10h-6v-6H9v6H3z',
  search: 'M10 3a7 7 0 100 14 7 7 0 000-14zm6 14l5 5',
  library: 'M6 3h12v18l-6-4-6 4z',
  downloads: 'M12 3v12m0 0l-4-4m4 4l4-4M4 20h16',
  settings: 'M4 7h10M18 7h2M4 17h2M10 17h10M16 4v6M8 14v6',
};
const TABS = [
  { id: 'home', label: 'HOME' },
  { id: 'search', label: 'SEARCH' },
  { id: 'library', label: 'LIBRARY' },
  { id: 'downloads', label: 'DOWNLOADS' },
  { id: 'settings', label: 'SETTINGS' },
];

export default function BottomNav({ tab, onChange }) {
  return (
    <nav className="nav">
      {TABS.map((t) => (
        <button key={t.id} className={tab === t.id ? 'on' : ''} onClick={() => onChange(t.id)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={ICONS[t.id]} />
          </svg>
          {t.label}
        </button>
      ))}
    </nav>
  );
}
