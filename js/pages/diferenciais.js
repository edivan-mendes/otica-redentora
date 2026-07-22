/* ============ Clube & Fidelidade ============ */
(function(){
  const m0=v=>fmt.money(v,0);

  function fidelidadeRender(){
    const f=DATA.fidelidade;
    const kpis=`<div class="grid g-4" style="margin-bottom:var(--gap)">
      ${kpiCard({label:'Membros do clube',value:f.membros,delta:14,icon:'gift',tone:'violet',fmt:fmt.num})}
      ${kpiCard({label:'Pontos distribuídos',value:0,delta:0,icon:'star',tone:'warning',fmt:v=>v+'k'})}
      ${kpiCard({label:'Cashback acumulado',value:f.cashbackAcumulado,delta:22,icon:'dollar-sign',tone:'success',fmt:fmt.moneyK})}
      ${kpiCard({label:'Resgates no mês',value:f.resgates,delta:6,icon:'repeat',tone:'primary',fmt:fmt.num})}
    </div>`;
    const niveis=f.niveis.map(n=>`<div class="lrow"><div class="av-circ" style="background:${n.cor}">${icon('star',{size:16})}</div>
      <div class="grow"><b>${n.nome}</b><div class="bar" style="margin-top:6px"><i style="width:${f.membros?n.membros/f.membros*100:0}%;background:${n.cor}"></i></div></div>
      <b class="num">${fmt.num(n.membros)}</b></div>`).join('');
    const benef=[
      {t:'Cashback de 5%',d:'Em todas as compras acima de R$ 300',ic:'dollar-sign',tone:'success'},
      {t:'Troca antecipada',d:'Desconto especial na renovação anual',ic:'repeat',tone:'primary'},
      {t:'Revisão gratuita',d:'Ajustes e limpeza sem custo por 12 meses',ic:'shield',tone:'info'},
      {t:'Acesso antecipado',d:'Novas coleções antes do lançamento',ic:'star',tone:'violet'},
    ].map(b=>`<div class="alert-item"><div class="ai t-${b.tone}">${icon(b.ic)}</div><div class="grow"><b>${b.t}</b><p>${b.d}</p></div></div>`).join('');

    return `<div class="page">
      ${pageHead('Clube & Fidelidade','Programa de pontos, cashback e clube de benefícios — aumente a recorrência e o LTV.',{crumbs:['Comercial'],actions:`
        <button class="btn ghost">${icon('settings')}<span class="hide-sm">Regras</span></button>
        <button class="btn primary" onclick="toast('Novo membro adicionado','success')">${icon('user-plus')} Novo membro</button>`})}
      ${kpis}
      <div class="grid g-3" style="margin-bottom:var(--gap)">
        ${panel({title:'Distribuição por nível',sub:'Membros por categoria',icon:'award',tone:'warning',body:`<div class="col" style="gap:4px">${niveis}</div>`})}
        ${panel({title:'Cartão de fidelidade',sub:'Identidade do clube',icon:'gift',tone:'violet',body:`
          <div class="card pad" style="background:var(--brand-grad);color:#fff;border:none;position:relative;overflow:hidden;min-height:150px">
            <div style="position:absolute;inset:0;background:radial-gradient(circle at 85% 15%,rgba(255,255,255,.3),transparent 55%)"></div>
            <div class="row between"><b style="font-size:15px">Clube Redentora</b>${icon('star')}</div>
            <div class="mono" style="letter-spacing:2px;margin-top:38px;font-size:15px">•••• •••• •••• 2048</div>
            <div class="row between center mt-2"><div><div style="opacity:.8;font-size:10px">MEMBRO</div><b>—</b></div><span class="badge" style="background:rgba(255,255,255,.2);color:#fff;border:none">Diamante</span></div></div>
          <div class="mini-metrics mt-2"><div class="mm"><div class="l">Pontos</div><div class="v">0</div></div><div class="mm"><div class="l">Cashback</div><div class="v">R$ 0</div></div></div>`})}
        ${panel({title:'Benefícios do clube',sub:'Vantagens ativas',icon:'heart',tone:'danger',body:`<div class="col" style="gap:10px">${benef}</div>`})}
      </div>
      ${panel({title:'Engajamento do programa',sub:'Membros ativos x recompensas resgatadas',icon:'activity',tone:'success',body:Charts.groupedBars(['Fev','Mar','Abr','Mai','Jun','Jul'],[
        {name:'Novos membros',color:'var(--c3)',data:[0,0,0,0,0,0]},
        {name:'Resgates',color:'var(--c4)',data:[0,0,0,0,0,0]},
      ],{h:230,yFmt:v=>fmt.num(v)})})}
    </div>`;
  }

  App.register('fidelidade',{render:fidelidadeRender});
})();