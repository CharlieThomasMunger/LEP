(() => {
  'use strict';
  const normalise = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().trim();
  document.querySelectorAll('[data-filter-list]').forEach(list => {
    const controls = list.querySelector('[data-filter-controls]');
    if (!controls) return;
    const search = controls.querySelector('[data-filter-search]');
    const category = controls.querySelector('[data-filter-category]');
    const country = controls.querySelector('[data-filter-country]');
    const items = [...list.querySelectorAll('[data-filter-item]')];
    const prepared = new Map(items.map(item => [item, normalise(item.dataset.search || item.textContent)]));
    const counter = controls.querySelector('[data-filter-count]');
    const update = () => {
      const words = normalise(search.value).split(/\s+/).filter(Boolean);
      let count = 0;
      items.forEach(item => {
        const match = (!category?.value || item.dataset.category === category.value) &&
          (!country.value || item.dataset.country.split(' ').includes(country.value)) &&
          words.every(word => prepared.get(item).includes(word));
        item.hidden = !match;
        if (match) count++;
      });
      list.querySelectorAll('[data-filter-group]').forEach(group => {
        group.hidden = ![...group.querySelectorAll('[data-filter-item]')].some(item => !item.hidden);
      });
      counter.textContent = count + ' ' + counter.dataset.label;
      list.querySelector('[data-filter-empty]').hidden = count !== 0;
    };
    controls.hidden = false;
    controls.addEventListener('input', update);
    controls.addEventListener('change', update);
    controls.querySelector('[data-filter-reset]').addEventListener('click', () => {
      search.value = ''; country.value = ''; if (category) category.value = '';
      update(); search.focus();
    });
    update();
  });
  // A visitor chooses the topic; no enquiry is transmitted by these controls.
  document.querySelectorAll('[data-lep-intent]').forEach(link => link.addEventListener('click', () => {
    const contact = document.querySelector('#contact-lep');
    const selection = contact?.querySelector('[data-lep-selected]');
    if (!selection) return;
    selection.hidden = false;
    selection.textContent = selection.dataset.label + link.dataset.lepIntent;
    contact.dataset.intent = link.dataset.lepIntent;
  }));
})();
