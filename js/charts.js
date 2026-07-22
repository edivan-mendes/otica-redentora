/* =============================================================
   Ótica Redentora — Motor de gráficos em SVG puro
   ============================================================= */
let _gid = 0;
const uid = () => 'g' + (++_gid);

function smoothPath(pts){
  if(pts.length < 2) return '';
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for(let i=0;i<pts.length-1;i++){
    const p0=pts[i-1]||pts[i], p1=pts[i], p2=pts[i+1], p3=pts[i+2]||p2;
    const c1x=p1[0]+(p2[0]-p0[0])/6, c1y=p1[1]+(p2[1]-p0[1])/6;
    const c2x=p2[0]-(p3[0]-p1[0])/6, c2y=p2[1]-(p3[1]-p1[1])/6;
    d+=` C ${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }
  return d;
}
const money = v => 'R$ ' + Number(v).toLocaleString('pt-BR',{maximumFractionDigits:0});

const Charts = {
  /* ---- Sparkline (mini) ---- */
  spark(data, {color='var(--primary)', fill=true, h=46, w=180}={}){
    if(!data||!data.length) return '';
    const id=uid(), max=Math.max(...data), min=Math.min(...data), rng=(max-min)||1;
    const pts=data.map((v,i)=>[ (i/(data.length-1))*w, h-4-((v-min)/rng)*(h-10) ]);
    const line=smoothPath(pts);
    const areaD=fill?`${line} L ${w},${h} L 0,${h} Z`:'';
    return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="width:100%;height:${h}px">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${color}" stop-opacity=".28"/>
        <stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>
      ${fill?`<path d="${areaD}" fill="url(#${id})"/>`:''}
      <path d="${line}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" class="draw-line"/>
    </svg>`;
  },

  /* ---- Area / line chart (multi-série) ---- */
  area(labels, series, {h=280, area=true, yFmt=money, grid=true}={}){
    const W=680, pad={l:52,r:16,t:16,b:34};
    const iw=W-pad.l-pad.r, ih=h-pad.t-pad.b;
    const all=series.flatMap(s=>s.data.filter(v=>v!=null));
    let max=Math.max(...all), min=Math.min(0,...all);
    max=max*1.12||10; const rng=(max-min)||1;
    const xOf=i=>pad.l+(i/(labels.length-1))*iw;
    const yOf=v=>pad.t+ih-((v-min)/rng)*ih;
    const ticks=4; let gl='',yl='';
    if(grid) for(let t=0;t<=ticks;t++){ const val=min+(rng*t/ticks), y=yOf(val);
      gl+=`<line class="gl" x1="${pad.l}" y1="${y}" x2="${W-pad.r}" y2="${y}"/>`;
      yl+=`<text x="${pad.l-9}" y="${y+3}" text-anchor="end" font-size="10" fill="var(--faint)">${fmt.moneyK?fmt.moneyK(Math.round(val)):Math.round(val)}</text>`; }
    let xl=''; labels.forEach((l,i)=>{ if(labels.length>10 && i%2) return;
      xl+=`<text x="${xOf(i)}" y="${h-12}" text-anchor="middle" font-size="10.5" fill="var(--muted)">${l}</text>`; });
    let paths='',dots='';
    series.forEach((s,si)=>{
      const gid=uid();
      const pts=s.data.map((v,i)=>v==null?null:[xOf(i),yOf(v)]).filter(Boolean);
      const line=smoothPath(pts);
      if(area && si===0){
        const areaD=`${line} L ${pts[pts.length-1][0]},${pad.t+ih} L ${pts[0][0]},${pad.t+ih} Z`;
        paths+=`<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${s.color}" stop-opacity=".30"/>
          <stop offset="1" stop-color="${s.color}" stop-opacity="0"/></linearGradient></defs>
          <path d="${areaD}" fill="url(#${gid})"/>`;
      }
      paths+=`<path d="${line}" fill="none" stroke="${s.color}" stroke-width="${s.dash?2:2.6}" ${s.dash?'stroke-dasharray="6 6"':''} stroke-linecap="round" stroke-linejoin="round" class="draw-line"/>`;
      s.data.forEach((v,i)=>{ if(v==null) return;
        dots+=`<circle cx="${xOf(i)}" cy="${yOf(v)}" r="3.4" fill="var(--surface)" stroke="${s.color}" stroke-width="2.2"
          data-tt="${s.name}: ${yFmt(v)}<br>${labels[i]}" class="ptdot"/>`; });
    });
    return `<div class="chart"><svg viewBox="0 0 ${W} ${h}">${gl}${yl}${xl}${paths}${dots}</svg></div>`;
  },

  /* ---- Bars (vertical) com linha de meta opcional ---- */
  bars(labels, data, {h=260, color='var(--c1)', target=null, yFmt=money, gradient=true, axisFmt=null}={}){
    const W=680, pad={l:48,r:16,t:16,b:34};
    const iw=W-pad.l-pad.r, ih=h-pad.t-pad.b;
    const aFmt=axisFmt||fmt.moneyK;
    let max=Math.max(...data, target||0)*1.15||10;
    const bw=iw/labels.length*0.58, gap=iw/labels.length;
    const yOf=v=>pad.t+ih-(v/max)*ih;
    const id=uid();
    let gl=''; for(let t=0;t<=4;t++){ const y=pad.t+ih*(t/4);
      gl+=`<line class="gl" x1="${pad.l}" y1="${y}" x2="${W-pad.r}" y2="${y}"/>
      <text x="${pad.l-9}" y="${y+3}" text-anchor="end" font-size="10" fill="var(--faint)">${aFmt(Math.round(max*(1-t/4)))}</text>`; }
    let bars='';
    data.forEach((v,i)=>{ const x=pad.l+gap*i+(gap-bw)/2, y=yOf(v), bh=pad.t+ih-y;
      bars+=`<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="6" fill="url(#${id})" class="grow-bar" style="animation-delay:${i*0.05}s"
        data-tt="${labels[i]}: ${yFmt(v)}"/>
        <text x="${x+bw/2}" y="${h-12}" text-anchor="middle" font-size="10.5" fill="var(--muted)">${labels[i]}</text>`; });
    let tline='';
    if(target!=null){ const ty=yOf(target);
      tline=`<line x1="${pad.l}" y1="${ty}" x2="${W-pad.r}" y2="${ty}" stroke="var(--danger)" stroke-width="1.6" stroke-dasharray="5 4"/>
      <text x="${W-pad.r}" y="${ty-6}" text-anchor="end" font-size="10" font-weight="700" fill="var(--danger)">Meta ${fmt.moneyK(target)}</text>`; }
    return `<div class="chart"><svg viewBox="0 0 ${W} ${h}">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${color}"/><stop offset="1" stop-color="${color}" stop-opacity="${gradient?.55:1}"/></linearGradient></defs>
      ${gl}${bars}${tline}</svg></div>`;
  },

  /* ---- Grouped bars ---- */
  groupedBars(labels, series, {h=280, yFmt=money}={}){
    const W=680, pad={l:48,r:16,t:20,b:34};
    const iw=W-pad.l-pad.r, ih=h-pad.t-pad.b;
    const max=Math.max(...series.flatMap(s=>s.data))*1.15||10;
    const gap=iw/labels.length, n=series.length, bw=gap*0.66/n;
    const yOf=v=>pad.t+ih-(v/max)*ih;
    let gl=''; for(let t=0;t<=4;t++){ const y=pad.t+ih*(t/4);
      gl+=`<line class="gl" x1="${pad.l}" y1="${y}" x2="${W-pad.r}" y2="${y}"/>
      <text x="${pad.l-9}" y="${y+3}" text-anchor="end" font-size="10" fill="var(--faint)">${fmt.moneyK(Math.round(max*(1-t/4)))}</text>`; }
    let bars='';
    labels.forEach((lab,i)=>{
      const base=pad.l+gap*i+(gap-bw*n)/2;
      series.forEach((s,si)=>{ const v=s.data[i], x=base+bw*si, y=yOf(v), bh=pad.t+ih-y;
        bars+=`<rect x="${x}" y="${y}" width="${bw*0.86}" height="${bh}" rx="4" fill="${s.color}" class="grow-bar" style="animation-delay:${i*0.04+si*0.02}s" data-tt="${s.name} · ${lab}: ${yFmt(v)}"/>`; });
      bars+=`<text x="${base+bw*n/2}" y="${h-12}" text-anchor="middle" font-size="10.5" fill="var(--muted)">${lab}</text>`;
    });
    return `<div class="chart"><svg viewBox="0 0 ${W} ${h}">${gl}${bars}</svg></div>`;
  },

  /* ---- Donut ---- */
  donut(segments, {size=180, thickness=26, center=''}={}){
    const total=segments.reduce((a,s)=>a+s.v,0)||1;
    const r=(size-thickness)/2, cx=size/2, cy=size/2, C=2*Math.PI*r;
    let off=0, arcs='';
    segments.forEach((s,i)=>{ const frac=s.v/total, len=frac*C;
      arcs+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${s.c||s.color}" stroke-width="${thickness}"
        stroke-dasharray="${len} ${C-len}" stroke-dashoffset="${-off}" stroke-linecap="butt"
        transform="rotate(-90 ${cx} ${cy})" data-tt="${s.label}: ${Math.round(frac*100)}%"
        style="transition:stroke-dashoffset 1s var(--ease)"/>`;
      off+=len; });
    return `<div class="ring-wrap" style="width:${size}px;height:${size}px">
      <svg viewBox="0 0 ${size} ${size}" style="width:${size}px;height:${size}px">
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--surface-2)" stroke-width="${thickness}"/>
        ${arcs}</svg>${center?`<div class="rc">${center}</div>`:''}</div>`;
  },

  /* ---- Progress ring (single %) ---- */
  ring(pct, {size=132, thickness=12, color='var(--primary)', label='', center=null}={}){
    const r=(size-thickness)/2, cx=size/2, C=2*Math.PI*r, len=Math.min(pct,100)/100*C;
    const id=uid();
    return `<div class="ring-wrap" style="width:${size}px;height:${size}px">
      <svg viewBox="0 0 ${size} ${size}" style="width:${size}px;height:${size}px">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${color}"/><stop offset="1" stop-color="var(--c2)"/></linearGradient></defs>
      <circle cx="${cx}" cy="${cx}" r="${r}" fill="none" stroke="var(--surface-2)" stroke-width="${thickness}"/>
      <circle cx="${cx}" cy="${cx}" r="${r}" fill="none" stroke="url(#${id})" stroke-width="${thickness}" stroke-linecap="round"
        stroke-dasharray="${len} ${C-len}" transform="rotate(-90 ${cx} ${cx})" style="transition:stroke-dasharray 1.2s var(--ease)"/>
      </svg><div class="rc">${center||`<div class="rv">${pct}%</div><div class="rl">${label}</div>`}</div></div>`;
  },

  /* ---- Gauge (meia lua) ---- */
  gauge(value, max, {label='', color='var(--primary)', h=150}={}){
    const w=260, cx=w/2, cy=h-14, r=104, C=Math.PI*r;
    const pct=Math.min(value/max,1), len=pct*C, id=uid();
    const ang=Math.PI*(1-pct), nx=cx+r*Math.cos(ang), ny=cy-r*Math.sin(ang);
    return `<div class="ring-wrap" style="width:100%">
      <svg viewBox="0 0 ${w} ${h}" style="width:100%;max-width:${w}px">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#f43f5e"/><stop offset=".5" stop-color="#f59e0b"/><stop offset="1" stop-color="#10b981"/></linearGradient></defs>
      <path d="M ${cx-r} ${cy} A ${r} ${r} 0 0 1 ${cx+r} ${cy}" fill="none" stroke="var(--surface-2)" stroke-width="16" stroke-linecap="round"/>
      <path d="M ${cx-r} ${cy} A ${r} ${r} 0 0 1 ${cx+r} ${cy}" fill="none" stroke="url(#${id})" stroke-width="16" stroke-linecap="round"
        stroke-dasharray="${len} ${C}" style="transition:stroke-dasharray 1.3s var(--ease)"/>
      <circle cx="${nx}" cy="${ny}" r="7" fill="var(--surface)" stroke="${color}" stroke-width="3"/>
      </svg>
      <div class="rc" style="top:52%"><div class="rv">${Math.round(pct*100)}%</div><div class="rl">${label}</div></div></div>`;
  },

  /* ---- Horizontal bars (ranking) ---- */
  hbars(items, {max=null, fmt:f=money, color=null}={}){
    const mx=max||Math.max(...items.map(i=>i.v))*1.05;
    return `<div class="col" style="gap:13px">${items.map((it,i)=>{
      const pct=(it.v/mx)*100, c=color||it.c||['var(--c1)','var(--c2)','var(--c3)','var(--c4)','var(--c5)','var(--c6)'][i%6];
      return `<div><div class="row between" style="margin-bottom:6px"><span style="font-weight:600;font-size:12.5px">${it.label||it.nome}</span><span class="num" style="font-weight:700;font-size:12.5px">${f(it.v)}</span></div>
      <div class="bar" style="height:9px"><i class="grow-h" style="width:${pct}%;background:${c};animation-delay:${i*0.06}s"></i></div></div>`;
    }).join('')}</div>`;
  },

  /* ---- Heatmap ---- */
  heatmap(rows, cols, data, {colorBase='47,107,255'}={}){
    const max=Math.max(...data.flat())||1;
    let head=`<div style="width:34px"></div>`+cols.map(c=>`<div class="cal-head" style="padding:2px 0;font-size:10px">${c}</div>`).join('');
    let body='';
    data.forEach((row,r)=>{
      body+=`<div class="cal-head" style="padding:0;display:grid;place-items:center;font-size:10px">${rows[r]}</div>`;
      row.forEach(v=>{ const a=0.12+(v/max)*0.88;
        body+=`<div class="hc" style="background:rgba(${colorBase},${a});color:${a>0.55?'#fff':'var(--muted)'}" data-tt="${v} vendas"></div>`; });
    });
    const cssCols=`34px repeat(${cols.length},1fr)`;
    return `<div style="display:grid;grid-template-columns:${cssCols};gap:4px;align-items:center">${head}${body}</div>`;
  },

  /* ---- Funnel ---- */
  funnel(items){
    const max=items[0].v;
    return `<div class="col" style="gap:10px">${items.map((it,i)=>{
      const pct=(it.v/max)*100, conv=i>0?Math.round(it.v/items[i-1].v*100):100;
      return `<div><div class="row between" style="margin-bottom:5px">
        <span style="font-weight:600;font-size:13px">${it.label}</span>
        <span class="num" style="font-weight:800">${fmt.num(it.v)} <small class="muted" style="font-weight:600">${i>0?'· '+conv+'%':''}</small></span></div>
        <div style="height:34px;border-radius:10px;background:${it.c};width:${Math.max(pct,14)}%;display:flex;align-items:center;padding:0 12px;color:#fff;font-weight:700;font-size:12px;transition:width 1s var(--ease)" class="grow-h">${Math.round(pct)}%</div></div>`;
    }).join('')}</div>`;
  },

  /* ---- Waterfall (DRE simplificado) ---- */
  bullet(value, target, {color='var(--primary)'}={}){
    const max=Math.max(value,target)*1.1, vp=(value/max)*100, tp=(target/max)*100;
    return `<div style="position:relative;height:14px;border-radius:8px;background:var(--surface-2)">
      <i class="grow-h" style="position:absolute;left:0;top:0;height:100%;border-radius:8px;width:${vp}%;background:${color};display:block"></i>
      <span style="position:absolute;top:-3px;left:${tp}%;width:2px;height:20px;background:var(--text)"></span></div>`;
  }
};
window.Charts = Charts;
