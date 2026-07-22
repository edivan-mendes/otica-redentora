/* ============ Fiscal ============ */
(function(){
  const m0=v=>fmt.money(v,0);
  function render(){
    const k=DATA.fiscalKpis;
    const kpis=`<div class="grid g-4" style="margin-bottom:var(--gap)">
      ${kpiCard({label:'Notas emitidas',value:k.emitidas,delta:9,icon:'receipt',tone:'primary',fmt:fmt.num,sub:'no mês'})}
      ${kpiCard({label:'Autorizadas',value:k.autorizadas,delta:9,icon:'check-circle',tone:'success',fmt:fmt.num})}
      ${kpiCard({label:'Pendentes / rejeitadas',value:k.pendentes,delta:-3,icon:'clock',tone:'warning',fmt:fmt.num})}
      ${kpiCard({label:'Impostos apurados',value:k.impostos,delta:4,icon:'percent',tone:'violet',fmt:fmt.moneyK})}
    </div>`;

    const rows=DATA.fiscal.map(n=>`<tr>
      <td><span class="badge ${n.tipo==='NF-e'?'primary':n.tipo==='NFC-e'?'info':'violet'} dot">${n.tipo}</span></td>
      <td class="mono">${n.numero}</td>
      <td>${n.cliente}</td>
      <td class="td-c">${n.data}</td>
      <td>${statusBadge(n.status)}</td>
      <td class="td-r"><b class="num">${m0(n.valor)}</b></td>
      <td class="td-r"><button class="icon-btn" onclick="toast('Baixando XML da nota ${n.numero}','info')">${icon('download')}</button></td></tr>`).join('');

    const tipos=[{label:'NFC-e (consumidor)',v:842,c:'var(--c2)'},{label:'NF-e (produto)',v:312,c:'var(--c1)'},{label:'NFS-e (serviço)',v:130,c:'var(--c3)'}];

    return `<div class="page">
      ${pageHead('Fiscal','Emissão e gestão de NF-e, NFC-e, NFS-e, apuração de impostos e SPED.',{crumbs:['Financeiro'],actions:`
        <button class="btn ghost">${icon('download')}<span class="hide-sm">Exportar XML</span></button>
        <button class="btn ghost" onclick="toast('Gerando arquivo SPED...','info')">${icon('file-text')}<span class="hide-sm">SPED</span></button>
        <button class="btn primary" onclick="toast('Emitindo nota fiscal...','success')">${icon('plus')} Emitir nota</button>`})}
      ${kpis}
      ${aiBanner({text:'Compliance em dia: <b>nenhuma inconsistência tributária</b> detectada este mês. Próxima obrigação: <b>SPED Fiscal em 20/08</b>.',cta:'Ver agenda fiscal',route:'agenda'})}
      <div class="grid g-3" style="margin-bottom:var(--gap)">
        ${panel({title:'Documentos por tipo',sub:'Distribuição no mês',icon:'pie-chart',tone:'info',body:`
          <div class="row center" style="gap:16px">${Charts.donut(tipos,{size:150,center:'<div class="rv" style="font-size:15px">1.284</div><div class="rl">notas</div>'})}
          <div class="f-1 legend">${tipos.map(t=>`<div class="li"><span class="sw" style="background:${t.c}"></span>${t.label}<span class="lv">${t.v}</span></div>`).join('')}</div></div>`})}
        ${panel({title:'Situação SEFAZ',sub:'Integração em tempo real',icon:'shield',tone:'success',cls:'span-2',body:`
          <div class="grid g-3" style="gap:14px">
            <div class="card pad" style="text-align:center;border-top:3px solid var(--success)"><div class="big-num" style="color:var(--success)">99,7%</div><div class="muted" style="font-size:12px">Taxa de autorização</div></div>
            <div class="card pad" style="text-align:center;border-top:3px solid var(--primary)"><div class="big-num" style="color:var(--primary)">1,2s</div><div class="muted" style="font-size:12px">Tempo médio autorização</div></div>
            <div class="card pad" style="text-align:center;border-top:3px solid var(--info)"><div class="big-num" style="color:var(--info)">Online</div><div class="muted" style="font-size:12px">Status SEFAZ-SP</div></div>
          </div>
          <div class="insight ai mt-3"><div class="tag-ai">${icon('sparkles')} Compliance IA</div><p>Nenhuma inconsistência tributária detectada este mês. Próxima obrigação: <b>SPED Fiscal — 20/08</b>.</p></div>`})}
      </div>
      ${panel({title:'Documentos fiscais',sub:'Histórico e download de XML',icon:'receipt',pad:false,
        actions:`<label class="search" style="max-width:220px;height:38px"><span>${icon('search')}</span><input placeholder="Buscar nota..."></label>`,
        body:`<div style="padding:14px 20px 0">${filterChips(['Todas','NF-e','NFC-e','NFS-e','Canceladas','Pendentes'])}</div>
        <div class="table-wrap" style="padding-top:8px"><table class="data"><thead><tr><th>Tipo</th><th>Número</th><th>Cliente</th><th class="td-c">Data</th><th>Status</th><th class="td-r">Valor</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>`})}
    </div>`;
  }
  App.register('fiscal',{render});
})();
