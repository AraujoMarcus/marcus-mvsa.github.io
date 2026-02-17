# Como adicionar conteúdo ao site

Todo o conteúdo listado nas seções **Writing**, **Notebooks**, **Research** e **Books** vem de arquivos JSON na pasta `content/`. Para adicionar ou editar itens, basta editar o JSON correspondente e manter o padrão abaixo.

**Importante:** Para testar localmente, abra o site via um servidor HTTP (ex.: `npx serve .` na pasta do projeto). Abrir `index.html` direto no navegador (`file://`) impede o carregamento dos JSON.

---

## Estrutura do projeto (o que é cada arquivo)

| Arquivo / Pasta | Função |
|-----------------|--------|
| **index.html** | Página inicial: intro, ticker, seções Writing / Notebooks / Research / Books (conteúdo carregado dos JSON). |
| **posts.html** | Página só de posts: lista todo o conteúdo por tipo (Writing, Notebooks, Research, Books), sem intro. Link “posts” no menu leva aqui. |
| **post.html** | **Um** artigo em texto corrido (ex.: o demo “GNN economic fragility”). Itens da lista Writing podem apontar para este ou para outros `post-*.html`. |
| **template/** | Modelo para novos artigos: copie `template/post.html`, renomeie (ex.: `post-meu-tema.html`), edite e registre em `writing.json`. Não é duplicata de `post.html`: o template é o “formulário em branco”; `post.html` é um post real publicado. |
| **content/*.json** | Dados das listas (writing, notebooks, research, books). O script `content/load.js` preenche as seções a partir deles. |

Resumo: **posts** = página que lista tudo; **post** = página de um artigo só. Os dois são necessários.

---

## 1. Writing — `content/writing.json`

Lista de posts/artigos. Cada item é um objeto no array.

| Campo   | Obrigatório | Descrição |
|--------|-------------|-----------|
| `href` | sim         | URL do post |
| `tag`  | sim         | Etiqueta exibida: `Press`, `Medium`, `Paper`, etc. (define a classe visual) |
| `title`| sim*        | Título em uma língua só. Use `title_en`, `title_pt`, `title_es` se tiver em 3 idiomas |
| `meta` | não        | Texto secundário (ex.: "TI Inside · May 2024") |
| `meta_en`, `meta_pt`, `meta_es` | não | Meta por idioma (ex.: "Coming soon" / "Em breve" / "Próximamente") |

**Exemplo — novo post:**

```json
{
  "href": "https://exemplo.com/meu-post",
  "tag": "Medium",
  "title": "Título do post",
  "meta": "Fonte · Data"
}
```

**Exemplo — com “Em breve” em 3 idiomas:**

```json
{
  "href": "#",
  "tag": "Medium",
  "title": "Título em inglês",
  "meta_en": "Coming soon",
  "meta_pt": "Em breve",
  "meta_es": "Próximamente"
}
```

---

## 2. Research & Publications — `content/research.json`

Mesmo formato do Writing: array de objetos com `href`, `tag`, `title` (ou `title_en`/`title_pt`/`title_es`), `meta` (ou `meta_en`/`meta_pt`/`meta_es`).

**Tags com estilo próprio:** `PLOS ONE`, `SBBD`, `Paper` (geram classes como `tag-paper`).

**Exemplo:**

```json
{
  "href": "https://doi.org/...",
  "tag": "PLOS ONE",
  "title": "Título do paper",
  "meta": "2026"
}
```

---

## 3. Interactive Notebooks — `content/notebooks.json`

Cada item é um card com idioma, título, descrição e links.

| Campo | Obrigatório | Descrição |
|-------|-------------|-----------|
| `lang` | sim | Ex.: `"Python"` (exibido como badge) |
| `title` | sim* | Título em uma língua. Ou use `title_en`, `title_pt`, `title_es` |
| `description_en`, `description_pt`, `description_es` | sim (pelo menos um) | Descrição por idioma |
| `links` | sim | Array de `{ "label": "GitHub", "url": "https://..." }` |

**Exemplo:**

```json
{
  "lang": "Python",
  "title": "Título do notebook",
  "description_en": "Short description in English.",
  "description_pt": "Descrição curta em português.",
  "description_es": "Descripción corta en español.",
  "links": [
    { "label": "GitHub", "url": "https://github.com/..." },
    { "label": "NotebookLab", "url": "https://..." }
  ]
}
```

---

## 4. Recommended Books — `content/books.json`

Cada item é um card com categoria, título, autor e nota.

| Campo | Obrigatório | Descrição |
|-------|-------------|-----------|
| `category` | sim | Uma de: `ai`, `econ`, `gov`, `strategy` (define cor e rótulo: AI, Economics, Governance, Strategy) |
| `title` | sim | Título do livro |
| `author` | sim | Autor(es) |
| `note_en`, `note_pt`, `note_es` | sim (pelo menos um) | Sua recomendação por idioma |

**Exemplo:**

```json
{
  "category": "ai",
  "title": "Nome do Livro",
  "author": "Autor",
  "note_en": "Why this book matters...",
  "note_pt": "Por que este livro importa...",
  "note_es": "Por qué importa este libro..."
}
```

---

## Resumo

| Seção   | Arquivo            | O que fazer para adicionar |
|---------|--------------------|----------------------------|
| Writing | `content/writing.json`   | Inserir um objeto no array com `href`, `tag`, `title`, e opcionalmente `meta` ou `meta_en`/`meta_pt`/`meta_es`. |
| Research| `content/research.json`  | Mesmo padrão do Writing. |
| Notebooks | `content/notebooks.json` | Inserir objeto com `lang`, `title` (ou títulos por idioma), `description_*`, `links`. |
| Books   | `content/books.json`     | Inserir objeto com `category` (`ai`/`econ`/`gov`/`strategy`), `title`, `author`, `note_en`/`note_pt`/`note_es`. |

Mantenha o JSON válido (vírgulas entre itens, sem vírgula após o último). O script `content/load.js` lê esses arquivos e preenche as seções na página.

---

## 5. Posts em texto corrido (template com índice)

**Use a pasta `template/`:** nela estão o modelo de post e o passo a passo. Sempre que for escrever um novo artigo:

1. Copie **`template/post.html`** para a raiz do projeto e renomeie (ex.: `post-meu-tema.html`).
2. Substitua todos os placeholders `[ ... ]` no arquivo: título, tags, data, texto. Use `<h2 id="slug">` e `<h3 id="slug">` nas seções; atualize a lista “On this page” na sidebar com os mesmos `#slug`.
3. Em **`content/writing.json`**, adicione um item com `href` igual ao nome do novo arquivo.

Instruções detalhadas: **`template/README.md`**.
