import React from 'react';

const css = `
  body { margin: 0; background: #394773; }
  .tg { color: #fff; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 16px; max-width: 420px; margin: 0 auto; }
  .tg h1 { font-size: 22px; margin: 0 0 4px; }
  .tg .sub { color: #c9d1ec; font-size: 13px; margin-bottom: 16px; }
  .tg .card { background: rgba(255,255,255,0.08); border-radius: 16px; padding: 16px; margin-bottom: 14px; }
  .tg .label { color: #c9d1ec; font-size: 12px; text-transform: uppercase; letter-spacing: .5px; }
  .tg .big { font-size: 36px; font-weight: 800; margin: 4px 0; }
  .tg .delta { font-size: 13px; color: #8ee08e; }

  .tg .chart { display: flex; align-items: flex-end; gap: 10px; height: 120px; margin-top: 14px; }
  .tg .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; height: 100%; justify-content: flex-end; }
  .tg .bar { width: 100%; border-radius: 6px 6px 2px 2px; display: flex; flex-direction: column-reverse; overflow: hidden; }
  .tg .day { font-size: 11px; color: #c9d1ec; }
  .tg .today .day { color: #fff; font-weight: 700; }

  .tg .legend { display: flex; gap: 14px; margin-top: 12px; font-size: 12px; color: #c9d1ec; }
  .tg .dot { display: inline-block; width: 9px; height: 9px; border-radius: 50%; margin-right: 5px; }

  .tg .row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-top: 1px solid rgba(255,255,255,0.1); }
  .tg .row:first-of-type { border-top: 0; }
  .tg .ico { width: 34px; height: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
  .tg .row .name { flex: 1; font-size: 15px; }
  .tg .row .time { color: #c9d1ec; font-size: 14px; }
  .tg .track { height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; margin-top: 5px; }
  .tg .track div { height: 100%; border-radius: 2px; }
`;

/* ---- Edit your data here ---- */
const colors = { social: '#5ac8fa', fun: '#ff9f43', work: '#8ee08e' };

// minutes per category, per day
const week = [
  { day: 'M', social: 40, fun: 30, work: 20 },
  { day: 'T', social: 55, fun: 25, work: 15 },
  { day: 'W', social: 35, fun: 40, work: 25 },
  { day: 'T', social: 60, fun: 20, work: 10 },
  { day: 'F', social: 45, fun: 35, work: 20 },
  { day: 'S', social: 70, fun: 45, work: 5 },
  { day: 'S', social: 30, fun: 20, work: 15, today: true },
];

const apps = [
  { icon: '💬', name: 'Messages', min: 42, color: colors.social },
  { icon: '🎬', name: 'Videos', min: 35, color: colors.fun },
  { icon: '📸', name: 'Photos', min: 22, color: colors.social },
  { icon: '📝', name: 'Notes', min: 15, color: colors.work },
];

const fmt = (m: number) => (m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`);

export default function Popup() {
  const totals = week.map((d) => d.social + d.fun + d.work);
  const max = Math.max(...totals);
  const avg = Math.round(totals.reduce((a, b) => a + b, 0) / totals.length);
  const topApp = Math.max(...apps.map((a) => a.min));

  return (
    <div className="tg">
      <style>{css}</style>

      <h1>🌱 Touch Grass</h1>
      <div className="sub">This week's phone time</div>

      {/* Daily average + weekly chart */}
      <div className="card">
        <div className="label">Daily Average</div>
        <div className="big">{fmt(avg)}</div>
        <div className="delta">▼ 12% from last week</div>

        <div className="chart">
          {week.map((d, i) => (
            <div key={i} className={`bar-col${d.today ? ' today' : ''}`}>
              <div className="bar" style={{ height: `${(totals[i] / max) * 100}%` }}>
                <div style={{ flex: d.social, background: colors.social }} />
                <div style={{ flex: d.fun, background: colors.fun }} />
                <div style={{ flex: d.work, background: colors.work }} />
              </div>
              <span className="day">{d.day}</span>
            </div>
          ))}
        </div>

        <div className="legend">
          <span><i className="dot" style={{ background: colors.social }} />Social</span>
          <span><i className="dot" style={{ background: colors.fun }} />Entertainment</span>
          <span><i className="dot" style={{ background: colors.work }} />Productivity</span>
        </div>
      </div>

      {/* Most used */}
      <div className="card">
        <div className="label" style={{ marginBottom: 6 }}>Most Used</div>
        {apps.map((a) => (
          <div className="row" key={a.name}>
            <div className="ico" style={{ background: a.color + '33' }}>{a.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex' }}>
                <span className="name">{a.name}</span>
                <span className="time">{fmt(a.min)}</span>
              </div>
              <div className="track">
                <div style={{ width: `${(a.min / topApp) * 100}%`, background: a.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
