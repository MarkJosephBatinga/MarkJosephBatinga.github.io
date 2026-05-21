// Live theming panel — only shows up in edit/preview mode

function TweaksPanel({ open, onClose, state, onChange }) {
  if (!open) return null;

  const accents = [
    { name: 'mint',   v: '#00ff9d' },
    { name: 'indigo', v: '#7aa2f7' },
    { name: 'amber',  v: '#ffbf47' },
    { name: 'rose',   v: '#ff6b7a' },
    { name: 'cyan',   v: '#22d3ee' },
    { name: 'violet', v: '#c4b5fd' },
  ];

  const persist = (patch) => {
    onChange(patch);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*');
  };

  return (
    <div className="tweaks-panel">
      <h4>
        <button className="close" onClick={onClose}>×</button>
      </h4>

      <div className="tweak-row">
        <label>accent</label>
        <div className="tweak-swatches">
          {accents.map(a => (
            <button
              key={a.name}
              title={a.name}
              style={{ '--sw': a.v }}
              className={state.accent === a.v ? 'active' : ''}
              onClick={() => persist({ accent: a.v })}
            />
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>density</label>
        <div className="seg">
          {['compact', 'comfy'].map(d => (
            <button key={d} className={state.density === d ? 'active' : ''} onClick={() => persist({ density: d })}>
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>projects layout</label>
        <div className="seg">
          {['cards', 'list'].map(d => (
            <button key={d} className={state.projectsLayout === d ? 'active' : ''} onClick={() => persist({ projectsLayout: d })}>
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>scanlines (CRT)</label>
        <div className="seg">
          {[['off', false], ['on', true]].map(([label, val]) => (
            <button key={label} className={state.scanlines === val ? 'active' : ''} onClick={() => persist({ scanlines: val })}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

window.TweaksPanel = TweaksPanel;
