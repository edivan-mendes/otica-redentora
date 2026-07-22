# Deploy — Ótica Redentora (runbook)

Site **100% estático, sem build** (HTML/CSS/JS + Google Fonts via CDN).
Modelo idêntico ao obra-sync: **GitHub → Cloudflare Pages**.

| Ambiente | Branch | Publica |
|---|---|---|
| Produção | `main` | domínio oficial / `otica-redentora.pages.dev` |
| Homologação | `develop` | preview automático `*.pages.dev` |

## 1. Criar o repositório no GitHub (uma vez)
1. https://github.com/new → nome **`otica-redentora`**, **Private** (recomendado).
2. NÃO marque "Add a README/.gitignore/license" (o repo local já tem tudo).

## 2. Enviar o código (uma vez)
No PowerShell, dentro de `C:\Projetos\otica-redentora`:
```powershell
git remote add origin https://github.com/edivan-mendes/otica-redentora.git  # (já configurado por padrão)
git push -u origin main
git push -u origin develop
```
> Na 1ª vez o Git pede login do GitHub (abre o navegador).

## 3. Conectar o Cloudflare Pages (uma vez)
1. https://dash.cloudflare.com → **Workers & Pages → Create → Pages → Connect to Git**.
2. Autorize o GitHub e escolha **`otica-redentora`**.
3. Configuração de build:
   - **Framework preset:** None
   - **Build command:** *(vazio — não há build)*
   - **Build output directory:** `/`  (a própria raiz do repo)
   - **Production branch:** `main`
4. **Save and Deploy**. Em ~1 min o site fica no ar em `https://otica-redentora.pages.dev`.
5. `develop` passa a gerar previews automáticos a cada push (homologação).

## 4. Domínio próprio (opcional)
Pages → **Custom domains** → adicionar (ex.: `redentora.corpalms.com.br` ou o
domínio da ótica) → criar o **CNAME** que o Cloudflare indicar no DNS.
HTTPS é automático (certificado gerenciado).

## 5. Dia a dia (publicar uma nova versão)
```powershell
# 1) desenvolver na branch develop
git checkout develop
#    ... editar arquivos ...
git add -A && git commit -m "descrição"
git push                      # publica a HOMOLOGAÇÃO (preview) sozinho

# 2) validado? subir para produção:
git checkout main
git merge develop
git push                      # publica a PRODUÇÃO sozinho
```

## 6. Rollback
Cloudflare Pages → **Deployments** → deployment anterior → **⋯ → Rollback**
(1 clique, sem git). Ou `git revert <commit>` na `main` + push.

## Notas
- Não há variáveis de ambiente nem segredos (é front-end puro com dados fictícios).
- Segurança básica de cabeçalhos em `_headers` (nosniff, SAMEORIGIN, referrer).
- `.pages.dev` já vem com HTTPS.
