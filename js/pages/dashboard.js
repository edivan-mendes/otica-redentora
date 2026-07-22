/* =============================================================
   Dashboard — Centro de Comando (Ótica Redentora)
   Estado inicial: sistema zerado, pronto para os cadastros.
   ============================================================= */
(function(){
  const m0 = v => fmt.money(v,0);
  const getHidden = ()=>{ try{return JSON.parse(localStorage.getItem('oc-dash-hidden')||'[]')}catch(e){return[]} };

  function render(){
    const k=DATA.kpis, meta=DATA.metaMes, cmd=DATA.comando;

    /* passos de primeiros cadastros */
    const passos=[
      {t:'Cadastrar produtos', d:'Armações, lentes e acessórios', ic:'glasses', route:'produtos', ok:DATA.armacoes.length+DATA.lentes.length>0},
      {t:'Cadastrar clientes', d:'Base de clientes e receitas', ic:'users', route:'clientes', ok:DATA.clientes.length>0},
      {t:'Cadastrar a equipe', d:'Vendedores, óticos e metas', ic:'user-plus', route:'funcionarios', ok:DATA.funcionarios.length>0},
      {t:'Registrar a primeira venda', d:'Use o PDV', ic:'shopping-cart', route:'vendas', ok:DATA.ordens.length>0},
    ];
    const feitos=passos.filter(p=>p.ok).length;

    /* ---- CENTRO DE COMANDO ---- */
    const cmdCenter = `<div data-sec="comando" class="cmd-center customizable reveal">
      <div class="cc-left">
        <div class="breadcrumb" style="margin-bottom:4px"><span class="cur">Centro de Comando</span></div>
        <h1>${cmd.saudacao} à Ótica Redentora. 👋</h1>
        <p class="cc-sub">Seu sistema está pronto — comece cadastrando os dados da sua ótica.</p>
        <div class="cc-meta" style="margin-top:16px">
          <div><div class="cc-small">Receita do dia</div><div class="cc-big"><span class="count" data-count="0" data-fmt="money0">R$ 0</span></div></div>
          <div class="f-1" style="min-width:160px"><div class="row between" style="margin-bottom:6px"><span class="cc-small">Meta do mês</span><b class="num">${cmd.metaPct}%</b></div><div class="wbar"><i style="width:${cmd.metaPct}%;background:var(--brand-grad)"></i></div></div>
        </div>
        <div class="cc-actions">
          <button class="btn primary" onclick="App.quickAction('venda')">${icon('shopping-cart')} Nova Venda</button>
          <button class="btn ghost" onclick="App.go('produtos')">${icon('glasses')} Cadastrar Produto</button>
          <button class="btn ghost" onclick="App.quickAction('cliente')">${icon('user-plus')} Novo Cliente</button>
          <button class="btn ghost" onclick="App.go('agenda')">${icon('calendar')} Agenda</button>
        </div>
      </div>
      <div class="cc-right">
        <div class="cc-ai-head"><div class="ci t-violet" style="width:34px;height:34px;border-radius:10px;display:grid;place-items:center">${icon('check-circle')}</div><div><b style="font-family:var(--font-display);font-size:15px">Primeiros passos</b><div class="cc-small">${feitos} de ${passos.length} concluídos</div></div></div>
        <div class="bar" style="margin:10px 0 14px"><i style="width:${Math.round(feitos/passos.length*100)}%"></i></div>
        <div class="cc-cascade">
          ${passos.map(p=>`<div class="cc-rec" onclick="App.go('${p.route}')" style="cursor:pointer">
            <div class="rci t-${p.ok?'success':'primary'}">${icon(p.ok?'check':p.ic)}</div>
            <div class="grow"><b style="${p.ok?'text-decoration:line-through;opacity:.6':''}">${p.t}</b><p>${p.d}</p></div>${icon('chevron-right','muted')}</div>`).join('')}
        </div>
        <button class="btn soft block" style="margin-top:14px" onclick="App.openCopilot()">${icon('sparkles')} Abrir Copiloto IA</button>
      </div>
    </div>`;

    /* ---- widgets visuais (zerados) ---- */
    const widgets = `<div data-sec="widgets" class="widget-row" style="margin-bottom:var(--gap)">`+[
      {label:'Receita do mês', ic:'dollar-sign', tone:'success', sub:'<span class="muted">sem vendas ainda</span>', bar:0},
      {label:'Meta do mês', ic:'target', tone:'primary', sub:'<span class="muted">defina em Configurações</span>', bar:0},
      {label:'OS em produção', ic:'clipboard-list', tone:'info', sub:'<span class="muted">nenhuma ordem</span>', bar:0},
      {label:'Clientes', ic:'users', tone:'violet', sub:'<span class="muted">base vazia</span>', bar:null},
      {label:'Estoque crítico', ic:'package', tone:'warning', sub:semaforo('ok','tudo em ordem'), bar:null},
    ].map(w=>`<div class="widget reveal"><div class="wtop"><div class="wlab">${w.label}</div><div class="wic t-${w.tone}">${icon(w.ic)}</div></div><div class="wval"><span class="count" data-count="0" data-fmt="int">0</span></div><div class="wsub">${w.sub}</div>${w.bar!=null?`<div class="wbar"><i style="width:${w.bar}%;background:var(--${w.tone})"></i></div>`:''}</div>`).join('')+`</div>`;

    /* ---- KPI grids ---- */
    const kpis = `<div data-sec="kpis"><div class="grid g-4" style="margin-bottom:var(--gap)">
      ${kpiCard({label:'Vendas do mês', value:k.vendasMes.v, delta:0, icon:'trending-up', tone:'success', cfmt:'moneyk'})}
      ${kpiCard({label:'Ticket médio', value:k.ticket.v, delta:0, icon:'shopping-bag', tone:'info', cfmt:'money0'})}
      ${kpiCard({label:'Margem', value:0, delta:0, icon:'percent', tone:'violet', cfmt:'pct1'})}
      ${kpiCard({label:'Taxa de conversão', value:k.conversao.v, delta:0, icon:'target', tone:'primary', cfmt:'pct1'})}
    </div>
    <div class="grid g-4" style="margin-bottom:var(--gap)">
      ${kpiCard({label:'OS em produção', value:k.osProducao.v, delta:0, icon:'clipboard-list', tone:'primary', cfmt:'int'})}
      ${kpiCard({label:'Aguardando retirada', value:k.aguardando.v, delta:0, icon:'clock', tone:'warning', cfmt:'int'})}
      ${kpiCard({label:'Clientes novos', value:k.clientesNovos.v, delta:0, icon:'user-plus', tone:'success', cfmt:'int'})}
      ${kpiCard({label:'Giro de estoque', value:k.giroEstoque.v, delta:0, icon:'repeat', tone:'info', cfmt:'decx'})}
    </div></div>`;

    /* ---- gráficos (mostram "sem dados" via guards) ---- */
    const fat=DATA.faturamento12;
    const fatChart = Charts.area(fat.labels, [
      {name:'Realizado', color:'var(--c1)', data:fat.real.map(v=>v*1000)},
      {name:'Meta', color:'var(--danger)', data:fat.meta.map(v=>v*1000), dash:true},
    ], {h:290});
    const gaugeCard = `<div class="card reveal" style="display:flex;flex-direction:column">
      <div class="card-head"><div class="card-title-ico"><div class="ci t-success">${icon('target')}</div><div><h3>Meta x Realizado</h3><div class="sub">defina sua meta mensal</div></div></div></div>
      <div class="card-body" style="display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;justify-content:center">
        ${Charts.gauge(meta.realizado, meta.meta, {label:'da meta atingida'})}
        <div class="row" style="width:100%;gap:10px;margin-top:12px">
          <div class="stat-inline f-1"><span class="v">${fmt.moneyK(meta.realizado)}</span><span class="l">Realizado</span></div>
          <div class="stat-inline f-1"><span class="v">${fmt.moneyK(meta.meta)}</span><span class="l">Meta do mês</span></div>
        </div>
      </div></div>`;

    const payTotal = DATA.pagamentos.reduce((a,s)=>a+s.v,0)||1;
    const payDonut = Charts.donut(DATA.pagamentos, {size:150, center:`<div class="rv" style="font-size:15px">${fmt.moneyK(0)}</div><div class="rl">recebido</div>`});
    const payLegend = `<div class="legend">${DATA.pagamentos.map(s=>`<div class="li"><span class="sw" style="background:${s.c}"></span>${s.label}<span class="lv">${Math.round(s.v/payTotal*100)}%</span></div>`).join('')}</div>`;
    const mixDonut = Charts.donut(DATA.mixCategoria, {size:150, center:`<div class="rl">sem dados</div>`});
    const mixLegend = `<div class="legend">${DATA.mixCategoria.map(s=>`<div class="li"><span class="sw" style="background:${s.c}"></span>${s.label}<span class="lv">${s.v}%</span></div>`).join('')}</div>`;

    const heat = Charts.heatmap(DATA.heatmap.dias, DATA.heatmap.horas, DATA.heatmap.data);
    const fluxo = Charts.groupedBars(DATA.fluxoCaixa.labels, [
      {name:'Entradas', color:'var(--c4)', data:DATA.fluxoCaixa.entradas},
      {name:'Saídas', color:'var(--c6)', data:DATA.fluxoCaixa.saidas},
    ], {h:230});
    const emptyBox = (ic,t)=>`<div class="empty" style="padding:32px 16px">${icon(ic)}<p style="margin-top:6px">${t}</p></div>`;

    return `<div class="page">
      ${pageHead('Dashboard', null, {actions:`
        <div class="segmented"><button>Hoje</button><button class="active">Mês</button><button>Trimestre</button><button>Ano</button></div>
        <button class="btn ghost hide-sm" onclick="dashCustomize()">${icon('sliders')} Personalizar</button>
        <button class="btn primary" onclick="App.go('vendas')">${icon('plus')} Nova venda</button>`})}
      ${cmdCenter}
      ${widgets}
      ${kpis}
      <div class="grid g-3" data-sec="metas" style="margin-bottom:var(--gap)">
        ${panel({title:'Faturamento por período', sub:'Últimos 12 meses', icon:'bar-chart-3', cls:'span-2',
          body:`${fatChart}`})}
        ${gaugeCard}
      </div>
      <div class="grid g-3" data-sec="mix" style="margin-bottom:var(--gap)">
        ${panel({title:'Ranking de vendedores', sub:'Meta x realizado no mês', icon:'award', tone:'warning',
          body:emptyBox('award','Nenhuma venda registrada ainda.')})}
        ${panel({title:'Mix por categoria', sub:'Participação nas vendas', icon:'pie-chart', tone:'violet',
          body:`<div class="row center" style="gap:18px"><div>${mixDonut}</div><div class="f-1">${mixLegend}</div></div>`})}
        ${panel({title:'Formas de pagamento', sub:'Recebimentos do mês', icon:'credit-card', tone:'info',
          body:`<div class="row center" style="gap:18px"><div>${payDonut}</div><div class="f-1">${payLegend}</div></div>`})}
      </div>
      <div class="grid g-3" data-sec="operacao" style="margin-bottom:var(--gap)">
        ${panel({title:'Mapa de calor de vendas', sub:'Volume por dia e horário', icon:'activity', tone:'danger',
          body:`${heat}`})}
        ${panel({title:'Produtos mais vendidos', sub:'Top do mês', icon:'glasses', tone:'primary', cls:'span-2',
          actions:`<button class="btn sm ghost" onclick="App.go('produtos')">Produtos</button>`,
          body:emptyBox('glasses','Cadastre produtos e registre vendas para ver o ranking.')})}
      </div>
      <div class="grid g-3" data-sec="financeiro" style="margin-bottom:var(--gap)">
        ${panel({title:'Fluxo de caixa', sub:'Entradas x Saídas', icon:'wallet', tone:'success', cls:'span-2',
          actions:`<button class="btn sm ghost" onclick="App.go('financeiro')">Detalhar</button>`,
          body:`${fluxo}`})}
        ${panel({title:'Base de clientes', sub:'Novos x Recorrentes', icon:'users', tone:'violet',
          body:emptyBox('users','Nenhum cliente cadastrado ainda.')})}
      </div>
      <div class="grid g-2" data-sec="alertas">
        ${panel({title:'Alertas importantes', sub:'Priorizados por impacto', icon:'alert-triangle', tone:'danger',
          body:emptyBox('check-circle','Tudo em ordem — nenhum alerta no momento.')})}
        ${panel({title:'Central de inteligência', sub:'Insights da Redentora IA', icon:'sparkles', tone:'violet',
          actions:`<button class="btn sm soft" onclick="App.openCopilot()">${icon('sparkles')} Copiloto</button>`,
          body:emptyBox('sparkles','Cadastre e venda para a IA gerar insights automáticos.')})}
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
    const emptyBox = (ic,t)=>`<div class="empty" style="padding:36px 16px">${icon(ic)}<p style="margin-top:6px">${t}</p></div>`;
    return `<div class="exec-view">
      <div class="exec-topbar">
        <div class="et-brand"><div class="logo"><img src="assets/logo-redentora.png" alt="Ótica Redentora"></div>
          <div><b style="font-family:var(--font-display);font-size:16px">Modo Executivo</b><div class="muted" style="font-size:12px">${DATA.user.loja}</div></div></div>
        <div class="row gap-xs"><button class="btn ghost sm" onclick="App.toggleTheme()">${icon('moon')}</button><button class="btn primary sm" onclick="App.exitExec()">${icon('x')} Sair</button></div>
      </div>
      <div class="exec-board">
        <div class="grid g-4" style="margin-bottom:var(--gap)">
          ${big('Receita do mês', fmt.moneyK(f.receita),'success','—')}
          ${big('Lucro líquido', fmt.moneyK(f.lucro),'primary','—')}
          ${big('Meta atingida', (meta.meta?Math.round(meta.realizado/meta.meta*100):0)+'%','violet','—')}
          ${big('Saldo em caixa', fmt.moneyK(f.saldo),'info','—')}
        </div>
        <div class="grid g-3" style="margin-bottom:var(--gap)">
          ${panel({title:'Faturamento — 12 meses', icon:'bar-chart-3', tone:'primary', cls:'span-2', body:Charts.area(fat.labels,[{name:'Realizado',color:'var(--c1)',data:fat.real.map(v=>v*1000)},{name:'Meta',color:'var(--danger)',data:fat.meta.map(v=>v*1000),dash:true}],{h:300})})}
          ${panel({title:'Meta do mês', icon:'target', tone:'success', body:`<div class="col center" style="align-items:center">${Charts.gauge(meta.realizado,meta.meta,{label:'realizado'})}</div>`})}
        </div>
        <div class="grid g-3">
          ${panel({title:'Ranking de vendedores', icon:'award', tone:'warning', cls:'span-2', body:emptyBox('award','Sem vendas registradas ainda.')})}
          ${panel({title:'Formas de pagamento', icon:'credit-card', tone:'info', body:emptyBox('credit-card','Sem recebimentos ainda.')})}
        </div>
      </div>
    </div>`;
  }
  App.register('executivo', { render: execRender });
})();
