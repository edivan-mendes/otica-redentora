/* ============ Redentora IA ============ */
(function(){
  const m0=v=>fmt.money(v,0);
  function render(){
    const pv=DATA.previsaoVendas;
    const prevChart=Charts.area(pv.labels,[
      {name:'Previsão IA',color:'var(--violet)',data:pv.prev.map(v=>v*1000)},
      {name:'Realizado',color:'var(--c1)',data:pv.real.map(v=>v==null?null:v*1000)},
      {name:'Cenário otimista',color:'var(--success)',data:pv.max.map(v=>v*1000),dash:true},
      {name:'Cenário conservador',color:'var(--faint)',data:pv.min.map(v=>v*1000),dash:true},
    ],{h:280});

    const insights=DATA.iaInsights.map(i=>`
      <div class="insight ai reveal">
        <div class="row between center">
          <div class="tag-ai">${icon(i.ico)} ${i.tipo}</div>
          <div class="ring-wrap" style="width:40px;height:40px">${Charts.ring(i.conf,{size:40,thickness:4,color:'var(--violet)',center:`<div style="font-size:10px;font-weight:800;font-family:var(--font-mono)">${i.conf}</div>`})}</div>
        </div>
        <h5 style="margin-top:6px">${i.t}</h5><p>${i.d}</p>
        <div class="row gap-xs mt-2"><button class="btn soft sm" onclick="toast('Ação aplicada','success')">${icon('zap')} Aplicar</button><button class="btn ghost sm" onclick="toast('Detalhes do modelo','info')">Detalhes</button></div>
      </div>`).join('');

    const compras=DATA.reporSugestao.map(p=>`<tr>
      <td><b>${p.produto}</b></td>
      <td class="td-c num">${p.atual}</td>
      <td class="td-c muted num">${p.min}</td>
      <td class="td-c"><span class="badge ${p.risco==='alto'?'danger':p.risco==='medio'?'warning':'success'} dot">${p.dias}d</span></td>
      <td class="td-c">${p.sugestao>0?`<b class="num pos-txt">+${p.sugestao}</b>`:'<span class="muted">—</span>'}</td>
      <td class="td-r"><button class="btn sm ${p.sugestao>0?'soft':'ghost'}" onclick="toast('Adicionado ao pedido de compra','success')">${icon('shopping-cart')}</button></td></tr>`).join('');

    const troca=DATA.clientesTroca.map(c=>`<div class="lrow">
      <div class="ring-wrap" style="width:42px;height:42px">${Charts.ring(c.prob,{size:42,thickness:4,color:c.prob>=80?'var(--success)':'var(--warning)',center:`<div style="font-size:10px;font-weight:800;font-family:var(--font-mono)">${c.prob}%</div>`})}</div>
      <div class="grow"><b>${c.nome}</b><small>Ciclo ${c.ciclo} · última ${c.ultima}</small></div>
      <div style="text-align:right"><b class="num pos-txt">${m0(c.potencial)}</b><div><button class="btn success sm" onclick="toast('WhatsApp enviado','success')">${icon('message-circle')}</button></div></div></div>`).join('');

    return `<div class="page">
      ${pageHead('Redentora IA','Inteligência artificial aplicada à sua ótica — previsões, recomendações e insights automáticos.',{crumbs:['Inteligência'],actions:`
        <span class="badge violet dot">Modelos atualizados hoje</span>
        <button class="btn primary" onclick="toast('Recalculando modelos...','info')">${icon('refresh-cw')} Recalcular</button>`})}

      <div class="card reveal" style="margin-bottom:var(--gap);background:linear-gradient(135deg,rgba(124,92,255,.14),rgba(47,107,255,.08));border-color:rgba(124,92,255,.3);overflow:hidden;position:relative">
        <div class="card-body" style="display:flex;gap:20px;align-items:center;flex-wrap:wrap">
          <div class="ico t-violet" style="width:56px;height:56px;border-radius:16px;display:grid;place-items:center;flex-shrink:0">${icon('sparkles')}</div>
          <div class="f-1" style="min-width:240px">
            <div class="tag-ai">${icon('cpu')} Resumo executivo gerado por IA</div>
            <p style="font-size:15px;line-height:1.55;color:var(--text)">Seu negócio está <b>8,7% acima da meta</b> e a projeção de fechamento é <b>R$ 658k</b>. Priorize <b>34 clientes prontos para trocar</b> (potencial R$ 28,6k) e reponha <b>2 produtos em risco de ruptura</b> nos próximos 6 dias. O melhor turno para converter é <b>sábado, 14h–17h</b>.</p>
          </div>
          <button class="btn primary" onclick="App.go('crm')">${icon('zap')} Agir agora</button>
        </div>
      </div>

      <div class="grid g-4" style="margin-bottom:var(--gap)">
        ${confCard('Previsão dez/2026','R$ 720k',91,'trending-up','violet')}
        ${confCard('Risco de ruptura','2 SKUs',87,'package','danger')}
        ${confCard('Prob. de troca alta','34 clientes',84,'repeat','warning')}
        ${confCard('Inadimplência (ago)','2,6%',76,'shield','success')}
      </div>

      <div class="grid g-3" style="margin-bottom:var(--gap)">
        ${panel({title:'Previsão de vendas',sub:'Modelo preditivo com intervalo de confiança',icon:'trending-up',tone:'violet',cls:'span-2',
          body:prevChart+`<div class="chart-legend"><span class="cl"><span class="sw" style="background:var(--c1)"></span>Realizado</span><span class="cl"><span class="sw" style="background:var(--violet)"></span>Previsão IA</span><span class="cl"><span class="sw" style="background:var(--success)"></span>Otimista</span><span class="cl"><span class="sw" style="background:var(--faint)"></span>Conservador</span></div>`})}
        ${panel({title:'Clientes que vão trocar',sub:'Probabilidade preditiva',icon:'repeat',tone:'warning',body:`<div class="col" style="gap:2px">${troca}</div>`})}
      </div>

      <div class="grid g-3" style="margin-bottom:var(--gap)">
        ${panel({title:'Sugestão automática de compras',sub:'Previne ruptura com base em giro e lead time',icon:'shopping-cart',tone:'primary',cls:'span-2',pad:false,
          actions:`<button class="btn sm soft">Gerar pedido completo</button>`,
          body:`<div class="table-wrap"><table class="data"><thead><tr><th>Produto</th><th class="td-c">Atual</th><th class="td-c">Mín</th><th class="td-c">Ruptura</th><th class="td-c">Comprar</th><th></th></tr></thead><tbody>${compras}</tbody></table></div>`})}
        ${panel({title:'Melhor horário de vendas',sub:'Conversão por turno',icon:'clock',tone:'info',body:`
          ${Charts.heatmap(DATA.heatmap.dias,DATA.heatmap.horas,DATA.heatmap.data)}
          <div class="insight ai mt-2"><div class="tag-ai">${icon('sparkles')} Recomendação</div><p>Aloque a equipe sênior no <b>sábado 14h–17h</b>: +27% de conversão.</p></div>`})}
      </div>

      ${panel({title:'Insights automáticos',sub:'Recomendações acionáveis com nível de confiança',icon:'sparkles',tone:'violet',body:`<div class="grid g-3" style="gap:14px">${insights}</div>`})}
    </div>`;
  }
  function confCard(l,v,conf,ic,tone){
    return `<div class="card kpi hover reveal">
      <div class="top"><div><div class="label">${l}</div><div class="value" style="font-size:24px">${v}</div>
        <div class="foot"><span class="badge violet dot">Confiança ${conf}%</span></div></div>
        <div class="ico t-${tone}">${icon(ic)}</div></div></div>`;
  }
  App.register('ia',{render});
})();