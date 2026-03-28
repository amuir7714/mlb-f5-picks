import { useState, useRef } from "react";

/* ─── STYLES ─────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#07090d;--s1:#0d1117;--s2:#121921;--s3:#18222f;
  --bd:#1e2d3d;--bd2:#253848;
  --g:#00ff88;--gd:#00cc66;--gg:rgba(0,255,136,.12);
  --am:#ffcc00;--re:#ff4455;--bl:#33bbff;
  --t1:#dde8f2;--t2:#7a9bb5;--t3:#3a5570;
}
body{background:var(--bg);color:var(--t1);font-family:'DM Sans',sans-serif;line-height:1.5}
.app{
  min-height:100vh;
  background-image:
    radial-gradient(ellipse 70% 45% at 50% -5%,rgba(0,255,136,.05) 0%,transparent 55%),
    radial-gradient(ellipse 40% 30% at 85% 85%,rgba(51,187,255,.03) 0%,transparent 50%);
}
.nav{
  display:flex;align-items:center;justify-content:space-between;
  padding:0 28px;height:52px;
  border-bottom:1px solid var(--bd);
  background:rgba(7,9,13,.97);backdrop-filter:blur(14px);
  position:sticky;top:0;z-index:50;
}
.logo{font-family:'Bebas Neue',cursive;font-size:24px;letter-spacing:.07em;display:flex;align-items:center;gap:10px}
.dot{width:8px;height:8px;border-radius:50%;background:var(--g);box-shadow:0 0 8px var(--g);animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.25}}
.nav-meta{font-family:'DM Mono',monospace;font-size:10px;color:var(--t3);text-align:right;line-height:1.8}
.nav-meta b{color:var(--t2)}
.page{max-width:1080px;margin:0 auto;padding:28px 22px 64px}
.ctrl{
  display:flex;align-items:center;gap:16px;flex-wrap:wrap;
  background:var(--s1);border:1px solid var(--bd);border-radius:6px;
  padding:18px 22px;margin-bottom:26px;
}
.ctrl-main{flex:1;min-width:220px}
.ctrl-main h2{font-family:'Bebas Neue',cursive;font-size:21px;letter-spacing:.05em;margin-bottom:3px}
.ctrl-main p{font-size:12px;color:var(--t2);line-height:1.5}
.ctrl-badges{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
.badge{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.08em;text-transform:uppercase;padding:2px 7px;border-radius:2px}
.badge-g{background:var(--gg);color:var(--g);border:1px solid rgba(0,255,136,.2)}
.badge-bl{background:rgba(51,187,255,.08);color:var(--bl);border:1px solid rgba(51,187,255,.2)}
.badge-am{background:rgba(255,204,0,.08);color:var(--am);border:1px solid rgba(255,204,0,.2)}
.date-input{
  background:var(--s2);border:1px solid var(--bd);border-radius:4px;
  color:var(--t2);font-family:'DM Mono',monospace;font-size:12px;
  padding:7px 11px;cursor:pointer;width:148px;
}
.date-input:disabled{opacity:.5;cursor:not-allowed}
.run-btn{
  background:var(--g);color:#07090d;border:none;border-radius:4px;
  font-family:'Bebas Neue',cursive;font-size:16px;letter-spacing:.08em;
  padding:10px 22px;cursor:pointer;white-space:nowrap;transition:all .15s;
}
.run-btn:hover:not(:disabled){background:#1aff99;transform:translateY(-1px);box-shadow:0 6px 18px rgba(0,255,136,.22)}
.run-btn:disabled{background:var(--s3);color:var(--t3);cursor:not-allowed;transform:none;box-shadow:none}
.prog{background:var(--s1);border:1px solid var(--bd);border-radius:6px;padding:32px 24px;margin-bottom:26px}
.prog-title{font-family:'Bebas Neue',cursive;font-size:17px;letter-spacing:.05em;color:var(--t2);text-align:center;margin-bottom:18px}
.steps{display:flex;flex-direction:column;gap:9px;max-width:460px;margin:0 auto}
.step{display:flex;align-items:center;gap:11px;font-family:'DM Mono',monospace;font-size:11px;color:var(--t3);transition:color .3s}
.step.active{color:var(--g)}
.step.done{color:var(--t3)}
.step-ic{width:20px;height:20px;border-radius:50%;border:1px solid var(--bd2);display:flex;align-items:center;justify-content:center;font-size:9px;flex-shrink:0}
.step.active .step-ic{border-color:var(--g);color:var(--g);animation:pulse 1s ease-in-out infinite}
.step.done .step-ic{border-color:var(--t3);color:var(--t3)}
.stream{background:var(--s1);border:1px solid var(--bd);border-radius:6px;overflow:hidden;margin-bottom:26px}
.stream-hd{display:flex;align-items:center;gap:8px;padding:8px 14px;background:var(--s2);border-bottom:1px solid var(--bd);font-family:'DM Mono',monospace;font-size:10px;color:var(--t3)}
.stream-body{padding:14px;font-family:'DM Mono',monospace;font-size:11px;color:var(--t2);line-height:1.7;max-height:160px;overflow-y:auto;white-space:pre-wrap;word-break:break-word}
.stream-body::-webkit-scrollbar{width:3px}
.stream-body::-webkit-scrollbar-thumb{background:var(--bd2);border-radius:2px}
.sec-lbl{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--t3);display:flex;align-items:center;gap:10px;margin-bottom:14px}
.sec-lbl::after{content:'';flex:1;height:1px;background:var(--bd)}
.stats-strip{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:var(--bd);border:1px solid var(--bd);border-radius:6px;overflow:hidden;margin-bottom:26px}
.sc-cell{background:var(--s1);padding:13px 10px;text-align:center}
.sc-cell label{display:block;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--t3);margin-bottom:5px}
.sc-val{font-family:'Bebas Neue',cursive;font-size:28px;line-height:1}
.sc-val.g{color:var(--g)}.sc-val.am{color:var(--am)}.sc-val.re{color:var(--re)}.sc-val.dim{color:var(--t2)}
.top-card{background:var(--s1);border:1px solid rgba(0,255,136,.22);border-radius:6px;overflow:hidden;margin-bottom:14px;box-shadow:0 0 50px rgba(0,255,136,.05);animation:up .38s ease-out}
@keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
.top-hd{background:linear-gradient(135deg,rgba(0,255,136,.09) 0%,rgba(0,204,102,.03) 100%);border-bottom:1px solid rgba(0,255,136,.16);padding:16px 22px;display:flex;align-items:flex-start;justify-content:space-between;gap:14px}
.top-rank{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--g);margin-bottom:5px}
.top-team{font-family:'Bebas Neue',cursive;font-size:36px;letter-spacing:.03em;color:#fff;line-height:1}
.top-side{font-family:'DM Mono',monospace;font-size:11px;color:var(--g);margin-top:3px}
.top-right{text-align:right}
.conf-num{font-family:'Bebas Neue',cursive;font-size:52px;color:var(--g);line-height:1;letter-spacing:-.02em}
.conf-lbl{font-family:'DM Mono',monospace;font-size:9px;color:var(--t3);text-transform:uppercase;letter-spacing:.1em;margin-top:2px}
.top-body{display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:16px 22px}
.dg label{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--t3);display:block;margin-bottom:3px}
.dg .dv{font-size:13px;color:var(--t1);font-weight:500;line-height:1.4}
.dg .dv.mono{font-family:'DM Mono',monospace;font-size:12px}
.dg .dv.small{font-size:11px;color:var(--t2)}
.tag{display:inline-block;padding:2px 7px;border-radius:2px;font-family:'DM Mono',monospace;font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin:2px 4px 2px 0}
.tag-g{background:var(--gg);color:var(--g);border:1px solid rgba(0,255,136,.2)}
.tag-am{background:rgba(255,204,0,.09);color:var(--am);border:1px solid rgba(255,204,0,.2)}
.tag-bl{background:rgba(51,187,255,.08);color:var(--bl);border:1px solid rgba(51,187,255,.2)}
.reason{border-top:1px solid var(--bd);padding:13px 22px;background:rgba(0,0,0,.22)}
.reason label{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--t3);display:block;margin-bottom:5px}
.reason p{font-size:13px;color:var(--t2);line-height:1.65}
.data-note{font-family:'DM Mono',monospace;font-size:10px;font-style:italic;color:var(--am);padding:8px 22px;background:rgba(255,204,0,.04);border-top:1px solid rgba(255,204,0,.12)}
.sec-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:26px}
.sec-card{background:var(--s1);border:1px solid var(--bd);border-radius:6px;padding:14px 17px;animation:up .38s ease-out;animation-fill-mode:both;transition:border-color .15s}
.sec-card:hover{border-color:var(--bd2)}
.sec-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px}
.sec-rk{font-family:'DM Mono',monospace;font-size:9px;color:var(--t3);text-transform:uppercase;letter-spacing:.1em}
.sec-pct{font-family:'Bebas Neue',cursive;font-size:26px;line-height:1}
.sec-pct.g{color:var(--g)}.sec-pct.am{color:var(--am)}.sec-pct.dim{color:var(--t2)}
.sec-team{font-family:'Bebas Neue',cursive;font-size:22px;text-transform:uppercase;letter-spacing:.03em;line-height:1;margin-bottom:2px}
.sec-side{font-family:'DM Mono',monospace;font-size:10px;margin-bottom:9px}
.sec-side.g{color:var(--g)}.sec-side.am{color:var(--am)}.sec-side.dim{color:var(--t3)}
.sec-info{font-size:12px;color:var(--t3);line-height:1.7}
.sec-info strong{color:var(--t2)}
.slate{background:var(--s1);border:1px solid var(--bd);border-radius:6px;overflow:hidden;margin-bottom:26px}
.sl-hd{display:grid;grid-template-columns:2.2fr 1.5fr 1.5fr 1.2fr 72px;background:var(--s2);border-bottom:1px solid var(--bd)}
.sh{padding:8px 13px;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--t3);border-right:1px solid var(--bd)}
.sh:last-child{border-right:none}
.sl-row{display:grid;grid-template-columns:2.2fr 1.5fr 1.5fr 1.2fr 72px;border-bottom:1px solid var(--bd);transition:background .1s}
.sl-row:last-child{border-bottom:none}
.sl-row:hover{background:var(--s2)}
.sl-row.top{background:rgba(0,255,136,.03)}
.sc2{padding:10px 13px;font-size:12px;color:var(--t2);border-right:1px solid var(--bd);display:flex;align-items:center}
.sc2:last-child{border-right:none}
.sc2.m{color:var(--t1);font-weight:500;font-size:13px}
.sc2.pk{font-family:'DM Mono',monospace;font-size:11px}
.sc2.pk.g{color:var(--g)}.sc2.pk.am{color:var(--am)}.sc2.pk.dim{color:var(--t3)}
.bar-wr{display:flex;align-items:center;gap:7px;width:100%}
.bar-bg{flex:1;height:3px;background:var(--bd);border-radius:2px;overflow:hidden}
.bar-fill{height:100%;border-radius:2px;transition:width .8s ease-out}
.bar-fill.g{background:var(--g)}.bar-fill.am{background:var(--am)}.bar-fill.dim{background:var(--t3)}
.bar-n{font-family:'DM Mono',monospace;font-size:11px;font-weight:500;min-width:36px;text-align:right}
.bar-n.g{color:var(--g)}.bar-n.am{color:var(--am)}.bar-n.dim{color:var(--t3)}
.warn{background:rgba(255,204,0,.06);border:1px solid rgba(255,204,0,.2);border-radius:6px;padding:13px 17px;margin-bottom:18px;font-size:13px;color:var(--t2);line-height:1.6}
.warn b{color:var(--am)}
.info-box{background:rgba(51,187,255,.05);border:1px solid rgba(51,187,255,.2);border-radius:6px;padding:13px 17px;margin-bottom:18px;font-size:13px;color:var(--t2);line-height:1.6}
.info-box b{color:var(--bl)}
.err-box{background:rgba(255,68,85,.06);border:1px solid rgba(255,68,85,.2);border-radius:6px;padding:16px 20px;margin-bottom:22px}
.err-box h3{font-family:'Bebas Neue',cursive;font-size:17px;letter-spacing:.05em;color:var(--re);margin-bottom:5px}
.err-box p{font-size:13px;color:var(--t2);line-height:1.6;margin-bottom:8px}
.err-box p:last-child{margin-bottom:0}
.retry-btn{background:var(--re);color:#fff;border:none;border-radius:4px;font-family:'Bebas Neue',cursive;font-size:14px;letter-spacing:.08em;padding:8px 18px;cursor:pointer;margin-top:10px;transition:opacity .15s}
.retry-btn:hover{opacity:.85}
.footer{font-family:'DM Mono',monospace;font-size:10px;color:var(--t3);line-height:2;border-top:1px solid var(--bd);padding-top:14px}
.footer b{color:var(--t2)}
.idle-note{background:var(--s1);border:1px solid var(--bd);border-radius:6px;padding:28px 24px;font-size:13px;color:var(--t2);line-height:1.7}
.idle-note h3{font-family:'Bebas Neue',cursive;font-size:19px;letter-spacing:.05em;color:var(--t1);margin-bottom:12px}
.idle-note li{margin-left:18px;margin-bottom:6px}
.idle-note b{color:var(--t1)}
@media(max-width:680px){
  .top-body,.sec-grid{grid-template-columns:1fr}
  .sl-hd,.sl-row{grid-template-columns:2fr 1fr 1fr}
  .sh:nth-child(4),.sh:nth-child(5),.sc2:nth-child(4),.sc2:nth-child(5){display:none}
  .stats-strip{grid-template-columns:repeat(3,1fr)}
  .sc-cell:nth-child(4),.sc-cell:nth-child(5){display:none}
  .ctrl{flex-direction:column;align-items:flex-start}
}
`;

/* ─── HELPERS ─────────────────────────────────────────────────────────────── */
function fmtDate(iso) {
  try {
    return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric", year: "numeric"
    });
  } catch { return iso; }
}
function confColor(p) {
  const n = parseFloat(p);
  return n >= 65 ? "g" : n >= 58 ? "am" : "dim";
}
function barW(p) {
  return Math.max(2, Math.min(100, ((parseFloat(p) - 50) / 30) * 100));
}

