/* ============ Financeiro ============ */
(function(){
  const m0=v=>fmt.money(v,0);
  function render(){
    const f=DATA.finKpis;
    const kpis=`<div class="grid g-4" style="margin-bottom:var(--gap)">
      ${kpiCard({label:'Receita do mês',value:f.receita,delta:8.7,icon:'trending-up',tone:'success',fmt:fmt.moneyK})}
      ${kpiCard({label:'Despesas',value:f.despesa,delta:3.1,icon:'trending-down',tone:'danger',fmt:fmt.moneyK})}
      ${kpiCard({label:'Lucro líquido',value:f.lucro,delta:14,icon:'dollar-sign',tone:'primary',fmt:fmt.moneyK})}
      ${kpiCard({label:'Margem líquida',value:f.margem,delta:1.9,icon:'percent',tone:'violet',fmt:v=>fmt.dec(v)+'%'})}
    </div>
    <div class="grid g-4" style="margin-bottom:var(--gap)">
      ${kpiCard({label:'Saldo em caixa',value:f.saldo,delta:12,icon:'wallet',tone:'success',fmt:fmt.moneyK})}
      ${kpiCard({label:'Contas a receber',value:f.aReceber,delta:5,icon:'arrow-down-right',tone:'info',fmt:fmt.moneyK})}
      ${kpiCard({label:'Contas a pagar',value:f.aPagar,delta:-4,icon:'arrow-up-right',tone:'warning',fmt:fmt.moneyK})}
      ${kpiCard({label:'Inadimplência',value:f.inadimplencia,delta:-0.8,icon:'alert-triangle',tone:'danger',fmt:v=>fmt.dec(v)+'%'})}
    </div>`;

    const fluxo=Charts.area(DATA.fluxo30.labels,[{name:'Saldo acumulado',color:'var(--c1)',data:DATA.fluxo30.saldo}],{h:270});

    const dreRows=DATA.dre.map(d=>{
      const bold=['subtotal','total'].includes(d.tipo);
      const color=d.valor<0?'neg-txt':d.tipo==='total'?'pos-txt':'';
      return `<tr style="${bold?'background:var(--surface-2)':''}">
        <td style="padding-left:${16+d.nivel*16}px;${bold?'font-weight:800':''}">${d.conta}</td>
        <td class="td-r ${color} num" style="${bold?'font-weight:800;font-size:14px':''}">${m0(d.valor)}</td></tr>`;}).join('');

    const pagRows=DATA.contasPagar.map(c=>`<tr>
      <td><b>${c.desc}</b><div><small class="muted">${c.cat}</small></div></td>
      <td class="td-c">${c.venc}</td><td>${statusBadge(c.status)}</td>
      <td class="td-r"><b class="num">${m0(c.valor)}</b></td></tr>`).join('');
    const recRows=DATA.contasReceber.map(c=>`<tr>
      <td><b>${c.desc}</b><div><small class="muted">${c.parc!=='—'?'Parcela '+c.parc:'À vista'}</small></div></td>
      <td class="td-c">${c.venc}</td><td>${statusBadge(c.status)}</td>
      <td class="td-r"><b class="num">${m0(c.valor)}</b></td></tr>`).join('');

    const comissRows=DATA.vendedores.map(v=>`<tr>
      <td><div class="cell-user">${avatar(v.nome)}<div><b>${v.nome}</b><span>Base ${m0(v.vendas)}</span></div></div></td>
      <td class="td-c"><span class="badge">3%</span></td>
      <td class="td-r"><b class="num pos-txt">${m0(v.vendas*0.03)}</b></td></tr>`).join('');

    return `<div class="page">
      ${pageHead('Financeiro','Fluxo de caixa, contas a pagar e receber, DRE, comissões e inadimplência.',{crumbs:[],actions:`
        <div class="segmented"><button>Semana</button><button class="active">Mês</button><button>Ano</button></div>
        <button class="btn primary" onclick="toast('Novo lançamento (demo)','info')">${icon('plus')} Lançamento</button>`})}
      ${kpis}
      <div class="grid g-3" style="margin-bottom:var(--gap)">
        ${panel({title:'Fluxo de caixa projetado',sub:'Saldo acumulado — próximos 30 dias',icon:'wallet',tone:'primary',cls:'span-2',
          actions:`<span class="badge success dot">Saldo saudável</span>`,body:fluxo})}
        ${panel({title:'DRE Gerencial',sub:'Resultado do mês',icon:'bar-chart-3',tone:'success',pad:false,
          body:`<div class="table-wrap"><table class="data"><tbody>${dreRows}</tbody></table></div>`})}
      </div>
      <div class="grid g-2" style="margin-bottom:var(--gap)">
        ${panel({title:'Contas a pagar',sub:m0(DATA.finKpis.aPagar)+' em aberto',icon:'arrow-up-right',tone:'warning',pad:false,
          body:`<div class="table-wrap"><table class="data"><thead><tr><th>Descrição</th><th class="td-c">Vencimento</th><th>Status</th><th class="td-r">Valor</th></tr></thead><tbody>${pagRows}</tbody></table></div>`})}
        ${panel({title:'Contas a receber',sub:m0(DATA.finKpis.aReceber)+' previstos',icon:'arrow-down-right',tone:'info',pad:false,
          body:`<div class="table-wrap"><table class="data"><thead><tr><th>Descrição</th><th class="td-c">Vencimento</th><th>Status</th><th class="td-r">Valor</th></tr></thead><tbody>${recRows}</tbody></table></div>`})}
      </div>
      ${panel({title:'Comissões por vendedor',sub:'Base do mês · 3% sobre vendas',icon:'award',tone:'violet',pad:false,
        actions:`<button class="btn sm ghost">${icon('download')} Fechar folha</button>`,
        body:`<div class="table-wrap"><table class="data"><thead><tr><th>Vendedor</th><th class="td-c">%</th><th class="td-r">Comissão</th></tr></thead><tbody>${comissRows}</tbody></table></div>`})}
    </div>`;
  }
  App.register('financeiro',{render});
})();