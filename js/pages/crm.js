/* ============ CRM & Campanhas ============ */
(function(){
  const m0=v=>fmt.money(v,0);
  function render(){
    const kpis=`<div class="grid g-4" style="margin-bottom:var(--gap)">
      ${kpiCard({label:'Campanhas ativas',value:4,delta:1,icon:'megaphone',tone:'primary',fmt:fmt.num})}
      ${kpiCard({label:'Mensagens enviadas',value:2190,delta:22,icon:'send',tone:'info',fmt:fmt.num,sub:'no mês'})}
      ${kpiCard({label:'Taxa de conversão',value:18.4,delta:3.2,icon:'target',tone:'success',fmt:v=>fmt.dec(v)+'%'})}
      ${kpiCard({label:'Receita atribuída',value:64800,delta:28,icon:'dollar-sign',tone:'violet',fmt:fmt.moneyK})}
    </div>`;

    const campRows=DATA.campanhas.map(c=>`<tr>
      <td><b>${c.nome}</b></td>
      <td><span class="badge ${c.canal==='WhatsApp'?'success':c.canal==='E-mail'?'info':'warning'} dot">${c.canal}</span></td>
      <td class="td-c num">${fmt.num(c.enviadas)}</td>
      <td style="min-width:110px"><div class="bar success" style="height:7px"><i style="width:${c.abertura}%"></i></div><small class="muted">${c.abertura}% abertura</small></td>
      <td class="td-c"><span class="badge ${c.conversao>=20?'success':c.conversao>0?'warning':''}">${c.conversao}%</span></td>
      <td>${statusBadge(c.status)}</td>
      <td class="td-r"><b class="num pos-txt">${c.roi?m0(c.roi*10):'—'}</b></td></tr>`).join('');

    const funil=Charts.funnel(DATA.crmFunil);

    const aniv=DATA.aniversariantes.map(a=>`<div class="lrow"><div class="ai t-violet" style="width:34px;height:34px;border-radius:10px;display:grid;place-items:center">${icon('gift')}</div>
      <div class="grow"><b>${a.nome}</b><small>${a.data} · ${a.idade} anos</small></div>
      <button class="btn success sm" onclick="toast('Parabéns enviado a ${a.nome.split(' ')[0]}!','success')">${icon('message-circle')}</button></div>`).join('');

    const segmentos=[
      {t:'Prontos para trocar',n:34,d:'Ciclo de troca atingido',ic:'repeat',tone:'warning',pot:'R$ 28.600'},
      {t:'Receita vencendo',n:52,d:'Óculos com +18 meses',ic:'file-text',tone:'primary',pot:'R$ 41.200'},
      {t:'Inativos +12 meses',n:128,d:'Sem comprar há 1 ano',ic:'clock',tone:'danger',pot:'R$ 96.000'},
      {t:'Alto valor (VIP)',n:96,d:'LTV acima de R$ 15k',ic:'star',tone:'violet',pot:'Reter'},
    ].map(s=>`<div class="card pad hover reveal">
      <div class="row between center mb-1"><div class="ico t-${s.tone}" style="width:40px;height:40px;border-radius:12px;display:grid;place-items:center">${icon(s.ic)}</div><span class="big-num" style="font-size:24px">${s.n}</span></div>
      <b style="font-size:14px">${s.t}</b><div class="muted" style="font-size:12px;margin:3px 0 10px">${s.d}</div>
      <div class="row between center"><span class="badge success" style="font-size:11px">Potencial ${s.pot}</span><button class="btn soft sm" onclick="toast('Campanha criada p/ ${s.n} clientes','success')">${icon('send')}</button></div></div>`).join('');

    return `<div class="page">
      ${pageHead('CRM & Campanhas','Relacionamento, automações de WhatsApp/SMS/e-mail, pós-venda e segmentação inteligente.',{crumbs:['Crescimento'],actions:`
        <button class="btn ghost" onclick="App.go('ia')">${icon('sparkles')}<span class="hide-sm">Sugerir IA</span></button>
        <button class="btn primary" onclick="toast('Nova campanha (demo)','info')">${icon('plus')} Nova campanha</button>`})}
      ${kpis}
      ${aiBanner({text:'<b>53 clientes</b> estão prontos para uma campanha de recompra — potencial estimado de <b>R$ 44.700</b> este mês.',cta:'Criar campanha',action:"toast('Campanha inteligente criada para 53 clientes','success')"})}
      <div class="grid g-4" style="margin-bottom:var(--gap)">${segmentos}</div>
      <div class="grid g-3" style="margin-bottom:var(--gap)">
        ${panel({title:'Funil de conversão',sub:'Do lead à venda no mês',icon:'target',tone:'primary',cls:'span-2',body:funil})}
        ${panel({title:'Aniversariantes',sub:'Envio automático de felicitações',icon:'gift',tone:'violet',
          actions:`<span class="badge violet">4 hoje/semana</span>`,body:`<div class="col" style="gap:2px">${aniv}</div>`})}
      </div>
      ${panel({title:'Campanhas',sub:'Desempenho por canal',icon:'megaphone',pad:false,
        body:`<div class="table-wrap"><table class="data"><thead><tr><th>Campanha</th><th>Canal</th><th class="td-c">Enviadas</th><th>Engajamento</th><th class="td-c">Conversão</th><th>Status</th><th class="td-r">Receita</th></tr></thead><tbody>${campRows}</tbody></table></div>`})}
    </div>`;
  }
  App.register('crm',{render});
})();
