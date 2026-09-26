(() => {
  document.documentElement.classList.add('has-js');
  const lang = document.documentElement.lang.slice(0, 2);
  const labels = {
    zh: {contents:'本文目录',contact:'与修印先生聊聊 →',table:'左右滑动查看完整表格',tableName:'文章对比表'},
    en: {contents:'IN THIS ARTICLE',contact:'Speak with James Liu →',table:'Scroll sideways to view the full table',tableName:'Article comparison table'},
    fr: {contents:'DANS CET ARTICLE',contact:'Échanger avec James Liu →',table:'Faites défiler pour voir le tableau complet',tableName:'Tableau comparatif'}
  }[lang] || {contents:'IN THIS ARTICLE',contact:'Contact LEP →',table:'Scroll to view',tableName:'Comparison table'};
  const toggle = document.querySelector('.menu-toggle'), nav = document.querySelector('nav.main');
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
      toggle.setAttribute('aria-expanded','false'); nav.classList.remove('is-open'); toggle.focus();
    }
  });
  const body = document.querySelector('.article-body');
  const first = body?.firstElementChild;
  if (first?.tagName === 'P' && /^(作者[：:]|By James Liu|Par James Liu)/.test(first.textContent.trim())) {
    first.hidden = true; first.classList.add('byline-duplicate');
  }
  const toc = document.querySelector('.article-toc');
  const headings = [...(body?.querySelectorAll('h2') || [])];
  if (toc && headings.length >= 3) {
    const details = document.createElement('details'), summary = document.createElement('summary'), list = document.createElement('ol');
    summary.textContent = labels.contents; details.open = window.innerWidth > 1000;
    headings.forEach((h, i) => {
      if (!h.id) h.id = 'section-' + (i + 1);
      const li = document.createElement('li'), a = document.createElement('a');
      a.href = '#' + h.id; a.textContent = h.textContent; li.append(a); list.append(li);
      a.addEventListener('click', () => { if (window.innerWidth <= 1000) details.open = false; });
    });
    details.append(summary,list); toc.append(details); toc.hidden = false;
    const contact = document.createElement('a');contact.href='#contact-lep';contact.className='toc-contact';contact.textContent=labels.contact;toc.append(contact);
    const media = matchMedia('(min-width:1001px)'); media.addEventListener('change', e => {details.open=e.matches;});
  }
  document.querySelectorAll('article.node table,.prose table').forEach(table => {
    if (table.parentElement.classList.contains('table-scroll')) return;
    const wrapper = document.createElement('div'), hint = document.createElement('div');
    wrapper.className='table-scroll';wrapper.setAttribute('role','region');wrapper.setAttribute('aria-label',labels.tableName);
    hint.className='table-hint';hint.textContent=labels.table;
    table.before(hint,wrapper);wrapper.append(table);
    const update=()=>{const wide=wrapper.scrollWidth>wrapper.clientWidth+2;hint.classList.toggle('is-visible',wide);if(wide)wrapper.tabIndex=0;else wrapper.removeAttribute('tabindex');};
    new ResizeObserver(update).observe(wrapper);update();
  });
  document.querySelectorAll('.article-photo img').forEach(img=>{
    const update=()=>{if(img.naturalHeight>img.naturalWidth*1.1)img.closest('figure').classList.add('portrait');};
    if(img.complete)update();else img.addEventListener('load',update,{once:true});
  });
})();
