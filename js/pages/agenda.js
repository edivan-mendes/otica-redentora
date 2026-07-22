/* ============ Agenda ============ */
(function(){
  const DOW=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
  const TODAY=12, LEAD=3, DAYS=31; // Julho/2026 começa numa quarta

  function render(){
    const evByDay={};
    DATA.agenda.forEach(e=>{ (evByDay[e.dia]=evByDay[e.dia]||[]).push(e); });
    let cells='';
    for(let i=0;i<LEAD;i++) cells+=`<div class="cd out"></div>`;
    for(let d=1;d<=DAYS;d++){
      const evs=evByDay[d]||[];
      const bars=evs.slice(0,3).map(e=>`<i style="background:${e.c}"></i>`).join('');
      cells+=`<div class="cd ${d===TODAY?'today':''}" onclick="${evs.length?`openDay(${d})`:''}" style="${evs.length?'cursor:pointer':''}">
        <div class="dn">${d}</div>${evs.length?`<div class="ev">${bars}</div>`:''}</div>`;
    }
    const header=DOW.map(d=>`<div class="cal-head">${d}</div>`).join('');

    const hoje=DATA.agendaHoje.map(e=>`<div class="lrow"><div class="mono" style="font-weight:700;color:${e.c};min-width:44px">${e.hora}</div>
      <div style="width:3px;height:34px;border-radius:99px;background:${e.c}"></div>
      <div class="grow"><b>${e.titulo}</b><small>${e.tipo}</small></div></div>`).join('');

    const prox=DATA.agenda.map(e=>`<div class="lrow"><div class="ai" style="width:38px;height:38px;border-radius:11px;display:grid;place-items:center;background:${e.c}22;color:${e.c}">${icon(iconFor(e.tipo))}</div>
      <div class="grow"><b>${e.titulo}</b><small>${e.hora} · ${cap(e.tipo)}</small></div>
      <span class="badge" style="background:${e.c}18;color:${e.c};border:none">${e.dia}/07</span></div>`).join('');

    return `<div class="page">
      ${pageHead('Agenda','Consultas, entregas, retornos, visitas e compromissos em um calendário único.',{crumbs:['Operação'],actions:`
        <div class="segmented"><button>Dia</button><button>Semana</button><button class="active">Mês</button></div>
        <button class="btn primary" onclick="toast('Novo compromisso (demo)','info')">${icon('plus')} Compromisso</button>`})}
      <div class="grid g-3">
        ${panel({title:'Julho 2026',sub:'Clique em um dia com eventos',icon:'calendar',tone:'primary',cls:'span-2',
          actions:`<button class="icon-btn">${icon('chevron-left')}</button><button class="icon-btn">${icon('chevron-right')}</button>`,
          body:`<div class="cal">${header}</div><div class="cal mt-1">${cells}</div>
          <div class="chart-legend mt-3">
            <span class="cl"><span class="sw" style="background:var(--c1)"></span>Entregas</span>
            <span class="cl"><span class="sw" style="background:var(--c3)"></span>Consultas</span>
            <span class="cl"><span class="sw" style="background:var(--c5)"></span>Retornos</span>
            <span class="cl"><span class="sw" style="background:var(--c4)"></span>Eventos</span>
            <span class="cl"><span class="sw" style="background:var(--c2)"></span>Visitas</span></div>`})}
        <div class="col">
          ${panel({title:'Hoje · 12/07',sub:'5 compromissos',icon:'clock',tone:'success',body:`<div class="col" style="gap:2px">${hoje}</div>`})}
        </div>
      </div>
      <div class="mt-3">${panel({title:'Próximos compromissos',sub:'Agenda da semana',icon:'calendar',tone:'violet',body:`<div class="grid g-2" style="gap:4px 24px">${prox}</div>`})}</div>
    </div>`;
  }
  function iconFor(t){ return {entrega:'truck',consulta:'stethoscope',retorno:'repeat',evento:'star',visita:'user-plus'}[t]||'calendar'; }
  function cap(s){ return s.charAt(0).toUpperCase()+s.slice(1); }

  window.openDay=function(d){
    const evs=DATA.agenda.filter(e=>e.dia===d);
    openModal(`<div class="modal-head"><h3>${d} de julho, 2026</h3><button class="icon-btn" onclick="closeModal()">${icon('x')}</button></div>
      <div class="card-body"><div class="col" style="gap:10px">${evs.map(e=>`
        <div class="alert-item"><div class="ai" style="background:${e.c}22;color:${e.c}">${icon(iconFor(e.tipo))}</div>
          <div class="grow"><b>${e.titulo}</b><p>${e.hora} · ${cap(e.tipo)}</p></div></div>`).join('')}</div>
        <button class="btn primary block mt-2" onclick="closeModal();toast('Compromisso adicionado','success')">${icon('plus')} Adicionar neste dia</button></div>`);
  };

  App.register('agenda',{render});
})();