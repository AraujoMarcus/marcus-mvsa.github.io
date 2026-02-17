# Template de post

Use esta pasta sempre que for **escrever um novo artigo** em texto corrido (estilo blog, com índice “On this page” ao lado).

---

## Passo a passo

### 1. Copiar o template

- Copie o arquivo **`post.html`** desta pasta.
- Cole na **raiz do projeto** (mesma pasta do `index.html`).
- Renomeie para o seu post, em minúsculas e com hífens, por exemplo:
  - `post-gnn-economic-fragility.html`
  - `post-ai-governance-latam.html`

### 2. Editar o conteúdo

Abra o novo arquivo e substitua **todos os placeholders** `[ ... ]`:

| Onde | O que colocar |
|------|----------------|
| `<title>` | Título curto do post (aparece na aba do navegador). |
| `<h1>` | Título principal do artigo (igual ou parecido com o título da página). |
| `.post-tag` | Tags (ex.: **Medium**, **Press**, **machine learning**, **economic resilience**). Use as classes que já existem: `tag-medium`, `tag-press`, `tag-ml`, `tag-econ`. |
| `Published — [Mês Ano]` | Data de publicação (ex.: **June 2025**). |
| `.post-body` | Seu texto: parágrafos `<p>`, seções `<h2 id="slug-da-secao">`, subseções `<h3 id="slug">`, e opcionalmente `<blockquote>`. |

**Índice (sidebar):**  
Cada `<h2>` e `<h3>` deve ter um `id` em formato slug (minúsculas, hífens). Na sidebar “On this page”, os links devem apontar para esses `id` (ex.: `#primeira-secao`, `#conclusao`). Ao adicionar ou mudar uma seção, atualize a lista em `<aside class="post-sidebar">` para manter o índice correto.

**Link “voltar”:**  
No topo, o link “← Writing” pode ser `posts.html#writing` ou `index.html#writing`, conforme você queira mandar o leitor para a lista de posts ou para a home.

### 3. Aparecer na lista do site

Para o post aparecer na seção **Writing** do site:

1. Abra **`content/writing.json`**.
2. Adicione um novo objeto no array, com:
   - **`href`**: nome do seu arquivo (ex.: `post-gnn-economic-fragility.html`).
   - **`tag`**: mesma tag que você usou no post (ex.: `Medium`, `Press`).
   - **`title`**: título que aparece na lista (pode ser igual ao do post).
   - **`meta`**: texto secundário (ex.: `June 2025` ou `Medium · June 2025`).

Exemplo:

```json
{
  "href": "post-gnn-economic-fragility.html",
  "tag": "Medium",
  "title": "What Graph Neural Networks reveal about economic fragility",
  "meta": "June 2025"
}
```

Salve o JSON (mantenha vírgulas entre itens, sem vírgula após o último).

---

## Resumo

1. **Copiar** `template/post.html` → colar na raiz e **renomear** (ex.: `post-meu-tema.html`).
2. **Substituir** todos os `[placeholders]`: título, tags, data, texto, índices (h2/h3 com `id` e links na sidebar).
3. **Registrar** o post em `content/writing.json` com `href`, `tag`, `title` e `meta`.

Sempre que for escrever um post novo, repita esses três passos a partir deste template.
