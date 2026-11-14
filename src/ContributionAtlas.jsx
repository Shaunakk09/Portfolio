import React, { useEffect, useMemo, useRef, useState } from 'react';

const USERNAME = 'Shaunakk09';
const API = 'https://github-contributions-api.jogruber.de/v4/';
const ONE_DAY = 86400000;
const YEAR = new Date().getUTCFullYear();
const PERIODS = [
  { id: 'last', label: 'PAST 12 MONTHS' },
  ...[YEAR, YEAR - 1, YEAR - 2].map(year => ({ id: String(year), label: String(year) }))
];
const LEVEL_DESCRIPTIONS = ['No contributions', 'Light activity', 'Steady activity', 'High activity', 'Peak activity'];

function utcDay(date) { return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())); }
function dateString(date) { return date.toISOString().slice(0, 10); }
function fromISO(value) { return new Date(`${value}T00:00:00Z`); }
function readable(value) { return fromISO(value).toLocaleDateString('en-US', { day:'numeric', month:'long', year:'numeric', timeZone:'UTC' }); }
function shortMonth(value) { return fromISO(value+'-01').toLocaleDateString('en-US', { month:'short', year:'numeric', timeZone:'UTC' }); }

function getCalendar(days, period) {
  const today = utcDay(new Date());
  let start;
  let end;
  if (period === 'last') {
    end = today;
    start = new Date(today.getTime() - 364 * ONE_DAY);
  } else {
    const year = Number(period);
    start = new Date(Date.UTC(year, 0, 1));
    const lastDate = new Date(Date.UTC(year, 11, 31));
    end = lastDate < today ? lastDate : today;
  }
  const first = new Date(start);
  first.setUTCDate(first.getUTCDate() - first.getUTCDay());
  const numberOfWeeks = Math.ceil((end.getTime() - first.getTime()) / ONE_DAY / 7 + 1 / 7);
  const daily = new Map(days.map(d => [d.date, d]));
  const weeks = Array.from({ length: numberOfWeeks }, (_, wi) =>
    Array.from({ length: 7 }, (_, di) => {
      const key = dateString(new Date(first.getTime() + (wi * 7 + di) * ONE_DAY));
      return key >= dateString(start) && key <= dateString(end) ? (daily.get(key) || null) : null;
    })
  );
  const labels = [];
  let cursor = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), 1));
  while (cursor <= end) {
    const monthStart = cursor < start ? start : cursor;
    const col = Math.floor((monthStart.getTime() - first.getTime()) / ONE_DAY / 7);
    labels.push({ label: cursor.toLocaleDateString('en-US', { month:'short', timeZone:'UTC' }), col, key: `${cursor.getUTCFullYear()}-${String(cursor.getUTCMonth() + 1).padStart(2, '0')}` });
    cursor = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 1));
  }
  const entries = days.filter(d => d.date >= dateString(start) && d.date <= dateString(end)).sort((a,b) => a.date.localeCompare(b.date));
  const total = entries.reduce((sum, d) => sum + d.count, 0);
  const active = entries.filter(d => d.count > 0).length;
  let longestStreak = 0;
  let currentStreak = 0;
  let previousDate = '';
  for (const entry of entries) {
    const contiguous = previousDate && fromISO(entry.date).getTime() - fromISO(previousDate).getTime() === ONE_DAY;
    if (entry.count > 0) {
      currentStreak = contiguous ? currentStreak + 1 : 1;
      longestStreak = Math.max(currentStreak, longestStreak);
    } else currentStreak = 0;
    previousDate = entry.date;
  }
  const monthlyCounts = new Map(labels.map(label => [label.key, 0]));
  entries.forEach(entry => {
    const key = entry.date.slice(0, 7);
    monthlyCounts.set(key, (monthlyCounts.get(key) || 0) + entry.count);
  });
  const months = labels.map(m => ({...m, count:monthlyCounts.get(m.key) || 0}));
  const maxMonth = Math.max(1, ...months.map(month => month.count));
  const bestMonth = months.reduce((best, month) => !best || month.count > best.count ? month : best, null);
  return { weeks, labels, entries, months, total, active, longestStreak, maxMonth, bestMonth };
}

