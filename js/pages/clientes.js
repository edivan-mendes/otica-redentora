/* ============ Clientes — 360º ============ */
(function(){
  const m0=v=>fmt.money(v,0);

  function statusChip(s){ return statusBadge(s); }

  function render(){
    const cli=DATA.clientes;
    const totalLtv=cli.reduce((a,c)=>a+c.ltv,0);
    const vips=cli.filter(c=>c.status==='VIP').length;
    const ativos=cli.filter(c=>c.status!=='Inativo').length;

    const kpis=`<div class="grid g-4" style="margin-bottom:var(--gap)">
      ${kpiCard({label:'Base de clientes',value:0,delta:0,icon:'users',tone:'primary',fmt:fmt.num,sub:'total cadastrado'})}
      ${kpiCard({label:'Clientes VIP',value:0,delta:0,icon:'star',tone:'violet',fmt:fmt.num,sub:'alto valor'})}
      ${kpiCard({label:'LTV médio',value:0,delta:0,icon:'dollar-sign',tone:'success',fmt:m0,sub:'valor vitalício'})}
      ${kpiCard({label:'Prontos p/ trocar',value:0,delta:0,icon:'repeat',tone:'warning',fmt:fmt.num,sub:'ciclo atingido'})}
    </div>`;

    const rows=cli.map(c=>`
      <tr style="cursor:pointer" onclick="openCliente(${c.id})">
        <td><div class="cell-user">${avatar(c.nome)}<div><b>${c.nome}</b><span>${c.cpf}</span></div></div></td>
        <td>${statusChip(c.status)}</td>
        <td><div class="row center gap-xs"><span class="muted">${icon('phone',{size:14})}</span>${c.tel}</div></td>
        <td>${c.cidade}</td>
        <td class="td-r"><b class="num">${m0(c.ltv)}</b><div><small class="muted">${c.compras} compras</small></div></td>
        <td class="td-c">${c.ultima}</td>
        <td class="td-c"><span class="badge ${c.proxTroca==='atrasado'?'danger':c.proxTroca==='—'?'':'warning'} dot">${c.proxTroca}</span></td>
        <td class="td-c"><div class="ring-wrap" style="width:38px;height:38px">${scoreRing(c.score)}</div></td>
        <td class="td-r"><button class="icon-btn" onclick="event.stopPropagation();openCliente(${c.id})">${icon('eye')}</button></td>
      </tr>`).join('');

    return `<div class="page">
      ${pageHead('Clientes','Base completa com histórico financeiro, receitas, garantias e linha do tempo.',{crumbs:['Cadastros'],actions:`
        <button class="btn ghost">${icon('download')}<span class="hide-sm">Exportar</span></button>
        <button class="btn primary" onclick="openClienteForm()">${icon('user-plus')} Novo cliente</button>`})}
      ${kpis}
      ${panel({title:'Diretório de clientes',sub:cli.length+' registros',icon:'users',pad:false,
        actions:`<label class="search" style="max-width:280px;height:38px"><span>${icon('search')}</span><input placeholder="Buscar por nome, CPF, telefone..."></label>
          <button class="btn sm ghost">${icon('filter')} Filtros</button>`,
        body: cli.length
          ? `<div style="padding:14px 20px 0">${filterChips(['Todos','Ativos','VIP','Inativos','Aniversariantes','Sem comprar +6m'],0)}</div>
          <div class="table-wrap" style="padding:6px 6px 10px"><table class="data">
          <thead><tr><th>Cliente</th><th>Status</th><th>Contato</th><th>Cidade</th><th class="td-r">LTV</th><th class="td-c">Últ. compra</th><th class="td-c">Próx. troca</th><th class="td-c">Score</th><th></th></tr></thead>
          <tbody>${rows}</tbody></table></div>`
          : `<div class="empty" style="padding:56px 20px">${icon('users')}<h3 style="font-size:16px;margin-bottom:6px">Nenhum cliente cadastrado</h3><p style="max-width:380px;margin:0 auto 16px">Cadastre seus clientes com foto, receitas, garantias e histórico de compras — tudo em um só lugar.</p><button class="btn primary" onclick="openClienteForm()">${icon('user-plus')} Cadastrar cliente</button></div>`})}
    </div>`;
  }

  function scoreRing(score){
    const color=score>=85?'var(--success)':score>=60?'var(--warning)':'var(--danger)';
    return Charts.ring(score,{size:38,thickness:4,color,center:`<div style="font-size:11px;font-weight:800;font-family:var(--font-mono)">${score}</div>`});
  }

  window.openCliente=function(id){
    const c=DATA.clientes.find(x=>x.id===id); if(!c) return;
    const r=DATA.clienteRico;
    const secH=t=>`<h4 style="font-size:11.5px;margin:22px 0 12px;color:var(--faint);text-transform:uppercase;letter-spacing:.08em;font-weight:800">${t}</h4>`;
    const grau=`<div class="card pad" style="background:var(--brand-grad-soft);border-color:rgba(47,107,255,.2)">
      <div class="row between center"><b style="font-size:12.5px">Grau atual · receita vigente</b><span class="badge primary dot">Atualizada 20/06</span></div>
      <div class="grid g-4 mt-2" style="gap:8px;text-align:center">
        ${['OD (esf.)',r.grau.od,'OE (esf.)',r.grau.oe,'Adição',r.grau.adicao,'DNP',r.grau.dnp].reduce((a,_,i,arr)=>i%2===0?a+`<div><div class="muted" style="font-size:10.5px">${arr[i]}</div><div class="big-num mono" style="font-size:18px">${arr[i+1]}</div></div>`:a,'')}
      </div></div>`;
    const oculos=r.oculos.map(o=>`<div class="frame-chip"><div class="fph" style="background:${o.cor}22"><span style="color:${o.cor}">${icon('glasses')}</span></div><b>${o.modelo}</b><small>${o.ano}</small></div>`).join('');
    const receitas=r.receitas.map(x=>`<tr><td>${x.data}</td><td>${x.medico}</td><td class="td-c mono">${x.od}</td><td class="td-c mono">${x.oe}</td><td class="td-c mono">${x.ad}</td></tr>`).join('');
    const garantias=r.garantias.map(g=>`<div class="lrow"><div class="ai t-${g.status==='Ativa'?'success':'danger'}" style="width:32px;height:32px;border-radius:9px;display:grid;place-items:center">${icon('shield')}</div><div class="grow"><b>${g.item}</b><small>Válida até ${g.ate}</small></div><span class="badge ${g.status==='Ativa'?'success':'danger'} dot">${g.status}</span></div>`).join('');
    const contatos=r.contatos.map(ct=>`<div class="lrow"><div class="ai t-primary" style="width:32px;height:32px;border-radius:9px;display:grid;place-items:center">${icon(ct.ico)}</div><div class="grow"><b>${ct.canal}</b><small>${ct.txt}</small></div><span class="muted" style="font-size:11px">${ct.data}</span></div>`).join('');
    const timeline=r.timeline.map(yr=>`<div class="tl-year">${yr.ano}</div><div class="timeline">${yr.eventos.map(e=>`<div class="tl-item done"><div class="tl-dot" style="background:var(--${e.tone});border-color:var(--${e.tone})">${icon('check')}</div><h6>${e.t}</h6><div class="muted" style="font-size:12px">${e.d}</div><div class="tl-meta">${e.data}</div></div>`).join('')}</div>`).join('');
    openDrawer(`
      <div class="modal-head">
        <div class="card-title-ico">${avatar(c.nome,{size:44})}<div><h3>${c.nome}</h3><div class="sub">${c.prof} · ${c.cidade}</div></div></div>
        <button class="icon-btn" onclick="closeModal()">${icon('x')}</button>
      </div>
      <div class="card-body">
        <div class="row gap-xs fw mb-1">${statusChip(c.status)}<span class="badge">${c.convenio!=='—'?'Convênio: '+c.convenio:'Particular'}</span><span class="badge violet dot">Score ${c.score}</span></div>
        <div class="mini-metrics mt-2">
          <div class="mm"><div class="l">${icon('dollar-sign',{size:13})} Total gasto</div><div class="v">${m0(c.ltv)}</div></div>
          <div class="mm"><div class="l">${icon('shopping-bag',{size:13})} Compras</div><div class="v">${c.compras}</div></div>
          <div class="mm"><div class="l">${icon('tag',{size:13})} Ticket médio</div><div class="v">${m0(Math.round(c.ltv/c.compras))}</div></div>
          <div class="mm"><div class="l">${icon('repeat',{size:13})} Frequência</div><div class="v" style="font-size:16px">${c.freq}</div></div>
        </div>

        ${secH('Grau atual')}${grau}

        <div class="insight ai mt-3"><div class="row between center"><div class="tag-ai">${icon('sparkles')} IA · Próxima compra</div><span class="badge violet dot">${r.iaPrev.prob}% provável</span></div>
          <p>Alta chance de troca em <b>${r.iaPrev.quando}</b> · ticket estimado <b>${m0(r.iaPrev.valor)}</b>.<br>Sugestão: <b>${r.iaPrev.sugestao}</b>.</p>
          <button class="btn soft sm mt-1" onclick="toast('Oferta agendada para ${c.nome.split(' ')[0]}','success')">${icon('send')} Agendar oferta</button></div>

        ${secH('Óculos anteriores')}<div class="pos-grid" style="grid-template-columns:repeat(3,1fr)">${oculos}</div>

        ${secH('Receitas oftalmológicas')}
        <div class="table-wrap card" style="border-radius:14px"><table class="data" style="font-size:12px"><thead><tr><th>Data</th><th>Médico</th><th class="td-c">OD</th><th class="td-c">OE</th><th class="td-c">Ad</th></tr></thead><tbody>${receitas}</tbody></table></div>

        ${secH('Garantias')}<div class="col" style="gap:2px">${garantias}</div>

        ${secH('Ordens de serviço')}<div class="col" style="gap:2px">${r.ordens.map(o=>`<div class="lrow"><div class="ai t-primary" style="width:32px;height:32px;border-radius:9px;display:grid;place-items:center">${icon('clipboard-list')}</div><div class="grow"><b>OS ${o.os}</b><small>${o.produto}</small></div><div style="text-align:right">${statusBadge(o.status)}<div><small class="num muted">${m0(o.valor)}</small></div></div></div>`).join('')}</div>

        ${secH('Últimos contatos')}<div class="col" style="gap:2px">${contatos}</div>

        ${secH('Dados cadastrais')}
        <div class="grid g-2" style="gap:10px">
          ${infoItem('CPF',c.cpf)}${infoItem('Nascimento',c.nasc)}
          ${infoItem('Telefone / WhatsApp',c.tel)}${infoItem('E-mail',c.email)}
          ${infoItem('Como conheceu',c.origem)}${infoItem('Marca favorita',c.marca)}
        </div>

        ${secH('Linha do tempo')}${timeline}

        <div class="row gap-xs mt-3" style="position:sticky;bottom:0;background:var(--surface);padding:12px 0;margin-top:8px">
          <button class="btn primary f-1" onclick="App.go('vendas');closeModal()">${icon('shopping-cart')} Nova venda</button>
          <button class="btn success" onclick="toast('WhatsApp aberto para ${c.nome.split(' ')[0]}','success')">${icon('message-circle')}</button>
          <button class="btn ghost" onclick="toast('Nova receita (demo)','info')">${icon('file-text')}</button>
        </div>
      </div>`);
  };

  function infoItem(l,v){ return `<div><div class="muted" style="font-size:11px;font-weight:600;margin-bottom:2px">${l}</div><div style="font-weight:600;font-size:13px">${v}</div></div>`; }

  window.openClienteForm=function(){
    openModal(`
      <div class="modal-head"><h3>Novo cliente</h3><button class="icon-btn" onclick="closeModal()">${icon('x')}</button></div>
      <div class="card-body">
        <div class="row center" style="gap:14px;margin-bottom:18px">
          <div class="prod-card" style="width:96px;text-align:center;cursor:pointer"><div class="ph" style="height:64px">${icon('camera')}</div><small>Foto</small></div>
          <div class="f-1 grid g-2" style="gap:12px">
            <div class="field"><label>Nome completo</label><input class="input" placeholder="Nome do cliente"></div>
            <div class="field"><label>CPF</label><input class="input" placeholder="000.000.000-00"></div>
          </div>
        </div>
        <div class="grid g-3" style="gap:12px">
          <div class="field"><label>Telefone / WhatsApp</label><input class="input" placeholder="(11) 90000-0000"></div>
          <div class="field"><label>E-mail</label><input class="input" placeholder="email@exemplo.com"></div>
          <div class="field"><label>Nascimento</label><input class="input" type="date"></div>
          <div class="field"><label>Cidade / UF</label><input class="input" placeholder="São Paulo/SP"></div>
          <div class="field"><label>Profissão</label><input class="input" placeholder="Profissão"></div>
          <div class="field"><label>Como conheceu?</label><select class="input"><option>Indicação</option><option>Google</option><option>Instagram</option><option>Passagem</option><option>Convênio</option></select></div>
        </div>
        <div class="field mt-2"><label>Observações</label><textarea class="input" placeholder="Preferências, alergias, notas de atendimento..."></textarea></div>
      </div>
      <div class="modal-head" style="border-top:1px solid var(--border);border-bottom:none;justify-content:flex-end;gap:10px">
        <button class="btn ghost" onclick="closeModal()">Cancelar</button>
        <button class="btn primary" onclick="closeModal();toast('Cliente cadastrado com sucesso','success')">${icon('check')} Salvar cliente</button>
      </div>`,{lg:true});
  };

  App.register('clientes',{render});
})();