/* ─── ROBUST JSON EXTRACTOR ──────────────────────────────────────────────── */
// Tries multiple strategies to pull valid JSON out of a potentially
// verbose or malformed model response.
function extractJSON(raw) {
  if (!raw || !raw.trim()) throw new Error("Empty response from model.");

  // Strategy 1: find the outermost { ... } block
  const first = raw.indexOf("{");
  const last  = raw.lastIndexOf("}");
  if (first !== -1 && last !== -1 && last > first) {
    const candidate = raw.slice(first, last + 1);
    try { return JSON.parse(candidate); } catch (_) { /* fall through */ }
  }

  // Strategy 2: strip markdown code fences then try again
  const stripped = raw
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();
  try { return JSON.parse(stripped); } catch (_) { /* fall through */ }

  // Strategy 3: find the LAST occurrence of a "picks" array — model
  // sometimes emits reasoning text before the real JSON
  const picksIdx = raw.lastIndexOf('"picks"');
  if (picksIdx !== -1) {
    // Walk backwards to find the opening brace of this object
    let braceIdx = picksIdx;
    while (braceIdx >= 0 && raw[braceIdx] !== "{") braceIdx--;
    if (braceIdx >= 0) {
      const candidate2 = raw.slice(braceIdx);
      // Find its matching close brace
      let depth = 0, closeIdx = -1;
      for (let i = 0; i < candidate2.length; i++) {
        if (candidate2[i] === "{") depth++;
        else if (candidate2[i] === "}") { depth--; if (depth === 0) { closeIdx = i; break; } }
      }
      if (closeIdx !== -1) {
        try { return JSON.parse(candidate2.slice(0, closeIdx + 1)); } catch (_) { /* fall through */ }
      }
    }
  }

  // Strategy 4: try to extract just the picks array and build a minimal object
  const arrStart = raw.indexOf('"picks"');
  if (arrStart !== -1) {
    const bracketIdx = raw.indexOf("[", arrStart);
    if (bracketIdx !== -1) {
      let depth = 0, endIdx = -1;
      for (let i = bracketIdx; i < raw.length; i++) {
        if (raw[i] === "[") depth++;
        else if (raw[i] === "]") { depth--; if (depth === 0) { endIdx = i; break; } }
      }
      if (endIdx !== -1) {
        try {
          const arr = JSON.parse(raw.slice(bracketIdx, endIdx + 1));
          return { picks: arr, totalGames: arr.length, highConf: arr.filter(p => p.prob >= 65).length };
        } catch (_) { /* fall through */ }
      }
    }
  }

  throw new Error(
    "Could not parse picks from the model response. The model may have returned " +
    "an explanation instead of JSON. Please hit Re-Run — this usually resolves on a second attempt."
  );
}

