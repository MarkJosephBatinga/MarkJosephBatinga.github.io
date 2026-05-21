// Animated architecture diagram — SVG with live data-flow packets

function Architecture() {
  const [tick, setTick] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 100);
    return () => clearInterval(timer);
  }, []);

  const W = 900, H = 460;

  const boxes = [
    { id: "client",  x: 30,  y: 200, w: 120, h: 60,  label: "Client / Web",    sub: "React · Mobile" },
    { id: "cdn",     x: 190, y: 120, w: 110, h: 54,  label: "CDN / Edge",      sub: "CloudFront" },
    { id: "lb",      x: 190, y: 280, w: 110, h: 54,  label: "Load Balancer",   sub: "ELB" },
    { id: "api",     x: 350, y: 120, w: 150, h: 70,  label: "API Gateway",     sub: "Laravel · Auth · Rate-limit" },
    { id: "worker",  x: 350, y: 240, w: 150, h: 60,  label: "Workers",         sub: "Queue · Cron" },
    { id: "webhook", x: 350, y: 340, w: 150, h: 60,  label: "Webhook Router",  sub: "Idempotent receivers" },
    { id: "db",      x: 560, y: 80,  w: 130, h: 60,  label: "MySQL",           sub: "Primary · Read replica" },
    { id: "mongo",   x: 560, y: 160, w: 130, h: 60,  label: "MongoDB",         sub: "Document store" },
    { id: "redis",   x: 560, y: 240, w: 130, h: 60,  label: "Redis",           sub: "Cache · Queues" },
    { id: "s3",      x: 560, y: 320, w: 130, h: 60,  label: "S3",              sub: "Uploads · Assets" },
    { id: "ext",     x: 740, y: 140, w: 130, h: 240, label: "Integrations",    sub: "Stripe · GHL · Shipping · Firebase", external: true },
  ];

  const getBox = id => boxes.find(b => b.id === id);
  const right  = b  => ({ x: b.x + b.w, y: b.y + b.h / 2 });
  const left   = b  => ({ x: b.x,       y: b.y + b.h / 2 });

  const flows = [
    { from: "client",  to: "cdn"    },
    { from: "client",  to: "lb"     },
    { from: "cdn",     to: "api"    },
    { from: "lb",      to: "api"    },
    { from: "lb",      to: "worker" },
    { from: "api",     to: "db"     },
    { from: "api",     to: "mongo"  },
    { from: "api",     to: "redis"  },
    { from: "worker",  to: "redis"  },
    { from: "worker",  to: "s3"     },
    { from: "webhook", to: "db"     },
    { from: "api",     to: "ext",   curve: true },
    { from: "webhook", to: "ext",   curve: true },
  ];

  const packet = (flow, offset) => {
    const a = right(getBox(flow.from));
    const b = left(getBox(flow.to));
    const t = ((tick + offset) % 40) / 40;
    return {
      x: a.x + (b.x - a.x) * t,
      y: a.y + (b.y - a.y) * t,
    };
  };

  return (
    <div className="arch-wrap">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--fg-faint)' }}>
          <span style={{ color: 'var(--accent)' }}>$</span> render --topology production.yaml
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--fg-faint)' }}>
          live · refreshed {(tick / 10).toFixed(1)}s ago
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--line-2)" />
          </marker>
        </defs>

        {/* background grid */}
        <g stroke="rgba(255,255,255,0.03)" strokeWidth="1">
          {Array.from({ length: Math.floor(W / 40) }).map((_, i) => (
            <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2={H} />
          ))}
          {Array.from({ length: Math.floor(H / 40) }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 40} x2={W} y2={i * 40} />
          ))}
        </g>

        {/* edges */}
        {flows.map((f, i) => {
          const a = right(getBox(f.from));
          const b = left(getBox(f.to));
          return (
            <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="var(--line-2)" strokeWidth="1.2" markerEnd="url(#arrow)" />
          );
        })}

        {/* animated packets */}
        {flows.map((f, i) => {
          const p = packet(f, i * 6);
          return (
            <g key={`p${i}`}>
              <circle cx={p.x} cy={p.y} r="3.2" fill="var(--accent)" opacity={0.95}
                style={{ filter: 'drop-shadow(0 0 4px var(--accent))' }} />
              <circle cx={p.x} cy={p.y} r="7" fill="var(--accent)" opacity={0.15} />
            </g>
          );
        })}

        {/* node boxes */}
        {boxes.map(b => (
          <g key={b.id}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="6"
              fill={b.external ? "rgba(0,255,157,0.04)" : "var(--bg-2)"}
              stroke={b.external ? "var(--accent)" : "var(--line-2)"}
              strokeDasharray={b.external ? "4 3" : "0"}
              strokeWidth="1"
            />
            <text x={b.x + 12} y={b.y + 22} fill="var(--fg)"       fontFamily="var(--mono)" fontSize="12"   fontWeight="600">{b.label}</text>
            <text x={b.x + 12} y={b.y + 40} fill="var(--fg-faint)" fontFamily="var(--mono)" fontSize="10.5"              >{b.sub}</text>
            {!b.external && <circle cx={b.x + b.w - 10} cy={b.y + 10} r="3" fill="var(--accent)" />}
          </g>
        ))}

        <text x={805} y={130} fill="var(--fg-faint)" fontFamily="var(--mono)" fontSize="10" textAnchor="middle">// external</text>
      </svg>

      <div style={{ display: 'flex', gap: 20, marginTop: 16, fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--fg-faint)', flexWrap: 'wrap' }}>
        <span><span style={{ color: 'var(--accent)' }}>●</span> live dataflow</span>
        <span><span style={{ color: 'var(--fg-dim)' }}>─</span> sync request</span>
        <span><span style={{ color: 'var(--accent)' }}>┄</span> external integration</span>
        <span style={{ marginLeft: 'auto' }}>p95 ≈ 180ms · error rate 0.04%</span>
      </div>
    </div>
  );
}

window.Architecture = Architecture;
