/**
 * Carrega content/*.json e renderiza nas seções da página.
 * Para adicionar conteúdo: edite os JSON em content/ seguindo o padrão existente.
 */
(function () {
  function esc(s) {
    if (s == null) return '';
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function metaSpan(item, key) {
    var en = item[key + '_en'] || item.meta;
    var pt = item[key + '_pt'] || item.meta;
    var es = item[key + '_es'] || item.meta;
    if (en && pt && es && (en !== pt || en !== es)) {
      return '<span data-lang="en" class="active">' + esc(en) + '</span><span data-lang="pt">' + esc(pt) + '</span><span data-lang="es">' + esc(es) + '</span>';
    }
    return esc(en || item.meta || '');
  }

  function tagClass(tag) {
    var t = (tag || '').toLowerCase();
    if (t === 'press') return 'tag-press';
    if (t === 'medium') return 'tag-medium';
    if (t === 'paper' || t === 'plos one' || t === 'sbbd') return 'tag-paper';
    return 'tag-press';
  }

  function renderWriting(list) {
    var html = '';
    list.forEach(function (item) {
      var tag = item.tag || '';
      var title = item.title || item.title_en || '';
      var meta = item.meta ? esc(item.meta) : metaSpan(item, 'meta');
      html += '<a href="' + esc(item.href) + '" class="post-item" target="_blank">';
      html += '<span class="post-title"><span class="post-tag ' + tagClass(tag) + '">' + esc(tag) + '</span> ';
      if (item.title_en && (item.title_pt || item.title_es)) {
        html += '<span data-lang="en" class="active">' + esc(item.title_en) + '</span><span data-lang="pt">' + esc(item.title_pt || item.title_en) + '</span><span data-lang="es">' + esc(item.title_es || item.title_en) + '</span>';
      } else {
        html += esc(title);
      }
      html += '</span><span class="post-meta">' + meta + '</span></a>';
    });
    return html;
  }

  function renderResearch(list) {
    return renderWriting(list);
  }

  function renderNotebooks(list) {
    var html = '';
    list.forEach(function (item) {
      html += '<div class="notebook-card"><span class="nb-lang">' + esc(item.lang || '') + '</span><h3>';
      if (item.title_en && (item.title_pt || item.title_es)) {
        html += '<span data-lang="en" class="active">' + esc(item.title_en) + '</span><span data-lang="pt">' + esc(item.title_pt || item.title_en) + '</span><span data-lang="es">' + esc(item.title_es || item.title_en) + '</span>';
      } else {
        html += esc(item.title || '');
      }
      html += '</h3><p>' + metaSpan(item, 'description') + '</p><div class="nb-links">';
      (item.links || []).forEach(function (l) {
        html += '<a href="' + esc(l.url) + '" target="_blank">' + esc(l.label) + '</a>';
      });
      html += '</div></div>';
    });
    return html;
  }

  function renderBooks(list) {
    var catMap = { ai: 'cat-ai', econ: 'cat-econ', gov: 'cat-gov', strategy: 'cat-strategy' };
    var catLabel = { ai: 'AI', econ: 'Economics', gov: 'Governance', strategy: 'Strategy' };
    var html = '';
    list.forEach(function (item) {
      var c = item.category || 'ai';
      var cat = catMap[c] || 'cat-ai';
      html += '<div class="book-card"><span class="book-category ' + cat + '">' + esc(catLabel[c] || c) + '</span>';
      html += '<h3>' + esc(item.title || '') + '</h3>';
      html += '<div class="book-author">' + esc(item.author || '') + '</div>';
      html += '<div class="book-note">' + metaSpan(item, 'note') + '</div></div>';
    });
    return html;
  }

  var base = document.querySelector('script[data-content-base]');
  var basePath = (base && base.getAttribute('data-content-base')) || 'content';

  function load(name, render, containerId) {
    var el = document.getElementById(containerId);
    if (!el) return;
    fetch(basePath + '/' + name + '.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        el.innerHTML = render(data);
      })
      .catch(function () {
        el.innerHTML = '<p style="color:var(--text-dim);font-size:0.85rem;">Content could not be loaded.</p>';
      });
  }

  function init() {
    load('writing', renderWriting, 'writing-list');
    load('research', renderResearch, 'research-list');
    load('notebooks', renderNotebooks, 'notebooks-grid');
    load('books', renderBooks, 'books-grid');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
