/* =============================================================
   Ótica Redentora — Camada de dados (sistema ZERADO)
   Estrutura preservada; listas vazias e números zerados,
   prontos para os cadastros começarem do zero.
   ============================================================= */
const fmt = {
  money(v, dec = 2){ return 'R$ ' + Number(v).toLocaleString('pt-BR',{minimumFractionDigits:dec,maximumFractionDigits:dec}); },
  moneyK(v){ if(Math.abs(v)>=1000000) return 'R$ '+(v/1000000).toLocaleString('pt-BR',{maximumFractionDigits:2})+'M';
             if(Math.abs(v)>=1000) return 'R$ '+(v/1000).toLocaleString('pt-BR',{maximumFractionDigits:1})+'k'; return 'R$ '+v; },
  num(v){ return Number(v).toLocaleString('pt-BR'); },
  dec(v,d=1){ return Number(v).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d}); },
  pct(v){ return (v>0?'+':'')+v.toLocaleString('pt-BR',{maximumFractionDigits:1})+'%'; },
  date(d){ return d; }
};
const initials = n => n.split(' ').filter(w=>w.length>2).slice(0,2).map(w=>w[0]).join('').toUpperCase();
const avatarColor = (s)=>{const cols=['#2f6bff','#7c5cff','#10b981','#f59e0b','#06b6d4','#f43f5e','#0ea5e9','#f472b6','#8b5cf6','#14b8a6'];let h=0;for(const c of s)h=c.charCodeAt(0)+((h<<5)-h);return cols[Math.abs(h)%cols.length];};

