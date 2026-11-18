(() => {
  const grid = document.querySelector('#blog-grid');
  if (!grid) return;
  const cards = [...grid.querySelectorAll('.blog-card')];
  const filters = [...document.querySelectorAll('.blog-filter')];
  const search = document.querySelector('#blog-search');
  const result = document.querySelector('#blog-result');
  const empty = document.querySelector('#blog-empty');
  let category = 'All';

  function update() {
    const query = search.value.trim().toLocaleLowerCase();
    let count = 0;
    cards.forEach(card => {
      const categoryMatch = category === 'All' || card.dataset.category === category;
      const searchMatch = !query || card.textContent.toLocaleLowerCase().includes(query);
      const visible = categoryMatch && searchMatch;
      card.hidden = !visible;
      if (visible) count++;
    });
    result.textContent = `${count} ${count === 1 ? 'article' : 'articles'}`;
    empty.hidden = count !== 0;
  }

  filters.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.category;
    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    update();
  }));
  search.addEventListener('input', update);
  grid.addEventListener('click', event => {
    const link = event.target.closest('.blog-link');
    if (!link) return;
    event.preventDefault();
    const panel = document.querySelector(link.getAttribute('href'));
    const opening = link.getAttribute('aria-expanded') !== 'true';
    panel.hidden = !opening;
    link.setAttribute('aria-expanded', String(opening));
    link.firstChild.textContent = opening ? 'Read Less ' : 'Read More ';
  });
  update();
})();
