/* =============================================================
   Ótica Redentora — Shell, navegação e roteador (hash)
   ============================================================= */
const NAV = [
  { group:null, items:[
    { r:'dashboard', label:'Dashboard', icon:'layout-dashboard' },
  ]},
  { group:'Cadastros', items:[
    { r:'clientes', label:'Clientes', icon:'users' },
    { r:'medicos',  label:'Médicos',  icon:'stethoscope' },
    { r:'produtos', label:'Produtos', icon:'glasses' },
    { r:'fornecedores', label:'Fornecedores', icon:'truck' },
    { r:'funcionarios', label:'Funcionários', icon:'users' },
  ]},
  { group:'Comercial', items:[
    { r:'crm', label:'CRM & Campanhas', icon:'megaphone' },
    { r:'agenda', label:'Agenda', icon:'calendar' },
    { r:'vendas', label:'Vendas · PDV', icon:'shopping-cart' },
    { r:'fidelidade', label:'Clube & Fidelidade', icon:'gift' },
  ]},
  { group:'Produção', items:[
    { r:'os',     label:'Ordens de Serviço', icon:'clipboard-list' },
    { r:'laboratorios', label:'Laboratórios', icon:'flask' },
  ]},
  { group:'Estoque', items:[
    { r:'estoque',label:'Estoque', icon:'package' },
  ]},
  { group:'Financeiro', items:[
    { r:'financeiro', label:'Financeiro', icon:'wallet' },
    { r:'fiscal', label:'Fiscal', icon:'receipt' },
  ]},
  { group:'Inteligência', items:[
    { r:'bi', label:'Business Intelligence', icon:'pie-chart' },
    { r:'ia', label:'Redentora IA', icon:'sparkles', badge:'<span class="badge violet">IA</span>' },
    { r:'relatorios', label:'Relatórios', icon:'bar-chart-3' },
  ]},
  { group:'Sistema', items:[
    { r:'config', label:'Configurações', icon:'settings' },
  ]},
];
const ROUTE_TITLE = {};
NAV.forEach(g=>g.items.forEach(i=>ROUTE_TITLE[i.r]=i.label));

