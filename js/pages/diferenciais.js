/* ============ Diferenciais: Prova Virtual · Catálogo · Fidelidade ============ */
(function(){
  const m0=v=>fmt.money(v,0);

  /* ---------- PROVA VIRTUAL ---------- */
  const FRAMES=[
    {n:'Ray-Ban Aviator',c:'#f0b429',shape:'aviator'},
    {n:'Wayfarer Preto',c:'#1a1a2e',shape:'square'},
    {n:'Oakley Sport',c:'#0ea5e9',shape:'sport'},
    {n:'Redonda Tartaruga',c:'#8b5a2b',shape:'round'},
    {n:'Cat-eye Rosé',c:'#f472b6',shape:'cat'},
    {n:'Prada Premium',c:'#7c5cff',shape:'square'},
  ];
  function glassesSVG(color,shape){
    const lens = shape==='round'?'<circle cx="76" cy="70" r="30"/><circle cx="164" cy="70" r="30"/>'
      : shape==='cat'?'<path d="M46 60 q30 -18 60 0 q-6 34 -34 34 q-24 0 -26 -34z"/><path d="M194 60 q-30 -18 -60 0 q6 34 34 34 q24 0 26 -34z"/>'
      : shape==='aviator'?'<path d="M46 58 q30 -6 60 2 q-2 40 -30 42 q-28 2 -30 -44z"/><path d="M194 58 q-30 -6 -60 2 q2 40 30 42 q28 2 30 -44z"/>'
      : shape==='sport'?'<path d="M44 56 h64 q4 30 -20 40 q-30 8 -44 -12 z"/><path d="M196 56 h-64 q-4 30 20 40 q30 8 44 -12 z"/>'
      : '<rect x="46" y="48" width="60" height="48" rx="14"/><rect x="134" y="48" width="60" height="48" rx="14"/>';
    return `<svg viewBox="0 0 240 130" style="position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);width:64%" fill="${color}22" stroke="${color}" stroke-width="6" stroke-linejoin="round">
      ${lens}<path d="M106 66 q14 -8 28 0" fill="none"/><path d="M44 60 l-20 -8" fill="none"/><path d="M196 60 l20 -8" fill="none"/></svg>`;
  }
  function provaRender(){
    return `<div class="page">
      ${pageHead('Prova Virtual com IA','Experimente armações em tempo real. Detecção facial, ajuste automático e recomendação por formato de rosto.',{crumbs:['Experiência+'],actions:`
        <span class="badge violet dot">${'IA · Beta'}</span>
        <button class="btn primary" onclick="toast('Link enviado ao cliente','success')">${icon('send')} Enviar ao cliente</button>`})}
      <div class="grid g-3">
        ${panel({title:'Espelho virtual',sub:'Pré-visualização da armação selecionada',icon:'scan',tone:'violet',cls:'span-2',body:`
          <div style="position:relative;aspect-ratio:16/10;border-radius:18px;overflow:hidden;background:radial-gradient(circle at 50% 30%,var(--surface-2),var(--surface));display:grid;place-items:center">
            <svg viewBox="0 0 240 240" width="55%" style="opacity:.5"><ellipse cx="120" cy="110" rx="66" ry="82" fill="none" stroke="var(--faint)" stroke-width="2.5"/><path d="M90 96 h20 M130 96 h20" stroke="var(--faint)" stroke-width="3" stroke-linecap="round"/><path d="M110 120 q10 12 20 0" stroke="var(--faint)" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M104 150 q16 12 32 0" stroke="var(--faint)" stroke-width="3" fill="none" stroke-linecap="round"/></svg>
            <div id="frameOverlay">${glassesSVG(FRAMES[0].c,FRAMES[0].shape)}</div>
            <div style="position:absolute;top:14px;left:14px" class="badge violet dot">Rosto detectado · Formato oval</div>
            <div style="position:absolute;bottom:14px;right:14px" class="row gap-xs"><button class="icon-btn" style="background:var(--glass)">${icon('camera')}</button><button class="icon-btn" style="background:var(--glass)">${icon('refresh-cw')}</button></div>
          </div>
          <div class="row gap-xs mt-2 fw">${FRAMES.map((f,i)=>`<button class="chip ${i===0?'active':''}" id="frameChip${i}" onclick="ProvaVirtual.pick(${i})"><span style="width:11px;height:11px;border-radius:3px;background:${f.c};display:inline-block"></span>${f.n}</button>`).join('')}</div>`})}
        <div class="col">
          ${panel({title:'Recomendação IA',sub:'Para formato oval',icon:'sparkles',tone:'primary',body:`
            <div class="insight ai"><div class="tag-ai">${icon('cpu')} Match facial</div><p>Rostos ovais combinam com quase todos os formatos. Para equilíbrio, priorize <b>armações quadradas ou aviador</b>.</p></div>
            <div class="col mt-2" style="gap:8px">
              ${['Aviador — 96% match','Quadrada — 92% match','Cat-eye — 88% match'].map((t,i)=>`<div><div class="row between" style="font-size:12.5px;margin-bottom:5px"><b>${t.split('—')[0]}</b><span class="muted">${t.split('—')[1]}</span></div><div class="bar"><i style="width:${96-i*4}%"></i></div></div>`).join('')}
            </div>`})}
          ${panel({title:'Adicionar à venda',sub:'',icon:'shopping-cart',tone:'success',body:`
            <div class="row between center mb-1"><b id="provaSel">${FRAMES[0].n}</b><span class="pp" style="font-family:var(--font-mono);font-weight:800">R$ 890</span></div>
            <button class="btn primary block" onclick="App.go('vendas')">${icon('plus')} Adicionar ao PDV</button>
            <button class="btn ghost block mt-1" onclick="toast('Foto salva no histórico do cliente','success')">${icon('image')} Salvar no histórico</button>`})}
        </div>
      </div>
    </div>`;
  }
  window.ProvaVirtual={ pick(i){ const f=FRAMES[i];
    document.getElementById('frameOverlay').innerHTML=glassesSVG(f.c,f.shape);
    document.querySelectorAll('[id^=frameChip]').forEach(c=>c.classList.remove('active'));
    document.getElementById('frameChip'+i).classList.add('active');
    const sel=document.getElementById('provaSel'); if(sel) sel.textContent=f.n;
  }};

  /* ---------- CATÁLOGO DIGITAL ---------- */
  function catalogoRender(){
    const cards=DATA.catalogo.map(c=>`<div class="prod-card reveal" style="cursor:pointer">
      <div class="ph" style="background:linear-gradient(135deg,${c.cor}22,${c.cor}08);position:relative">
        ${icon('glasses')}<span class="badge" style="position:absolute;top:8px;left:8px;background:${c.cor}22;color:${c.cor};border:none;font-size:10px">${c.tag}</span></div>
      <b>${c.marca}</b><small>${c.modelo}</small>
      <div class="row between center mt-1"><span class="pp">${m0(c.preco)}</span>
        <div class="row gap-xs"><button class="icon-btn" style="width:30px;height:30px" onclick="toast('Compartilhado via WhatsApp','success')">${icon('message-circle')}</button>
        <button class="icon-btn" style="width:30px;height:30px" onclick="toast('QR Code gerado','info')">${icon('qr-code')}</button></div></div></div>`).join('');
    return `<div class="page">
      ${pageHead('Catálogo Digital','Vitrine online compartilhável — envie coleções por link, WhatsApp ou QR Code direto ao cliente.',{crumbs:['Experiência+'],actions:`
        <button class="btn ghost" onclick="toast('Link do catálogo copiado','success')">${icon('external-link')}<span class="hide-sm">Link público</span></button>
        <button class="btn primary" onclick="toast('QR Code do catálogo gerado','info')">${icon('qr-code')} Gerar QR</button>`})}
      <div class="card pad reveal" style="margin-bottom:var(--gap)"><div class="row between center fw" style="gap:12px">
        <div class="input-ico f-1" style="min-width:220px">${icon('search')}<input class="input" placeholder="Buscar no catálogo..." style="padding-left:40px"></div>
        <div>${filterChips(['Todos','Solar','Grau','Feminino','Masculino','Premium','Promo'])}</div></div></div>
      <div class="pos-grid" style="grid-template-columns:repeat(auto-fill,minmax(190px,1fr))">${cards}</div>
    </div>`;
  }

  /* ---------- FIDELIDADE ---------- */
  function fidelidadeRender(){
    const f=DATA.fidelidade;
    const kpis=`<div class="grid g-4" style="margin-bottom:var(--gap)">
      ${kpiCard({label:'Membros do clube',value:f.membros,delta:14,icon:'gift',tone:'violet',fmt:fmt.num})}
      ${kpiCard({label:'Pontos distribuídos',value:1284,delta:9,icon:'star',tone:'warning',fmt:v=>v+'k'})}
      ${kpiCard({label:'Cashback acumulado',value:f.cashbackAcumulado,delta:22,icon:'dollar-sign',tone:'success',fmt:fmt.moneyK})}
      ${kpiCard({label:'Resgates no mês',value:f.resgates,delta:6,icon:'repeat',tone:'primary',fmt:fmt.num})}
    </div>`;
    const niveis=f.niveis.map(n=>`<div class="lrow"><div class="av-circ" style="background:${n.cor}">${icon('star',{size:16})}</div>
      <div class="grow"><b>${n.nome}</b><div class="bar" style="margin-top:6px"><i style="width:${n.membros/f.membros*100}%;background:${n.cor}"></i></div></div>
      <b class="num">${fmt.num(n.membros)}</b></div>`).join('');
    const benef=[
      {t:'Cashback de 5%',d:'Em todas as compras acima de R$ 300',ic:'dollar-sign',tone:'success'},
      {t:'Troca antecipada',d:'Desconto especial na renovação anual',ic:'repeat',tone:'primary'},
      {t:'Revisão gratuita',d:'Ajustes e limpeza sem custo por 12 meses',ic:'shield',tone:'info'},
      {t:'Acesso antecipado',d:'Novas coleções antes do lançamento',ic:'star',tone:'violet'},
    ].map(b=>`<div class="alert-item"><div class="ai t-${b.tone}">${icon(b.ic)}</div><div class="grow"><b>${b.t}</b><p>${b.d}</p></div></div>`).join('');

    return `<div class="page">
      ${pageHead('Clube & Fidelidade','Programa de pontos, cashback e clube de benefícios — aumente a recorrência e o LTV.',{crumbs:['Experiência+'],actions:`
        <button class="btn ghost">${icon('settings')}<span class="hide-sm">Regras</span></button>
        <button class="btn primary" onclick="toast('Novo membro adicionado','success')">${icon('user-plus')} Novo membro</button>`})}
      ${kpis}
      <div class="grid g-3" style="margin-bottom:var(--gap)">
        ${panel({title:'Distribuição por nível',sub:'Membros por categoria',icon:'award',tone:'warning',body:`<div class="col" style="gap:4px">${niveis}</div>`})}
        ${panel({title:'Cartão de fidelidade',sub:'Identidade do clube',icon:'gift',tone:'violet',body:`
          <div class="card pad" style="background:var(--brand-grad);color:#fff;border:none;position:relative;overflow:hidden;min-height:150px">
            <div style="position:absolute;inset:0;background:radial-gradient(circle at 85% 15%,rgba(255,255,255,.3),transparent 55%)"></div>
            <div class="row between"><b style="font-size:15px">Clube Redentora</b>${icon('star')}</div>
            <div class="mono" style="letter-spacing:2px;margin-top:38px;font-size:15px">•••• •••• •••• 2048</div>
            <div class="row between center mt-2"><div><div style="opacity:.8;font-size:10px">MEMBRO</div><b>Patrícia Gomes</b></div><span class="badge" style="background:rgba(255,255,255,.2);color:#fff;border:none">Diamante</span></div></div>
          <div class="mini-metrics mt-2"><div class="mm"><div class="l">Pontos</div><div class="v">4.820</div></div><div class="mm"><div class="l">Cashback</div><div class="v">R$ 214</div></div></div>`})}
        ${panel({title:'Benefícios do clube',sub:'Vantagens ativas',icon:'heart',tone:'danger',body:`<div class="col" style="gap:10px">${benef}</div>`})}
      </div>
      ${panel({title:'Engajamento do programa',sub:'Membros ativos x recompensas resgatadas',icon:'activity',tone:'success',body:Charts.groupedBars(['Fev','Mar','Abr','Mai','Jun','Jul'],[
        {name:'Novos membros',color:'var(--c3)',data:[180,220,260,310,380,420]},
        {name:'Resgates',color:'var(--c4)',data:[90,120,140,180,220,280]},
      ],{h:230,yFmt:v=>fmt.num(v)})})}
    </div>`;
  }

  App.register('prova',{render:provaRender});
  App.register('catalogo',{render:catalogoRender});
  App.register('fidelidade',{render:fidelidadeRender});
})();
