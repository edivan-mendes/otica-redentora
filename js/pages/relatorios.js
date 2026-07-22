/* ============ Relatórios ============ */
(function(){
  function render(){
    const cats=[...new Set(DATA.relatorios.map(r=>r.cat))];
    const cards=DATA.relatorios.map(r=>`
      <div class="card pad hover reveal" style="cursor:pointer" onclick="openReport('${r.nome}')">
        <div class="row between center mb-1">
          <div class="ico t-${toneFor(r.cat)}" style="width:42px;height:42px;border-radius:12px;display:grid;place-items:center">${icon(r.ico)}</div>
          ${icon('arrow-up-right','muted')}</div>
        <b style="font-size:14.5px">${r.nome}</b>
        <div class="muted" style="font-size:12px;margin:4px 0 10px;line-height:1.4">${r.desc}</div>
        <span class="badge">${r.cat}</span></div>`).join('');

    return `<div class="page">
      ${pageHead('Relatórios','Central com dezenas de relatórios profissionais — exporte em PDF, Excel ou agende envios.',{crumbs:['Crescimento'],actions:`
        <button class="btn ghost">${icon('clock')}<span class="hide-sm">Agendados</span></button>
        <button class="btn primary" onclick="toast('Construtor de relatório (demo)','info')">${icon('plus')} Relatório personalizado</button>`})}
      ${aiBanner({text:'Destaque da IA: o relatório de <b>Ciclo de Troca (LTV)</b> revela <b>34 clientes</b> prontos para recompra este mês.',cta:'Abrir relatório',action:"openReport('Ciclo de Troca (LTV)')"})}
      <div class="card pad reveal" style="margin-bottom:var(--gap)">
        <div class="row between center fw" style="gap:12px">
          <div class="input-ico f-1" style="min-width:220px">${icon('search')}<input class="input" placeholder="Buscar relatório..." style="padding-left:40px"></div>
          <div>${filterChips(['Todos',...cats])}</div>
        </div>
      </div>
      <div class="grid g-4">${cards}</div>
    </div>`;
  }
  function toneFor(cat){ return {'Vendas':'primary','Estoque':'info','Financeiro':'success','Pessoas':'violet','Relacionamento':'warning','Operação':'danger','Clientes':'info'}[cat]||'primary'; }

  window.openReport=function(nome){
    openModal(`<div class="modal-head"><div class="card-title-ico"><div class="ci t-primary">${icon('bar-chart-3')}</div><div><h3>${nome}</h3><div class="sub">Pré-visualização</div></div></div><button class="icon-btn" onclick="closeModal()">${icon('x')}</button></div>
      <div class="card-body">
        <div class="row gap-xs mb-1">
          <div class="field f-1"><label>Período</label><select class="input"><option>Este mês</option><option>Últimos 30 dias</option><option>Trimestre</option><option>Personalizado</option></select></div>
          <div class="field f-1"><label>Unidade</label><select class="input"><option>Todas</option><option>Matriz Centro</option><option>Filial Shopping</option></select></div>
        </div>
        ${Charts.area(DATA.faturamento12.labels,[{name:'Valor',color:'var(--c1)',data:DATA.faturamento12.real.map(v=>v*1000)}],{h:220})}
        <div class="mini-metrics mt-3">
          <div class="mm"><div class="l">Total</div><div class="v">R$ 487k</div></div>
          <div class="mm"><div class="l">Média</div><div class="v">R$ 16,2k</div></div>
          <div class="mm"><div class="l">Variação</div><div class="v pos-txt">+8,7%</div></div>
        </div>
      </div>
      <div class="modal-head" style="border-top:1px solid var(--border);border-bottom:none;justify-content:flex-end;gap:10px">
        <button class="btn ghost" onclick="toast('Exportado em Excel','success')">${icon('download')} Excel</button>
        <button class="btn primary" onclick="toast('PDF gerado','success');closeModal()">${icon('file-text')} Gerar PDF</button></div>`,{lg:true});
  };

  App.register('relatorios',{render});
})();