const App = {
  pages:{},
  register(route, def){ this.pages[route]=def; },

  init(){
    // theme
    const saved = localStorage.getItem('oc-theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    if(localStorage.getItem('oc-collapsed')==='1') document.getElementById('app').classList.add('collapsed');
    // static icons
    document.getElementById('menuBtn').innerHTML = icon('menu');
    document.getElementById('collapseBtn').innerHTML = icon('chevrons-left');
    document.getElementById('searchIco').innerHTML = icon('search');
    document.getElementById('calBtn').innerHTML = icon('calendar');
    document.getElementById('execBtn').innerHTML = icon('target')+' Modo Executivo';
    document.getElementById('iaBtn').innerHTML = icon('sparkles');
    document.getElementById('bellBtn').innerHTML = icon('bell');
    this.buildFab();
    this.syncThemeIcon();
    // user
    document.getElementById('profileAv').textContent = DATA.user.inicial;
    document.getElementById('profileName').textContent = DATA.user.nome;
    document.getElementById('profileRole').textContent = DATA.user.cargo.split('·')[0].trim();
    // nav
    this.buildNav();
    initTooltip();
    // events
    window.addEventListener('hashchange', ()=>this.render());
    document.addEventListener('keydown', e=>{
      if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); this.openSearch(); }
      if(e.key==='Escape') closeModal();
    });
    const gs=document.getElementById('globalSearch');
    gs.addEventListener('focus', ()=>this.openSearch());
    // ripple nos botões (microinteração)
    document.addEventListener('pointerdown', e=>{ const b=e.target.closest('.btn'); if(!b) return;
      const rect=b.getBoundingClientRect(), size=Math.max(rect.width,rect.height);
      const s=document.createElement('span'); s.className='ripple';
      s.style.width=s.style.height=size+'px';
      s.style.left=(e.clientX-rect.left-size/2)+'px'; s.style.top=(e.clientY-rect.top-size/2)+'px';
      b.appendChild(s); setTimeout(()=>s.remove(),600);
    });
    // first render
    if(!location.hash) location.hash='#dashboard';
    this.render();
  },

  buildNav(){
    const nav=document.getElementById('nav');
    nav.innerHTML = NAV.map(g=>`
      ${g.group?`<div class="nav-label">${g.group}</div>`:'<div style="height:8px"></div>'}
      ${g.items.map(i=>`
        <a class="nav-item" href="#${i.r}" data-route="${i.r}">
          ${icon(i.icon)}<span class="txt">${i.label}</span>${i.badge||''}
        </a>`).join('')}
    `).join('');
  },

  parseHash(){
    const h=(location.hash||'#dashboard').slice(1);
    const [route,...rest]=h.split('/');
    return { route: route||'dashboard', param: rest.join('/') };
  },

  skeleton(){
    const b=s=>`<div class="skeleton" style="${s}"></div>`;
    const card=h=>`<div class="skeleton" style="height:${h}px;border-radius:18px"></div>`;
    return `<div class="page">
      ${b('height:13px;width:130px;margin-bottom:14px;border-radius:6px')}
      ${b('height:28px;width:280px;margin-bottom:9px;border-radius:8px')}
      ${b('height:13px;width:60%;max-width:440px;margin-bottom:26px;border-radius:6px')}
      <div class="grid g-4" style="margin-bottom:22px">${card(112)}${card(112)}${card(112)}${card(112)}</div>
      <div class="grid g-3" style="margin-bottom:22px"><div class="span-2">${card(300)}</div>${card(300)}</div>
      <div class="grid g-2">${card(220)}${card(220)}</div>
    </div>`;
  },
  render(){
    const token = this._rt = (this._rt||0)+1;
    const { route, param } = this.parseHash();
    const page = this.pages[route] || this.pages['dashboard'];
    document.body.classList.toggle('exec-mode', route==='executivo');
    document.querySelectorAll('.nav-item').forEach(a=>{ const on=a.dataset.route===route; a.classList.toggle('active',on); if(on) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current'); });
    document.getElementById('app').classList.remove('nav-open');
    const view=document.getElementById('view'); window.scrollTo(0,0);
    const paint=()=>{ view.innerHTML=page.render(param); countUp(view); if(page.onMount) page.onMount(param); };
    if(route==='executivo'){ paint(); return; }
    view.innerHTML=this.skeleton();
    setTimeout(()=>{ if(token===this._rt) paint(); }, 200);
  },

  go(route){ location.hash='#'+route; },

  toggleTheme(){
    const cur=document.documentElement.getAttribute('data-theme');
    const next=cur==='dark'?'light':'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('oc-theme', next);
    this.syncThemeIcon();
  },
  syncThemeIcon(){
    const dark=document.documentElement.getAttribute('data-theme')==='dark';
    const ic=icon(dark?'sun':'moon');
    ['themeBtn','themeBtnM'].forEach(id=>{ const el=document.getElementById(id); if(el) el.innerHTML=ic; });
  },
  toggleCollapse(){
    const app=document.getElementById('app'); app.classList.toggle('collapsed');
    localStorage.setItem('oc-collapsed', app.classList.contains('collapsed')?'1':'0');
  },
  toggleMobileNav(){ document.getElementById('app').classList.toggle('nav-open'); },

  /* ---------- Spotlight (busca universal Ctrl+K) ---------- */
  searchIndex(){
    if(this._idx) return this._idx;
    const idx=[]; const m0=v=>fmt.money(v,0);
    DATA.clientes.forEach(c=>{
      idx.push({kind:'cliente',id:c.id,ico:'users',tone:'primary',title:c.nome,sub:`${c.cpf} · ${c.cidade}`,tag:'Cliente',terms:(c.nome+' '+c.cpf+' '+c.tel+' '+c.cidade).toLowerCase()});
      idx.push({kind:'cliente',id:c.id,ico:'shopping-bag',tone:'success',title:`Venda — ${c.nome}`,sub:`Última ${c.ultima} · LTV ${m0(c.ltv)}`,tag:'Venda',terms:('venda compra '+c.nome).toLowerCase()});
      idx.push({kind:'cliente',id:c.id,ico:'file-text',tone:'info',title:`Receita — ${c.nome}`,sub:`Grau atual · ${c.lente}`,tag:'Receita',terms:('receita grau '+c.nome).toLowerCase()});
    });
    DATA.ordens.forEach(o=>idx.push({kind:'os',id:o.os,ico:'clipboard-list',tone:'info',title:`OS ${o.os} — ${o.cliente}`,sub:`${o.produto} · ${o.status}`,tag:'Ordem',terms:(o.os+' '+o.cliente+' '+o.produto+' '+o.status).toLowerCase()}));
    DATA.armacoes.forEach(a=>idx.push({kind:'produtos',id:'armacoes',ico:'glasses',tone:'violet',title:`${a.marca} ${a.modelo}`,sub:`${m0(a.venda)} · ${a.estoque} un`,tag:'Produto',terms:(a.marca+' '+a.modelo+' '+a.cat).toLowerCase()}));
    DATA.medicos.forEach(mm=>idx.push({kind:'medicos',id:0,ico:'stethoscope',tone:'success',title:mm.nome,sub:`${mm.crm} · ${mm.esp}`,tag:'Médico',terms:(mm.nome+' '+mm.crm+' '+mm.esp).toLowerCase()}));
    DATA.agenda.forEach(e=>idx.push({kind:'agenda',id:e.dia,ico:'calendar',tone:'warning',title:e.titulo,sub:`${e.dia}/07 · ${e.hora}`,tag:'Agenda',terms:(e.titulo+' '+e.tipo).toLowerCase()}));
    DATA.contasReceber.forEach(c=>idx.push({kind:'financeiro',id:0,ico:'wallet',tone:'success',title:c.desc,sub:`${m0(c.valor)} · vence ${c.venc}`,tag:'Financeiro',terms:('financeiro receber '+c.desc).toLowerCase()}));
    NAV.flatMap(g=>g.items).forEach(i=>idx.push({kind:'route',id:i.r,ico:i.icon,tone:'primary',title:'Ir para '+i.label,sub:'Comando',tag:'Comando',terms:('ir para navegar comando '+i.label).toLowerCase()}));
    [{id:'venda',t:'Nova venda',ic:'shopping-cart'},{id:'cliente',t:'Criar cliente',ic:'user-plus'},{id:'os',t:'Nova ordem de serviço',ic:'clipboard-list'},{id:'medico',t:'Novo médico',ic:'stethoscope'},{id:'laboratorio',t:'Novo laboratório',ic:'flask'},{id:'tema',t:'Trocar tema (claro / escuro)',ic:'moon'},{id:'exec',t:'Entrar no Modo Executivo',ic:'target'}].forEach(a=>idx.push({kind:'act',id:a.id,ico:a.ic,tone:'violet',title:a.t,sub:'Comando',tag:'Comando',terms:('comando criar novo trocar abrir '+a.t).toLowerCase()}));
    this._idx=idx; return idx;
  },
  spotItem(r){ return `<div class="spot-item" onclick="App.spotOpen('${r.kind}','${r.id}')"><div class="sic t-${r.tone}">${icon(r.ico)}</div><div class="sg"><b>${r.title}</b><small>${r.sub}</small></div><span class="stag">${r.tag}</span></div>`; },
  spotDefault(){
    const actions=[
      {kind:'act',id:'venda',ico:'shopping-cart',tone:'primary',title:'Nova venda (PDV)',sub:'Abrir ponto de venda',tag:'Ação'},
      {kind:'act',id:'cliente',ico:'user-plus',tone:'success',title:'Cadastrar cliente',sub:'Novo cliente',tag:'Ação'},
      {kind:'act',id:'os',ico:'clipboard-list',tone:'info',title:'Abrir ordem de serviço',sub:'Nova OS',tag:'Ação'},
      {kind:'act',id:'exec',ico:'target',tone:'violet',title:'Entrar no Modo Executivo',sub:'Painel para reuniões',tag:'Ação'},
    ];
    const pages=NAV.flatMap(g=>g.items).map(i=>({kind:'route',id:i.r,ico:i.icon,tone:'primary',title:i.label,sub:'Ir para tela',tag:'Tela'}));
    return `<div class="spot-group">Ações rápidas</div>${actions.map(a=>this.spotItem(a)).join('')}
      <div class="spot-group">Navegar</div>${pages.slice(0,7).map(p=>this.spotItem(p)).join('')}`;
  },
  spotResults(q){
    const idx=this.searchIndex().filter(r=>r.terms.includes(q));
    if(!idx.length) return '<div class="empty">'+icon('search')+'<div>Nenhum resultado para "'+q+'"</div></div>';
    const groups={}; idx.slice(0,40).forEach(r=>{ (groups[r.tag]=groups[r.tag]||[]).push(r); });
    return Object.keys(groups).map(g=>`<div class="spot-group">${g} · ${groups[g].length}</div>${groups[g].slice(0,6).map(r=>this.spotItem(r)).join('')}`).join('');
  },
  spotSelectFirst(){ const f=document.querySelector('#spotList .spot-item'); if(f) f.classList.add('sel'); },
  openSearch(){
    openModal(`
      <div class="modal-head" style="padding:14px 18px">
        <label class="search" style="width:100%;max-width:none;background:var(--surface-2)">
          ${icon('search')}<input id="spotInput" placeholder="Buscar clientes, produtos, ordens, financeiro, comandos..." autofocus>
        </label>
      </div>
      <div class="card-body" style="padding:8px;max-height:58vh;overflow:auto" id="spotList">${this.spotDefault()}</div>
      <div style="padding:11px 18px;border-top:1px solid var(--border);font-size:11.5px;color:var(--muted)" class="row between">
        <span class="row center gap-xs">${icon('sparkles')} Busca universal Redentora</span>
        <span class="row gap-xs"><span class="pmk">↑↓</span> navegar <span class="pmk">↵</span> abrir <span class="pmk">esc</span> fechar</span></div>
    `);
    setTimeout(()=>{ const inp=document.getElementById('spotInput'); if(!inp) return; inp.focus(); this.spotSelectFirst();
      inp.addEventListener('input',()=>{ const q=inp.value.trim().toLowerCase();
        document.getElementById('spotList').innerHTML = q.length<1 ? this.spotDefault() : this.spotResults(q);
        this.spotSelectFirst();
      });
      inp.addEventListener('keydown',e=>{
        const items=[...document.querySelectorAll('#spotList .spot-item')];
        let sel=document.querySelector('#spotList .spot-item.sel'); let i=items.indexOf(sel);
        if(e.key==='ArrowDown'){ e.preventDefault(); i=Math.min(i+1,items.length-1); }
        else if(e.key==='ArrowUp'){ e.preventDefault(); i=Math.max(i-1,0); }
        else if(e.key==='Enter'){ e.preventDefault(); (sel||items[0])&&(sel||items[0]).click(); return; }
        else return;
        items.forEach(x=>x.classList.remove('sel')); if(items[i]){ items[i].classList.add('sel'); items[i].scrollIntoView({block:'nearest'}); }
      });
    },30);
  },
  spotOpen(kind,id){
    closeModal();
    if(kind==='cliente'){ this.go('clientes'); setTimeout(()=>window.openCliente(Number(id)),90); }
    else if(kind==='os'){ this.go('os'); setTimeout(()=>window.openOS(id),90); }
    else if(kind==='produtos'){ location.hash='#produtos/'+id; }
    else if(kind==='route'){ this.go(id); }
    else if(kind==='act'){ this.quickAction(id); }
    else this.go(kind);
  },

  /* ---------- Notificações inteligentes ---------- */
  openNotifications(){
    const nItem=n=>`
      <div class="alert-item" style="margin-bottom:10px;cursor:pointer" onclick="App.go('${n.route}');closeModal()">
        <div class="notif-sev t-${n.sev}">${icon(n.ico)}${n.count?`<span class="cnt" style="background:var(--${n.sev})">${n.count}</span>`:''}</div>
        <div class="grow"><b>${n.titulo}</b><p>${n.txt}</p></div>${icon('chevron-right','muted')}</div>`;
    const dayH=t=>`<div class="spot-group" style="padding:10px 2px 8px">${t}</div>`;
    const total = DATA.notificacoesSmart.length + DATA.notificacoesSemana.length + DATA.notificacoesMes.length;
    const grp=(t,arr)=>arr.length?dayH(t)+arr.map(nItem).join(''):'';
    const rows = total
      ? grp('Hoje',DATA.notificacoesSmart)+grp('Esta semana',DATA.notificacoesSemana)+grp('Este mês',DATA.notificacoesMes)
      : `<div class="empty" style="padding:44px 20px">${icon('bell')}<h3 style="font-size:15px;margin-bottom:4px">Tudo em ordem</h3><p>Nenhuma notificação no momento. Os alertas aparecem conforme você usa o sistema.</p></div>`;
    openDrawer(`
      <div class="modal-head">
        <div class="card-title-ico"><div class="ci t-primary">${icon('bell')}</div><div><h3>Notificações</h3><div class="sub">${total} no total</div></div></div>
        <button class="icon-btn" onclick="closeModal()">${icon('x')}</button>
      </div>
      <div class="card-body">
        ${rows}
      </div>`);
  },

  /* ---------- Quick Actions (FAB) ---------- */
  buildFab(){
    if(document.querySelector('.fab-wrap')) return;
    const acts=[
      {id:'venda',label:'Nova venda',ico:'shopping-cart'},
      {id:'cliente',label:'Novo cliente',ico:'user-plus'},
      {id:'os',label:'Nova OS',ico:'clipboard-list'},
      {id:'agenda',label:'Nova agenda',ico:'calendar'},
      {id:'fornecedor',label:'Novo fornecedor',ico:'truck'},
      {id:'produto',label:'Novo produto',ico:'glasses'},
    ];
    const wrap=document.createElement('div'); wrap.className='fab-wrap'; wrap.id='fab';
    wrap.innerHTML=`<button class="fab" onclick="App.toggleFab()" aria-label="Ações rápidas">${icon('plus')}</button>
      <div class="fab-menu">${acts.map(a=>`<button class="fab-item" onclick="App.quickAction('${a.id}')"><span class="fl">${a.label}</span><span class="fc">${icon(a.ico)}</span></button>`).join('')}</div>`;
    const scrim=document.createElement('div'); scrim.className='fab-scrim'; scrim.onclick=()=>this.toggleFab(false);
    document.body.appendChild(wrap); document.body.appendChild(scrim);
  },
  toggleFab(force){ const w=document.getElementById('fab'); if(!w) return;
    if(force===undefined) w.classList.toggle('open'); else w.classList.toggle('open', force); },
  quickAction(id){
    this.toggleFab(false);
    switch(id){
      case 'venda': this.go('vendas'); toast('Ponto de venda aberto','success'); break;
      case 'cliente': this.go('clientes'); setTimeout(()=>window.openClienteForm&&window.openClienteForm(),120); break;
      case 'os': this.go('vendas'); toast('Monte o pedido para gerar a OS','info'); break;
      case 'agenda': this.go('agenda'); toast('Novo compromisso','info'); break;
      case 'fornecedor': this.go('fornecedores'); toast('Cadastro de fornecedor (demo)','info'); break;
      case 'funcionario': this.go('funcionarios'); toast('Cadastro de funcionário (demo)','info'); break;
      case 'produto': location.hash='#produtos/armacoes'; setTimeout(()=>toast('Novo produto (demo)','info'),120); break;
      case 'receita': this.go('clientes'); toast('Selecione o cliente para registrar a receita','info'); break;
      case 'medico': this.go('medicos'); toast('Cadastro de médico (demo)','info'); break;
      case 'laboratorio': this.go('laboratorios'); toast('Cadastro de laboratório (demo)','info'); break;
      case 'tema': this.toggleTheme(); break;
      case 'exec': this.enterExec(); break;
    }
  },

  /* ---------- + Novo (dropdown header) ---------- */
  toggleNewMenu(btn){
    if(document.getElementById('popmenu')){ this.closePop(); return; }
    const acts=[
      {id:'cliente',label:'Novo cliente',ico:'user-plus'},
      {id:'venda',label:'Nova venda',ico:'shopping-cart'},
      {id:'os',label:'Nova ordem',ico:'clipboard-list'},
      {id:'produto',label:'Novo produto',ico:'glasses'},
      {id:'medico',label:'Novo médico',ico:'stethoscope'},
      {id:'laboratorio',label:'Novo laboratório',ico:'flask'},
      {id:'agenda',label:'Nova agenda',ico:'calendar'},
      {id:'fornecedor',label:'Novo fornecedor',ico:'truck'},
    ];
    const scrim=document.createElement('div'); scrim.className='pop-scrim'; scrim.onclick=()=>this.closePop();
    const menu=document.createElement('div'); menu.className='popmenu'; menu.id='popmenu'; menu.setAttribute('role','menu');
    menu.innerHTML=`<div class="pm-h">Criar novo</div>`+acts.map(a=>`<button role="menuitem" onclick="App.quickAction('${a.id}');App.closePop()"><span class="pmi">${icon(a.ico)}</span>${a.label}</button>`).join('');
    document.body.appendChild(scrim); document.body.appendChild(menu);
    const r=btn.getBoundingClientRect();
    menu.style.top=(r.bottom+8)+'px'; menu.style.right=Math.max(12,(window.innerWidth-r.right))+'px';
  },
  closePop(){ const m=document.getElementById('popmenu'), s=document.querySelector('.pop-scrim'); if(m)m.remove(); if(s)s.remove(); },

  /* ---------- IA Copiloto (assistente permanente) ---------- */
  openCopilot(){
    const finds=DATA.iaCopilot.map(f=>`<div class="copilot-find" onclick="App.go('${f.route}');closeModal()">
      <div class="cfi t-${f.sev==='ok'?'success':f.sev==='warn'?'warning':f.sev}">${icon(f.ico)}</div>
      <div class="grow"><b>${f.sev==='ok'?'✔':'⚠'} ${f.t}</b><p>${f.d}</p></div>${icon('chevron-right','muted')}</div>`).join('');
    const chips=DATA.iaSugestoes.map(s=>`<button class="chip" onclick="App.copilotAsk(this.textContent)">${s}</button>`).join('');
    openDrawer(`
      <div class="modal-head">
        <div class="copilot-h"><div class="cav">${icon('sparkles')}</div><div><h3>Redentora IA · Copiloto</h3><div class="sub">Sempre observando seu negócio</div></div></div>
        <button class="icon-btn" onclick="closeModal()">${icon('x')}</button>
      </div>
      <div class="card-body">
        ${(()=>{ const n=DATA.iaCopilot.length; return `<div class="insight ai" style="margin-bottom:14px"><div class="tag-ai">${icon('cpu')} Resumo</div><p>${n?`<b>Olá!</b> Encontrei <b>${n} ${n===1?'oportunidade':'oportunidades'}</b> hoje. Posso agir em qualquer uma delas. 👇`:`<b>Bem-vindo(a) à Ótica Redentora!</b> Ainda não há movimentação. Assim que você começar a cadastrar clientes, produtos e vendas, eu trago insights e oportunidades aqui.`}</p></div>`; })()}
        ${finds}
        <div class="row gap-xs fw" style="margin:14px 0 4px">${DATA.copilotAcoes.map((a,i)=>`<button class="btn ${i===0?'primary':'soft'} sm" onclick="App.go('${a.route}');closeModal()">${icon(a.ico)} ${a.label}</button>`).join('')}</div>
        <div class="hr" style="margin:16px 0"></div>
        <div class="muted" style="font-size:11.5px;font-weight:700;margin-bottom:8px">PERGUNTE AO COPILOTO</div>
        <div class="chat-log" id="copilotLog">
          <div class="chat-msg ai">Posso te ajudar a começar. O que você quer fazer primeiro?</div>
        </div>
        <div class="row gap-xs fw" style="margin:12px 0">${chips}</div>
        <div class="copilot-input">
          <input id="copilotInput" placeholder="Pergunte à Redentora IA..." onkeydown="if(event.key==='Enter')App.copilotSend()">
          <button class="send" onclick="App.copilotSend()">${icon('send')}</button>
        </div>
      </div>`);
  },
  copilotAsk(q){ const inp=document.getElementById('copilotInput'); if(inp) inp.value=q; this.copilotSend(); },
  copilotSend(){
    const inp=document.getElementById('copilotInput'), log=document.getElementById('copilotLog'); if(!inp||!log) return;
    const q=inp.value.trim(); if(!q) return;
    const replies={
      'como começo a usar o sistema?':'Comece pelos <b>Cadastros</b>: registre seus <b>produtos</b> (armações, lentes), seus <b>clientes</b> e a sua <b>equipe</b>. Depois é só usar o <b>PDV</b> para registrar vendas — os dashboards e relatórios se preenchem sozinhos.',
      'o que preciso cadastrar primeiro?':'Sugiro esta ordem: <b>1)</b> Produtos e Fornecedores · <b>2)</b> Funcionários · <b>3)</b> Clientes e Médicos. Com isso pronto, você já registra vendas e ordens de serviço.',
      'como registro uma venda?':'Abra <b>Vendas · PDV</b>, busque os produtos, selecione o cliente e a forma de pagamento. Ao finalizar, o sistema gera a <b>Ordem de Serviço</b> automaticamente.',
      'como cadastro um produto?':'Vá em <b>Cadastros → Produtos</b>, escolha a aba (Armações, Lentes, Lentes de contato ou Acessórios) e clique em <b>Novo produto</b>.'
    };
    const ans=replies[q.toLowerCase()]||`Ainda estou conhecendo a sua ótica. Cadastre alguns dados (produtos, clientes, vendas) que eu passo a trazer análises e recomendações reais aqui.`;
    log.insertAdjacentHTML('beforeend',`<div class="chat-msg me">${q}</div>`); inp.value='';
    const scroll=()=>{ const d=log.parentElement; if(d) d.scrollTop=d.scrollHeight; };
    log.insertAdjacentHTML('beforeend',`<div class="chat-msg ai typing" id="ai-typing"><i></i><i></i><i></i></div>`); scroll();
    setTimeout(()=>{ const t=document.getElementById('ai-typing'); if(t){ t.classList.remove('typing'); t.removeAttribute('id'); t.innerHTML=ans; } scroll(); }, 800);
  },

  /* ---------- Modo Executivo ---------- */
  enterExec(){ location.hash='#executivo'; },
  exitExec(){ location.hash='#dashboard'; },

  /* ---------- Profile ---------- */
  openProfile(){
    const u=DATA.user;
    openModal(`
      <div class="modal-head"><h3>Meu perfil</h3><button class="icon-btn" onclick="closeModal()">${icon('x')}</button></div>
      <div class="card-body">
        <div class="row center" style="gap:16px;margin-bottom:20px">
          <div class="av" style="width:64px;height:64px;border-radius:18px;background:var(--brand-grad);display:grid;place-items:center;color:#fff;font-weight:800;font-size:24px;font-family:var(--font-display)">${u.inicial}</div>
          <div><h3 style="font-size:19px">${u.nome}</h3><div class="muted">${u.cargo}</div>
          <div class="row gap-xs mt-1"><span class="badge success dot">Online</span><span class="badge">${u.loja}</span></div></div>
        </div>
        <div class="mini-metrics mb-1">
          <div class="mm"><div class="l">Vendas (mês)</div><div class="v">R$ 0</div></div>
          <div class="mm"><div class="l">Meta</div><div class="v">0%</div></div>
          <div class="mm"><div class="l">Conversão</div><div class="v">0%</div></div>
        </div>
        <div class="hr mt-2"></div>
        <div class="col" style="gap:6px;margin-top:12px">
          <button class="btn ghost block" style="justify-content:flex-start" onclick="App.go('config');closeModal()">${icon('settings')} Configurações da conta</button>
          <button class="btn ghost block" style="justify-content:flex-start" onclick="App.toggleTheme()">${icon('moon')} Alternar tema claro/escuro</button>
          <button class="btn ghost block" style="justify-content:flex-start" onclick="App.go('config');closeModal()">${icon('help-circle')} Central de ajuda</button>
          <button class="btn danger block" style="justify-content:flex-start" onclick="toast('Sessão encerrada (demo)','info');closeModal()">${icon('log-out')} Sair</button>
        </div>
      </div>`);
  }
};

/* ---------- Helper compartilhado: cabeçalho de página ---------- */
function pageHead(title, sub, { crumbs=[], actions='' }={}){
  const cr = ['Início', ...crumbs, title];
  const crumbHtml = cr.map((c,i)=> i===cr.length-1
    ? `<span class="cur">${c}</span>`
    : `<span>${c}</span>${icon('chevron-right')}`).join('');
  return `<div class="page-head">
    <div>
      <div class="breadcrumb">${crumbHtml}</div>
      <h1 class="page-title">${title}</h1>
      ${sub?`<p class="page-sub">${sub}</p>`:''}
    </div>
    <div class="page-actions">${actions}</div>
  </div>`;
}

/* pill de filtro rápido reutilizável */
function filterChips(items, active=0){
  return `<div class="row gap-xs fw">${items.map((c,i)=>`<button class="chip ${i===active?'active':''}">${c}</button>`).join('')}</div>`;
}

window.App=App; window.pageHead=pageHead; window.filterChips=filterChips; window.NAV=NAV; window.ROUTE_TITLE=ROUTE_TITLE;
document.addEventListener('DOMContentLoaded', ()=>App.init());
