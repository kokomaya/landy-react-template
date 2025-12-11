// src/components/LocDashboard/styles.ts
import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 20px 18px;
  min-height: calc(100vh - 140px);
  background: linear-gradient(180deg,#f7f8fc 0%, #fff 100%);
`;

export const Topbar = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:16px;
  margin-bottom:16px;
  h1{margin:0;font-size:1.4rem;color:#18216d}
  .meta{color:#556}
  .controls{display:flex;gap:8px;align-items:center}
  select,input{padding:8px;border-radius:6px;border:1px solid #e6e9f2}
`;

export const Summary = styled.div`
  display:flex;gap:16px;margin-bottom:20px;flex-wrap:wrap;
`;

export const Card = styled.div`
  background:#fff;padding:16px;border-radius:8px;box-shadow:0 6px 18px rgba(24,33,109,0.06);min-width:160px;
  .label{color:#7b82a8;font-size:0.9rem}
  .value{font-size:1.4rem;font-weight:700;color:#18216d}
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 28px;
  align-items: start;
  grid-auto-rows: auto;
  width: 100%;
  @media (max-width: 1200px) {
    grid-template-columns: 300px 1fr;
  }
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 16px;
  align-items: start;
  grid-column: 1 / -1; /* make the chart row span the full grid width */

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartArea = styled.div`
  display: grid;
    grid-template-columns: 2.2fr 0.8fr;   /* left wider for table/bars, right for pie/legend */
    grid-template-rows: auto 1fr; /* first row sizes to content, second row fills remaining space */
  gap: 28px;
  width: 100%;
  align-items: stretch;
    min-height: 520px; /* give room so second row can stretch and cards share height */

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }
`;

export const ChartCard = styled.div`
  background:#fff;padding:18px;border-radius:12px;box-shadow:0 8px 28px rgba(24,33,109,0.06);min-height:220px;display:flex;flex-direction:column;overflow:visible;
  .title{font-weight:700;color:#18216d;margin-bottom:10px}
  .chartInner{flex:1;display:flex;align-items:center;justify-content:center}
  .cardBody{flex:1;overflow:auto;padding-right:6px}
  /* allow card height to grow with content instead of forcing full cell height */
  /* ensure the card fills its grid cell */
    /* modifier: make card fill its grid cell and hide overflow when used for equal-height rows */
    &.fillRow { height: 100%; overflow: hidden; }
    &.spanCol { grid-column: 1 / 3; }
  @media (max-width: 900px) {
    min-height: 180px;
  }
`;

export const Side = styled.aside`
  background:#fff;padding:16px;border-radius:8px;box-shadow:0 6px 18px rgba(24,33,109,0.04);
  h3{margin-top:0}
  grid-column: 1 / 2;
`;

export const ModuleItem = styled.div`
  padding:10px;border-radius:6px;margin-bottom:10px;cursor:pointer;border:1px solid transparent;
  &:hover{background:#f5f7ff;border-color:#e6e9f2}
  .title{font-weight:600}
  .small{color:#778}
  .loc{color:#18216d;font-weight:700}
`;

export const Main = styled.main`
  background:#fff;padding:16px;border-radius:8px;box-shadow:0 6px 18px rgba(24,33,109,0.04);
  h3{margin-top:0}
  grid-column: 2 / 3;
`;

export const ModuleList = styled.div`
  display:flex;flex-direction:column;gap:12px;max-height:70vh;overflow:auto;padding-right:8px;
`;


export const ModuleCard = styled.div`
  border-radius:8px;padding:12px;border:1px solid #f0f2f8;background:#fbfdff;
  .head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
  .name{font-weight:700;color:#18216d}
  .meta{color:#7b82a8}
  .loc{font-weight:700;color:#2531a9}
  .bars{display:flex;flex-direction:column;gap:6px}
  .barRow{display:flex;align-items:center;gap:8px}
  .lang{width:140px;color:#556}
  .barOuter{flex:1;background:#e9eefc;border-radius:6px;height:10px;overflow:hidden}
  .barInner{height:100%;background:linear-gradient(90deg,#5662f6,#3ad29f)}
  .num{width:80px;text-align:right;color:#334}
`;

export const Detail = styled.div`
  margin-top:12px;border-top:1px dashed #eef;padding-top:12px;
  table{width:100%;border-collapse:collapse}
  th,td{padding:8px;text-align:left;border-bottom:1px solid #f3f6ff}
  th{color:#556;font-weight:700}
`;

// no default export
