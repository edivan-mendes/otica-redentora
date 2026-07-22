/* ============ Estoque — controle completo ============ */
(function(){
  const m0=v=>fmt.money(v,0);
  function render(){
    const r=DATA.estoqueResumo;
    const kpis=`<div class="grid g-6" style="margin-bottom:var(--gap)">
      ${miniKpi('Valor total',fmt.moneyK(r.valorTotal),'wallet','success')}
      ${miniKpi('Itens em estoque',fmt.num(r.itens),'package','primary')}
      ${miniKpi('SKUs',fmt.num(r.skus),'layers','info')}
      ${miniKpi('Giro anual',r.giro+'x','repeat','violet')}
      ${miniKpi('Produtos parados',r.parados,'clock','warning')}
      ${miniKpi('Abaixo do mín.',r.abaixoMin,'alert-triangle','danger')}
    </div>`;

    const abc=DATA.curvaABC;
    const abcDonut=Charts.donut(abc.map(c=>({label:'Classe '+c.classe,v:c.valor,c:c.cor})),{size:160,center:`<div class="rv" style="font-size:14px">${fmt.moneyK(r.valorTotal)}</div><div class="rl">total</div>`});
    const abcLegend=`<div class="legend">${abc.map(c=>`<div class="li"><span class="sw" style="background:${c.cor}"></span>Classe ${c.classe} · ${c.itens} itens<span class="lv">${fmt.moneyK(c.valor)}</span></div>`).join('')}</div>`;

    const movRows=DATA.movimentacoes.map(mv=>{
      const t={'Entrada':'success','Saída':'danger','Transferência':'info','Ajuste':'warning'}[mv.tipo];
      const ic={'Entrada':'arrow-down-right','Saída':'arrow-up-right','Transferência':'repeat','Ajuste':'sliders'}[mv.tipo];
      return `<tr>
        <td><span class="badge ${t} dot">${mv.tipo}</span></td>
        <td><b>${mv.produto}</b></td>
        <td class="td-c"><b class="num ${mv.qtd<0?'neg-txt':'pos-txt'}">${mv.qtd>0?'+':''}${mv.qtd}</b></td>
        <td class="mono muted" style="font-size:12px">${mv.doc}</td>
        <td>${mv.resp}</td>
        <td class="td-c">${mv.data}</td>
        <td class="td-r num ${mv.valor<0?'neg-txt':mv.valor>0?'pos-txt':'muted'}">${mv.valor?m0(mv.valor):'—'}</td>
      </tr>`;}).join('');

    const repor=DATA.reporSugestao.map(p=>`
      <div class="lrow"><div class="ai t-${p.risco==='alto'?'danger':p.risco==='medio'?'warning':'success'}" style="width:34px;height:34px;border-radius:10px;display:grid;place-items:center">${icon('package')}</div>
        <div class="grow"><b>${p.produto}</b><small>Atual ${p.atual} · mín ${p.min} · zera em ~${p.dias} dias</small></div>
        <div style="text-align:right">${p.sugestao>0?`<span class="badge primary">Comprar ${p.sugestao}</span>`:`<span class="badge success">OK</span>`}</div></div>`).join('');

    return `<div class="page">
      ${pageHead('Estoque','Entradas, saídas, transferências, inventário, curva ABC e alertas de reposição.',{crumbs:['Operação'],actions:`
        <button class="btn ghost">${icon('scan')}<span class="hide-sm">Inventário</span></button>
        <button class="btn ghost" onclick="openMov('Saída')">${icon('minus')}<span class="hide-sm">Saída</span></button>
        <button class="btn primary" onclick="openMov('Entrada')">${icon('plus')} Entrada</button>`})}
      ${kpis}
      ${aiBanner({text:'A IA sugere <b>comprar 20 armações Ray-Ban</b> e <b>40 lentes Zeiss Blue</b> para evitar ruptura nos próximos 6 dias.',cta:'Gerar pedido',route:'ia'})}
      <div class="grid g-3" style="margin-bottom:var(--gap)">
        ${panel({title:'Curva ABC',sub:'Concentração de valor no estoque',icon:'layers',tone:'violet',body:`<div class="row center" style="gap:16px"><div>${abcDonut}</div><div class="f-1">${abcLegend}</div></div>`})}
        ${panel({title:'Sugestão de reposição inteligente',sub:'Baseada em giro e lead time — Redentora IA',icon:'sparkles',tone:'primary',cls:'span-2',
          actions:`<button class="btn sm soft">${icon('shopping-cart')} Gerar pedido</button>`,
          body:`<div class="col" style="gap:2px">${repor}</div>`})}
      </div>
      ${panel({title:'Estoque inteligente',sub:'Rating, rotatividade, capital parado e curva ABC por produto',icon:'sparkles',tone:'violet',pad:false,cls:'reveal',
        actions:`<span class="badge violet dot">Redentora IA</span>`,
        body:`<div class="table-wrap"><table class="data"><thead><tr><th>Produto</th><th>Classificação</th><th class="td-c">Curva</th><th class="td-c">Giro</th><th class="td-c">Margem</th><th class="td-c">Última venda</th><th class="td-c">Dias parado</th><th class="td-r">Capital parado</th></tr></thead><tbody>${DATA.estoqueInteligente.map(p=>`<tr><td><b>${p.nome}</b><div style="margin-top:3px">${stars(p.rating)}</div></td><td><span class="badge ${p.tagTone} dot">${p.tag}</span></td><td class="td-c"><span class="badge">${p.curva}</span></td><td class="td-c num">${p.giro}x</td><td class="td-c num">${p.margem}%</td><td class="td-c">${p.ultima}</td><td class="td-c num ${p.dias>40?'neg-txt':''}">${p.dias}d</td><td class="td-r num">${fmt.money(p.capital,0)}</td></tr>`).join('')}</tbody></table></div>`})}
      ${panel({title:'Histórico de movimentações',sub:'Entradas, saídas, transferências e ajustes',icon:'repeat',pad:false,
        actions:`<div class="row gap-xs">${filterChips(['Tudo','Entradas','Saídas','Transf.','Ajustes'])}</div>`,
        body:`<div class="table-wrap"><table class="data"><thead><tr><th>Tipo</th><th>Produto</th><th class="td-c">Qtd</th><th>Documento</th><th>Responsável</th><th class="td-c">Data</th><th class="td-r">Valor</th></tr></thead><tbody>${movRows}</tbody></table></div>`})}
    </div>`;
  }

  function miniKpi(l,v,ic,tone){
    return `<div class="card pad reveal hover"><div class="row between center"><div class="ico t-${tone}" style="width:38px;height:38px;border-radius:11px;display:grid;place-items:center">${icon(ic)}</div></div>
      <div class="big-num" style="font-size:23px;margin-top:12px">${v}</div><div class="muted" style="font-size:12px;font-weight:600">${l}</div></div>`;
  }

  window.openMov=function(tipo){
    openModal(`<div class="modal-head"><h3>Movimentação · ${tipo}</h3><button class="icon-btn" onclick="closeModal()">${icon('x')}</button></div>
      <div class="card-body">
        <div class="input-ico mb-1">${icon('scan')}<input class="input" placeholder="Bipar código de barras ou buscar produto"></div>
        <div class="grid g-2 mt-2" style="gap:12px">
          <div class="field"><label>Quantidade</label><input class="input" type="number" value="1"></div>
          <div class="field"><label>Estoque destino</label><select class="input"><option>Matriz Centro</option><option>Filial Shopping</option><option>Filial Norte</option></select></div>
          <div class="field"><label>Documento / NF</label><input class="input" placeholder="NF 00000"></div>
          <div class="field"><label>Lote</label><input class="input" placeholder="Opcional"></div>
        </div>
      </div>
      <div class="modal-head" style="border-top:1px solid var(--border);border-bottom:none;justify-content:flex-end;gap:10px">
        <button class="btn ghost" onclick="closeModal()">Cancelar</button>
        <button class="btn primary" onclick="closeModal();toast('${tipo} registrada no estoque','success')">${icon('check')} Confirmar</button></div>`);
  };

  App.register('estoque',{render});
})();
