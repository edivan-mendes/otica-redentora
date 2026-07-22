/* ============ Funcionários (Cadastro) ============ */
(function(){
  const m0=v=>fmt.money(v,0);

  function render(){
    const list = (DATA.funcionarios||[]);
    const ativos = list.filter(f=>f.status!=='Inativo').length;
    const kpis=`<div class="grid g-4" style="margin-bottom:var(--gap)">
      ${kpiCard({label:'Funcionários',value:list.length,delta:0,icon:'users',tone:'primary',fmt:fmt.num,sub:'na equipe'})}
      ${kpiCard({label:'Ativos',value:ativos,delta:0,icon:'check-circle',tone:'success',fmt:fmt.num})}
      ${kpiCard({label:'Vendas da equipe',value:0,delta:0,icon:'dollar-sign',tone:'info',fmt:fmt.moneyK,sub:'no mês'})}
      ${kpiCard({label:'Ticket médio',value:0,delta:0,icon:'tag',tone:'violet',fmt:m0})}
    </div>`;

    const rows=list.map(f=>`<tr>
      <td><div class="cell-user">${avatar(f.nome)}<div><b>${f.nome}</b><span>${f.email||''}</span></div></div></td>
      <td><span class="badge">${f.cargo||'—'}</span></td>
      <td>${f.contato||'—'}</td>
      <td class="td-c">${f.admissao||'—'}</td>
      <td>${statusBadge(f.status||'Ativo')}</td>
      <td class="td-r"><button class="icon-btn">${icon('edit')}</button></td></tr>`).join('');

    const body = list.length
      ? `<div class="table-wrap"><table class="data"><thead><tr><th>Funcionário</th><th>Cargo</th><th>Contato</th><th class="td-c">Admissão</th><th>Status</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>`
      : `<div class="empty" style="padding:56px 20px">${icon('users')}<h3 style="font-size:16px;margin-bottom:6px">Nenhum funcionário cadastrado</h3><p style="max-width:380px;margin:0 auto 16px">Cadastre sua equipe (vendedores, óticos e administrativo) para acompanhar metas, comissões e permissões.</p><button class="btn primary" onclick="openFuncionarioForm()">${icon('plus')} Cadastrar funcionário</button></div>`;

    return `<div class="page">
      ${pageHead('Funcionários','Equipe da ótica — vendedores, óticos e administrativo, com metas e comissões.',{crumbs:['Cadastros'],actions:`
        <button class="btn ghost" onclick="App.go('config')">${icon('shield')}<span class="hide-sm">Permissões</span></button>
        <button class="btn primary" onclick="openFuncionarioForm()">${icon('plus')} Novo funcionário</button>`})}
      ${kpis}
      ${panel({title:'Equipe',sub:list.length+' cadastrados',icon:'users',pad:false,
        actions:`<label class="search" style="max-width:260px;height:38px"><span>${icon('search')}</span><input placeholder="Buscar funcionário..."></label>`,
        body})}
    </div>`;
  }

  window.openFuncionarioForm=function(){
    openModal(`<div class="modal-head"><h3>Novo funcionário</h3><button class="icon-btn" onclick="closeModal()">${icon('x')}</button></div>
      <div class="card-body">
        <div class="grid g-2" style="gap:12px">
          <div class="field"><label>Nome completo</label><input class="input" placeholder="Nome do funcionário"></div>
          <div class="field"><label>CPF</label><input class="input" placeholder="000.000.000-00"></div>
          <div class="field"><label>Cargo / Função</label><select class="input"><option>Vendedor(a)</option><option>Ótico(a)</option><option>Gerente</option><option>Caixa</option><option>Administrativo</option></select></div>
          <div class="field"><label>Contato (telefone)</label><input class="input" placeholder="(00) 00000-0000"></div>
          <div class="field"><label>E-mail</label><input class="input" placeholder="email@oticaredentora.com"></div>
          <div class="field"><label>Data de admissão</label><input class="input" type="date"></div>
          <div class="field"><label>Meta mensal (R$)</label><input class="input" type="number" placeholder="0"></div>
          <div class="field"><label>Comissão (%)</label><input class="input" type="number" placeholder="3"></div>
        </div>
      </div>
      <div class="modal-head" style="border-top:1px solid var(--border);border-bottom:none;justify-content:flex-end;gap:10px">
        <button class="btn ghost" onclick="closeModal()">Cancelar</button>
        <button class="btn primary" onclick="closeModal();toast('Funcionário cadastrado','success')">${icon('check')} Salvar</button></div>`,{lg:true});
  };

  App.register('funcionarios',{render});
})();