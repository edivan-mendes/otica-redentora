-- =============================================================
-- Ótica Redentora — Migration 0001 · Cadastros base
-- Cole este arquivo INTEIRO no SQL Editor do Supabase e execute (Run).
-- Cria: clientes, medicos, produtos, fornecedores, funcionarios
-- Segurança: RLS ligado, acesso só para usuários autenticados.
-- =============================================================

create extension if not exists pgcrypto;

-- ---------- CLIENTES ----------
create table if not exists public.clientes (
  id           uuid primary key default gen_random_uuid(),
  nome         text not null,
  cpf          text,
  rg           text,
  tel          text,
  whatsapp     text,
  email        text,
  nascimento   date,
  sexo         text,
  endereco     text,
  cidade       text,
  estado       text,
  cep          text,
  profissao    text,
  convenio     text,
  origem       text,
  status       text default 'Ativo',
  lente        text,
  marca        text,
  freq         text,
  observacoes  text,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- ---------- MEDICOS ----------
create table if not exists public.medicos (
  id            uuid primary key default gen_random_uuid(),
  nome          text not null,
  crm           text,
  especialidade text,
  tel           text,
  whatsapp      text,
  email         text,
  cidade        text,
  estado        text,
  observacoes   text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ---------- PRODUTOS (unificado por tipo) ----------
-- tipo: armacao | lente | contato | acessorio
create table if not exists public.produtos (
  id           uuid primary key default gen_random_uuid(),
  tipo         text not null default 'armacao',
  marca        text,
  modelo       text,
  descricao    text,
  cor          text,
  material     text,
  genero       text,
  categoria    text,
  indice       text,
  tratamentos  text,
  validade     text,
  custo        numeric default 0,
  venda        numeric default 0,
  fornecedor   text,
  cod_barras   text,
  estoque      integer default 0,
  estoque_min  integer default 0,
  local        text,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- ---------- FORNECEDORES ----------
create table if not exists public.fornecedores (
  id           uuid primary key default gen_random_uuid(),
  nome         text not null,
  cnpj         text,
  categoria    text,
  contato      text,
  email        text,
  cidade       text,
  estado       text,
  observacoes  text,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- ---------- FUNCIONARIOS ----------
create table if not exists public.funcionarios (
  id           uuid primary key default gen_random_uuid(),
  nome         text not null,
  cpf          text,
  cargo        text,
  contato      text,
  email        text,
  admissao     date,
  meta         numeric default 0,
  comissao     numeric default 0,
  status       text default 'Ativo',
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- ---------- RLS: só usuários autenticados ----------
alter table public.clientes     enable row level security;
alter table public.medicos      enable row level security;
alter table public.produtos     enable row level security;
alter table public.fornecedores enable row level security;
alter table public.funcionarios enable row level security;

drop policy if exists auth_all on public.clientes;
drop policy if exists auth_all on public.medicos;
drop policy if exists auth_all on public.produtos;
drop policy if exists auth_all on public.fornecedores;
drop policy if exists auth_all on public.funcionarios;

create policy auth_all on public.clientes     for all to authenticated using (true) with check (true);
create policy auth_all on public.medicos      for all to authenticated using (true) with check (true);
create policy auth_all on public.produtos     for all to authenticated using (true) with check (true);
create policy auth_all on public.fornecedores for all to authenticated using (true) with check (true);
create policy auth_all on public.funcionarios for all to authenticated using (true) with check (true);
