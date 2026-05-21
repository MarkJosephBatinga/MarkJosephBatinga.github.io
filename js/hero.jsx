// Hero section — animated terminal + intro text

function TerminalHero() {
  const lines = [
    { kind: "cmd",    user: "mjb", host: "mbp", path: "~/portfolio", text: "whoami" },
    { kind: "out",    text: "Mark Joseph Batinga — Freelance Fullstack Developer" },
    { kind: "out",    text: "San Narciso, Zambales, PH · available for remote" },
    { kind: "blank" },
    { kind: "cmd",    user: "mjb", host: "mbp", path: "~/portfolio", text: "cat stack.json | jq '.primary'" },
    { kind: "out",    text: '["Laravel","Node.js","MySQL","MongoDB","AWS"]' },
    { kind: "blank" },
    { kind: "cmd",    user: "mjb", host: "mbp", path: "~/portfolio", text: "curl -s api/status" },
    { kind: "out-ok", text: '{ "status": "ok", "uptime": "99.98%", "pager": "quiet" }' },
    { kind: "blank" },
    { kind: "cmd",    user: "mjb", host: "mbp", path: "~/portfolio", text: "./hire-me.sh --remote --fullstack --freelance" },
    { kind: "out-ok", text: "✔ listening on :4040 — let's talk." },
  ];

  const [visible, setVisible] = React.useState([]);
  const [typing,  setTyping]  = React.useState("");
  const [idx,     setIdx]     = React.useState(0);
  const [char,    setChar]    = React.useState(0);

  React.useEffect(() => {
    if (idx >= lines.length) return;

    const line = lines[idx];

    if (line.kind === "cmd") {
      if (char < line.text.length) {
        // typing effect — random-ish delay per character
        const t = setTimeout(() => {
          setTyping(line.text.slice(0, char + 1));
          setChar(char + 1);
        }, 28 + Math.random() * 40);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setVisible(v => [...v, line]);
          setTyping("");
          setChar(0);
          setIdx(idx + 1);
        }, 280);
        return () => clearTimeout(t);
      }
    } else {
      const t = setTimeout(() => {
        setVisible(v => [...v, line]);
        setIdx(idx + 1);
      }, line.kind === "blank" ? 120 : 220);
      return () => clearTimeout(t);
    }
  }, [idx, char]);

  const current = idx < lines.length ? lines[idx] : null;

  const renderLine = (l, key, typedText) => {
    if (l.kind === "blank") return <div key={key} className="term-line">&nbsp;</div>;

    if (l.kind === "cmd") {
      return (
        <div key={key} className="term-line">
          <span className="term-user">{l.user}</span>
          <span className="term-at">@</span>
          <span className="term-host">{l.host}</span>
          <span className="term-at">:</span>
          <span className="term-path">{l.path}</span>
          <span className="term-at">$ </span>
          <span className="term-cmd">{typedText !== undefined ? typedText : l.text}</span>
          {typedText !== undefined && <span className="caret" />}
        </div>
      );
    }

    if (l.kind === "out-ok") return <div key={key} className="term-line term-out ok">{l.text}</div>;
    return <div key={key} className="term-line term-out">{l.text}</div>;
  };

  return (
    <div className="terminal">
      <div className="term-head">
        <div className="term-dots"><span /><span /><span /></div>
        <div className="term-title">— zsh — mjb@mbp — 92×24</div>
      </div>
      <div className="term-body">
        {visible.map((l, i) => renderLine(l, i))}
        {current && current.kind === "cmd" && renderLine(current, "typing", typing)}
        {idx >= lines.length && (
          <div className="term-line">
            <span className="term-user">mjb</span>
            <span className="term-at">@</span>
            <span className="term-host">mbp</span>
            <span className="term-at">:</span>
            <span className="term-path">~/portfolio</span>
            <span className="term-at">$ </span>
            <span className="caret" />
          </div>
        )}
      </div>
    </div>
  );
}

function Hero() {
  const d = window.DATA;
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="fade-in">
            <div className="badge">
              <span className="status-dot" />
              <span>available · remote · full-time or contract</span>
            </div>
            <h1>
              Freelance fullstack<br />
              developer for <span className="accent">hire</span>.
            </h1>
            <p className="hero-sub">{d.tagline}</p>
            <div className="hero-ctas">
              <a className="btn primary" href="#contact">
                <span>$</span> ./hire-me.sh
              </a>
              <a className="btn" href="#projects">
                <span className="accent">cd</span> ./projects
              </a>
              <a className="btn" href={d.resume} download>
                <span className="accent">cat</span> resume.pdf
              </a>
            </div>
            <div className="hero-meta">
              <div className="kv"><span>//</span><span>{d.location}</span></div>
              <div className="kv"><span>//</span><span>UTC+8 · PHT</span></div>
              <div className="kv"><span>//</span><span>3+ yrs shipping production</span></div>
            </div>
          </div>
          <div className="fade-in" style={{ animationDelay: '0.15s' }}>
            <TerminalHero />
          </div>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
