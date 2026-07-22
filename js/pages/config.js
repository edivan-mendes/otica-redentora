/* ============ Configurações ============ */
(function(){
  const SECTIONS=[
    ['perfil','Perfil & Conta','users'],
    ['aparencia','Aparência','image'],
    ['notificacoes','Notificações','bell'],
    ['unidades','Lojas & Unidades','building'],
    ['usuarios','Usuários & Permissões','shield'],
    ['integracoes','Integrações','zap'],
    ['plano','Plano & Assinatura','star'],
  ];
  function render(param){
    const sec=SECTIONS.find(s=>s[0]===param)?param:'perfil';
    const nav=SECTIONS.map(s=>`<a class="nav-item ${s[0]===sec?'active':''}" href="#config/${s[0]}" style="margin-bottom:2px">${icon(s[2])}<span class="txt">${s[1]}</span></a>`).join('');
    return `<div class="page">
      ${pageHead('Configurações','Personalize a plataforma, gerencie a equipe e conecte suas integrações.',{crumbs:[]})}
      <div class="grid" style="grid-template-columns:250px 1fr;gap:var(--gap)">
        <div class="card pad reveal" style="height:fit-content">${nav}</div>
        <div class="reveal">${sections[sec]()}</div>
      </div>
    </div>`;
  }

  const row=(l,d,ctrl)=>`<div class="lrow"><div class="grow"><b>${l}</b><small>${d}</small></div>${ctrl}</div>`;
  const sw=(on=false)=>`<div class="switch ${on?'on':''}" onclick="this.classList.toggle('on')"></div>`;

  const sections={
    perfil(){ const u=DATA.user; return panel({title:'Perfil & Conta',icon:'users',tone:'primary',body:`
      <div class="row center" style="gap:16px;margin-bottom:20px">
        <div class="av" style="width:64px;height:64px;border-radius:18px;background:var(--brand-grad);display:grid;place-items:center;color:#fff;font-weight:800;font-size:24px">${u.inicial}</div>
        <div><button class="btn ghost sm">${icon('camera')} Alterar foto</button></div></div>
      <div class="grid g-2" style="gap:14px">
        <div class="field"><label>Nome</label><input class="input" value="${u.nome}"></div>
        <div class="field"><label>Cargo</label><input class="input" value="${u.cargo}"></div>
        <div class="field"><label>E-mail</label><input class="input" value="ana.beatriz@oticavizzion.com"></div>
        <div class="field"><label>Telefone</label><input class="input" value="(11) 98888-0000"></div>
      </div>
      <div class="hr mt-3"></div>
      ${row('Autenticação em duas etapas','Camada extra de segurança no login',sw(true))}
      ${row('Sessões ativas','Você está conectada em 2 dispositivos','<button class="btn ghost sm">Gerenciar</button>')}
      <button class="btn primary mt-2" onclick="toast('Perfil atualizado','success')">${icon('check')} Salvar alterações</button>`}); },

    aparencia(){ const dark=document.documentElement.getAttribute('data-theme')==='dark';
      return panel({title:'Aparência',icon:'image',tone:'violet',body:`
      <div class="grid g-2" style="gap:14px;margin-bottom:16px">
        <div class="card pad" style="cursor:pointer;border:2px solid ${dark?'var(--border)':'var(--primary)'}" onclick="document.documentElement.setAttribute('data-theme','light');localStorage.setItem('oc-theme','light');App.syncThemeIcon();App.render()">
          <div style="height:60px;border-radius:10px;background:linear-gradient(135deg,#eef2fb,#fff);border:1px solid var(--border);margin-bottom:10px"></div><b>Tema Claro</b></div>
        <div class="card pad" style="cursor:pointer;border:2px solid ${dark?'var(--primary)':'var(--border)'}" onclick="document.documentElement.setAttribute('data-theme','dark');localStorage.setItem('oc-theme','dark');App.syncThemeIcon();App.render()">
          <div style="height:60px;border-radius:10px;background:linear-gradient(135deg,#0a1020,#131c30);border:1px solid var(--border);margin-bottom:10px"></div><b>Tema Escuro</b></div>
      </div>
      ${row('Menu recolhido por padrão','Inicia com a barra lateral compacta',sw(false))}
      ${row('Animações','Transições e micro-interações',sw(true))}
      ${row('Densidade compacta','Reduz espaçamentos nas tabelas',sw(false))}`}); },

    notificacoes(){ return panel({title:'Notificações',icon:'bell',tone:'warning',body:`
      ${row('OS atrasadas','Alerta quando um pedido passar do prazo',sw(true))}
      ${row('Estoque mínimo','Aviso de reposição necessária',sw(true))}
      ${row('Aniversariantes','Lembrete diário de clientes aniversariantes',sw(true))}
      ${row('Metas de venda','Progresso da meta diária/mensal',sw(true))}
      ${row('Inadimplência','Parcelas de crediário vencendo',sw(false))}
      ${row('Resumo executivo por e-mail','Relatório diário às 8h',sw(true))}
      ${row('Insights da IA','Notificar novas recomendações',sw(true))}`}); },

    unidades(){ const lojas=[['Matriz Centro','São Paulo/SP','Ativa'],['Filial Shopping','São Paulo/SP','Ativa'],['Filial Norte','Guarulhos/SP','Ativa']];
      return panel({title:'Lojas & Unidades',icon:'building',tone:'info',actions:`<button class="btn sm primary" onclick="toast('Nova unidade (demo)','info')">${icon('plus')} Unidade</button>`,body:`
      <div class="col" style="gap:10px">${lojas.map(l=>`<div class="alert-item"><div class="ai t-primary">${icon('building')}</div><div class="grow"><b>${l[0]}</b><p>${l[1]}</p></div><span class="badge success dot">${l[2]}</span><button class="icon-btn">${icon('edit')}</button></div>`).join('')}</div>`}); },

    usuarios(){ const users=[['Ana Beatriz','Gerente','Administrador'],['Carla Mendes','Vendedora','Operador'],['Rafael Souza','Vendedor','Operador'],['João Financeiro','Financeiro','Financeiro']];
      return panel({title:'Usuários & Permissões',icon:'shield',tone:'success',actions:`<button class="btn sm primary" onclick="toast('Convite enviado','success')">${icon('user-plus')} Convidar</button>`,body:`
      <div class="table-wrap"><table class="data"><thead><tr><th>Usuário</th><th>Função</th><th>Perfil de acesso</th><th class="td-r"></th></tr></thead><tbody>
      ${users.map(u=>`<tr><td><div class="cell-user">${avatar(u[0])}<div><b>${u[0]}</b><span>${u[1].toLowerCase()}@oticaredentora.com</span></div></div></td><td>${u[1]}</td><td><span class="badge ${u[2]==='Administrador'?'violet':'primary'} dot">${u[2]}</span></td><td class="td-r"><button class="icon-btn">${icon('edit')}</button></td></tr>`).join('')}
      </tbody></table></div>`}); },

    integracoes(){ const ints=[
      ['WhatsApp Business API','Envio de mensagens e campanhas','message-circle','success',true],
      ['SEFAZ / NF-e','Emissão fiscal autorizada','receipt','primary',true],
      ['Gateway de pagamento','PIX, cartão e boleto','credit-card','info',true],
      ['Laboratórios (EDI)','Pedidos automáticos às lentes','flask','violet',true],
      ['Google Meu Negócio','Avaliações e agendamentos','star','warning',false],
      ['Contabilidade (API)','Exportação de lançamentos','file-text','info',false],
    ];
      return panel({title:'Integrações',icon:'zap',tone:'warning',body:`<div class="grid g-2" style="gap:12px">
      ${ints.map(i=>`<div class="card pad hover"><div class="row between center mb-1"><div class="ico t-${i[3]}" style="width:40px;height:40px;border-radius:11px;display:grid;place-items:center">${icon(i[2])}</div>${i[4]?'<span class="badge success dot">Conectado</span>':'<span class="badge">Disponível</span>'}</div>
        <b>${i[0]}</b><div class="muted" style="font-size:12px;margin:3px 0 10px">${i[1]}</div>
        <button class="btn ${i[4]?'ghost':'soft'} sm block" onclick="toast('${i[4]?'Configurando':'Conectando'} ${i[0]}','info')">${i[4]?'Configurar':'Conectar'}</button></div>`).join('')}</div>`}); },

    plano(){ return panel({title:'Plano & Assinatura',icon:'star',tone:'violet',body:`
      <div class="card pad" style="background:var(--brand-grad);color:#fff;border:none;position:relative;overflow:hidden;margin-bottom:16px">
        <div style="position:absolute;inset:0;background:radial-gradient(circle at 85% 10%,rgba(255,255,255,.25),transparent 55%)"></div>
        <div class="row between center"><div><div style="opacity:.85;font-size:12px">Plano atual</div><h3 style="color:#fff;font-size:22px">Redentora IA Pro</h3></div><span class="badge" style="background:rgba(255,255,255,.2);color:#fff;border:none">Ativo</span></div>
        <div class="row between center mt-2"><span style="opacity:.9">3 unidades · usuários ilimitados · IA completa</span><b style="font-size:20px">R$ 499<small style="font-weight:500">/mês</small></b></div></div>
      <div class="mini-metrics mb-1">
        <div class="mm"><div class="l">Notas fiscais/mês</div><div class="v">1.284<small class="muted" style="font-size:12px"> / ∞</small></div></div>
        <div class="mm"><div class="l">Armazenamento</div><div class="v">4,2<small class="muted" style="font-size:12px"> / 50 GB</small></div></div>
        <div class="mm"><div class="l">Próx. cobrança</div><div class="v" style="font-size:16px">01/08/2026</div></div>
      </div>
      <div class="row gap-xs mt-3"><button class="btn primary">${icon('star')} Gerenciar plano</button><button class="btn ghost">Ver faturas</button></div>`}); }
  };

  App.register('config',{render});
})();