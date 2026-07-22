/* =============================================================
   Dashboard Executivo — centro de comando (a vitrine do Ótica Redentora)
   ============================================================= */
(function(){
  const m0 = v => fmt.money(v,0);
  const getHidden = ()=>{ try{return JSON.parse(localStorage.getItem('oc-dash-hidden')||'[]')}catch(e){return[]} };

  function render(){
    const k=DATA.kpis, meta=DATA.metaMes, cmd=DATA.comando;

    /* ---- CENTRO DE COMANDO INTELIGENTE ---- */
    const cmdCenter = `<div data-sec="comando" class="cmd-center customizable reveal">
      <div class="cc-left">
        <div class="breadcrumb" style="margin-bottom:4px"><span class="cur">Centro de Comando</span></div>
        <h1>${cmd.saudacao}, ${DATA.user.nome.split(' ')[0]}. 👋</h1>
        <p class="cc-sub">Aqui está tudo o que precisa da sua atenção hoje.</p>
        <div class="cc-status">
          ${DATA.comandoStatus.map(s=>`<div class="cc-stat" onclick="App.go('${s.route}')"><span class="cdot ${s.sev}"></span><b>${s.n}</b> ${s.txt}</div>`).join('')}
        </div>
        <div class="cc-meta">
          <div><div class="cc-small">Receita prevista hoje</div><div class="cc-big"><span class="count" data-count="18240" data-fmt="money0">R$ 0</span></div></div>
          <div class="f-1" style="min-width:160px"><div class="row between" style="margin-bottom:6px"><span class="cc-small">Meta do mês</span><b class="num">${cmd.metaPct}%</b></div><div class="wbar"><i style="width:${cmd.metaPct}%;background:var(--brand-grad)"></i></div></div>
        </div>
        <div class="cc-actions">
          <button class="btn primary" onclick="App.quickAction('venda')">${icon('shopping-cart')} Nova Venda</button>
          <button class="btn ghost" onclick="App.quickAction('os')">${icon('clipboard-list')} Nova OS</button>
          <button class="btn ghost" onclick="App.quickAction('cliente')">${icon('user-plus')} Novo Cliente</button>
          <button class="btn ghost" onclick="App.go('agenda')">${icon('calendar')} Agenda</button>
        </div>
      </div>
      <div class="cc-right">
        <div class="cc-ai-head"><div class="ci t-violet" style="width:34px;height:34px;border-radius:10px;display:grid;place-items:center">${icon('sparkles')}</div><div><b style="font-family:var(--font-display);font-size:15px">IA recomenda</b><div class="cc-small">${DATA.iaRecomenda.length} ações prioritárias hoje</div></div></div>
        <div class="cc-cascade">
          ${DATA.iaRecomenda.map(r=>`<div class="cc-rec"><div class="rci t-${r.tone}">${icon(r.ico)}</div><div class="grow"><b>${r.t}</b><p>${r.d}</p><span class="rc-cta" onclick="App.go('${r.route}')">${r.cta} ${icon('arrow-right')}</span></div></div>`).join('')}
        </div>
        <button class="btn soft block" style="margin-top:14px" onclick="App.openCopilot()">${icon('sparkles')} Abrir Copiloto IA</button>
      </div>
    </div>`;

    /* ---- KPI grids (com count-up) ---- */
    const kpis = `<div data-sec="kpis"><div class="grid g-4" style="margin-bottom:var(--gap)">
      ${kpiCard({label:'Vendas do mês', value:k.vendasMes.v, delta:k.vendasMes.delta, icon:'trending-up', tone:'success', spark:k.vendasMes.spark, cfmt:'moneyk', sub:'julho/2026'})}
      ${kpiCard({label:'Ticket médio', value:k.ticket.v, delta:k.ticket.delta, icon:'shopping-bag', tone:'info', spark:k.ticket.spark, cfmt:'money0'})}
      ${kpiCard({label:'Margem', value:57.2, delta:2.1, icon:'percent', tone:'violet', cfmt:'pct1', sub:'consolidada'})}
      ${kpiCard({label:'Taxa de conversão', value:k.conversao.v, delta:k.conversao.delta, icon:'target', tone:'primary', spark:k.conversao.spark, cfmt:'pct1'})}
    </div>
    <div class="grid g-4" style="margin-bottom:var(--gap)">
      ${kpiCard({label:'OS em produção', value:k.osProducao.v, delta:k.osProducao.delta, icon:'clipboard-list', tone:'primary', spark:k.osProducao.spark, cfmt:'int', sub:'no laboratório'})}
      ${kpiCard({label:'Aguardando retirada', value:k.aguardando.v, delta:k.aguardando.delta, icon:'clock', tone:'warning', spark:k.aguardando.spark, cfmt:'int', sub:'óculos prontos'})}
      ${kpiCard({label:'Clientes novos', value:k.clientesNovos.v, delta:k.clientesNovos.delta, icon:'user-plus', tone:'success', spark:k.clientesNovos.spark, cfmt:'int', sub:'no mês'})}
      ${kpiCard({label:'Giro de estoque', value:k.giroEstoque.v, delta:k.giroEstoque.delta, icon:'repeat', tone:'info', spark:k.giroEstoque.spark, cfmt:'decx', sub:'anualizado'})}
    </div></div>`;

    /* ---- Faturamento + meta gauge ---- */
    const fat=DATA.faturamento12;
    const fatChart = Charts.area(fat.labels, [
      {name:'Realizado', color:'var(--c1)', data:fat.real.map(v=>v*1000)},
      {name:'Meta', color:'var(--danger)', data:fat.meta.map(v=>v*1000), dash:true},
      {name:'Ano anterior', color:'var(--faint)', data:fat.ano_ant.map(v=>v*1000), dash:true},
    ], {h:290});
    const gaugeCard = `<div class="card reveal" style="display:flex;flex-direction:column">
      <div class="card-head"><div class="card-title-ico"><div class="ci t-success">${icon('target')}</div><div><h3>Meta x Realizado</h3><div class="sub">${meta.diasRestantes} dias restantes</div></div></div></div>
      <div class="card-body" style="display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;justify-content:center">
        ${Charts.gauge(meta.realizado, meta.meta, {label:'da meta atingida'})}
        <div class="row" style="width:100%;gap:10px;margin-top:12px">
          <div class="stat-inline f-1"><span class="v">${fmt.moneyK(meta.realizado)}</span><span class="l">Realizado</span></div>
          <div class="stat-inline f-1"><span class="v">${fmt.moneyK(meta.meta)}</span><span class="l">Meta do mês</span></div>
        </div>
        <div class="insight ai wfull mt-2"><div class="tag-ai">${icon('sparkles')} Projeção IA</div>
          <p>No ritmo atual, o fechamento projetado é <b>${fmt.moneyK(meta.projecao)}</b> — <span class="pos-txt">2,8% acima da meta</span>.</p></div>
      </div></div>`;

    /* ---- Ranking ---- */
    const rank = DATA.vendedores.map((v,i)=>`
      <div class="lrow">
        <div class="rank ${i<3?'g'+(i+1):''}">${i+1}</div>${avatar(v.nome,{size:38})}
        <div class="grow"><b>${v.nome}</b><small>Conv. ${v.conv}% · ${v.os} OS · Ticket ${m0(v.tkt)}</small>
          <div class="bar ${v.vendas>=v.meta?'success':'warning'}" style="margin-top:7px"><i style="width:${Math.min(v.vendas/v.meta*100,100)}%"></i></div></div>
        <div style="text-align:right"><b class="num" style="font-size:14px">${fmt.moneyK(v.vendas)}</b><div>${trend(v.delta)}</div></div>
      </div>`).join('');

    /* ---- Donuts ---- */
    const mixDonut = Charts.donut(DATA.mixCategoria, {size:150, center:`<div class="rv" style="font-size:16px">${DATA.mixCategoria[0].v}%</div><div class="rl">Armações</div>`});
    const mixLegend = `<div class="legend">${DATA.mixCategoria.map(s=>`<div class="li"><span class="sw" style="background:${s.c}"></span>${s.label}<span class="lv">${s.v}%</span></div>`).join('')}</div>`;
    const payTotal = DATA.pagamentos.reduce((a,s)=>a+s.v,0);
    const payDonut = Charts.donut(DATA.pagamentos, {size:150, center:`<div class="rv" style="font-size:15px">${fmt.moneyK(payTotal)}</div><div class="rl">recebido</div>`});
    const payLegend = `<div class="legend">${DATA.pagamentos.map(s=>`<div class="li"><span class="sw" style="background:${s.c}"></span>${s.label}<span class="lv">${Math.round(s.v/payTotal*100)}%</span></div>`).join('')}</div>`;

    /* ---- Produtos ---- */
    const prodRows = DATA.produtosTop.map(p=>`
      <tr><td><div class="cell-user"><div class="av-circ av-sq t-primary" style="width:34px;height:34px;background:var(--primary-soft);color:var(--primary)">${icon('glasses')}</div><div><b>${p.nome}</b><span>${p.cat}</span></div></div></td>
      <td class="td-c"><b class="num">${p.un}</b></td><td class="td-r"><b class="num">${m0(p.fat)}</b></td><td class="td-r">${trend(p.delta)}</td></tr>`).join('');

    const heat = Charts.heatmap(DATA.heatmap.dias, DATA.heatmap.horas, DATA.heatmap.data);
    const fluxo = Charts.groupedBars(DATA.fluxoCaixa.labels, [
      {name:'Entradas', color:'var(--c4)', data:DATA.fluxoCaixa.entradas},
      {name:'Saídas', color:'var(--c6)', data:DATA.fluxoCaixa.saidas},
    ], {h:230});
    const totalCli=DATA.kpis.clientesNovos.v+DATA.kpis.clientesRecorr.v;
    const cliRing = Charts.ring(Math.round(DATA.kpis.clientesRecorr.v/totalCli*100),{size:130,label:'recorrentes',color:'var(--c3)'});
    const alertas = DATA.alertas.map(a=>`<div class="alert-item"><div class="ai t-${a.tipo}">${icon(a.ico)}</div><div class="grow"><b>${a.titulo}</b><p>${a.txt}</p></div>${icon('chevron-right','')}</div>`).join('');
    const insights = DATA.insights.map(i=>`<div class="insight ai"><div class="tag-ai">${icon('sparkles')} Insight automático</div><h5>${i.t}</h5><p>${i.d}</p></div>`).join('');

    /* ---- widgets visuais (números grandes + barras) ---- */
    const widgets = `<div data-sec="widgets" class="widget-row" style="margin-bottom:var(--gap)">`+[
      {label:'Receita do mês', raw:487320, cfmt:'moneyk', ic:'dollar-sign', tone:'success', sub:trend(12)+'<span class="muted">vs. anterior</span>', bar:82},
      {label:'Meta do mês', raw:640000, cfmt:'moneyk', ic:'target', tone:'primary', sub:'<span class="muted">faltam R$ 153k · 8 dias</span>', bar:82},
      {label:'OS em produção', raw:64, cfmt:'int', ic:'clipboard-list', tone:'info', sub:'<span class="badge danger" style="font-size:10px">3 atrasadas</span>', bar:68},
      {label:'Clientes novos', raw:128, cfmt:'int', ic:'user-plus', tone:'violet', sub:trend(15)+'<span class="muted">este mês</span>', bar:null},
      {label:'Estoque crítico', raw:8, cfmt:'int', ic:'package', tone:'warning', sub:semaforo('warn','itens abaixo do mínimo'), bar:null},
    ].map(w=>`<div class="widget reveal"><div class="wtop"><div class="wlab">${w.label}</div><div class="wic t-${w.tone}">${icon(w.ic)}</div></div><div class="wval"><span class="count" data-count="${w.raw}" data-fmt="${w.cfmt}">0</span></div><div class="wsub">${w.sub}</div>${w.bar!=null?`<div class="wbar"><i style="width:${w.bar}%;background:var(--${w.tone})"></i></div>`:''}</div>`).join('')+`</div>`;

    return `<div class="page">
      ${pageHead('Dashboard Executivo', null, {actions:`
        <div class="segmented"><button>Hoje</button><button class="active">Mês</button><button>Trimestre</button><button>Ano</button></div>
        <button class="btn ghost hide-sm" onclick="dashCustomize()">${icon('sliders')} Personalizar</button>
        <button class="btn primary" onclick="App.go('vendas')">${icon('plus')} Nova venda</button>`})}
      ${cmdCenter}
      ${widgets}
      ${kpis}
      <div class="grid g-3" data-sec="metas" style="margin-bottom:var(--gap)">
        ${panel({title:'Faturamento por período', sub:'Últimos 12 meses · Realizado vs Meta vs Ano anterior', icon:'bar-chart-3', cls:'span-2',
          actions:`<span class="badge success dot">+8,7% no mês</span>`,
          body:`${fatChart}<div class="chart-legend"><span class="cl"><span class="sw" style="background:var(--c1)"></span>Realizado</span><span class="cl"><span class="sw" style="background:var(--danger)"></span>Meta</span><span class="cl"><span class="sw" style="background:var(--faint)"></span>Ano anterior</span></div>`})}
        ${gaugeCard}
      </div>
      <div class="grid g-3" data-sec="mix" style="margin-bottom:var(--gap)">
        ${panel({title:'Ranking de vendedores', sub:'Meta x realizado no mês', icon:'award', tone:'warning',
          actions:`<button class="btn sm ghost" onclick="App.go('bi')">Ver todos</button>`, body:rank})}
        ${panel({title:'Mix por categoria', sub:'Participação nas vendas', icon:'pie-chart', tone:'violet',
          body:`<div class="row center" style="gap:18px"><div>${mixDonut}</div><div class="f-1">${mixLegend}</div></div>`})}
        ${panel({title:'Formas de pagamento', sub:'Recebimentos do mês', icon:'credit-card', tone:'info',
          body:`<div class="row center" style="gap:18px"><div>${payDonut}</div><div class="f-1">${payLegend}</div></div>`})}
      </div>
      <div class="grid g-3" data-sec="operacao" style="margin-bottom:var(--gap)">
        ${panel({title:'Mapa de calor de vendas', sub:'Volume por dia e horário', icon:'activity', tone:'danger',
          body:`${heat}<div class="chart-legend mt-2"><span class="cl">Menos</span><span class="sw" style="width:52px;height:9px;border-radius:4px;background:linear-gradient(90deg,rgba(47,107,255,.12),rgba(47,107,255,1))"></span><span class="cl">Mais</span><span class="muted" style="margin-left:auto">Pico: Sáb 16h</span></div>`})}
        ${panel({title:'Produtos mais vendidos', sub:'Top 6 do mês', icon:'glasses', tone:'primary', cls:'span-2',
          actions:`<button class="btn sm ghost" onclick="App.go('relatorios')">Relatório</button>`,
          body:`<div class="table-wrap"><table class="data"><thead><tr><th>Produto</th><th class="td-c">Unid.</th><th class="td-r">Faturamento</th><th class="td-r">Tend.</th></tr></thead><tbody>${prodRows}</tbody></table></div>`, pad:false})}
      </div>
      <div class="grid g-3" data-sec="financeiro" style="margin-bottom:var(--gap)">
        ${panel({title:'Fluxo de caixa', sub:'Entradas x Saídas · julho', icon:'wallet', tone:'success', cls:'span-2',
          actions:`<button class="btn sm ghost" onclick="App.go('financeiro')">Detalhar</button>`,
          body:`${fluxo}<div class="chart-legend"><span class="cl"><span class="sw" style="background:var(--c4)"></span>Entradas</span><span class="cl"><span class="sw" style="background:var(--c6)"></span>Saídas</span><span style="margin-left:auto" class="badge success">Saldo +R$ 104k</span></div>`})}
        ${panel({title:'Base de clientes', sub:'Novos x Recorrentes', icon:'users', tone:'violet',
          body:`<div class="col center" style="align-items:center;gap:14px">${cliRing}<div class="row wfull" style="gap:10px"><div class="stat-inline f-1"><span class="v" style="color:var(--success)">${fmt.num(DATA.kpis.clientesNovos.v)}</span><span class="l">Novos no mês</span></div><div class="stat-inline f-1"><span class="v" style="color:var(--violet)">${fmt.num(DATA.kpis.clientesRecorr.v)}</span><span class="l">Recorrentes</span></div></div></div>`})}
      </div>
      <div class="grid g-2" data-sec="alertas">
        ${panel({title:'Alertas importantes', sub:'Priorizados por impacto', icon:'alert-triangle', tone:'danger',
          actions:`<span class="badge danger">5 novos</span>`, body:`<div class="col" style="gap:10px">${alertas}</div>`})}
        ${panel({title:'Central de inteligência', sub:'Insights da Redentora IA', icon:'sparkles', tone:'violet',
          actions:`<button class="btn sm soft" onclick="App.go('ia')">${icon('sparkles')} Ver IA</button>`, body:`<div class="grid g-2" style="gap:12px">${insights}</div>`})}
      </div>
    </div>`;
  }

  function applyHidden(){ const h=getHidden(); document.querySelectorAll('#view [data-sec]').forEach(el=>el.classList.toggle('dash-hidden', h.includes(el.dataset.sec))); }

  const SECTIONS=[['comando','Centro de Comando'],['widgets','Widgets visuais'],['kpis','Indicadores (KPIs)'],['metas','Metas & Faturamento'],['mix','Ranking & Mix'],['operacao','Operação & Produtos'],['financeiro','Fluxo & Clientes'],['alertas','Alertas & Insights']];
  window.dashCustomize=function(){
    const h=getHidden();
    openModal(`<div class="modal-head"><div class="card-title-ico"><div class="ci t-primary">${icon('sliders')}</div><div><h3>Personalizar dashboard</h3><div class="sub">Escolha os blocos visíveis</div></div></div><button class="icon-btn" onclick="closeModal()">${icon('x')}</button></div>
      <div class="card-body"><div class="col" style="gap:2px">${SECTIONS.map(s=>`
        <div class="lrow"><div class="grow"><b>${s[1]}</b></div><div class="switch ${h.includes(s[0])?'':'on'}" onclick="dashToggleSec('${s[0]}',this)"></div></div>`).join('')}</div>
        <p class="muted mt-2" style="font-size:12px">${icon('info',{size:14})} As preferências ficam salvas neste dispositivo.</p></div>`);
  };
  window.dashToggleSec=function(id,el){
    el.classList.toggle('on');
    let h=getHidden(); const on=el.classList.contains('on');
    if(on) h=h.filter(x=>x!==id); else if(!h.includes(id)) h.push(id);
    localStorage.setItem('oc-dash-hidden', JSON.stringify(h));
    applyHidden();
  };

  App.register('dashboard', { render, onMount(){ applyHidden(); } });

  /* ================= MODO EXECUTIVO ================= */
  function execRender(){
    const meta=DATA.metaMes, f=DATA.finKpis, fat=DATA.faturamento12;
    const big=(l,v,tone,sub)=>`<div class="card pad reveal" style="border-top:3px solid var(--${tone})"><div class="muted" style="font-size:13px;font-weight:600">${l}</div><div class="exec-big" style="font-size:38px;margin-top:8px;color:var(--${tone})">${v}</div><div class="muted" style="font-size:12px;margin-top:4px">${sub}</div></div>`;
    const rank=DATA.vendedores.slice(0,5).map((v,i)=>`<div class="lrow"><div class="rank ${i<3?'g'+(i+1):''}">${i+1}</div>${avatar(v.nome,{size:34})}<div class="grow"><b>${v.nome}</b></div><b class="num">${fmt.moneyK(v.vendas)}</b></div>`).join('');
    return `<div class="exec-view">
      <div class="exec-topbar">
        <div class="et-brand"><div class="logo"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><circle cx="8" cy="14" r="3.6"/><circle cx="16" cy="14" r="3.6"/><path d="M11.6 14a1.4 1.4 0 0 1 1.2-.8 1.4 1.4 0 0 1 1.2.8"/></svg></div>
          <div><b style="font-family:var(--font-display);font-size:16px">Modo Executivo</b><div class="muted" style="font-size:12px">${DATA.user.loja} · Julho 2026</div></div></div>
        <div class="row gap-xs"><button class="btn ghost sm" onclick="App.toggleTheme()">${icon('moon')}</button><button class="btn primary sm" onclick="App.exitExec()">${icon('x')} Sair</button></div>
      </div>
      <div class="exec-board">
        <div class="grid g-4" style="margin-bottom:var(--gap)">
          ${big('Receita do mês', fmt.moneyK(f.receita),'success','+8,7% vs. anterior')}
          ${big('Lucro líquido', fmt.moneyK(f.lucro),'primary','margem 10,6%')}
          ${big('Meta atingida', Math.round(meta.realizado/meta.meta*100)+'%','violet',meta.diasRestantes+' dias restantes')}
          ${big('Saldo em caixa', fmt.moneyK(f.saldo),'info','fluxo saudável')}
        </div>
        <div class="grid g-3" style="margin-bottom:var(--gap)">
          ${panel({title:'Faturamento — 12 meses', icon:'bar-chart-3', tone:'primary', cls:'span-2', body:Charts.area(fat.labels,[{name:'Realizado',color:'var(--c1)',data:fat.real.map(v=>v*1000)},{name:'Meta',color:'var(--danger)',data:fat.meta.map(v=>v*1000),dash:true}],{h:300})})}
          ${panel({title:'Meta do mês', icon:'target', tone:'success', body:`<div class="col center" style="align-items:center">${Charts.gauge(meta.realizado,meta.meta,{label:'realizado'})}</div>`})}
        </div>
        <div class="grid g-2" style="margin-bottom:var(--gap)">
          ${panel({title:'Previsão de vendas (IA)', sub:'Projeção dos próximos 6 meses', icon:'sparkles', tone:'violet', body:Charts.area(DATA.previsaoVendas.labels,[{name:'Previsão IA',color:'var(--violet)',data:DATA.previsaoVendas.prev.map(v=>v*1000)},{name:'Cenário otimista',color:'var(--success)',data:DATA.previsaoVendas.max.map(v=>v*1000),dash:true},{name:'Realizado',color:'var(--c1)',data:DATA.previsaoVendas.real.map(v=>v==null?null:v*1000)}],{h:250})})}
          ${panel({title:'Comparativo anual', sub:'2026 vs 2025', icon:'activity', tone:'primary', body:Charts.area(fat.labels,[{name:'2026',color:'var(--c1)',data:fat.real.map(v=>v*1000)},{name:'2025',color:'var(--faint)',data:fat.ano_ant.map(v=>v*1000),dash:true}],{h:250,area:false})})}
        </div>
        <div class="grid g-3">
          ${panel({title:'Ranking de vendedores', icon:'award', tone:'warning', cls:'span-2', body:rank})}
          ${panel({title:'Formas de pagamento', icon:'credit-card', tone:'info', body:`<div class="col center" style="align-items:center">${Charts.donut(DATA.pagamentos,{size:150,center:'<div class="rv" style="font-size:14px">R$ 487k</div><div class="rl">recebido</div>'})}</div>`})}
        </div>
      </div>
    </div>`;
  }
  App.register('executivo', { render: execRender });
})();
