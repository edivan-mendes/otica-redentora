/* ============ Fornecedores (Cadastro) ============ */
(function(){
  const m0=v=>fmt.money(v,0);

  function render(){
    const list = (DATA.fornecedores||[]);
    const kpis=`<div class="grid g-4" style="margin-bottom:var(--gap)">
      ${kpiCard({label:'Fornecedores',value:list.length,delta:0,icon:'truck',tone:'primary',fmt:fmt.num,sub:'cadastrados'})}
      ${kpiCard({label:'Pedidos no mês',value:0,delta:0,icon:'clipboard-list',tone:'info',fmt:fmt.num})}
      ${kpiCard({label:'Valor comprado',value:0,delta:0,icon:'dollar-sign',tone:'success',fmt:fmt.moneyK})}
      ${kpiCard({label:'Prazo médio',value:0,delta:0,icon:'clock',tone:'warning',fmt:v=>v+' dias'})}
    </div>`;

    const rows=list.map(f=>`<tr>
      <td><div class="cell-user"><div class="av-circ av-sq t-primary" style="background:var(--primary-soft);color:var(--primary)">${icon('truck')}</div><div><b>${f.nome}</b><span>${f.cnpj||''}</span></div></div></td>
      <td>${f.categoria||'—'}</td>
      <td>${f.contato||'—'}</td>
      <td>${f.cidade||'—'}</td>
      <td class="td-c">${f.ultima||'—'}</td>
      <td class="td-r"><button class="icon-btn">${icon('edit')}</button></td></tr>`).join('');

    const body = list.length
      ? `<div class="table-wrap"><table class="data"><thead><tr><th>Fornecedor</th><th>Categoria</th><th>Contato</th><th>Cidade</th><th class="td-c">Última compra</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>`
      : `<div class="empty" style="padding:56px 20px">${icon('truck')}<h3 style="font-size:16px;margin-bottom:6px">Nenhum fornecedor cadastrado</h3><p style="max-width:380px;margin:0 auto 16px">Cadastre seus fornecedores de armações, lentes e insumos para controlar pedidos, prazos e custos.</p><button class="btn primary" onclick="openFornecedorForm()">${icon('plus')} Cadastrar fornecedor</button></div>`;

    return `<div class="page">
      ${pageHead('Fornecedores','Cadastro de fornecedores de armações, lentes, lentes de contato e insumos.',{crumbs:['Cadastros'],actions:`
        <button class="btn ghost">${icon('download')}<span class="hide-sm">Exportar</span></button>
        <button class="btn primary" onclick="openFornecedorForm()">${icon('plus')} Novo fornecedor</button>`})}
      ${kpis}
      ${panel({title:'Fornecedores',sub:list.length+' cadastrados',icon:'truck',pad:false,
        actions:`<label class="search" style="max-width:260px;height:38px"><span>${icon('search')}</span><input placeholder="Buscar fornecedor..."></label>`,
        body})}
    </div>`;
  }

  window.openFornecedorForm=function(){
    openModal(`<div class="modal-head"><h3>Novo fornecedor</h3><button class="icon-btn" onclick="closeModal()">${icon('x')}</button></div>
      <div class="card-body">
        <div class="grid g-2" style="gap:12px">
          <div class="field"><label>Nome / Razão social</label><input class="input" placeholder="Nome do fornecedor"></div>
          <div class="field"><label>CNPJ</label><input class="input" placeholder="00.000.000/0000-00"></div>
          <div class="field"><label>Categoria</label><select class="input"><option>Armações</option><option>Lentes</option><option>Lentes de contato</option><option>Insumos / Acessórios</option><option>Serviços</option></select></div>
          <div class="field"><label>Contato (telefone)</label><input class="input" placeholder="(00) 00000-0000"></div>
          <div class="field"><label>E-mail</label><input class="input" placeholder="email@fornecedor.com"></div>
          <div class="field"><label>Cidade / UF</label><input class="input" placeholder="Cidade/UF"></div>
        </div>
        <div class="field mt-2"><label>Observações</label><textarea class="input" placeholder="Prazo de entrega, condições de pagamento, contato comercial..."></textarea></div>
      </div>
      <div class="modal-head" style="border-top:1px solid var(--border);border-bottom:none;justify-content:flex-end;gap:10px">
        <button class="btn ghost" onclick="closeModal()">Cancelar</button>
        <button class="btn primary" onclick="closeModal();toast('Fornecedor cadastrado','success')">${icon('check')} Salvar</button></div>`,{lg:true});
  };

  App.register('fornecedores',{render});
})();