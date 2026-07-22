/* ============ Business Intelligence ============ */
(function(){
  const m0=v=>fmt.money(v,0);
  const VIEWS=[['geral','Executivo'],['vendedor','Por vendedor'],['loja','Por unidade'],['categoria','Por categoria']];

  function render(param){
    const view=VIEWS.find(v=>v[0]===param)?param:'geral';
    const seg=`<div class="segmented">${VIEWS.map(v=>`<button class="${v[0]===view?'active':''}" onclick="location.hash='#bi/${v[0]}'">${v[1]}</button>`).join('')}</div>`;
    return `<div class="page">
      ${pageHead('Business Intelligence','Painéis analíticos multidimensionais — combine indicadores, dimensões e períodos como no Power BI.',{crumbs:['Inteligência'],actions:`${seg}
        <button class="btn ghost">${icon('download')}<span class="hide-sm">Exportar</span></button>`})}
      ${aiBanner({text:'Atenção: sua <b>margem caiu 4%</b> em Lentes de Contato neste trimestre — avalie renegociar preços com a Alcon.',cta:'Ver financeiro',route:'financeiro'})}
      ${views[view]()}
    </div>`;
  }

  const views={
    geral(){
      const kpis=`<div class="grid g-4" style="margin-bottom:var(--gap)">
        ${kpiCard({label:'Faturamento (12m)',value:5238000,delta:12,icon:'trending-up',tone:'primary',fmt:fmt.moneyK})}
        ${kpiCard({label:'Margem consolidada',value:57.2,delta:2.1,icon:'percent',tone:'success',fmt:v=>fmt.dec(v)+'%'})}
        ${kpiCard({label:'Clientes ativos',value:1284,delta:6,icon:'users',tone:'info',fmt:fmt.num})}
        ${kpiCard({label:'NPS geral',value:87,delta:4,icon:'smile',tone:'violet',fmt:v=>v})}`+'</div>';
      const lojas=Charts.groupedBars(['Jan','Fev','Mar','Abr','Mai','Jun'],[
        {name:'Matriz',color:'var(--c1)',data:[210,198,232,241,255,268]},
        {name:'Shopping',color:'var(--c3)',data:[142,150,161,158,172,181]},
        {name:'Norte',color:'var(--c2)',data:[88,92,96,101,108,112]},
      ],{h:250});
      return kpis+`
        <div class="grid g-3" style="margin-bottom:var(--gap)">
          ${panel({title:'Faturamento por unidade',sub:'Comparativo mensal (em milhares)',icon:'building',tone:'primary',cls:'span-2',
            actions:`<span class="badge success dot">Matriz lidera</span>`,body:lojas+`<div class="chart-legend"><span class="cl"><span class="sw" style="background:var(--c1)"></span>Matriz</span><span class="cl"><span class="sw" style="background:var(--c3)"></span>Shopping</span><span class="cl"><span class="sw" style="background:var(--c2)"></span>Norte</span></div>`})}
          ${panel({title:'Composição de receita',sub:'Por categoria',icon:'pie-chart',tone:'violet',body:`<div class="row center" style="gap:14px">${Charts.donut(DATA.mixCategoria,{size:150,center:'<div class="rv" style="font-size:15px">R$ 5,2M</div><div class="rl">total</div>'})}<div class="f-1 legend">${DATA.mixCategoria.map(s=>`<div class="li"><span class="sw" style="background:${s.c}"></span>${s.label}<span class="lv">${s.v}%</span></div>`).join('')}</div></div>`})}
        </div>
        <div class="grid g-4">
          ${miniDash('Ticket médio','R$ 842','+4,2%','shopping-bag','primary')}
          ${miniDash('Itens/venda','2,3','+0,1','package','info')}
          ${miniDash('Recompra','38%','+3%','repeat','success')}
          ${miniDash('CAC','R$ 84','-6%','target','violet')}
          ${miniDash('LTV/CAC','7,4x','+0,8','trending-up','success')}
          ${miniDash('Churn','4,1%','-0,5%','alert-triangle','danger')}
          ${miniDash('Giro estoque','4,8x','+0,6','box','info')}
          ${miniDash('Conversão','38,5%','+2,9%','activity','primary')}
        </div>`;
    },
    vendedor(){
      const rows=DATA.vendedores.map((v,i)=>`<tr>
        <td><div class="rank ${i<3?'g'+(i+1):''}">${i+1}</div></td>
        <td><div class="cell-user">${avatar(v.nome)}<div><b>${v.nome}</b><span>${v.os} OS emitidas</span></div></div></td>
        <td class="td-r"><b class="num">${m0(v.vendas)}</b></td>
        <td style="min-width:120px">${Charts.bullet(v.vendas,v.meta)}</td>
        <td class="td-c"><span class="badge ${v.conv>=40?'success':'warning'}">${v.conv}%</span></td>
        <td class="td-r num">${m0(v.tkt)}</td>
        <td class="td-r">${trend(v.delta)}</td></tr>`).join('');
      return panel({title:'Dashboard por vendedor',sub:'Meta x realizado, conversão, ticket e produtividade',icon:'award',tone:'warning',pad:false,
        body:`<div class="table-wrap"><table class="data"><thead><tr><th>#</th><th>Vendedor</th><th class="td-r">Vendas</th><th>Meta</th><th class="td-c">Conv.</th><th class="td-r">Ticket</th><th class="td-r">Tend.</th></tr></thead><tbody>${rows}</tbody></table></div>`});
    },
    loja(){
      const lojas=[
        {n:'Matriz Centro',fat:268000,margem:59,os:214,nps:89,c:'var(--c1)'},
        {n:'Filial Shopping',fat:181000,margem:56,os:152,nps:86,c:'var(--c3)'},
        {n:'Filial Norte',fat:112000,margem:52,os:98,nps:84,c:'var(--c2)'},
      ];
      const cards=lojas.map(l=>`<div class="card pad hover reveal" style="border-top:3px solid ${l.c}">
        <div class="row between center mb-1"><h3 style="font-size:16px">${l.n}</h3><span class="badge success">NPS ${l.nps}</span></div>
        <div class="big-num" style="font-size:28px;color:${l.c}">${fmt.moneyK(l.fat)}</div><div class="muted" style="font-size:12px">faturamento no mês</div>
        <div class="mini-metrics mt-2"><div class="mm"><div class="l">Margem</div><div class="v">${l.margem}%</div></div><div class="mm"><div class="l">OS</div><div class="v">${l.os}</div></div></div></div>`).join('');
      return `<div class="grid g-3" style="margin-bottom:var(--gap)">${cards}</div>`+
        panel({title:'Evolução por unidade',sub:'Faturamento acumulado',icon:'building',tone:'primary',body:Charts.area(['Jan','Fev','Mar','Abr','Mai','Jun'],[
          {name:'Matriz',color:'var(--c1)',data:[210,198,232,241,255,268].map(v=>v*1000)},
          {name:'Shopping',color:'var(--c3)',data:[142,150,161,158,172,181].map(v=>v*1000)},
          {name:'Norte',color:'var(--c2)',data:[88,92,96,101,108,112].map(v=>v*1000)},
        ],{h:270,area:false})});
    },
    categoria(){
      const cats=[
        {n:'Armações',fat:2145000,margem:62,c:'var(--c1)'},
        {n:'Lentes',fat:1780000,margem:54,c:'var(--c3)'},
        {n:'Lentes de contato',fat:680000,margem:48,c:'var(--c2)'},
        {n:'Solares',fat:420000,margem:58,c:'var(--c5)'},
        {n:'Acessórios',fat:213000,margem:71,c:'var(--c4)'},
      ];
      return `<div class="grid g-2">
        ${panel({title:'Faturamento por categoria',sub:'Últimos 12 meses',icon:'bar-chart-3',tone:'primary',body:Charts.hbars(cats.map(c=>({label:c.n,v:c.fat,c:c.c})),{fmt:fmt.moneyK})})}
        ${panel({title:'Margem por categoria',sub:'Rentabilidade',icon:'percent',tone:'success',body:Charts.hbars(cats.map(c=>({label:c.n,v:c.margem,c:c.c})),{max:100,fmt:v=>v+'%'})})}
      </div>`;
    }
  };
  function miniDash(l,v,d,ic,tone){ const up=!d.startsWith('-');
    return `<div class="card pad reveal hover"><div class="row between center"><span class="muted" style="font-size:12px;font-weight:600">${l}</span><div class="ico t-${tone}" style="width:32px;height:32px;border-radius:9px;display:grid;place-items:center">${icon(ic)}</div></div>
      <div class="big-num" style="font-size:24px;margin-top:8px">${v}</div><div class="trend ${up?'up':'down'}" style="margin-top:4px">${d}</div></div>`; }

  App.register('bi',{render});
})();
