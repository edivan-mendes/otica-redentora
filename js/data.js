/* =============================================================
   Ótica Redentora — Camada de dados fictícios (pt-BR)
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
  user:{ nome:'Ana Beatriz', cargo:'Gerente · Matriz Centro', inicial:'AB', loja:'Ótica Redentora' },
  lojas:['Matriz Centro','Filial Shopping','Filial Norte'],

  /* ---------------- DASHBOARD ---------------- */
  kpis:{
    vendasDia:{ v:18740, delta:12.4, spark:[9,11,8,13,12,15,14,18,16,19,17,21] },
    vendasMes:{ v:487320, delta:8.7, spark:[280,310,290,340,360,390,410,430,450,460,475,487] },
    ticket:{ v:842, delta:4.2, spark:[720,760,740,790,810,800,820,835,842] },
    receitaPrev:{ v:640000, delta:0, spark:[] },
    receitaReal:{ v:487320, delta:0, spark:[] },
    osProducao:{ v:64, delta:-6.0, spark:[70,68,72,66,64,67,64] },
    aguardando:{ v:37, delta:9.0, spark:[28,31,29,33,35,34,37] },
    clientesNovos:{ v:128, delta:15.2, spark:[90,100,95,110,118,122,128] },
    clientesRecorr:{ v:412, delta:6.1, spark:[380,388,392,400,405,410,412] },
    giroEstoque:{ v:4.8, delta:0.6, spark:[4.1,4.2,4.4,4.3,4.6,4.7,4.8] },
    inadimplencia:{ v:3.2, delta:-0.8, spark:[4.4,4.2,4.0,3.8,3.5,3.3,3.2] },
    conversao:{ v:38.5, delta:2.9, spark:[33,34,35,36,37,38,38.5] }
  },
  metaMes:{ meta:640000, realizado:487320, diasRestantes:8, projecao:658000 },

  // faturamento 12 meses (realizado x meta)
  faturamento12:{
    labels:['Ago','Set','Out','Nov','Dez','Jan','Fev','Mar','Abr','Mai','Jun','Jul'],
    real:[352,368,381,455,512,398,372,441,468,502,529,487],
    meta:[340,350,360,420,480,400,380,430,460,500,520,640],
    ano_ant:[300,315,330,390,440,350,340,395,410,455,470,430]
  },
  // vendas por dia da semana
  vendasSemana:{ labels:['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'], v:[62,58,71,68,84,96,22] },
  // heatmap horário x dia (vendas)
  heatmap:{
    dias:['Seg','Ter','Qua','Qui','Sex','Sáb'],
    horas:['09h','10h','11h','12h','13h','14h','15h','16h','17h','18h','19h'],
    data:[
      [2,4,6,3,2,5,7,8,6,5,3],
      [3,5,7,4,2,6,8,7,6,4,2],
      [4,6,8,5,3,7,9,8,7,5,3],
      [3,5,7,4,3,6,8,9,7,6,4],
      [5,8,9,6,4,8,10,11,9,8,6],
      [6,9,11,8,5,9,12,13,11,7,3]
    ]
  },
  // canais / formas de pagamento (donut)
  pagamentos:[
    {label:'Cartão de Crédito', v:214000, c:'var(--c1)'},
    {label:'PIX', v:132000, c:'var(--c2)'},
    {label:'Crediário Próprio', v:78000, c:'var(--c3)'},
    {label:'Cartão de Débito', v:41000, c:'var(--c4)'},
    {label:'Dinheiro', v:14320, c:'var(--c5)'},
    {label:'Boleto', v:8000, c:'var(--c6)'}
  ],
  // mix de categorias
  mixCategoria:[
    {label:'Armações', v:41, c:'var(--c1)'},
    {label:'Lentes', v:34, c:'var(--c3)'},
    {label:'Lentes de Contato', v:13, c:'var(--c2)'},
    {label:'Solares', v:8, c:'var(--c5)'},
    {label:'Acessórios', v:4, c:'var(--c4)'}
  ],

  produtosTop:[
    {nome:'Ray-Ban Aviator Classic', cat:'Solar', un:48, fat:38400, delta:14},
    {nome:'Lente Zeiss DuraVision Blue', cat:'Lente', un:112, fat:56000, delta:22},
    {nome:'Oakley Holbrook', cat:'Solar', un:31, fat:27900, delta:-5},
    {nome:'Chilli Beans Quadrada Preta', cat:'Armação', un:64, fat:19200, delta:9},
    {nome:'Acuvue Oasys (cx)', cat:'Lente Contato', un:88, fat:15840, delta:31},
    {nome:'Essilor Varilux X', cat:'Lente', un:52, fat:46800, delta:11}
  ],

  vendedores:[
    {nome:'Carla Mendes',    vendas:98320, meta:90000, os:41, tkt:912, conv:44, delta:16, foto:''},
    {nome:'Rafael Souza',    vendas:87450, meta:85000, os:38, tkt:864, conv:41, delta:9,  foto:''},
    {nome:'Juliana Prado',   vendas:79210, meta:80000, os:35, tkt:798, conv:39, delta:-3, foto:''},
    {nome:'Diego Almeida',   vendas:71880, meta:75000, os:33, tkt:842, conv:37, delta:6,  foto:''},
    {nome:'Marina Costa',    vendas:64300, meta:70000, os:29, tkt:776, conv:34, delta:12, foto:''},
    {nome:'Bruno Ferreira',  vendas:52140, meta:65000, os:24, tkt:721, conv:31, delta:-7, foto:''}
  ],

  alertas:[
    {tipo:'danger', ico:'alert-triangle', titulo:'3 OS atrasadas',           txt:'Pedidos no laboratório ultrapassaram o prazo combinado.'},
    {tipo:'warning',ico:'package',        titulo:'8 produtos abaixo do mínimo', txt:'Reposição sugerida para armações Ray-Ban e lentes Varilux.'},
    {tipo:'info',   ico:'clock',          titulo:'12 óculos aguardando retirada há +7 dias', txt:'Acione os clientes via WhatsApp automático.'},
    {tipo:'success',ico:'trending-up',    titulo:'Meta do dia atingida',       txt:'Vendas superaram a meta diária em 12%. Parabéns à equipe!'},
    {tipo:'warning',ico:'credit-card',    titulo:'R$ 14.320 em crediário vencendo', txt:'6 parcelas vencem nos próximos 3 dias.'}
  ],

  insights:[
    {t:'Pico de vendas previsto', d:'A IA projeta +18% de fluxo no sábado entre 14h–17h. Reforce a equipe de atendimento.'},
    {t:'Ruptura de estoque', d:'Lente Zeiss Blue deve zerar em 6 dias no ritmo atual. Compra sugerida: 40 un.'},
    {t:'Clientes prontos p/ trocar', d:'34 clientes atingiram o ciclo médio de troca (18 meses). Potencial de R$ 28.600.'},
    {t:'Melhor vendedor do mês', d:'Carla Mendes lidera com R$ 98,3k e 44% de conversão — 16% acima da média.'}
  ],

  /* ---------------- CLIENTES ---------------- */
  clientes:[
    {id:1,nome:'Fernanda Lima',cpf:'123.456.789-01',tel:'(11) 98765-4321',email:'fernanda.lima@email.com',cidade:'São Paulo/SP',nasc:'12/03/1988',sexo:'F',prof:'Advogada',convenio:'Bradesco Saúde',status:'Ativo',ltv:8940,compras:11,ultima:'02/07/2026',proxTroca:'set/2026',lente:'Multifocal',marca:'Ray-Ban',freq:'18 meses',origem:'Indicação',score:92},
    {id:2,nome:'Marcelo Nunes',cpf:'234.567.890-12',tel:'(11) 99876-5432',email:'m.nunes@email.com',cidade:'Guarulhos/SP',nasc:'23/07/1975',sexo:'M',prof:'Engenheiro',convenio:'—',status:'Ativo',ltv:14320,compras:19,ultima:'28/06/2026',proxTroca:'jul/2026',lente:'Visão simples',marca:'Oakley',freq:'12 meses',origem:'Google',score:88},
    {id:3,nome:'Patrícia Gomes',cpf:'345.678.901-23',tel:'(11) 97654-3210',email:'patricia.g@email.com',cidade:'São Paulo/SP',nasc:'05/11/1992',sexo:'F',prof:'Designer',convenio:'Amil',status:'VIP',ltv:22150,compras:27,ultima:'09/07/2026',proxTroca:'—',lente:'Antirreflexo',marca:'Chilli Beans',freq:'10 meses',origem:'Instagram',score:97},
    {id:4,nome:'Roberto Dias',cpf:'456.789.012-34',tel:'(11) 96543-2109',email:'rdias@email.com',cidade:'Osasco/SP',nasc:'30/01/1968',sexo:'M',prof:'Contador',convenio:'SulAmérica',status:'Ativo',ltv:6720,compras:8,ultima:'15/05/2026',proxTroca:'nov/2026',lente:'Multifocal',marca:'Zeiss',freq:'24 meses',origem:'Passagem',score:74},
    {id:5,nome:'Camila Rocha',cpf:'567.890.123-45',tel:'(11) 95432-1098',email:'camila.rocha@email.com',cidade:'São Paulo/SP',nasc:'18/09/1995',sexo:'F',prof:'Médica',convenio:'—',status:'Ativo',ltv:11480,compras:14,ultima:'01/07/2026',proxTroca:'ago/2026',lente:'Filtro Azul',marca:'Vogue',freq:'12 meses',origem:'Indicação',score:90},
    {id:6,nome:'Anderson Silva',cpf:'678.901.234-56',tel:'(11) 94321-0987',email:'anderson.s@email.com',cidade:'Barueri/SP',nasc:'14/04/1983',sexo:'M',prof:'Vendedor',convenio:'—',status:'Inativo',ltv:2340,compras:3,ultima:'10/01/2025',proxTroca:'atrasado',lente:'Visão simples',marca:'HB',freq:'18 meses',origem:'Facebook',score:41},
    {id:7,nome:'Larissa Martins',cpf:'789.012.345-67',tel:'(11) 93210-9876',email:'larissa.m@email.com',cidade:'São Paulo/SP',nasc:'27/12/1990',sexo:'F',prof:'Arquiteta',convenio:'Porto Seguro',status:'VIP',ltv:18760,compras:22,ultima:'05/07/2026',proxTroca:'jan/2027',lente:'Multifocal',marca:'Prada',freq:'14 meses',origem:'Indicação médica',score:95},
    {id:8,nome:'Gustavo Pereira',cpf:'890.123.456-78',tel:'(11) 92109-8765',email:'gustavo.p@email.com',cidade:'São Paulo/SP',nasc:'08/06/1978',sexo:'M',prof:'Empresário',convenio:'—',status:'Ativo',ltv:9650,compras:12,ultima:'22/06/2026',proxTroca:'dez/2026',lente:'Fotossensível',marca:'Ray-Ban',freq:'16 meses',origem:'Google',score:83},
    {id:9,nome:'Beatriz Alves',cpf:'901.234.567-89',tel:'(11) 91098-7654',email:'bia.alves@email.com',cidade:'Diadema/SP',nasc:'19/02/2000',sexo:'F',prof:'Estudante',convenio:'Unimed',status:'Ativo',ltv:3120,compras:4,ultima:'11/07/2026',proxTroca:'—',lente:'Lente Contato',marca:'Acuvue',freq:'—',origem:'Instagram',score:78},
    {id:10,nome:'Thiago Barbosa',cpf:'012.345.678-90',tel:'(11) 90987-6543',email:'thiago.b@email.com',cidade:'São Paulo/SP',nasc:'03/10/1985',sexo:'M',prof:'Piloto',convenio:'—',status:'VIP',ltv:26400,compras:31,ultima:'08/07/2026',proxTroca:'out/2026',lente:'Polarizada',marca:'Oakley',freq:'8 meses',origem:'Indicação',score:98}
  ],

  timelineCliente:[
    {tipo:'compra',t:'Compra realizada — OS #4821',d:'Armação Ray-Ban RB3025 + Lente Varilux X · R$ 2.340,00',data:'02/07/2026',ico:'shopping-bag'},
    {tipo:'os',t:'Óculos entregue',d:'Retirada na Matriz Centro, atendida por Carla Mendes',data:'28/06/2026',ico:'check-circle'},
    {tipo:'receita',t:'Nova receita cadastrada',d:'Dr. Paulo Andrade — OD -1,25 / OE -1,50 · Adição +2,00',data:'20/06/2026',ico:'file-text'},
    {tipo:'crm',t:'Campanha WhatsApp enviada',d:'"Sua receita pode estar vencendo" — cliente respondeu',data:'15/06/2026',ico:'message-circle'},
    {tipo:'compra',t:'Compra realizada — OS #4390',d:'Lentes de contato Acuvue Oasys (3 caixas) · R$ 540,00',data:'10/03/2026',ico:'shopping-bag'},
    {tipo:'cadastro',t:'Cliente cadastrado',d:'Origem: Indicação de Larissa Martins',data:'22/08/2024',ico:'user-plus'}
  ],

  /* ---------------- MÉDICOS ---------------- */
  medicos:[
    {nome:'Dr. Paulo Andrade',crm:'CRM-SP 45.892',esp:'Oftalmologista',tel:'(11) 3456-7890',cidade:'São Paulo/SP',encaminhados:84,valor:198400,delta:18,nps:96},
    {nome:'Dra. Helena Vieira',crm:'CRM-SP 52.104',esp:'Oftalmologista',tel:'(11) 3567-8901',cidade:'São Paulo/SP',encaminhados:67,valor:154300,delta:12,nps:94},
    {nome:'Dr. Ricardo Mota',crm:'CRM-SP 38.771',esp:'Optometrista',tel:'(11) 3678-9012',cidade:'Guarulhos/SP',encaminhados:52,valor:118900,delta:-4,nps:88},
    {nome:'Dra. Sofia Ramos',crm:'CRM-SP 61.443',esp:'Oftalmologista',tel:'(11) 3789-0123',cidade:'Osasco/SP',encaminhados:41,valor:96700,delta:9,nps:91},
    {nome:'Dr. André Lima',crm:'CRM-SP 29.556',esp:'Optometrista',tel:'(11) 3890-1234',cidade:'São Paulo/SP',encaminhados:33,valor:71200,delta:5,nps:85},
    {nome:'Dra. Camila Freitas',crm:'CRM-SP 57.888',esp:'Oftalmologista',tel:'(11) 3901-2345',cidade:'Barueri/SP',encaminhados:28,valor:63800,delta:22,nps:93}
  ],

  /* ---------------- PRODUTOS ---------------- */
  armacoes:[
    {marca:'Ray-Ban',modelo:'RB3025 Aviator',cor:'Ouro',material:'Metal',genero:'Unissex',cat:'Solar',custo:420,venda:890,estoque:14,min:6,local:'A1-03',cod:'7891234500011'},
    {marca:'Oakley',modelo:'Holbrook',cor:'Preto Fosco',material:'Acetato',genero:'Masculino',cat:'Solar',custo:540,venda:990,estoque:8,min:5,local:'A1-08',cod:'7891234500028'},
    {marca:'Chilli Beans',modelo:'Quadrada Redonda',cor:'Tartaruga',material:'Acetato',genero:'Feminino',cat:'Grau',custo:130,venda:299,estoque:22,min:10,local:'B2-01',cod:'7891234500035'},
    {marca:'Prada',modelo:'PR 17WS',cor:'Preto',material:'Acetato',genero:'Feminino',cat:'Solar',custo:980,venda:1890,estoque:3,min:4,local:'A3-02',cod:'7891234500042'},
    {marca:'Vogue',modelo:'VO5290',cor:'Rosé',material:'Metal',genero:'Feminino',cat:'Grau',custo:180,venda:420,estoque:17,min:8,local:'B1-05',cod:'7891234500059'},
    {marca:'HB',modelo:'Duotech',cor:'Azul',material:'TR90',genero:'Masculino',cat:'Grau',custo:95,venda:249,estoque:31,min:12,local:'C1-04',cod:'7891234500066'},
    {marca:'Ray-Ban',modelo:'Wayfarer RB2140',cor:'Preto',material:'Acetato',genero:'Unissex',cat:'Solar',custo:390,venda:790,estoque:5,min:6,local:'A1-05',cod:'7891234500073'}
  ],
  lentes:[
    {fab:'Zeiss',tipo:'Multifocal',indice:'1.67',material:'Policarbonato',trat:'DuraVision Blue',preco:1290,prazo:'7 dias',forn:'Zeiss Vision'},
    {fab:'Essilor',tipo:'Multifocal',indice:'1.59',material:'Trivex',trat:'Crizal Sapphire',preco:1490,prazo:'6 dias',forn:'Essilor'},
    {fab:'Hoya',tipo:'Visão Simples',indice:'1.60',material:'MR-8',trat:'Hi-Vision + Filtro Azul',preco:690,prazo:'5 dias',forn:'Hoya Brasil'},
    {fab:'Zeiss',tipo:'Fotossensível',indice:'1.50',material:'CR-39',trat:'PhotoFusion',preco:890,prazo:'8 dias',forn:'Zeiss Vision'},
    {fab:'Essilor',tipo:'Visão Simples',indice:'1.74',material:'Alto Índice',trat:'Antirreflexo',preco:1090,prazo:'9 dias',forn:'Essilor'}
  ],
  contato:[
    {marca:'Acuvue Oasys',grau:'-2,00',validade:'Quinzenal',preco:180,estoque:44,forn:'Johnson & Johnson'},
    {marca:'Biofinity',grau:'-3,25',validade:'Mensal',preco:210,estoque:31,forn:'CooperVision'},
    {marca:'Dailies Total 1',grau:'-1,50',validade:'Diária',preco:240,estoque:19,forn:'Alcon'},
    {marca:'Air Optix Colors',grau:'0,00',validade:'Mensal',preco:190,estoque:12,forn:'Alcon'}
  ],
  acessorios:[
    {nome:'Kit Limpeza Premium',cat:'Kit',preco:39.9,estoque:120},
    {nome:'Estojo Rígido Slim',cat:'Estojo',preco:24.9,estoque:88},
    {nome:'Spray Antiembaçante 30ml',cat:'Spray',preco:34.9,estoque:56},
    {nome:'Cordão Silicone Esportivo',cat:'Cordão',preco:19.9,estoque:73},
    {nome:'Flanela Microfibra (kit 3)',cat:'Flanela',preco:14.9,estoque:210}
  ],

  /* ---------------- ESTOQUE ---------------- */
  estoqueResumo:{ valorTotal:842700, itens:1284, skus:346, giro:4.8, parados:23, abaixoMin:8 },
  curvaABC:[
    {classe:'A',pct:20,valor:589890,itens:69,cor:'var(--c1)'},
    {classe:'B',pct:30,valor:210675,itens:104,cor:'var(--c3)'},
    {classe:'C',pct:50,valor:42135,itens:173,cor:'var(--c5)'}
  ],
  movimentacoes:[
    {tipo:'Entrada',produto:'Ray-Ban RB3025 Aviator',qtd:20,doc:'NF 12345',data:'11/07/2026',resp:'Sistema',valor:8400},
    {tipo:'Saída',produto:'Lente Zeiss Multifocal 1.67',qtd:2,doc:'OS #4821',data:'11/07/2026',resp:'Carla M.',valor:-2580},
    {tipo:'Transferência',produto:'Chilli Beans Quadrada',qtd:5,doc:'TRF-081',data:'10/07/2026',resp:'Rafael S.',valor:0},
    {tipo:'Saída',produto:'Acuvue Oasys (cx)',qtd:3,doc:'OS #4820',data:'10/07/2026',resp:'Juliana P.',valor:-540},
    {tipo:'Entrada',produto:'Essilor Varilux X',qtd:15,doc:'NF 12344',data:'09/07/2026',resp:'Sistema',valor:22350},
    {tipo:'Ajuste',produto:'HB Duotech Azul',qtd:-1,doc:'INV-2026-07',data:'08/07/2026',resp:'Ana B.',valor:-95}
  ],

  /* ---------------- ORDENS DE SERVIÇO ---------------- */
  ordens:[
    {os:'#4821',cliente:'Fernanda Lima',lab:'OpticLab',status:'Produção',prazo:'15/07/2026',valor:2340,atraso:false,produto:'RB3025 + Varilux X',prog:40},
    {os:'#4820',cliente:'Beatriz Alves',lab:'—',status:'Pronto',prazo:'11/07/2026',valor:540,atraso:false,produto:'Acuvue Oasys x3',prog:100},
    {os:'#4819',cliente:'Marcelo Nunes',lab:'VisionLab',status:'Montagem',prazo:'14/07/2026',valor:1890,atraso:false,produto:'Oakley + Zeiss Blue',prog:75},
    {os:'#4818',cliente:'Camila Rocha',lab:'OpticLab',status:'Atrasado',prazo:'09/07/2026',valor:1290,atraso:true,produto:'Vogue + Hoya Filtro',prog:55},
    {os:'#4817',cliente:'Larissa Martins',lab:'LenSys',status:'Qualidade',prazo:'13/07/2026',valor:3120,atraso:false,produto:'Prada + Varilux',prog:88},
    {os:'#4816',cliente:'Thiago Barbosa',lab:'VisionLab',status:'Entregue',prazo:'07/07/2026',valor:1780,atraso:false,produto:'Oakley Polarizada',prog:100},
    {os:'#4815',cliente:'Gustavo Pereira',lab:'OpticLab',status:'Envio',prazo:'16/07/2026',valor:2010,atraso:false,produto:'Ray-Ban + Photo',prog:62},
    {os:'#4814',cliente:'Patrícia Gomes',lab:'LenSys',status:'Atrasado',prazo:'08/07/2026',valor:1450,atraso:true,produto:'Chilli + Antirreflexo',prog:50}
  ],
  osStatusResumo:[
    {label:'Aguardando',v:9,c:'var(--muted)'},
    {label:'Produção',v:22,c:'var(--c1)'},
    {label:'Montagem',v:14,c:'var(--c3)'},
    {label:'Qualidade',v:7,c:'var(--c2)'},
    {label:'Pronto',v:12,c:'var(--c4)'},
    {label:'Atrasado',v:3,c:'var(--c6)'}
  ],
  osTimeline:[
    {step:'Pedido',date:'02/07 09:12',done:true},
    {step:'Enviado ao laboratório',date:'02/07 15:40',done:true},
    {step:'Em produção',date:'05/07 10:00',done:true,cur:true},
    {step:'Recebimento',date:'previsto 12/07',done:false},
    {step:'Montagem',date:'previsto 13/07',done:false},
    {step:'Controle de qualidade',date:'previsto 14/07',done:false},
    {step:'Pronto p/ retirada',date:'previsto 15/07',done:false}
  ],

  /* ---------------- LABORATÓRIOS ---------------- */
  laboratorios:[
    {nome:'OpticLab',contato:'(11) 3111-2020',prazoMedio:6.2,pedidos:214,custo:298400,atrasos:4,qualidade:96,ranking:1},
    {nome:'VisionLab',contato:'(11) 3222-3030',prazoMedio:5.8,pedidos:187,custo:261300,atrasos:2,qualidade:98,ranking:2},
    {nome:'LenSys',contato:'(11) 3333-4040',prazoMedio:7.4,pedidos:142,custo:198700,atrasos:9,qualidade:91,ranking:3},
    {nome:'ProLentes',contato:'(11) 3444-5050',prazoMedio:8.1,pedidos:98,custo:132400,atrasos:11,qualidade:88,ranking:4}
  ],

  /* ---------------- FINANCEIRO ---------------- */
  fluxoCaixa:{
    labels:['Sem 1','Sem 2','Sem 3','Sem 4'],
    entradas:[128000,142000,118000,156000],
    saidas:[98000,104000,89000,112000]
  },
  fluxo30:{
    labels:Array.from({length:30},(_,i)=>String(i+1)),
    saldo:[42,45,41,48,52,49,55,58,54,61,64,60,67,71,68,74,72,78,82,79,85,88,84,90,94,91,97,101,98,104].map(x=>x*1000)
  },
  contasPagar:[
    {desc:'Fornecedor Zeiss Vision',venc:'14/07/2026',valor:28400,cat:'Compra Mercadoria',status:'A vencer'},
    {desc:'Aluguel Matriz Centro',venc:'10/07/2026',valor:14500,cat:'Ocupação',status:'Vencido'},
    {desc:'Folha de Pagamento',venc:'05/07/2026',valor:62800,cat:'Pessoal',status:'Pago'},
    {desc:'Energia Elétrica',venc:'18/07/2026',valor:3240,cat:'Utilidades',status:'A vencer'},
    {desc:'Laboratório OpticLab',venc:'20/07/2026',valor:18900,cat:'Serviços',status:'A vencer'}
  ],
  contasReceber:[
    {desc:'Crediário — Fernanda Lima',venc:'15/07/2026',valor:780,parc:'2/6',status:'A vencer'},
    {desc:'Convênio Bradesco Saúde',venc:'25/07/2026',valor:12400,parc:'—',status:'A vencer'},
    {desc:'Crediário — Roberto Dias',venc:'08/07/2026',valor:420,parc:'3/4',status:'Vencido'},
    {desc:'Cartão (recebível D+30)',venc:'30/07/2026',valor:41200,parc:'—',status:'A vencer'},
    {desc:'Crediário — Anderson Silva',venc:'02/07/2026',valor:340,parc:'1/3',status:'Vencido'}
  ],
  dre:[
    {conta:'Receita Bruta',valor:487320,tipo:'receita',nivel:0},
    {conta:'(-) Impostos s/ vendas',valor:-58478,tipo:'deducao',nivel:1},
    {conta:'= Receita Líquida',valor:428842,tipo:'subtotal',nivel:0},
    {conta:'(-) CMV (Custo Mercadoria)',valor:-192500,tipo:'custo',nivel:1},
    {conta:'= Lucro Bruto',valor:236342,tipo:'subtotal',nivel:0},
    {conta:'(-) Despesas Operacionais',valor:-148900,tipo:'despesa',nivel:1},
    {conta:'(-) Comissões',valor:-24366,tipo:'despesa',nivel:1},
    {conta:'= EBITDA',valor:63076,tipo:'subtotal',nivel:0},
    {conta:'(-) Financeiras / Depreciação',valor:-11200,tipo:'despesa',nivel:1},
    {conta:'= Lucro Líquido',valor:51876,tipo:'total',nivel:0}
  ],
  finKpis:{ receita:487320, despesa:435444, lucro:51876, margem:10.6, saldo:104000, aReceber:214320, aPagar:127840, inadimplencia:3.2 },

  /* ---------------- FISCAL ---------------- */
  fiscal:[
    {tipo:'NFC-e',numero:'000.128.442',cliente:'Consumidor Final',valor:890,data:'11/07/2026',status:'Autorizada'},
    {tipo:'NF-e',numero:'000.012.771',cliente:'Fernanda Lima',valor:2340,data:'11/07/2026',status:'Autorizada'},
    {tipo:'NFS-e',numero:'000.004.102',cliente:'Convênio Amil',valor:12400,data:'10/07/2026',status:'Autorizada'},
    {tipo:'NFC-e',numero:'000.128.441',cliente:'Consumidor Final',valor:299,data:'10/07/2026',status:'Cancelada'},
    {tipo:'NF-e',numero:'000.012.770',cliente:'Marcelo Nunes',valor:1890,data:'09/07/2026',status:'Autorizada'},
    {tipo:'NFC-e',numero:'000.128.440',cliente:'Consumidor Final',valor:540,data:'09/07/2026',status:'Pendente'}
  ],
  fiscalKpis:{ emitidas:1284, autorizadas:1247, canceladas:14, pendentes:23, impostos:58478 },

  /* ---------------- CRM ---------------- */
  campanhas:[
    {nome:'Receita Vencendo — Julho',canal:'WhatsApp',alvo:284,enviadas:284,abertura:78,conversao:22,status:'Ativa',roi:640},
    {nome:'Aniversariantes do Mês',canal:'WhatsApp',alvo:96,enviadas:96,abertura:84,conversao:31,status:'Ativa',roi:380},
    {nome:'Clientes Inativos +12m',canal:'E-mail',alvo:412,enviadas:412,abertura:34,conversao:8,status:'Ativa',roi:210},
    {nome:'Lançamento Coleção Verão',canal:'SMS',alvo:1240,enviadas:1240,abertura:41,conversao:5,status:'Concluída',roi:920},
    {nome:'Pós-venda NPS',canal:'WhatsApp',alvo:158,enviadas:158,abertura:71,conversao:0,status:'Ativa',roi:0}
  ],
  aniversariantes:[
    {nome:'Patrícia Gomes',data:'Hoje',idade:34},
    {nome:'Diego Almeida',data:'Amanhã',idade:41},
    {nome:'Camila Rocha',data:'14/07',idade:31},
    {nome:'Gustavo Pereira',data:'16/07',idade:48}
  ],
  crmFunil:[
    {label:'Leads / Visitantes',v:1240,c:'var(--c1)'},
    {label:'Interessados',v:680,c:'var(--c2)'},
    {label:'Orçamentos',v:412,c:'var(--c3)'},
    {label:'Vendas',v:284,c:'var(--c4)'}
  ],

  /* ---------------- AGENDA ---------------- */
  agenda:[
    {dia:14,tipo:'entrega',titulo:'Entrega óculos — Fernanda',hora:'10:00',c:'var(--c1)'},
    {dia:14,tipo:'consulta',titulo:'Exame de vista — parceria Dr. Paulo',hora:'14:30',c:'var(--c3)'},
    {dia:15,tipo:'retorno',titulo:'Ajuste armação — Marcelo',hora:'11:00',c:'var(--c5)'},
    {dia:16,tipo:'evento',titulo:'Treinamento novos frames',hora:'09:00',c:'var(--c4)'},
    {dia:18,tipo:'entrega',titulo:'Entrega — Larissa Martins',hora:'16:00',c:'var(--c1)'},
    {dia:22,tipo:'visita',titulo:'Visita representante Zeiss',hora:'15:00',c:'var(--c2)'}
  ],
  agendaHoje:[
    {hora:'09:00',titulo:'Abertura de caixa',tipo:'Rotina',c:'var(--muted)'},
    {hora:'10:00',titulo:'Entrega — Beatriz Alves',tipo:'Entrega',c:'var(--c1)'},
    {hora:'11:30',titulo:'Retorno ajuste — Roberto Dias',tipo:'Retorno',c:'var(--c5)'},
    {hora:'14:00',titulo:'Reunião equipe de vendas',tipo:'Reunião',c:'var(--c3)'},
    {hora:'16:30',titulo:'Exame parceria — Dra. Helena',tipo:'Consulta',c:'var(--c2)'}
  ],

  /* ---------------- RELATÓRIOS ---------------- */
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
    real:[487,null,null,null,null,null],
    prev:[487,512,498,534,610,720],
    min:[487,486,470,500,560,650],
    max:[487,540,528,570,660,790]
  },
  reporSugestao:[
    {produto:'Lente Zeiss DuraVision Blue',atual:12,min:20,sugestao:40,dias:6,risco:'alto'},
    {produto:'Ray-Ban RB3025 Aviator',atual:14,min:6,sugestao:10,dias:11,risco:'medio'},
    {produto:'Acuvue Oasys (cx)',atual:44,min:20,sugestao:24,dias:9,risco:'medio'},
    {produto:'Prada PR 17WS',atual:3,min:4,sugestao:6,dias:4,risco:'alto'},
    {produto:'Essilor Varilux X',atual:52,min:15,sugestao:0,dias:32,risco:'baixo'}
  ],
  clientesTroca:[
    {nome:'Fernanda Lima',ciclo:'18 meses',ultima:'jan/2025',prob:88,potencial:2340},
    {nome:'Thiago Barbosa',ciclo:'8 meses',ultima:'nov/2025',prob:82,potencial:1780},
    {nome:'Marcelo Nunes',ciclo:'12 meses',ultima:'jul/2025',prob:79,potencial:1890},
    {nome:'Gustavo Pereira',ciclo:'16 meses',ultima:'mar/2025',prob:71,potencial:2010},
    {nome:'Patrícia Gomes',ciclo:'10 meses',ultima:'set/2025',prob:69,potencial:1450}
  ],
  iaInsights:[
    {tipo:'Previsão',ico:'trending-up',t:'Faturamento projetado de dezembro: R$ 720k',d:'Alta de 48% sobre a média — impulsionada por trocas de fim de ano e coleção verão.',conf:91},
    {tipo:'Estoque',ico:'package',t:'2 produtos entrarão em ruptura em até 6 dias',d:'Zeiss Blue e Prada PR 17WS. Compra automática sugerida totaliza R$ 34.900.',conf:87},
    {tipo:'Cliente',ico:'users',t:'34 clientes com alta chance de troca este mês',d:'Ciclo médio atingido. Campanha WhatsApp pode gerar R$ 28.600 em vendas.',conf:84},
    {tipo:'Equipe',ico:'award',t:'Melhor horário para converter é sábado 14h–17h',d:'Conversão 27% acima da média. Realoque a equipe sênior para esse turno.',conf:79},
    {tipo:'Risco',ico:'alert-triangle',t:'Inadimplência tende a cair para 2,6% em agosto',d:'Modelo prevê melhora com a régua de cobrança automática ativa.',conf:76}
  ],

  /* ---------------- FIDELIDADE ---------------- */
  fidelidade:{ membros:3420, pontosDistribuidos:1284000, resgates:842, cashbackAcumulado:48200,
    niveis:[{nome:'Bronze',membros:2100,cor:'#cd7f32'},{nome:'Prata',membros:920,cor:'#94a3b8'},{nome:'Ouro',membros:340,cor:'#f0b429'},{nome:'Diamante',membros:60,cor:'#38bdf8'}] },

  /* ---------------- CATÁLOGO ---------------- */
  catalogo:[
    {marca:'Ray-Ban',modelo:'Aviator Classic',preco:890,tag:'Best-seller',cor:'#f0b429'},
    {marca:'Oakley',modelo:'Holbrook',preco:990,tag:'Novo',cor:'#0ea5e9'},
    {marca:'Prada',modelo:'PR 17WS',preco:1890,tag:'Premium',cor:'#7c5cff'},
    {marca:'Chilli Beans',modelo:'Redonda Tartaruga',preco:299,tag:'Promo',cor:'#f43f5e'},
    {marca:'Vogue',modelo:'VO5290 Rosé',preco:420,tag:'Feminino',cor:'#f472b6'},
    {marca:'HB',modelo:'Duotech Azul',preco:249,tag:'Custo-benefício',cor:'#10b981'}
  ]
};
/* ================= EXPANSÃO: centro de comando, IA e perfil rico ================= */
Object.assign(DATA, {
  // saudação / home personalizada
  comando:{
    saudacao:'Bom dia', consultas:12, entregas:7, pagamentos:3, faltas:2,
    metaPct:82, receitaPrev:94200,
    hoje:[
      {label:'Vendas do dia', v:32, cfmt:'int', ico:'shopping-bag', tone:'primary', sem:'ok'},
      {label:'Receita do dia', v:18740, cfmt:'money0', ico:'dollar-sign', tone:'success', sem:'ok'},
      {label:'Ticket médio', v:842, cfmt:'money0', ico:'tag', tone:'info', sem:'ok'},
      {label:'Margem', v:57.2, cfmt:'pct1', ico:'percent', tone:'violet', sem:'ok'},
      {label:'Ordens atrasadas', v:3, cfmt:'int', ico:'alert-triangle', tone:'danger', sem:'crit'},
      {label:'Clientes agendados', v:12, cfmt:'int', ico:'calendar', tone:'primary', sem:'ok'},
      {label:'Estoque crítico', v:8, cfmt:'int', ico:'package', tone:'warning', sem:'warn'},
      {label:'Contas vencendo', v:5, cfmt:'int', ico:'credit-card', tone:'warning', sem:'warn'},
      {label:'Receita prev. semana', v:128000, cfmt:'moneyk', ico:'trending-up', tone:'success', sem:'ok'},
    ]
  },
  // banda de IA no dashboard (mensagens de comando)
  iaComando:[
    {tone:'danger', ico:'trending-down', txt:'Seu faturamento caiu <b>12%</b> nas <b>armações premium</b> este mês.', cta:'Ver análise', route:'bi'},
    {tone:'warning', ico:'package', txt:'A lente <b>Zeiss DuraVision Blue</b> tem apenas <b>3 unidades</b>.', cta:'Repor agora', route:'estoque'},
    {tone:'info', ico:'users', txt:'Existem <b>27 clientes</b> sem retornar há mais de <b>1 ano</b>.', cta:'Criar campanha', route:'crm'},
    {tone:'success', ico:'dollar-sign', txt:'Você pode faturar <b>R$ 18.400</b> recuperando esses clientes.', cta:'Recuperar', route:'crm'},
  ],
  // notificações inteligentes (severidade)
  notificacoesSmart:[
    {sev:'danger', ico:'credit-card', count:3, titulo:'3 pagamentos vencidos', txt:'R$ 1.100 em crediário em atraso', route:'financeiro'},
    {sev:'warning', ico:'truck', count:8, titulo:'8 clientes aguardando entrega', txt:'Óculos prontos há mais de 5 dias', route:'os'},
    {sev:'success', ico:'target', count:null, titulo:'Meta do mês atingida em 82%', txt:'Faltam apenas R$ 115k em 8 dias', route:'dashboard'},
    {sev:'info', ico:'dollar-sign', count:null, titulo:'Receita disponível para saque', txt:'R$ 41.200 liberados pelo adquirente', route:'financeiro'},
    {sev:'warning', ico:'package', count:8, titulo:'8 produtos abaixo do mínimo', txt:'Reposição sugerida pela Redentora IA', route:'estoque'},
  ],
  // IA copiloto (assistente permanente)
  iaCopilot:[
    {sev:'warn', ico:'users', t:'18 clientes inativos', d:'Sem comprar há mais de 12 meses', route:'crm'},
    {sev:'danger', ico:'package', t:'Estoque acaba em 5 dias', d:'Lente Zeiss DuraVision Blue', route:'estoque'},
    {sev:'warn', ico:'trending-down', t:'Ticket médio caiu 7%', d:'Nas últimas 2 semanas', route:'bi'},
    {sev:'ok', ico:'dollar-sign', t:'Potencial de R$ 12.800', d:'Recuperando os clientes inativos', route:'crm'},
  ],
  copilotAcoes:[
    {label:'Gerar campanha', ico:'send', route:'crm'},
    {label:'Ver clientes', ico:'users', route:'clientes'},
    {label:'Comprar estoque', ico:'shopping-cart', route:'estoque'},
  ],
  notificacoesSemana:[
    {sev:'violet', ico:'star', titulo:'Novo cliente VIP', txt:'Thiago Barbosa atingiu R$ 26,4k em LTV', route:'clientes'},
    {sev:'warning', ico:'flask', titulo:'Laboratório atrasado', txt:'ProLentes acumula 11 atrasos no mês', route:'laboratorios'},
    {sev:'success', ico:'megaphone', titulo:'Campanha finalizada', txt:'"Lançamento Verão" · 5% conversão · ROI 9,2x', route:'crm'},
  ],
  notificacoesMes:[
    {sev:'info', ico:'receipt', titulo:'Obrigação fiscal', txt:'SPED Fiscal vence em 20/08', route:'fiscal'},
    {sev:'success', ico:'award', titulo:'Recorde de faturamento', txt:'Julho é o melhor mês do ano até agora', route:'bi'},
    {sev:'violet', ico:'gift', titulo:'42 aniversariantes', txt:'Campanha automática de felicitações ativa', route:'crm'},
  ],
  iaSugestoes:['Faça um relatório do mês','Qual vendedor vendeu mais?','Quais clientes devo ligar?','Existem contas atrasadas?','Qual produto mais vende?'],
  // Centro de comando — status do dia + recomendações da IA
  comandoStatus:[
    {sev:'ok',   n:18, txt:'consultas agendadas', route:'agenda'},
    {sev:'warn', n:6,  txt:'óculos para entregar', route:'os'},
    {sev:'crit', n:2,  txt:'lentes atrasadas', route:'os'},
    {sev:'info', n:3,  txt:'contas vencendo hoje', route:'financeiro'},
  ],
  iaRecomenda:[
    {tone:'danger',  ico:'phone-call',   t:'Recupere R$ 28.400', d:'Ligue para 46 clientes há +11 meses sem comprar.', cta:'Criar campanha', route:'crm'},
    {tone:'warning', ico:'package',      t:'Risco de ruptura em 6 dias', d:'Lentes multifocais podem faltar — compre 24 unidades.', cta:'Repor estoque', route:'estoque'},
    {tone:'success', ico:'trending-up',  t:'12% acima da média', d:'Seu faturamento supera o mesmo período do mês passado.', cta:'Ver BI', route:'bi'},
    {tone:'violet',  ico:'sparkles',     t:'Bom dia para promover Ray-Ban', d:'Alta procura prevista para hoje à tarde (14h–17h).', cta:'Ver catálogo', route:'catalogo'},
  ],
  // estoque inteligente
  estoqueInteligente:[
    {nome:'Ray-Ban RB3025 Aviator', rating:5, tag:'Campeão de vendas', tagTone:'success', margem:53, ultima:'hoje', dias:12, capital:5880, curva:'A', giro:8.2},
    {nome:'Essilor Varilux X', rating:5, tag:'Alta margem', tagTone:'success', margem:62, ultima:'ontem', dias:9, capital:11250, curva:'A', giro:6.4},
    {nome:'Oakley Holbrook', rating:4, tag:'Boa saída', tagTone:'primary', margem:45, ultima:'há 3 dias', dias:18, capital:4320, curva:'A', giro:4.8},
    {nome:'Vogue VO5290 Rosé', rating:4, tag:'Tendência de alta', tagTone:'violet', margem:57, ultima:'há 2 dias', dias:15, capital:3060, curva:'B', giro:3.9},
    {nome:'HB Duotech Azul', rating:3, tag:'Baixa rotatividade', tagTone:'warning', margem:61, ultima:'há 21 dias', dias:34, capital:2945, curva:'B', giro:2.3},
    {nome:'Prada PR 17WS', rating:2, tag:'Capital parado', tagTone:'danger', margem:48, ultima:'há 62 dias', dias:62, capital:2940, curva:'C', giro:1.1},
  ],
  // perfil rico do cliente (demo aplicada a qualquer cliente aberto)
  clienteRico:{
    grau:{od:'-1,25', oe:'-1,50', adicao:'+2,00', dnp:'62 mm'},
    receitas:[
      {data:'20/06/2026', medico:'Dr. Paulo Andrade', od:'-1,25', oe:'-1,50', ad:'+2,00'},
      {data:'10/03/2025', medico:'Dra. Helena Vieira', od:'-1,00', oe:'-1,25', ad:'+1,75'},
      {data:'05/01/2024', medico:'Dr. Paulo Andrade', od:'-0,75', oe:'-1,00', ad:'—'},
    ],
    oculos:[
      {modelo:'Ray-Ban Aviator', ano:'2026', cor:'#f0b429', shape:'aviator'},
      {modelo:'Wayfarer Preto', ano:'2024', cor:'#1a1a2e', shape:'square'},
      {modelo:'Vogue Rosé', ano:'2023', cor:'#f472b6', shape:'cat'},
    ],
    garantias:[
      {item:'Armação Ray-Ban RB3025', ate:'02/07/2027', status:'Ativa'},
      {item:'Lente Varilux X', ate:'02/01/2027', status:'Ativa'},
      {item:'Armação Wayfarer', ate:'10/03/2025', status:'Expirada'},
    ],
    contatos:[
      {canal:'WhatsApp', ico:'message-circle', data:'15/06/2026', txt:'Respondeu campanha "receita vencendo"'},
      {canal:'Ligação', ico:'phone', data:'02/05/2026', txt:'Confirmou entrega dos óculos'},
      {canal:'E-mail', ico:'mail', data:'18/03/2026', txt:'Recebeu nota fiscal por e-mail'},
    ],
    iaPrev:{prob:88, quando:'set/2026', valor:2340, sugestao:'Multifocal + antirreflexo premium'},
    ordens:[
      {os:'#4821', status:'Produção', produto:'RB3025 + Varilux X', valor:2340},
      {os:'#4390', status:'Entregue', produto:'Acuvue Oasys x3', valor:540},
      {os:'#3921', status:'Entregue', produto:'Wayfarer + Antirreflexo', valor:1180},
    ],
    timeline:[
      {ano:'2026', eventos:[
        {t:'Nova venda — OS #4821', d:'RB3025 + Varilux X · R$ 2.340', data:'02/07', ico:'shopping-bag', tone:'primary'},
        {t:'Óculos entregue', d:'Retirada na Matriz Centro', data:'28/06', ico:'check-circle', tone:'success'},
        {t:'Receita atualizada', d:'Dr. Paulo Andrade', data:'20/06', ico:'file-text', tone:'info'},
        {t:'Campanha respondida', d:'WhatsApp — troca de lentes', data:'15/06', ico:'message-circle', tone:'violet'},
      ]},
      {ano:'2025', eventos:[
        {t:'Compra — Lentes de contato', d:'Acuvue Oasys x3 · R$ 540', data:'10/03', ico:'shopping-bag', tone:'primary'},
        {t:'Ajuste de armação', d:'Sem custo (garantia)', data:'22/01', ico:'settings', tone:'info'},
      ]},
      {ano:'2024', eventos:[
        {t:'Cliente cadastrado', d:'Indicação de Larissa Martins', data:'22/08', ico:'user-plus', tone:'success'},
      ]},
    ]
  }
});
window.DATA = DATA; window.fmt = fmt; window.initials = initials; window.avatarColor = avatarColor;
