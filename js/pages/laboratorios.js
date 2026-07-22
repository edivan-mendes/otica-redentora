/* ============ Laboratórios ============ */
(function(){
  const m0=v=>fmt.money(v,0);
  function render(){
    const labs=DATA.laboratorios;
    const kpis=`<div class="grid g-4" style="margin-bottom:var(--gap)">
      ${kpiCard({label:'Laboratórios ativos',value:labs.length,delta:0,icon:'flask',tone:'primary',fmt:fmt.num})}
      ${kpiCard({label:'Prazo médio geral',value:6.9,delta:-0.3,icon:'clock',tone:'info',fmt:v=>v+' dias'})}
      ${kpiCard({label:'Pedidos no ano',value:641,delta:11,icon:'clipboard-list',tone:'success',fmt:fmt.num})}
      ${kpiCard({label:'Índice de qualidade',value:93,delta:1.5,icon:'shield',tone:'violet',fmt:v=>v+'%'})}
    </div>`;

    const prazoBars=Charts.bars(labs.map(l=>l.nome),labs.map(l=>l.prazoMedio),{h:220,color:'var(--c2)',axisFmt:v=>v+'d',yFmt:v=>v+' dias'});

    const cards=labs.map(l=>`
      <div class="card pad hover reveal">
        <div class="row between center mb-1">
          <div class="card-title-ico"><div class="ci t-info" style="width:40px;height:40px">${icon('flask')}</div><div><h3 style="font-size:15px">${l.nome}</h3><small class="muted">${l.contato}</small></div></div>
          <div class="rank ${l.ranking<=3?'g'+l.ranking:''}">${l.ranking}</div>
        </div>
        <div class="mini-metrics mt-2">
          <div class="mm"><div class="l">Prazo médio</div><div class="v">${l.prazoMedio}d</div></div>
          <div class="mm"><div class="l">Pedidos</div><div class="v">${l.pedidos}</div></div>
          <div class="mm"><div class="l">Qualidade</div><div class="v" style="color:${l.qualidade>=95?'var(--success)':'var(--warning)'}">${l.qualidade}%</div></div>
        </div>
        <div class="row between center mt-2">
          <span class="badge ${l.atrasos<=4?'success':l.atrasos<=8?'warning':'danger'} dot">${l.atrasos} atrasos</span>
          <span class="num muted" style="font-size:12px">Custo: ${fmt.moneyK(l.custo)}</span>
        </div>
      </div>`).join('');

    return `<div class="page">
      ${pageHead('Laboratórios','Prazos, custos, qualidade e ranking dos parceiros de produção de lentes.',{crumbs:['Operação'],actions:`
        <button class="btn ghost">${icon('download')}<span class="hide-sm">Relatório</span></button>
        <button class="btn primary" onclick="toast('Cadastro de laboratório (demo)','info')">${icon('plus')} Novo laboratório</button>`})}
      ${kpis}
      ${aiBanner({text:'Redirecione as urgências ao <b>VisionLab</b> (98% de qualidade, 5,8 dias). O <b>ProLentes</b> acumula 11 atrasos — hora de renegociar o SLA.',cta:'Analisar com IA',route:'ia'})}
      <div class="grid g-2" style="margin-bottom:var(--gap)">${cards}</div>
      <div class="grid g-2">
        ${panel({title:'Prazo médio de entrega',sub:'Dias por laboratório',icon:'clock',tone:'info',body:prazoBars})}
        ${panel({title:'Qualidade x Atrasos',sub:'Ranking de confiabilidade',icon:'shield',tone:'violet',body:`
          ${Charts.hbars(labs.map(l=>({label:l.nome,v:l.qualidade})),{max:100,fmt:v=>v+'%'})}
          <div class="insight ai mt-3"><div class="tag-ai">${icon('sparkles')} Recomendação IA</div><p>Redirecione pedidos urgentes ao <b>VisionLab</b> (98% qualidade, 5,8 dias). O <b>ProLentes</b> acumula 11 atrasos — renegocie o SLA.</p></div>`})}
      </div>
    </div>`;
  }
  App.register('laboratorios',{render});
})();
