# Ótica Redentora (Protótipo Front-end)

Protótipo navegável e premium de um sistema SaaS de gestão para óticas.
100% **HTML + CSS + JavaScript puro** (sem frameworks, sem build, sem dependências externas exceto Google Fonts).

## Como abrir
Basta abrir `index.html` no navegador (Chrome, Edge ou Firefox). Não precisa de servidor.
> Dica: para as fontes carregarem, mantenha conexão com a internet (Google Fonts). Sem internet, cai para fontes do sistema.

## Estrutura
```
Ótica Redentora/
├── index.html            # shell do app (sidebar + topbar + área de conteúdo)
├── css/
│   └── style.css         # design system completo (tokens, glass, temas claro/escuro, componentes, responsivo)
├── js/
│   ├── data.js           # dados fictícios realistas (pt-BR) + formatadores
│   ├── charts.js         # motor de gráficos em SVG puro (linha/área/barras/donut/gauge/spark/heatmap/anéis/funil)
│   ├── ui.js             # ícones SVG + componentes (KPI, cards, tabelas, badges, tooltip, toast, modal, drawer)
│   ├── app.js            # navegação, roteador por hash, tema, busca (Ctrl+K), notificações, perfil
│   └── pages/            # uma tela por arquivo
│       ├── dashboard.js  # Dashboard Executivo (destaque)
│       ├── clientes.js · medicos.js · produtos.js · estoque.js
│       ├── vendas.js (PDV) · os.js · laboratorios.js
│       ├── financeiro.js · fiscal.js · crm.js · agenda.js · relatorios.js
│       ├── bi.js · ia.js
│       ├── diferenciais.js  # Prova Virtual · Catálogo Digital · Clube & Fidelidade
│       └── config.js
└── assets/
```

## Recursos
- **16 módulos** no menu + telas de diferenciais (Prova Virtual com IA, Catálogo Digital, Fidelidade/Cashback).
- **Dashboard Executivo** com 12 KPIs, gauge Meta×Realizado, faturamento 12 meses, mix de categorias, formas de pagamento, ranking de vendedores, mapa de calor, fluxo de caixa e central de insights de IA.
- **Tema claro/escuro** (persistido), **menu recolhível**, **responsivo** (desktop → mobile).
- **Gráficos animados** desenhados à mão em SVG, com tooltips.
- **Interações**: PDV com carrinho funcional, busca global (Ctrl+K), drawers de cliente/OS, modais, notificações, toasts.
- Dados fictícios convincentes em toda a navegação.

## Navegação rápida
- `Ctrl/Cmd + K` — busca / paleta de comandos
- Clique nos cards de KPI, linhas de tabela e itens para abrir detalhes
- Alterne o tema pelo ícone de lua/sol na barra superior
