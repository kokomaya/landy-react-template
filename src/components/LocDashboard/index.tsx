// src/components/LocDashboard/index.tsx
import React, { useMemo, useState } from "react";
import locData from "../../content/loc_details.json";
import * as S from "./styles";

const getValue = (d: any) => {
  if (typeof d.Code === "number" && d.Code > 0) return d.Code;
  if (typeof d.Lines === "number" && d.Lines > 0) return d.Lines;
  if (typeof d.loc === "number") return d.loc;
  return 0;
};

const LocDashboard: React.FC = () => {
  const [buildKey, setBuildKey] = useState<string | null>(
    Object.keys(locData)[0] || null
  );
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const builds = useMemo(() => Object.keys(locData), []);

  const build = useMemo(() => (buildKey ? (locData as any)[buildKey] : null), [buildKey]);

  const modules = useMemo(() => {
    if (!build) return [];
    return Object.entries(build).filter(([k]) => k !== "_meta").map(([k, v]: any) => ({ key: k, ...(v as any) }));
  }, [build]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return modules;
    return modules.filter((m: any) => m.key.toLowerCase().includes(q) || (m.release || "").toLowerCase().includes(q));
  }, [modules, query]);

  const totals = useMemo(() => {
    let moduleCount = 0;
    let totalLOC = 0;
    const langSet = new Set<string>();
    modules.forEach((m: any) => {
      moduleCount += 1;
      if (typeof m.loc === "number") totalLOC += m.loc;
      if (Array.isArray(m.details)) {
        m.details.forEach((d: any) => {
          if (d && d.Name) langSet.add(d.Name);
        });
      }
    });
    return { moduleCount, totalLOC, languageCount: langSet.size };
  }, [modules]);

  const topModules = useMemo(() => [...modules].sort((a: any, b: any) => (b.loc || 0) - (a.loc || 0)).slice(0, 12), [modules]);

  const languageTotals = useMemo(() => {
    const map: Record<string, { value: number; files: number }> = {};
    modules.forEach((m: any) => {
      if (Array.isArray(m.details)) {
        m.details.forEach((d: any) => {
          const name = d.Name || "Unknown";
          const v = getValue(d);
          const files = Array.isArray(d.Files) ? d.Files.length : (d.Count || 0);
          if (!map[name]) map[name] = { value: 0, files: 0 };
          map[name].value += v;
          map[name].files += files;
        });
      }
    });
    return Object.entries(map).map(([name, { value, files }]) => ({ name, value, files }));
  }, [modules]);

  const COLORS = ["#5662f6", "#3ad29f", "#ffb86b", "#ff6b6b", "#9f7aea", "#60a5fa", "#f472b6"];

  const renderTopModulesChart = () => {
    const max = Math.max(...topModules.map((m: any) => m.loc || 0), 1);
    return (
      <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
        {topModules.map((m: any) => {
          const w = Math.round(((m.loc || 0) / max) * 100);
          return (
            <div key={m.key} style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <div style={{width: 120, fontSize: 12, color: '#334', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} title={m.key}>{m.key}</div>
              <div style={{flex:1, background: '#eef6ff', height: 14, borderRadius: 8, overflow: 'hidden'}}>
                <div style={{width: `${w}%`, height: '100%', background: 'linear-gradient(90deg,#5662f6,#3ad29f)', borderRadius: 8}} />
              </div>
              <div style={{width: 96, textAlign: 'right', fontWeight:700, color:'#18216d'}}>{(m.loc||0).toLocaleString()}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderLanguagePie = () => {
    // legacy: we now render pie and legend separately where needed
    return renderLanguagePieOnly();
  };

  const renderLanguagePieOnly = () => {
    const total = languageTotals.reduce((s: number, x: any) => s + x.value, 0) || 1;
    let offset = 0;
    const parts = languageTotals.map((p: any, i: number) => {
      const angle = (p.value / total) * 360;
      const start = offset;
      offset += angle;
      return { ...p, angle, start, color: COLORS[i % COLORS.length] };
    });
    const gradient = parts.map((p: any) => `${p.color} ${p.start}deg ${p.start + p.angle}deg`).join(',');
    return <div style={{width: '100%', height: '100%', borderRadius: 9999, background: `conic-gradient(${gradient})`}} />;
  };

  const renderLanguageLegend = () => {
    const total = languageTotals.reduce((s: number, x: any) => s + x.value, 0) || 1;
        const rows = [...languageTotals].map((p: any, i: number) => ({
          ...p,
          color: COLORS[i % COLORS.length],
          perc: ((p.value / total) * 100).toFixed(5)
        }));
    return (
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {rows.map((r: any) => (
          <div key={r.name} style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{width:12,height:12,background:r.color,borderRadius:3}} />
            <div style={{flex:'0 0 auto',minWidth:120,color:'#18216d'}}>{r.name}</div>
                <div style={{marginLeft:'auto',fontWeight:700}}>{r.perc}%</div>
          </div>
        ))}
      </div>
    );
  };

  const renderLanguageTable = () => {
    const total = languageTotals.reduce((s: number, x: any) => s + x.value, 0) || 1;
    const rows = [...languageTotals].sort((a: any, b: any) => b.value - a.value);
    return (
      <div style={{overflowX: 'auto'}}>
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{textAlign:'left'}}>
              <th style={{padding:8,color:'#556',fontWeight:700}}>Language</th>
              <th style={{padding:8,color:'#556',fontWeight:700}}>Lines</th>
              <th style={{padding:8,color:'#556',fontWeight:700}}>Files</th>
              <th style={{padding:8,color:'#556',fontWeight:700}}>Percent</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r: any) => (
              <tr key={r.name} style={{borderBottom: '1px solid #f3f6ff'}}>
                <td style={{padding:8}}>{r.name}</td>
                <td style={{padding:8}}>{r.value.toLocaleString()}</td>
                <td style={{padding:8}}>{(r.files || 0).toLocaleString()}</td>
                    <td style={{padding:8}}>{((r.value/total)*100).toFixed(5)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <S.Wrapper>
      <S.Topbar>
        <div>
          <h1>Repository LOC Dashboard</h1>
          <div className="meta">Build: <strong>{buildKey}</strong></div>
        </div>
        <div className="controls">
          <select value={buildKey || ""} onChange={(e) => setBuildKey(e.target.value)}>
            {builds.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          <input placeholder="Search modules..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </S.Topbar>

      <S.Summary>
        <S.Card>
          <div className="label">Modules</div>
          <div className="value">{totals.moduleCount}</div>
        </S.Card>
        <S.Card>
          <div className="label">Total LOC</div>
          <div className="value">{totals.totalLOC.toLocaleString()}</div>
        </S.Card>
        <S.Card>
          <div className="label">Languages</div>
          <div className="value">{totals.languageCount}</div>
        </S.Card>
      </S.Summary>

      <S.Grid>
        <S.ChartRow>
          <S.ChartArea>
            <S.ChartCard style={{gridColumn: '1 / 2', gridRow: '1 / 2'}}>
              <div className="title">Top Modules (LOC)</div>
              <div className="cardBody">{renderTopModulesChart()}</div>
            </S.ChartCard>

            <S.ChartCard style={{gridColumn: '1 / 2', gridRow: '2 / 3'}}>
              <div className="title">Language Table</div>
              <div className="cardBody">{renderLanguageTable()}</div>
            </S.ChartCard>

            <S.ChartCard className="spanRow" style={{gridColumn: '2 / 3', gridRow: '1 / 3'}}>
              <div className="title">Language Distribution</div>
              <div className="chartInner" style={{width: '100%', padding: 8, alignItems: 'flex-start'}}>
                <div style={{display:'flex',alignItems:'center',gap:18,width:'100%'}}>
                  <div style={{flex:'0 0 auto',width:'min(300px, 40%)',maxWidth:300, display:'flex', alignItems:'center'}}>
                    <div style={{width:'100%',paddingTop:'100%',position:'relative'}}>
                      <div style={{position:'absolute',inset:0,borderRadius:9999,overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center',padding:8}}>
                        {renderLanguagePieOnly()}
                      </div>
                    </div>
                  </div>
                  <div style={{flex:1, display:'flex', alignItems:'flex-start', paddingTop:8}}>
                    {renderLanguageLegend()}
                  </div>
                </div>
              </div>
            </S.ChartCard>
          </S.ChartArea>
        </S.ChartRow>

        <S.Side>
          <h3>Top Modules</h3>
          {topModules.map((m: any) => (
            <S.ModuleItem key={m.key} onClick={() => setExpanded(expanded === m.key ? null : m.key)}>
              <div className="title">{m.key}</div>
              <div className="small">release: {m.release || "-"}</div>
              <div className="loc">{(m.loc || 0).toLocaleString()} LOC</div>
            </S.ModuleItem>
          ))}
        </S.Side>

        <S.Main>
          <h3>Modules</h3>
          <S.ModuleList>
            {filtered.map((m: any) => (
              <S.ModuleCard key={m.key}>
                <div className="head">
                  <div>
                    <div className="name">{m.key}</div>
                    <div className="meta">{m.release ? `release: ${m.release}` : ""}</div>
                  </div>
                  <div className="loc">{(m.loc || 0).toLocaleString()} LOC</div>
                </div>
                <div className="bars">
                  {Array.isArray(m.details) && m.details.slice(0,6).map((d: any) => {
                    const v = getValue(d);
                    const max = Math.max(...(m.details || []).map((x: any)=>getValue(x)), 1);
                    const w = Math.round((v / max) * 100);
                    return (
                      <div className="barRow" key={d.Name}>
                        <div className="lang">{d.Name}</div>
                        <div className="barOuter"><div className="barInner" style={{width: `${w}%`}}/></div>
                        <div className="num">{v.toLocaleString()}</div>
                      </div>
                    );
                  })}
                </div>

                {expanded === m.key && (
                  <S.Detail>
                    <h4>Language breakdown</h4>
                    <table>
                      <thead>
                        <tr><th>Language</th><th>Lines</th><th>Files</th></tr>
                      </thead>
                      <tbody>
                        {Array.isArray(m.details) && m.details.map((d: any)=> (
                          <tr key={d.Name}>
                            <td>{d.Name}</td>
                            <td>{getValue(d).toLocaleString()}</td>
                            <td>{d.Count ?? "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </S.Detail>
                )}
              </S.ModuleCard>
            ))}
          </S.ModuleList>
        </S.Main>
      </S.Grid>
    </S.Wrapper>
  );
};

export default LocDashboard;