/* ─── CLAUDE API ─────────────────────────────────────────────────────────── */
async function callClaude(date, onChunk) {
  const displayDate = fmtDate(date);

  const system = `You are an MLB F5 (First 5 Innings) moneyline betting analyst.
Date: ${date}. Generate picks for THIS date's games.

INSTRUCTIONS:
1. Search for today's MLB schedule and probable pitchers for ${date}
2. For each starter: try 2026 stats first, fall back to 2025 if fewer than 3 starts, use league avg (ERA 4.40, WHIP 1.28) if no stats
3. Score matchups: lower ERA + lower WHIP + higher (K%-BB%) = better pitcher
4. Compute F5 win probability from pitcher differential + park factor + 2% home bump
5. Rank ALL games highest to lowest probability

RESPONSE FORMAT:
You MUST respond with ONLY a raw JSON object. No introduction, no explanation, no markdown fences.
Start your response with { and end with }. Nothing before the first { and nothing after the last }.

Required JSON structure:
{
  "date": "${date}",
  "picks": [
    {
      "rank": 1,
      "matchup": "Away Team @ Home Team",
      "awayTeam": "Full Team Name",
      "homeTeam": "Full Team Name",
      "awayPitcher": "Pitcher Name or TBD",
      "homePitcher": "Pitcher Name or TBD",
      "awayEra": 3.21,
      "homeEra": 4.55,
      "awayIp": 18.2,
      "homeIp": 12.0,
      "statYear": "2026",
      "venue": "Stadium Name",
      "parkRun": 1.01,
      "gameTime": "7:05 PM ET",
      "pickSide": "AWAY",
      "pickTeam": "Team Name",
      "prob": 68.4,
      "tier": "HIGH",
      "awayProb": 68.4,
      "homeProb": 31.6,
      "factors": ["Key Factor 1", "Key Factor 2"],
      "reasoning": "2-3 sentence explanation."
    }
  ],
  "totalGames": 15,
  "highConf": 3,
  "earlySeasonNote": "Note about data quality if applicable, or empty string"
}

statYear options: "2026", "2025", or "avg"
tier options: "HIGH" (65%+), "MEDIUM" (58-64%), "LOW" (below 58%)
Include every game. Rank by prob descending.`;

const resp = await fetch("/api/picks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      system,
      tools: [{ type: "web_search_20250305", name: "web_search" }],
      messages: [{
        role: "user",
        content: `Search for the MLB schedule and probable pitchers for ${displayDate}, then return the F5 picks JSON. Remember: respond with ONLY the raw JSON object, nothing else.`
      }]
    })
  });

  if (!resp.ok) {
    const e = await resp.json().catch(() => ({}));
    const msg = e.error?.message || `API error ${resp.status}`;
    // Friendly messages for common errors
    if (resp.status === 401) throw new Error("API authentication error. Please reload the page and try again.");
    if (resp.status === 429) throw new Error("Too many requests — please wait 30 seconds and try again.");
    if (resp.status === 500) throw new Error("Claude API server error. Please try again in a minute.");
    throw new Error(msg);
  }

  const data = await resp.json();
  let fullText = "";
  for (const block of data.content || []) {
    if (block.type === "text") {
      fullText += block.text;
      onChunk(block.text);
    }
  }

  if (!fullText.trim()) {
    throw new Error("Model returned an empty response. This can happen when no games are found for the date, or the search timed out. Please try again.");
  }

  // Use robust extractor
  return extractJSON(fullText);
}

