import React from 'react';
import './PitchPlayArt.css';

// Editorial illustration of PitchPlay's tactical editor. It is deliberately
// not presented as a screenshot of the application.
const homePlayers = [
  [86, 200, '1'], [190, 95, '3'], [189, 160, '4'], [189, 237, '5'], [192, 301, '2'],
  [305, 200, '6'], [360, 123, '8'], [365, 275, '10'],
  [510, 80, '11'], [535, 200, '9'], [510, 320, '7'],
];
const opposition = [
  [563, 149, '2'], [580, 259, '5'], [442, 160, '6'], [442, 244, '8'],
];

export default function PitchPlayArt() {
  return (
    <div className="feature-art pitchplay-art" aria-label="Illustration of PitchPlay football tactics and animated movement routes">
      <div className="pp-card-top">
        <span className="pp-card-brand"><span className="pp-brand-icon">↗</span><strong>PITCH<span>PLAY</span></strong></span>
        <span className="pp-card-edition"><i /> TACTICS STUDIO <b>•</b> EARLY PREVIEW</span>
      </div>

      <div className="pp-board-shell">
        <div className="pp-board-topline"><span>YOUR BOARD <em>/</em> ATTACKING TRANSITION</span><span className="pp-top-status">● PLAY DESIGNER</span></div>
        <div className="pp-field-frame">
          <svg className="pp-pitch-svg" viewBox="0 0 680 390" role="img" aria-labelledby="pp-pitch-title" preserveAspectRatio="xMidYMid meet">
            <title id="pp-pitch-title">Illustrated 4-3-3 tactical football pitch with players, runs, and a passing route</title>
            <defs>
              <linearGradient id="pp-grass" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#1b6b57"/><stop offset="1" stopColor="#0b4339"/></linearGradient>
              <pattern id="pp-stripe" width="104" height="390" patternUnits="userSpaceOnUse"><rect width="52" height="390" fill="#b5ecc7" opacity=".045"/></pattern>
              <marker id="pp-arrow" markerWidth="8" markerHeight="8" refX="6.5" refY="3.5" orient="auto"><path d="M 0 0 L 7 3.5 L 0 7" fill="none" stroke="#f7c89e" strokeWidth="1.4"/></marker>
              <marker id="pp-run-arrow" markerWidth="8" markerHeight="8" refX="6.5" refY="3.5" orient="auto"><path d="M 0 0 L 7 3.5 L 0 7" fill="none" stroke="#def675" strokeWidth="1.5"/></marker>
            </defs>
            <rect width="680" height="390" rx="7" fill="url(#pp-grass)"/>
            <rect width="680" height="390" rx="7" fill="url(#pp-stripe)" />
            <g className="pp-field-lines" fill="none" stroke="#d0ead9" strokeWidth="1.25" opacity=".62">
              <rect x="17" y="17" width="646" height="356" rx="1"/>
              <path d="M340 17V373"/><circle cx="340" cy="195" r="60"/><circle cx="340" cy="195" r="2" fill="#c0ddce" />
              <rect x="17" y="84" width="116" height="222"/><rect x="17" y="139" width="42" height="112"/><circle cx="95" cy="195" r="2"/>
              <rect x="547" y="84" width="116" height="222"/><rect x="621" y="139" width="42" height="112"/><circle cx="585" cy="195" r="2"/>
              <path d="M133 156A54 54 0 0 1 133 234M547 156A54 54 0 0 0 547 234"/>
              <rect x="10" y="169" width="7" height="52"/><rect x="663" y="169" width="7" height="52"/>
            </g>
            <g className="pp-tactical-routes" fill="none" strokeWidth="4" strokeLinecap="round">
              <path className="pp-pass-path" d="M305 200 Q 370 190 428 174" stroke="#f7c89e" markerEnd="url(#pp-arrow)" strokeDasharray="6 9"/>
              <path className="pp-run-path pp-run-one" d="M365 275 Q 460 245 510 320" stroke="#def675" markerEnd="url(#pp-run-arrow)" strokeDasharray="10 9"/>
              <path className="pp-run-path pp-run-two" d="M510 80 Q 565 96 598 128" stroke="#def675" markerEnd="url(#pp-run-arrow)" strokeDasharray="10 9"/>
              <path className="pp-dotted-zone" d="M400 100 L 585 100 L 607 300 L 401 290 Z" stroke="#9dcaa8" strokeDasharray="4 9" strokeWidth="1.7" opacity=".6"/>
            </g>
            <g className="pp-opponents">
              {opposition.map(([x,y,num])=><g key={num+'-'+x} transform={`translate(${x} ${y})`}><circle r="13.5" fill="#17383a" stroke="#8dd0c5" strokeWidth="1.5"/><text textAnchor="middle" dominantBaseline="central" fill="#b6dcd7" fontSize="11" fontFamily="Arial,sans-serif" fontWeight="700">{num}</text></g>)}
            </g>
            <g className="pp-home-team">
              {homePlayers.map(([x,y,num])=><g key={num} transform={`translate(${x} ${y})`}><circle r="15" fill="#ecf7e3" stroke="#122b23" strokeWidth="2"/><text textAnchor="middle" dominantBaseline="central" fill="#18332a" fontSize="12" fontFamily="Arial,sans-serif" fontWeight="800">{num}</text></g>)}
            </g>
            <g className="pp-ball-group"><circle cx="323" cy="211" r="7.5" fill="#ffb56e" stroke="#223a29" strokeWidth="1.8"/><circle cx="323" cy="211" r="2.3" fill="#5b3e22"/></g>
            <g className="pp-pitch-annotations" fontFamily="monospace" fontSize="11" letterSpacing="1"><text x="38" y="47" fill="#c1e4ce">HOME</text><text x="603" y="47" fill="#c1e4ce">AWAY</text><text x="473" y="365" fill="#dbf29c">↗ WINGER RUN</text></g>
          </svg>
        </div>
        <div className="pp-board-bottomline"><span>● 11v11</span><span>4–3–3</span><span>PHASE <b>02 / 04</b></span><span className="pp-play-chip">▶ ANIMATE</span></div>
      </div>
      <div className="pp-card-foot"><span>DRAW THE IDEA. <strong>PLAY THE MOMENT.</strong></span><span>RUNS · PASSES · SEQUENCES <b>↗</b></span></div>
    </div>
  );
}