const DATA = {
  user:{ nome:'Administrador', cargo:'Gerente · Ótica Redentora', inicial:'AR', loja:'Ótica Redentora' },
  lojas:['Ótica Redentora'],

  /* ---------------- DASHBOARD ---------------- */
  kpis:{
    vendasDia:{ v:0, delta:0, spark:[] },
    vendasMes:{ v:0, delta:0, spark:[] },
    ticket:{ v:0, delta:0, spark:[] },
    receitaPrev:{ v:0, delta:0, spark:[] },
    receitaReal:{ v:0, delta:0, spark:[] },
    osProducao:{ v:0, delta:0, spark:[] },
    aguardando:{ v:0, delta:0, spark:[] },
    clientesNovos:{ v:0, delta:0, spark:[] },
    clientesRecorr:{ v:0, delta:0, spark:[] },
    giroEstoque:{ v:0, delta:0, spark:[] },
    inadimplencia:{ v:0, delta:0, spark:[] },
    conversao:{ v:0, delta:0, spark:[] }
  },
  metaMes:{ meta:0, realizado:0, diasRestantes:0, projecao:0 },

  faturamento12:{
    labels:['Ago','Set','Out','Nov','Dez','Jan','Fev','Mar','Abr','Mai','Jun','Jul'],
    real:[0,0,0,0,0,0,0,0,0,0,0,0],
    meta:[0,0,0,0,0,0,0,0,0,0,0,0],
    ano_ant:[0,0,0,0,0,0,0,0,0,0,0,0]
  },
  vendasSemana:{ labels:['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'], v:[0,0,0,0,0,0,0] },
  heatmap:{
    dias:['Seg','Ter','Qua','Qui','Sex','Sáb'],
    horas:['09h','10h','11h','12h','13h','14h','15h','16h','17h','18h','19h'],
    data:[
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0]
    ]
  },
  pagamentos:[
    {label:'Cartão de Crédito', v:0, c:'var(--c1)'},
    {label:'PIX', v:0, c:'var(--c2)'},
    {label:'Crediário Próprio', v:0, c:'var(--c3)'},
    {label:'Cartão de Débito', v:0, c:'var(--c4)'},
    {label:'Dinheiro', v:0, c:'var(--c5)'},
    {label:'Boleto', v:0, c:'var(--c6)'}
  ],
  mixCategoria:[
    {label:'Armações', v:0, c:'var(--c1)'},
    {label:'Lentes', v:0, c:'var(--c3)'},
    {label:'Lentes de Contato', v:0, c:'var(--c2)'},
    {label:'Solares', v:0, c:'var(--c5)'},
    {label:'Acessórios', v:0, c:'var(--c4)'}
  ],

  produtosTop:[],
  vendedores:[],
  alertas:[],
  insights:[],

  /* ---------------- CLIENTES ---------------- */
  clientes:[],
  timelineCliente:[],

  /* ---------------- MÉDICOS ---------------- */
  medicos:[],

  /* ---------------- PRODUTOS ---------------- */
  armacoes:[],
  lentes:[],
  contato:[],
  acessorios:[],

  /* ---------------- CADASTROS NOVOS ---------------- */
  fornecedores:[],
  funcionarios:[],

  /* ---------------- ESTOQUE ---------------- */
  estoqueResumo:{ valorTotal:0, itens:0, skus:0, giro:0, parados:0, abaixoMin:0 },
  curvaABC:[
    {classe:'A',pct:0,valor:0,itens:0,cor:'var(--c1)'},
    {classe:'B',pct:0,valor:0,itens:0,cor:'var(--c3)'},
    {classe:'C',pct:0,valor:0,itens:0,cor:'var(--c5)'}
  ],
  movimentacoes:[],

  /* ---------------- ORDENS DE SERVIÇO ---------------- */
  ordens:[],
  osStatusResumo:[
    {label:'Aguardando',v:0,c:'var(--muted)'},
    {label:'Produção',v:0,c:'var(--c1)'},
    {label:'Montagem',v:0,c:'var(--c3)'},
    {label:'Qualidade',v:0,c:'var(--c2)'},
    {label:'Pronto',v:0,c:'var(--c4)'},
    {label:'Atrasado',v:0,c:'var(--c6)'}
  ],
  osTimeline:[
    {step:'Pedido',date:'—',done:false,cur:true},
    {step:'Enviado ao laboratório',date:'—',done:false},
    {step:'Em produção',date:'—',done:false},
    {step:'Recebimento',date:'—',done:false},
    {step:'Montagem',date:'—',done:false},
    {step:'Controle de qualidade',date:'—',done:false},
    {step:'Pronto p/ retirada',date:'—',done:false}
  ],

  /* ---------------- LABORATÓRIOS ---------------- */
  laboratorios:[],

  /* ---------------- FINANCEIRO ---------------- */
  fluxoCaixa:{
    labels:['Sem 1','Sem 2','Sem 3','Sem 4'],
    entradas:[0,0,0,0],
    saidas:[0,0,0,0]
  },
  fluxo30:{
    labels:Array.from({length:30},(_,i)=>String(i+1)),
    saldo:Array.from({length:30},()=>0)
  },
  contasPagar:[],
  contasReceber:[],
  dre:[
    {conta:'Receita Bruta',valor:0,tipo:'receita',nivel:0},
    {conta:'(-) Impostos s/ vendas',valor:0,tipo:'deducao',nivel:1},
    {conta:'= Receita Líquida',valor:0,tipo:'subtotal',nivel:0},
    {conta:'(-) CMV (Custo Mercadoria)',valor:0,tipo:'custo',nivel:1},
    {conta:'= Lucro Bruto',valor:0,tipo:'subtotal',nivel:0},
    {conta:'(-) Despesas Operacionais',valor:0,tipo:'despesa',nivel:1},
    {conta:'(-) Comissões',valor:0,tipo:'despesa',nivel:1},
    {conta:'= EBITDA',valor:0,tipo:'subtotal',nivel:0},
    {conta:'(-) Financeiras / Depreciação',valor:0,tipo:'despesa',nivel:1},
    {conta:'= Lucro Líquido',valor:0,tipo:'total',nivel:0}
  ],
  finKpis:{ receita:0, despesa:0, lucro:0, margem:0, saldo:0, aReceber:0, aPagar:0, inadimplencia:0 },

  /* ---------------- FISCAL ---------------- */
  fiscal:[],
  fiscalKpis:{ emitidas:0, autorizadas:0, canceladas:0, pendentes:0, impostos:0 },

  /* ---------------- CRM ---------------- */
  campanhas:[],
  aniversariantes:[],
  crmFunil:[
    {label:'Leads / Visitantes',v:0,c:'var(--c1)'},
    {label:'Interessados',v:0,c:'var(--c2)'},
    {label:'Orçamentos',v:0,c:'var(--c3)'},
    {label:'Vendas',v:0,c:'var(--c4)'}
  ],

  /* ---------------- AGENDA ---------------- */
  agenda:[],
  agendaHoje:[],

  /* ---------------- RELATÓRIOS (catálogo — mantido) ---------------- */
  relatorios:[
    {nome:'Vendas por Período',cat:'Vendas',ico:'trending-up',desc:'Faturamento, volume e ticket por dia/semana/mês.'},
    {nome:'Produtos mais Vendidos',cat:'Vendas',ico:'package',desc:'Ranking por unidades, faturamento e margem.'},
    {nome:'Curva ABC de Estoque',cat:'Estoque',ico:'layers',desc:'Classificação A/B/C por valor e giro.'},
    {nome:'Posição de Estoque',cat:'Estoque',ico:'archive',desc:'Saldo atual, mínimo e sugestão de compra.'},
    {nome:'Fluxo de Caixa',cat:'Financeiro',ico:'wallet',desc:'Entradas, saídas e saldo projetado.'},
    {nome:'DRE Gerencial',cat:'Financeiro',ico:'bar-chart',desc:'Demonstrativo de resultado com margens.'},
    {nome:'Inadimplência',cat:'Financeiro',ico:'alert-triangle',desc:'Crediário vencido e aging list.'},
    {nome:'Comissões por Vendedor',cat:'Pessoas',ico:'users',desc:'Base, percentual e valor a pagar.'},
    {nome:'Ranking de Vendedores',cat:'Pessoas',ico:'award',desc:'Meta x realizado, conversão e ticket.'},
    {nome:'Médicos Indicadores',cat:'Relacionamento',ico:'stethoscope',desc:'Encaminhamentos e faturamento por médico.'},
    {nome:'Desempenho de Laboratórios',cat:'Operação',ico:'flask',desc:'Prazo médio, atrasos e qualidade.'},
    {nome:'Garantias e Assistências',cat:'Operação',ico:'shield',desc:'Acionamentos, custo e reincidência.'},
    {nome:'Receitas Oftalmológicas',cat:'Clientes',ico:'file-text',desc:'Graus, adições e evolução por cliente.'},
    {nome:'Ciclo de Troca (LTV)',cat:'Clientes',ico:'repeat',desc:'Frequência de recompra e valor vitalício.'},
    {nome:'Margem por Categoria',cat:'Vendas',ico:'percent',desc:'Rentabilidade de armações, lentes e LC.'},
    {nome:'Lucratividade por Loja',cat:'Financeiro',ico:'building',desc:'Resultado consolidado por unidade.'}
  ],

  /* ---------------- IA ---------------- */
  previsaoVendas:{
    labels:['Jul','Ago','Set','Out','Nov','Dez'],
    real:[0,null,null,null,null,null],
    prev:[0,0,0,0,0,0],
    min:[0,0,0,0,0,0],
    max:[0,0,0,0,0,0]
  },
  reporSugestao:[],
  clientesTroca:[],
  iaInsights:[],

  /* ---------------- FIDELIDADE ---------------- */
  fidelidade:{ membros:0, pontosDistribuidos:0, resgates:0, cashbackAcumulado:0,
    niveis:[{nome:'Bronze',membros:0,cor:'#cd7f32'},{nome:'Prata',membros:0,cor:'#94a3b8'},{nome:'Ouro',membros:0,cor:'#f0b429'},{nome:'Diamante',membros:0,cor:'#38bdf8'}] }
};

