/* ============ Médicos parceiros ============ */
(function(){
  const m0=v=>fmt.money(v,0);
  function render(){
    const med=DATA.medicos;
    const totalEnc=med.reduce((a,m)=>a+m.encaminhados,0);
    const totalVal=med.reduce((a,m)=>a+m.valor,0);

    const kpis=`<div class="grid g-4" style="margin-bottom:var(--gap)">
      ${kpiCard({label:'Médicos parceiros',value:med.length,delta:9,icon:'stethoscope',tone:'primary',fmt:fmt.num})}
      ${kpiCard({label:'Encaminhamentos',value:totalEnc,delta:14,icon:'user-plus',tone:'info',fmt:fmt.num,sub:'no ano'})}
      ${kpiCard({label:'Receita por indicação',value:totalVal,delta:16,icon:'dollar-sign',tone:'success',fmt:fmt.moneyK})}
      ${kpiCard({label:'NPS médio',value:91,delta:2,icon:'smile',tone:'violet',fmt:v=>v})}
    </div>`;

    const ranking=Charts.hbars(med.map(m=>({label:m.nome,v:m.valor})),{fmt:fmt.moneyK});

    const rows=med.map((m,i)=>`
      <tr>
        <td><div class="rank ${i<3?'g'+(i+1):''}">${i+1}</div></td>
        <td><div class="cell-user">${avatar(m.nome)}<div><b>${m.nome}</b><span>${m.crm}</span></div></div></td>
        <td><span class="badge ${m.esp==='Oftalmologista'?'primary':'info'} dot">${m.esp}</span></td>
        <td>${m.cidade}</td>
        <td class="td-c"><b class="num">${m.encaminhados}</b></td>
        <td class="td-r"><b class="num">${m0(m.valor)}</b></td>
        <td class="td-c"><span class="badge success">NPS ${m.nps}</span></td>
        <td class="td-r">${trend(m.delta)}</td>
        <td class="td-r"><button class="icon-btn" onclick="toast('Abrindo perfil de ${m.nome}','info')">${icon('eye')}</button></td>
      </tr>`).join('');

    return `<div class="page">
      ${pageHead('Médicos & Parceiros','Indicações, faturamento por encaminhamento e ranking de relacionamento clínico.',{crumbs:['Cadastros'],actions:`
        <button class="btn ghost">${icon('download')}<span class="hide-sm">Exportar</span></button>
        <button class="btn primary" onclick="toast('Formulário de cadastro (demo)','info')">${icon('plus')} Novo médico</button>`})}
      ${kpis}
      ${aiBanner({text:'<b>Dr. Paulo Andrade</b> tem a maior taxa de conversão (72%). Ampliar a parceria pode gerar <b>+R$ 22k/mês</b>.',cta:'Ver médico',route:'medicos'})}
      <div class="grid g-3" style="margin-bottom:var(--gap)">
        ${panel({title:'Ranking por faturamento indicado',sub:'Receita gerada por médico',icon:'award',tone:'warning',cls:'span-2',body:ranking})}
        ${panel({title:'Distribuição por especialidade',sub:'',icon:'pie-chart',tone:'violet',body:`
          <div class="row center" style="gap:16px">${Charts.donut([{label:'Oftalmologista',v:4,c:'var(--c1)'},{label:'Optometrista',v:2,c:'var(--c2)'}],{size:150,center:'<div class="rv" style="font-size:15px">6</div><div class="rl">parceiros</div>'})}
          <div class="f-1 legend"><div class="li"><span class="sw" style="background:var(--c1)"></span>Oftalmologistas<span class="lv">4</span></div><div class="li"><span class="sw" style="background:var(--c2)"></span>Optometristas<span class="lv">2</span></div></div></div>
          <div class="insight ai mt-3"><div class="tag-ai">${icon('sparkles')} Sugestão IA</div><p>Dr. Paulo Andrade tem a maior taxa de conversão (72%). Vale ampliar o programa de parceria com ele.</p></div>`})}
      </div>
      ${panel({title:'Médicos parceiros',sub:'Ordenado por receita indicada',icon:'stethoscope',pad:false,
        actions:`<label class="search" style="max-width:240px;height:38px"><span>${icon('search')}</span><input placeholder="Buscar médico..."></label>`,
        body:`<div class="table-wrap"><table class="data"><thead><tr><th>#</th><th>Médico</th><th>Especialidade</th><th>Cidade</th><th class="td-c">Encaminhados</th><th class="td-r">Faturamento</th><th class="td-c">NPS</th><th class="td-r">Tend.</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>`})}
    </div>`;
  }
  App.register('medicos',{render});
})();
