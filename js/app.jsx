// Root app — nav, layout, and theme wiring

function CircuitM({ size = 28, animate = true }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} style={{ display: 'block' }}>
      <g stroke="var(--fg)" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 14 46 L 14 20 L 32 38 L 50 20 L 50 46" />
      </g>
      <circle cx="14" cy="20" r="3.6" fill="var(--accent)">
        {animate && <animate attributeName="opacity" values="1;0.35;1" dur="2.4s" begin="0s"   repeatCount="indefinite" />}
      </circle>
      <circle cx="50" cy="20" r="3.6" fill="var(--accent)">
        {animate && <animate attributeName="opacity" values="1;0.35;1" dur="2.4s" begin="0.8s" repeatCount="indefinite" />}
      </circle>
      <circle cx="32" cy="38" r="3.6" fill="var(--accent)">
        {animate && <animate attributeName="opacity" values="1;0.35;1" dur="2.4s" begin="1.6s" repeatCount="indefinite" />}
      </circle>
      <circle cx="14" cy="46" r="2.4" fill="var(--fg)" />
      <circle cx="50" cy="46" r="2.4" fill="var(--fg)" />
    </svg>
  );
}

function Nav() {
  return (
    <div className="nav">
      <div className="container nav-inner">
        <a href="#home" className="brand">
          <CircuitM size={26} />
          <span style={{ marginLeft: 10 }}>
            mjb<span className="dim">@mbp</span>:<span style={{ color: 'var(--amber)' }}>~</span><span className="dim">$</span>
          </span>
        </a>
        <div className="nav-links">
          <a href="#about"><span className="hash">/</span>about</a>
          <a href="#stack"><span className="hash">/</span>stack</a>
          <a href="#experience"><span className="hash">/</span>experience</a>
          <a href="#projects"><span className="hash">/</span>projects</a>
          <a href="#architecture" className="secondary"><span className="hash">/</span>architecture</a>
          <a href="#services"     className="secondary"><span className="hash">/</span>services</a>
          <a href="#stats"        className="secondary"><span className="hash">/</span>stats</a>
          <a href="#writing"      className="secondary"><span className="hash">/</span>writing</a>
        </div>
        <a href="#contact" className="nav-cta">./hire-me.sh</a>
      </div>
    </div>
  );
}

function App() {
  const [tweaks,   setTweaks]   = React.useState(window.TWEAKS);
  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => {
    const handler = (e) => {
      const msg = e.data;
      if (!msg || typeof msg !== 'object') return;
      if (msg.type === '__activate_edit_mode')   setEditMode(true);
      if (msg.type === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  // push accent/density/etc. changes into CSS variables
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent',      tweaks.accent);
    root.style.setProperty('--accent-soft', `color-mix(in oklab, ${tweaks.accent} 18%, transparent)`);
    root.style.setProperty('--accent-glow', `color-mix(in oklab, ${tweaks.accent} 45%, transparent)`);
    root.dataset.density        = tweaks.density;
    root.dataset.projectsLayout = tweaks.projectsLayout;
    document.body.dataset.scanlines = String(tweaks.scanlines);
  }, [tweaks]);

  const handleChange = (patch) => setTweaks(t => ({ ...t, ...patch }));

  return (
    <>
      <Nav />
      <window.Hero />
      <window.About />
      <window.Stack />
      <window.Experience />
      <window.Projects />
      <window.ArchitectureSection />
      <window.Services />
      <window.GitHubStats />
      <window.Writing />
      <window.Contact />
      <window.Footer />
      <window.TweaksPanel
        open={editMode}
        onClose={() => setEditMode(false)}
        state={tweaks}
        onChange={handleChange}
      />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
