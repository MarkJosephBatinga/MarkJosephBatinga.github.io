// All page sections — About, Stack, Experience, Projects, Architecture,
// Services, GitHub Stats, Writing, Contact, Footer

const FORMSPREE = "https://formspree.io/f/mlgabqrg";

function SectionHead({ num, title, sub }) {
  return (
    <div className="section-head">
      <div className="section-num">{num}</div>
      <h2 className="section-title">{title}</h2>
      {sub && <div className="section-sub">{sub}</div>}
    </div>
  );
}

function About() {
  const d = window.DATA;
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead num="/01" title="About" sub="~/about.md" />
        <div className="about-grid">
          <div className="about-text">
            {d.intro.map((p, i) => (
              <p key={i} className={i === 0 ? "" : "dim"}>{p}</p>
            ))}
          </div>
          <div className="facts">
            {d.facts.map(([key, val, highlight], i) => (
              <div key={i} className="fact">
                <div className="fact-k">{key}</div>
                <div className="fact-v">
                  {highlight ? <span className="accent">● {val}</span> : val}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stack() {
  const d = window.DATA;
  return (
    <section id="stack" className="section">
      <div className="container">
        <SectionHead num="/02" title="Stack" sub="cat stack.json" />
        <div className="stack-grid">
          {d.stack.map((group, i) => (
            <div key={i} className="stack-group">
              <h4>{group.title}</h4>
              <ul>
                {group.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const d = window.DATA;
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHead num="/03" title="Experience" sub="git log --since=2023" />
        <div className="exp-list">
          {d.experience.map((job, i) => (
            <div key={i} className="exp">
              <div className="exp-date">
                <div>{job.from} — {job.current ? <span className="accent">Present</span> : job.to}</div>
                {job.current && <div className="current">active</div>}
              </div>
              <div>
                <div className="exp-role">{job.role}</div>
                <div className="exp-company">
                  {job.company} <span className="loc">· {job.location}</span>
                </div>
                <ul className="exp-bullets">
                  {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                <div className="exp-tags">
                  {job.tags.map((tag, j) => <span key={j} className="tag">{tag}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p }) {
  const ref = React.useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} className="project" onMouseMove={onMove}>
      <div className="project-head">
        <h3 className="project-title">{p.title}</h3>
        <div className="project-id">#{p.id}</div>
      </div>
      <p className="project-desc">{p.desc}</p>
      <div className="project-stack">
        {p.stack.map((s, i) => <span key={i} className="tag">{s}</span>)}
      </div>
      <div className="project-foot">
        <span className={`status ${p.status === 'archived' ? 'archived' : ''}`}>
          <span className="d" />
          {p.status}{p.scale ? ` · ${p.scale}` : ''}
        </span>
        <span className="links">
          {p.links.live && <a href={p.links.live}>[live]</a>}
          {p.links.repo && <a href={p.links.repo}>[repo]</a>}
        </span>
      </div>
    </div>
  );
}

function Projects() {
  const d = window.DATA;
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHead num="/04" title="Selected work" sub={`ls projects/ | head -${d.projects.length}`} />
        <div className="projects-grid">
          {d.projects.map(p => <ProjectCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  return (
    <section id="architecture" className="section">
      <div className="container">
        <SectionHead num="/05" title="How I build" sub="system design, in a picture" />
        <window.Architecture />
      </div>
    </section>
  );
}

function Services() {
  const d = window.DATA;
  return (
    <section id="services" className="section">
      <div className="container">
        <SectionHead num="/06" title="What I do" sub="man mjb" />
        <div className="services-grid">
          {d.services.map((s, i) => (
            <div key={i} className="service">
              <div className="sv-num">/{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GitHubStats() {
  const d = window.DATA;

  // deterministic contribution grid — 53 weeks × 7 days
  const cells = [];
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let w = 0; w < 53; w++) {
    for (let day = 0; day < 7; day++) {
      const base = 0.15 + 0.85 * Math.sin((w / 53) * Math.PI * 1.2);
      const v = rand() * base * 1.6;
      let level = 0;
      if (v > 0.85) level = 4;
      else if (v > 0.6) level = 3;
      else if (v > 0.4) level = 2;
      else if (v > 0.18) level = 1;
      cells.push(level);
    }
  }

  const levelColor = (l) => {
    if (l === 0) return 'var(--bg-2)';
    if (l === 1) return 'color-mix(in oklab, var(--accent) 22%, var(--bg-2))';
    if (l === 2) return 'color-mix(in oklab, var(--accent) 45%, var(--bg-2))';
    if (l === 3) return 'color-mix(in oklab, var(--accent) 70%, var(--bg-2))';
    return 'var(--accent)';
  };

  return (
    <section id="stats" className="section">
      <div className="container">
        <SectionHead num="/07" title="GitHub activity" sub={`@${d.github}`} />
        <div className="gh-grid">
          <div className="gh-card">
            <h4>contributions <span className="accent">// last 12 months</span></h4>
            <div className="contrib-grid">
              {cells.map((lv, i) => (
                <div key={i} className="contrib-cell" style={{ background: levelColor(lv) }} title={`level ${lv}`} />
              ))}
            </div>
            <div className="contrib-legend">
              <span>less</span>
              <div className="scale">
                {[0, 1, 2, 3, 4].map(l => <span key={l} style={{ background: levelColor(l) }} />)}
              </div>
              <span>more</span>
              <span style={{ marginLeft: 'auto' }}>{d.stats.totalCommits.toLocaleString()} commits</span>
            </div>
          </div>
          <div>
            <div className="stat-rows">
              <div className="stat-row"><span className="k">public repos</span>      <span className="v">{d.stats.totalRepos}</span></div>
              <div className="stat-row"><span className="k">commits · 12mo</span>    <span className="v"><span className="accent">{d.stats.totalCommits.toLocaleString()}</span></span></div>
              <div className="stat-row"><span className="k">pull requests</span>     <span className="v">{d.stats.totalPRs}</span></div>
              <div className="stat-row"><span className="k">stars earned</span>      <span className="v">{d.stats.totalStars}</span></div>
            </div>
            <div className="gh-card" style={{ marginTop: 14 }}>
              <h4>languages <span className="accent">// by bytes</span></h4>
              <div className="lang-bar">
                {d.stats.languages.map((l, i) => (
                  <span key={i} style={{ width: `${l.pct}%`, background: l.color }} />
                ))}
              </div>
              <div className="lang-list">
                {d.stats.languages.map((l, i) => (
                  <div key={i} className="l">
                    <span className="d" style={{ background: l.color }} />
                    {l.name}<span className="pct"> · {l.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Writing() {
  const d = window.DATA;
  const fmt = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });

  return (
    <section id="writing" className="section">
      <div className="container">
        <SectionHead num="/08" title="Writing" sub="ls posts/ | tail" />
        <div className="writing-list">
          {d.writing.map((article, i) => (
            <a key={i} className="article" href="#">
              <div className="article-date">{fmt(article.date)}</div>
              <div className="article-title">{article.title}</div>
              <div className="article-meta">{article.tag} · {article.read}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const d = window.DATA;
  const [status, setStatus] = React.useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        e.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const btnLabel = {
    idle:    "$ send --priority=high",
    sending: "$ sending...",
    sent:    "✔ sent — I'll reply within 24h",
    error:   "✗ failed — email me directly",
  }[status];

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHead num="/09" title="Contact" sub="$ ./hire-me.sh" />
        <div className="contact-grid">
          <div className="contact-intro">
            <h2>Need a freelance<br />developer who <span className="accent">ships</span>?</h2>
            <p>I'm open to freelance contracts, full-time remote roles, and focused project work. Fullstack web apps, APIs, integrations, legacy rescue. Tell me what you need built.</p>
            <div className="contact-channels">
              <a href={`mailto:${d.email}`}>
                <span className="k">email</span><span className="v">{d.email}</span>
              </a>
              <a href={`https://github.com/${d.github}`} target="_blank" rel="noreferrer">
                <span className="k">github</span><span className="v">@{d.github}</span>
              </a>
              <a href={`https://linkedin.com/in/${d.linkedin}`} target="_blank" rel="noreferrer">
                <span className="k">linkedin</span><span className="v">/in/{d.linkedin.slice(0, 24)}…</span>
              </a>
              <a href={`tel:${d.phone.replace(/\s/g, '')}`}>
                <span className="k">phone</span><span className="v">{d.phone}</span>
              </a>
              <a href={d.resume} download>
                <span className="k">resume</span><span className="v">Batinga-MarkJoseph-Resume.pdf ↓</span>
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-head">
              <span>~/contact/new-message.sh</span>
              <span className="accent">● recording</span>
            </div>
            <div className="field">
              <label>name</label>
              <input name="name" required placeholder="Ada Lovelace" />
            </div>
            <div className="field">
              <label>email</label>
              <input name="email" type="email" required placeholder="you@company.com" />
            </div>
            <div className="field">
              <label>budget <span style={{ color: 'var(--fg-faint)' }}>(optional)</span></label>
              <input name="budget" placeholder="$5k–$20k · part-time · full-time" />
            </div>
            <div className="field">
              <label>message</label>
              <textarea name="message" required placeholder="We need someone to rescue our Laravel API…" />
            </div>
            <button type="submit" className="btn primary" disabled={status === "sending"}
              style={{ width: '100%', justifyContent: 'center' }}>
              {btnLabel}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container foot-inner">
        <div className="status">
          <span className="d" /> all systems operational · 99.98% uptime · pager quiet
        </div>
        <div>© {new Date().getFullYear()} Mark Joseph Batinga · built with too much coffee</div>
      </div>
    </footer>
  );
}

Object.assign(window, { About, Stack, Experience, Projects, ArchitectureSection, Services, GitHubStats, Writing, Contact, Footer });
