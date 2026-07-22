/* ============ Ordens de Serviço ============ */
(function(){
  const m0=v=>fmt.money(v,0);
  function render(){
    const os=DATA.ordens;
    const resumo=DATA.osStatusResumo;
    const kpis=`<div class="grid g-4" style="margin-bottom:var(--gap)">
      ${kpiCard({label:'OS abertas',value:0,delta:0,icon:'clipboard-list',tone:'primary',fmt:fmt.num})}
      ${kpiCard({label:'Prontas p/ retirada',value:0,delta:0,icon:'check-circle',tone:'success',fmt:fmt.num})}
      ${kpiCard({label:'Atrasadas',value:0,delta:0,icon:'alert-triangle',tone:'danger',fmt:fmt.num})}
      ${kpiCard({label:'Prazo médio',value:0,delta:0,icon:'clock',tone:'info',fmt:v=>v+' dias'})}
    </div>`;

    const pipe=`<div class="row fw" style="gap:12px">${resumo.map(s=>`
      <div class="card pad f-1 hover reveal" style="min-width:130px;border-top:3px solid ${s.c}">
        <div class="big-num" style="font-size:26px;color:${s.c}">${s.v}</div>
        <div class="muted" style="font-size:12px;font-weight:600">${s.label}</div></div>`).join('')}</div>`;

    const rows=os.map(o=>`
      <tr style="cursor:pointer" onclick="openOS('${o.os}')">
        <td><b class="mono">${o.os}</b></td>
        <td><div class="cell-user">${avatar(o.cliente)}<div><b>${o.cliente}</b><span>${o.produto}</span></div></div></td>
        <td>${o.lab==='—'?'<span class="muted">Pronta entrega</span>':`<span class="badge">${o.lab}</span>`}</td>
        <td>${statusBadge(o.status)}</td>
        <td style="min-width:120px"><div class="bar ${o.atraso?'danger':o.prog===100?'success':''}" style="height:7px"><i style="width:${o.prog}%"></i></div><small class="muted">${o.prog}%</small></td>
        <td class="td-c ${o.atraso?'neg-txt':''}">${o.prazo}</td>
        <td class="td-r"><b class="num">${m0(o.valor)}</b></td>
        <td class="td-r"><button class="icon-btn" onclick="event.stopPropagation();openOS('${o.os}')">${icon('eye')}</button></td>
      </tr>`).join('');

    return `<div class="page">
      ${pageHead('Ordens de Serviço','Acompanhe cada pedido do laboratório à retirada, com linha do tempo completa.',{crumbs:['Operação'],actions:`
        <button class="btn ghost">${icon('filter')}<span class="hide-sm">Filtros</span></button>
        <button class="btn primary" onclick="App.go('vendas')">${icon('plus')} Nova OS</button>`})}
      ${kpis}
      <div class="reveal" style="margin-bottom:var(--gap)">${pipe}</div>
      ${panel({title:'Ordens de serviço',sub:os.length+' ordens',icon:'clipboard-list',pad:false,
        actions:`<label class="search" style="max-width:240px;height:38px"><span>${icon('search')}</span><input placeholder="Buscar OS ou cliente..."></label>`,
        body: os.length
          ? `<div style="padding:14px 20px 0">${filterChips(['Todas','Produção','Montagem','Qualidade','Prontas','Atrasadas'])}</div>
        <div class="table-wrap" style="padding-top:8px"><table class="data"><thead><tr><th>OS</th><th>Cliente</th><th>Laboratório</th><th>Status</th><th>Progresso</th><th class="td-c">Prazo</th><th class="td-r">Valor</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>`
          : `<div class="empty" style="padding:56px 20px">${icon('clipboard-list')}<h3 style="font-size:16px;margin-bottom:6px">Nenhuma ordem de serviço</h3><p style="max-width:380px;margin:0 auto 16px">As ordens de serviço são geradas automaticamente ao finalizar uma venda no PDV.</p><button class="btn primary" onclick="App.go('vendas')">${icon('shopping-cart')} Ir para o PDV</button></div>`})}
    </div>`;
  }

  window.openOS=function(num){
    const o=DATA.ordens.find(x=>x.os===num)||DATA.ordens[0];
    const steps=DATA.osTimeline;
    const stepper=`<div class="stepper mt-2">${steps.map(s=>`
      <div class="step ${s.done?'done':s.cur?'cur':'todo'}"><div class="sc">${s.done?icon('check'):s.cur?'<i></i>':''}</div><div class="sl">${s.step}</div></div>`).join('')}</div>`;
    const tl=steps.map(s=>`<div class="tl-item ${s.done?'done':s.cur?'cur':'todo'}"><div class="tl-dot">${s.done?icon('check'):''}</div><h6>${s.step}</h6><div class="tl-meta">${s.date}</div></div>`).join('');
    openDrawer(`
      <div class="modal-head"><div class="card-title-ico"><div class="ci t-primary">${icon('clipboard-list')}</div><div><h3>OS ${o.os}</h3><div class="sub">${o.cliente}</div></div></div>
        <button class="icon-btn" onclick="closeModal()">${icon('x')}</button></div>
      <div class="card-body">
        <div class="row gap-xs fw mb-1">${statusBadge(o.status)}<span class="badge">${o.lab==='—'?'Pronta entrega':o.lab}</span><span class="badge ${o.atraso?'danger':'success'} dot">Prazo ${o.prazo}</span></div>
        ${stepper}
        <div class="mini-metrics mt-3">
          <div class="mm"><div class="l">Produto</div><div class="v" style="font-size:14px">${o.produto}</div></div>
          <div class="mm"><div class="l">Valor</div><div class="v">${m0(o.valor)}</div></div>
          <div class="mm"><div class="l">Progresso</div><div class="v">${o.prog}%</div></div>
        </div>
        <div class="grid g-2 mt-3" style="gap:10px">
          ${dItem('Receita','OD -1,25 / OE -1,50 · Ad +2,00')}${dItem('Laboratório',o.lab)}
          ${dItem('Montagem','Aro fechado · biselado')}${dItem('Garantia','12 meses')}
        </div>
        <h4 style="font-size:14px;margin:22px 0 12px">Linha do tempo</h4>
        <div class="timeline">${tl}</div>
        <div class="row gap-xs mt-2">
          <button class="btn success f-1" onclick="toast('Cliente avisado via WhatsApp','success')">${icon('message-circle')} Avisar cliente</button>
          <button class="btn ghost" onclick="toast('Imprimindo OS...','info')">${icon('printer')}</button>
        </div>
      </div>`);
  };
  function dItem(l,v){ return `<div><div class="muted" style="font-size:11px;font-weight:600;margin-bottom:2px">${l}</div><div style="font-weight:600;font-size:13px">${v}</div></div>`; }

  App.register('os',{render});
})();