/* ================= centro de comando, IA e perfil (ZERADOS) ================= */
Object.assign(DATA, {
  comando:{
    saudacao:'Bem-vindo', consultas:0, entregas:0, pagamentos:0, faltas:0,
    metaPct:0, receitaPrev:0,
    hoje:[
      {label:'Vendas do dia', v:0, cfmt:'int', ico:'shopping-bag', tone:'primary', sem:'ok'},
      {label:'Receita do dia', v:0, cfmt:'money0', ico:'dollar-sign', tone:'success', sem:'ok'},
      {label:'Ticket médio', v:0, cfmt:'money0', ico:'tag', tone:'info', sem:'ok'},
      {label:'Margem', v:0, cfmt:'pct1', ico:'percent', tone:'violet', sem:'ok'},
      {label:'Ordens atrasadas', v:0, cfmt:'int', ico:'alert-triangle', tone:'danger', sem:'ok'},
      {label:'Clientes agendados', v:0, cfmt:'int', ico:'calendar', tone:'primary', sem:'ok'},
      {label:'Estoque crítico', v:0, cfmt:'int', ico:'package', tone:'warning', sem:'ok'},
      {label:'Contas vencendo', v:0, cfmt:'int', ico:'credit-card', tone:'warning', sem:'ok'},
      {label:'Receita prev. semana', v:0, cfmt:'moneyk', ico:'trending-up', tone:'success', sem:'ok'},
    ]
  },
  iaComando:[],
  notificacoesSmart:[],
  iaCopilot:[],
  copilotAcoes:[
    {label:'Cadastrar cliente', ico:'user-plus', route:'clientes'},
    {label:'Nova venda', ico:'shopping-cart', route:'vendas'},
    {label:'Cadastrar produto', ico:'glasses', route:'produtos'},
  ],
  notificacoesSemana:[],
  notificacoesMes:[],
  iaSugestoes:['Como começo a usar o sistema?','O que preciso cadastrar primeiro?','Como registro uma venda?','Como cadastro um produto?'],
  comandoStatus:[],
  iaRecomenda:[],
  estoqueInteligente:[],
  clienteRico:{
    grau:{od:'—', oe:'—', adicao:'—', dnp:'—'},
    receitas:[], oculos:[], garantias:[], contatos:[],
    iaPrev:{prob:0, quando:'—', valor:0, sugestao:'—'},
    ordens:[], timeline:[]
  }
});
window.DATA = DATA; window.fmt = fmt; window.initials = initials; window.avatarColor = avatarColor;
