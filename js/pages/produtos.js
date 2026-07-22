/* ============ Produtos — Armações, Lentes, LC, Acessórios ============ */
(function(){
  const m0=v=>fmt.money(v,0);
  const TABS=[['armacoes','Armações','glasses'],['lentes','Lentes','eye'],['contato','Lentes de contato','droplet'],['acessorios','Acessórios','box']];

  function render(param){
    const tab = TABS.find(t=>t[0]===param) ? param : 'armacoes';
    const kpis=`<div class="grid g-4" style="margin-bottom:var(--gap)">
      ${kpiCard({label:'SKUs ativos',value:346,delta:4,icon:'glasses',tone:'primary',fmt:fmt.num})}
      ${kpiCard({label:'Valor de tabela',value:842700,delta:6,icon:'tag',tone:'success',fmt:fmt.moneyK})}
      ${kpiCard({label:'Margem média',value:58.4,delta:1.8,icon:'percent',tone:'violet',fmt:v=>fmt.dec(v)+'%'})}
      ${kpiCard({label:'Abaixo do mínimo',value:8,delta:-12,icon:'alert-triangle',tone:'warning',fmt:fmt.num})}
    </div>`;
    const tabsHtml=`<div class="tabs">${TABS.map(t=>`<a class="tab ${t[0]===tab?'active':''}" href="#produtos/${t[0]}">${t[1]}</a>`).join('')}</div>`;
    return `<div class="page">
      ${pageHead('Produtos','Catálogo completo de armações, lentes, lentes de contato e acessórios.',{crumbs:['Cadastros'],actions:`
        <button class="btn ghost">${icon('scan')}<span class="hide-sm">Ler código</span></button>
        <button class="btn primary" onclick="toast('Novo produto (demo)','info')">${icon('plus')} Novo produto</button>`})}
      ${kpis}
      ${aiBanner({text:'A IA sugere destacar <b>armações Ray-Ban</b> na vitrine hoje — alta procura prevista para o período da tarde.',cta:'Ver catálogo',route:'catalogo'})}
      ${tabsHtml}
      ${renderTab(tab)}
    </div>`;
  }

  function renderTab(tab){
    if(tab==='armacoes'){
      const cards=DATA.armacoes.map(a=>`
        <div class="prod-card" onclick="toast('${a.marca} ${a.modelo}','info')">
          <div class="ph">${icon('glasses')}</div>
          <b>${a.marca}</b><small>${a.modelo}</small>
          <div class="row between center mt-1"><span class="pp">${m0(a.venda)}</span>
            <span class="badge ${a.estoque<=a.min?'danger':'success'} dot" style="font-size:10px">${a.estoque} un</span></div>
          <div class="row gap-xs mt-1"><span class="badge" style="font-size:10px">${a.cat}</span><span class="badge" style="font-size:10px">${a.local}</span></div>
        </div>`).join('');
      const rows=DATA.armacoes.map(a=>`
        <tr>
          <td><div class="cell-user"><div class="av-circ av-sq t-primary" style="background:var(--primary-soft);color:var(--primary)">${icon('glasses')}</div><div><b>${a.marca} ${a.modelo}</b><span>${a.cor} · ${a.material}</span></div></div></td>
          <td><span class="badge">${a.genero}</span></td>
          <td class="td-r muted num">${m0(a.custo)}</td>
          <td class="td-r"><b class="num">${m0(a.venda)}</b></td>
          <td class="td-c"><span class="badge ${a.estoque<=a.min?'danger':a.estoque<=a.min*1.5?'warning':'success'} dot">${a.estoque}</span></td>
          <td class="td-c">${a.local}</td>
          <td class="td-c mono muted" style="font-size:11px">${a.cod}</td>
        </tr>`).join('');
      return `<div class="col">
        ${panel({title:'Vitrine de armações',sub:'Visual do catálogo',icon:'image',tone:'violet',body:`<div class="pos-grid">${cards}</div>`})}
        ${panel({title:'Detalhamento',sub:'Custo, venda, estoque e localização',icon:'glasses',pad:false,body:`<div class="table-wrap"><table class="data"><thead><tr><th>Armação</th><th>Gênero</th><th class="td-r">Custo</th><th class="td-r">Venda</th><th class="td-c">Estoque</th><th class="td-c">Local</th><th class="td-c">Cód. barras</th></tr></thead><tbody>${rows}</tbody></table></div>`})}
      </div>`;
    }
    if(tab==='lentes'){
      const rows=DATA.lentes.map(l=>`<tr>
        <td><div class="cell-user"><div class="av-circ av-sq t-info" style="background:var(--info-soft);color:var(--info)">${icon('eye')}</div><div><b>${l.fab} ${l.tipo}</b><span>${l.material} · ${l.trat}</span></div></div></td>
        <td><span class="badge primary">Índice ${l.indice}</span></td>
        <td>${l.trat}</td>
        <td class="td-c">${l.prazo}</td>
        <td class="td-r"><b class="num">${m0(l.preco)}</b></td>
        <td>${l.forn}</td></tr>`).join('');
      return panel({title:'Lentes',sub:'Fabricante, índice, tratamentos e prazo de laboratório',icon:'eye',tone:'info',pad:false,
        body:`<div style="padding:14px 20px 0">${filterChips(['Todas','Multifocal','Visão simples','Filtro azul','Fotossensível','Antirreflexo'])}</div>
        <div class="table-wrap" style="padding-top:8px"><table class="data"><thead><tr><th>Lente</th><th>Índice</th><th>Tratamento</th><th class="td-c">Prazo lab.</th><th class="td-r">Preço</th><th>Fornecedor</th></tr></thead><tbody>${rows}</tbody></table></div>`});
    }
    if(tab==='contato'){
      const rows=DATA.contato.map(l=>`<tr>
        <td><div class="cell-user"><div class="av-circ av-sq t-primary" style="background:var(--primary-soft);color:var(--primary)">${icon('droplet')}</div><div><b>${l.marca}</b><span>${l.forn}</span></div></div></td>
        <td><span class="badge">${l.validade}</span></td>
        <td class="td-c mono">${l.grau}</td>
        <td class="td-c"><span class="badge ${l.estoque<15?'warning':'success'} dot">${l.estoque}</span></td>
        <td class="td-r"><b class="num">${m0(l.preco)}</b></td></tr>`).join('');
      return panel({title:'Lentes de contato',sub:'Grau, validade e estoque',icon:'droplet',tone:'primary',pad:false,
        body:`<div class="table-wrap"><table class="data"><thead><tr><th>Produto</th><th>Descarte</th><th class="td-c">Grau</th><th class="td-c">Estoque</th><th class="td-r">Preço</th></tr></thead><tbody>${rows}</tbody></table></div>`});
    }
    // acessorios
    const cards=DATA.acessorios.map(a=>`
      <div class="prod-card"><div class="ph">${icon('box')}</div><b>${a.nome}</b><small>${a.cat}</small>
        <div class="row between center mt-1"><span class="pp">${fmt.money(a.preco)}</span><span class="badge success dot" style="font-size:10px">${a.estoque}</span></div></div>`).join('');
    return panel({title:'Acessórios',sub:'Produtos de limpeza, estojos, cordões e kits',icon:'box',tone:'success',body:`<div class="pos-grid">${cards}</div>`});
  }

  App.register('produtos',{render});
})();