/* ─── APP ─────────────────────────────────────────────────────────────────── */
export default function App() {
  const [status, setStatus]       = useState("idle");
  const [result, setResult]       = useState(null);
  const [errMsg, setErrMsg]       = useState("");
  const [streamText, setStreamText] = useState("");
  const [stepIdx, setStepIdx]     = useState(-1);
  const [date, setDate]           = useState(() => new Date().toISOString().split("T")[0]);
  const streamRef = useRef(null);
  const stepTimers = useRef([]);

  const STEPS = [
    "Searching MLB schedule & probable pitchers",
    "Fetching pitcher stats (2026 → 2025 fallback)",
    "Applying park factors & home field edge",
    "Scoring matchups via F5 logistic model",
    "Extracting & ranking picks",
  ];

  function clearStepTimers() {
    stepTimers.current.forEach(clearTimeout);
    stepTimers.current = [];
  }

  async function run() {
    setStatus("running");
    setResult(null);
    setErrMsg("");
    setStreamText("");
    setStepIdx(0);
    clearStepTimers();

    // Advance progress bar during API call
    const delays = [1200, 4500, 8500, 13000];
    delays.forEach((d, i) => {
      stepTimers.current.push(setTimeout(() => setStepIdx(i + 1), d));
    });

    try {
      const data = await callClaude(date, (chunk) => {
        setStreamText(prev => prev + chunk);
        requestAnimationFrame(() => {
          if (streamRef.current) streamRef.current.scrollTop = streamRef.current.scrollHeight;
        });
      });

      clearStepTimers();
      setStepIdx(4); // mark all done
      await new Promise(r => setTimeout(r, 300));
      setResult(data);
      setStatus("done");
      setStepIdx(-1);
    } catch (e) {
      clearStepTimers();
      setErrMsg(e.message || "Unknown error — please try again.");
      setStatus("error");
      setStepIdx(-1);
    }
  }

  const picks      = result?.picks || [];
  const top        = picks[0];
  const sec        = picks.slice(1, 3);
  const using2025  = picks.some(p => p.statYear === "2025");
  const highConf   = picks.filter(p => parseFloat(p.prob) >= 65).length;

  return (
    <>
      <style>{CSS}</style>
      <div className="app">

        {/* NAV */}
        <nav className="nav">
          <div className="logo"><div className="dot" />F5 PICKS</div>
          <div className="nav-meta">
            <div><b>{date}</b> · MLB First 5 Innings</div>
            <div>Claude API + Web Search</div>
          </div>
        </nav>

        <div className="page">

          {/* CTRL */}
          <div className="ctrl">
            <div className="ctrl-main">
              <h2>MLB F5 Nightly Model — {fmtDate(date)}</h2>
              <p>Live schedule + pitcher lookup via web search. Falls back to 2025 stats when 2026 data is unavailable.</p>
              <div className="ctrl-badges">
                <span className="badge badge-g">Web Search Live</span>
                <span className="badge badge-bl">2026 Stats Primary</span>
                <span className="badge badge-am">2025 Fallback</span>
              </div>
            </div>
            <input
              type="date"
              className="date-input"
              value={date}
              onChange={e => setDate(e.target.value)}
              disabled={status === "running"}
            />
            <button
              className="run-btn"
              onClick={run}
              disabled={status === "running"}
            >
              {status === "running" ? "ANALYZING..." : status === "done" ? "RE-RUN" : "RUN MODEL"}
            </button>
          </div>

          {/* PROGRESS */}
          {status === "running" && (
            <div className="prog">
              <div className="prog-title">RUNNING F5 MODEL...</div>
              <div className="steps">
                {STEPS.map((s, i) => (
                  <div key={i} className={`step ${i === stepIdx ? "active" : i < stepIdx ? "done" : ""}`}>
                    <div className="step-ic">{i < stepIdx ? "✓" : i === stepIdx ? "●" : i + 1}</div>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STREAM */}
          {streamText && status === "running" && (
            <div className="stream">
              <div className="stream-hd"><div className="dot" />model output · live</div>
              <div className="stream-body" ref={streamRef}>{streamText}</div>
            </div>
          )}

          {/* ERROR */}
          {status === "error" && (
            <div className="err-box">
              <h3>⚠ Error</h3>
              <p>{errMsg}</p>
              <p style={{ color: "var(--t3)", fontSize: 12 }}>
                Most errors resolve on a second attempt. If it keeps failing, try again in a few minutes.
              </p>
              <button className="retry-btn" onClick={run}>↺ Try Again</button>
            </div>
          )}

          {/* RESULTS */}
          {status === "done" && picks.length > 0 && (
            <>
              {using2025 && (
                <div className="warn">
                  <b>⚠ Early Season — Using 2025 Stats as Fallback:</b> Some pitchers have fewer than 3 starts in 2026.
                  Their 2025 stats are used where 2026 data is unavailable. K% and BB% carry over well year-to-year.
                  Full model reliability returns mid-April.
                </div>
              )}
              {result?.earlySeasonNote && (
                <div className="info-box">
                  <b>ℹ Model Note:</b> {result.earlySeasonNote}
                </div>
              )}

              {/* STAT STRIP */}
              <div className="stats-strip">
                <div className="sc-cell"><label>Games Today</label><div className="sc-val dim">{result.totalGames ?? picks.length}</div></div>
                <div className="sc-cell"><label>Picks Ranked</label><div className="sc-val dim">{picks.length}</div></div>
                <div className="sc-cell"><label>High Conf 65%+</label><div className="sc-val g">{highConf}</div></div>
                <div className="sc-cell"><label>Top Pick Conf</label><div className={`sc-val ${confColor(top?.prob)}`}>{parseFloat(top?.prob).toFixed(1)}%</div></div>
                <div className="sc-cell">
                  <label>Data Source</label>
                  <div className="sc-val" style={{ fontSize: 14, lineHeight: 1.3, paddingTop: 5, color: using2025 ? "var(--am)" : "var(--g)" }}>
                    {using2025 ? "2025★" : "2026"}
                  </div>
                </div>
              </div>

              {/* TOP PICK */}
              {top && (
                <>
                  <div className="sec-lbl">Top Pick</div>
                  <div className="top-card">
                    <div className="top-hd">
                      <div>
                        <div className="top-rank">🏆 #1 Top Pick · {top.gameTime}</div>
                        <div className="top-team">{top.pickTeam}</div>
                        <div className="top-side">{top.pickSide} F5 ML</div>
                      </div>
                      <div className="top-right">
                        <div className="conf-num">{parseFloat(top.prob).toFixed(1)}%</div>
                        <div className="conf-lbl">Win Probability</div>
                        <div style={{ marginTop: 8 }}>
                          <span className={`tag tag-${top.tier === "HIGH" ? "g" : top.tier === "MEDIUM" ? "am" : "bl"}`}>
                            {top.tier} CONFIDENCE
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="top-body">
                      <div className="dg">
                        <label>Matchup</label>
                        <div className="dv">{top.matchup}</div>
                      </div>
                      <div className="dg">
                        <label>Venue</label>
                        <div className="dv">{top.venue} <span style={{ color: "var(--t3)", fontSize: 12 }}>RF: {top.parkRun}x</span></div>
                      </div>
                      <div className="dg">
                        <label>Away Starter</label>
                        <div className="dv mono">
                          {top.awayPitcher}
                          {top.awayEra && <span style={{ color: "var(--t3)", marginLeft: 8, fontSize: 11 }}>{top.awayEra} ERA · {top.awayIp} IP</span>}
                        </div>
                        {top.statYear !== "2026" && <div className="dv small">★ {top.statYear === "2025" ? "2025 stats" : "league avg"}</div>}
                      </div>
                      <div className="dg">
                        <label>Home Starter</label>
                        <div className="dv mono">
                          {top.homePitcher}
                          {top.homeEra && <span style={{ color: "var(--t3)", marginLeft: 8, fontSize: 11 }}>{top.homeEra} ERA · {top.homeIp} IP</span>}
                        </div>
                        {top.statYear !== "2026" && <div className="dv small">★ {top.statYear === "2025" ? "2025 stats" : "league avg"}</div>}
                      </div>
                      {top.factors?.length > 0 && (
                        <div className="dg" style={{ gridColumn: "1/-1" }}>
                          <label>Key Factors</label>
                          <div>{top.factors.map((f, i) => <span key={i} className="tag tag-g">{f}</span>)}</div>
                        </div>
                      )}
                    </div>
                    <div className="reason">
                      <label>Model Reasoning</label>
                      <p>{top.reasoning}</p>
                    </div>
                    {top.statYear !== "2026" && (
                      <div className="data-note">★ Stats from {top.statYear === "2025" ? "2025 season" : "league averages"} — 2026 data insufficient</div>
                    )}
                  </div>
                </>
              )}

              {/* SECONDARY PICKS */}
              {sec.length > 0 && (
                <>
                  <div className="sec-lbl">Secondary Picks</div>
                  <div className="sec-grid">
                    {sec.map((p, i) => {
                      const cc = confColor(p.prob);
                      return (
                        <div key={i} className="sec-card" style={{ animationDelay: `${i * 0.1}s` }}>
                          <div className="sec-top">
                            <div className="sec-rk">#{i + 2} Pick · {p.gameTime}</div>
                            <div className={`sec-pct ${cc}`}>{parseFloat(p.prob).toFixed(1)}%</div>
                          </div>
                          <div className="sec-team">{p.pickTeam}</div>
                          <div className={`sec-side ${cc}`}>{p.pickSide} F5 ML</div>
                          <div className="sec-info">
                            <div><strong>{p.matchup}</strong></div>
                            <div>{p.awayPitcher?.split(" ").pop()} vs {p.homePitcher?.split(" ").pop()}</div>
                            <div>{p.venue}</div>
                            <div style={{ marginTop: 6 }}>
                              <span className={`tag tag-${p.tier === "HIGH" ? "g" : p.tier === "MEDIUM" ? "am" : "bl"}`}>{p.tier}</span>
                              {p.statYear !== "2026" && <span className="tag tag-am">★ {p.statYear}</span>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* FULL SLATE TABLE */}
              <div className="sec-lbl">Full Slate — All {picks.length} Games</div>
              <div className="slate">
                <div className="sl-hd">
                  <div className="sh">Matchup</div>
                  <div className="sh">Away SP (ERA)</div>
                  <div className="sh">Home SP (ERA)</div>
                  <div className="sh">Pick / Prob</div>
                  <div className="sh">Tier</div>
                </div>
                {picks.map((p, i) => {
                  const cc = confColor(p.prob);
                  return (
                    <div key={i} className={`sl-row ${i === 0 ? "top" : ""}`}>
                      <div className="sc2 m">
                        <div>
                          <div>{p.matchup}</div>
                          <div style={{ fontSize: 11, color: "var(--t3)", marginTop: 2 }}>{p.gameTime} · {p.venue}</div>
                        </div>
                      </div>
                      <div className="sc2" style={{ fontSize: 11, flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
                        <div style={{ color: "var(--t2)" }}>{p.awayPitcher?.split(" ").pop() || "TBD"}</div>
                        <div style={{ color: "var(--t3)" }}>{p.awayEra ? `${p.awayEra} ERA` : "—"}{p.statYear !== "2026" ? " ★" : ""}</div>
                      </div>
                      <div className="sc2" style={{ fontSize: 11, flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
                        <div style={{ color: "var(--t2)" }}>{p.homePitcher?.split(" ").pop() || "TBD"}</div>
                        <div style={{ color: "var(--t3)" }}>{p.homeEra ? `${p.homeEra} ERA` : "—"}{p.statYear !== "2026" ? " ★" : ""}</div>
                      </div>
                      <div className="sc2">
                        <div className="bar-wr">
                          <div className="bar-bg">
                            <div className={`bar-fill ${cc}`} style={{ width: `${barW(p.prob)}%` }} />
                          </div>
                          <span className={`bar-n ${cc}`}>{parseFloat(p.prob).toFixed(1)}%</span>
                        </div>
                      </div>
                      <div className="sc2">
                        <span className={`tag tag-${p.tier === "HIGH" ? "g" : p.tier === "MEDIUM" ? "am" : "bl"}`}>{p.tier}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="footer">
                <div><b>Data:</b> Live web search · 2026 stats primary · 2025 fallback (★) · League avg where unavailable</div>
                <div><b>Model:</b> F5 logistic · ERA/WHIP/K%/BB% differential · park run factor · +2% home field</div>
                <div><b>Cost:</b> ~$0.02–0.05 per run (Claude API + web search)</div>
                <div><b>Disclaimer:</b> For informational purposes only. Please gamble responsibly.</div>
              </div>
            </>
          )}

          {/* NO PICKS */}
          {status === "done" && picks.length === 0 && (
            <div className="err-box">
              <h3>No Games Found</h3>
              <p>No MLB games found for {fmtDate(date)}. The season runs late March through early October.</p>
              <button className="retry-btn" onClick={run}>↺ Try Again</button>
            </div>
          )}

          {/* IDLE */}
          {status === "idle" && (
            <div className="idle-note">
              <h3>Ready to Run</h3>
              <ul>
                <li><b>Pick your date</b> using the date selector above, then hit Run Model</li>
                <li><b>Best time to run:</b> After 6 PM ET when probable pitchers are confirmed for next day</li>
                <li><b>Stats:</b> 2026 season stats primary — falls back to 2025 if fewer than 3 starts logged</li>
                <li><b>Early season (now through mid-April):</b> Picks use 2025 stats. K% and BB% carry over reliably year-to-year</li>
                <li><b>If it gets stuck:</b> Hit the Re-Run or Try Again button — a second attempt almost always works</li>
                <li><b>Cost per run:</b> ~$0.02–0.05 via Claude API</li>
              </ul>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