export default function ContributionAtlas() {
  const [period, setPeriod] = useState('last');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const chartScroller = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError(''); setData(null); setSelected(null); setHovered(null); setSelectedMonth(null);
    fetch(`${API}${USERNAME}?y=${encodeURIComponent(period)}`, { signal:controller.signal, headers: { Accept:'application/json' } })
      .then(response => {
        if (!response.ok) throw new Error(`Contribution service returned ${response.status}`);
        return response.json();
      })
      .then(payload => {
        if (!Array.isArray(payload.contributions) || payload.contributions.length === 0) throw new Error('No calendar data returned');
        const contributions = payload.contributions
          .filter(row => typeof row.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(row.date) && Number.isFinite(Number(row.count)))
          .map(row => ({ date:row.date, count:Math.max(0, Number(row.count)), level:Math.max(0, Math.min(4, Number(row.level) || 0)) }));
        if (!contributions.length) throw new Error('Contribution response contained no readable days');
        setData(contributions); setLoading(false);
      })
      .catch(reason => {
        if (reason.name !== 'AbortError') { setError(reason.message || 'Contributions are unavailable'); setLoading(false); }
      });
    return () => controller.abort();
  }, [period]);

  const calendar = useMemo(() => data ? getCalendar(data, period) : null, [data, period]);
  useEffect(() => {
    if (calendar && chartScroller.current && window.matchMedia('(max-width: 760px)').matches) {
      chartScroller.current.scrollLeft = chartScroller.current.scrollWidth;
    }
  }, [calendar]);

  const currentDay = hovered || selected;
  const currentMonth = calendar?.months.find(month => month.key === selectedMonth);
  const selectedMonthCount = currentMonth?.count ?? null;
  const chartWidth = calendar ? calendar.weeks.length * 17 - 4 : 850;

  return <div className="contrib-wrap" aria-label="GitHub contributions explorer">
    <div className="contrib-top">
      <div className="contrib-intro"><div className="contrib-kicker"><span className="contrib-live-dot"/> CONTRIBUTION FIELD / GITHUB</div><h3>Every day <em>adds up.</em></h3><p>A living map of my GitHub activity. Hover a day, select a month, or jump between years to explore the real history.</p></div>
      <div className="contrib-switch" role="group" aria-label="Choose contribution period">{PERIODS.map(option => <button type="button" key={option.id} onClick={() => setPeriod(option.id)} aria-pressed={period === option.id} className={period === option.id ? 'active' : ''}>{option.label}</button>)}</div>
    </div>

    {loading ? <div className="contrib-state"><span className="contrib-state-spinner"/> CONNECTING TO LIVE CONTRIBUTION DATA<span className="blink">_</span></div> : error ?
      <div className="contrib-state contrib-error"><strong>Activity temporarily unavailable.</strong><span>{error}. The live calendar depends on a public GitHub contribution service.</span><a href="https://github.com/Shaunakk09" target="_blank" rel="noreferrer">VIEW CONTRIBUTIONS ON GITHUB ↗</a></div> : calendar ? <>
        <div className="contrib-stats">
          <div className="contrib-total"><span className="contrib-orbit" aria-hidden="true"/><strong>{calendar.total.toLocaleString('en-US')}</strong><span>CONTRIBUTIONS / {period === 'last' ? 'PAST YEAR' : period}</span></div>
          <div className="contrib-metrics"><div><strong>{calendar.active}</strong><span>ACTIVE DAYS</span></div><div><strong>{calendar.longestStreak}<small> days</small></strong><span>LONGEST STREAK</span></div><div><strong>{calendar.bestMonth?.count ?? 0}</strong><span>TOP MONTH{calendar.bestMonth ? ` / ${calendar.bestMonth.label.toUpperCase()}` : ''}</span></div></div>
        </div>
        <div className="contrib-calendar-head"><span>01 / ACTIVITY MAP</span><span>HOVER · TAP TO INSPECT <span aria-hidden="true">↗</span></span></div>
        <div className="contrib-chart-rail"><div className="contrib-daynames" aria-hidden="true"><span/><span>MON</span><span/><span>WED</span><span/><span>FRI</span><span/></div><div className="contrib-chart-scroll" ref={chartScroller} tabIndex={0} aria-label="Scrollable contributions heatmap">
          <div className="contrib-chart-inner" style={{width:chartWidth}}>
            <div className="contrib-month-head" style={{gridTemplateColumns:`repeat(${calendar.weeks.length}, 13px)`}}>{calendar.labels.map((month,i)=><span key={month.key} style={{gridColumnStart:month.col + 1}}>{month.label}</span>)}</div>
            <div className="contrib-weeks">{calendar.weeks.map((week, wi)=><div className="contrib-week" key={wi}>{week.map((day, di) => day ? <button type="button" key={day.date} className={`contrib-cell level-${day.level}${selected?.date === day.date ? ' selected' : ''}${selectedMonth && !day.date.startsWith(selectedMonth) ? ' filtered-out' : ''}`} title={`${readable(day.date)}: ${day.count} contributions`} aria-label={`${readable(day.date)}, ${day.count} contributions`} aria-pressed={selected?.date === day.date} onMouseEnter={()=>setHovered(day)} onMouseLeave={()=>setHovered(null)} onFocus={()=>setHovered(day)} onBlur={()=>setHovered(null)} onClick={()=>setSelected(prev => prev?.date === day.date ? null : day)}/> : <span className="contrib-blank" key={`blank-${wi}-${di}`} aria-hidden="true"/>)}</div>)}</div>
          </div></div></div>
        <div className="contrib-chart-foot"><span>← SWIPE ON MOBILE TO EXPLORE →</span><div className="contrib-legend"><span>LESS</span>{[0,1,2,3,4].map(level=><span key={level} className={`contrib-legend-dot level-${level}`}/>)}<span>MORE</span></div></div>
        <div className="contrib-bottom">
          <div className="contrib-monthly"><div className="contrib-bottom-title"><span>02 / MONTHLY SIGNAL</span><button type="button" onClick={()=>setSelectedMonth(null)} disabled={!selectedMonth} aria-label="Show all months">{selectedMonth ? 'RESET FILTER ×' : 'CLICK A MONTH ↗'}</button></div><div className="contrib-bar-chart">{calendar.months.map(month => <button key={month.key} type="button" className={`contrib-month-bar${selectedMonth===month.key?' active':''}${selectedMonth && selectedMonth!==month.key?' faded':''}`} onClick={()=>setSelectedMonth(prev=>prev===month.key?null:month.key)} aria-label={`${shortMonth(month.key)}: ${month.count} contributions; ${selectedMonth===month.key?'clear filter':'filter calendar'}`} aria-pressed={selectedMonth===month.key} title={`${shortMonth(month.key)} · ${month.count} contributions`}><span className="contrib-bar-count">{month.count}</span><span className="contrib-bar-track"><span style={{height:`${Math.max(4,(month.count / calendar.maxMonth)*100)}%`}}/></span><span className="contrib-bar-label">{month.label.toUpperCase()}</span></button>)}</div></div>
          <div className="contrib-inspector"><div className="contrib-bottom-title"><span>03 / INSPECTOR</span><span className="contrib-small-star">✳</span></div><div className="contrib-inspect-eyebrow">{currentDay ? LEVEL_DESCRIPTIONS[currentDay.level] : currentMonth ? 'MONTH SELECTED' : 'SELECT ANY SQUARE'}</div><div className="contrib-inspect-number">{currentDay ? currentDay.count : selectedMonthCount === null ? calendar.total : selectedMonthCount}<span>↗</span></div><strong>{currentDay ? readable(currentDay.date) : currentMonth ? shortMonth(currentMonth.key) : 'One year of showing up'}</strong><p>{currentDay ? `${currentDay.count === 1 ? '1 contribution' : `${currentDay.count} contributions`} recorded on this day. Click to ${selected?.date===currentDay.date?'unpin':'pin'} this date.` : currentMonth ? 'Month filter active. Tap the month again to see all activity.' : 'Explore the small, consistent iterations behind the work. Counts are fetched from the public GitHub contribution calendar.'}</p><a href="https://github.com/Shaunakk09" target="_blank" rel="noreferrer">OPEN FULL GITHUB PROFILE ↗</a></div>
        </div>
        <div className="contrib-source"><span><i/> LIVE DATA · PUBLIC GITHUB CONTRIBUTIONS · NOT A SIMULATED COUNTER</span><span>Contribution counts also include qualifying activity beyond commits.</span></div>
      </> : null}
  </div>;
}
