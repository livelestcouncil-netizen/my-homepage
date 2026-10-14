(() => {
  const cards = Array.from(document.querySelectorAll('#column-results .column-link'));
  const links = Array.from(document.querySelectorAll('[data-column-theme]'));
  const title = document.getElementById('column-list-title');
  const status = document.getElementById('column-theme-status');
  const applyTheme = () => {
    const slug = window.location.hash.startsWith('#theme-') ? window.location.hash.slice(7) : 'all';
    const selected = links.find(link => link.dataset.columnTheme === slug);
    const theme = selected ? slug : 'all';
    let count = 0;
    cards.forEach(card => {
      const show = theme === 'all' || card.dataset.columnThemes.split(' ').includes(theme);
      card.hidden = !show;
      if (show) count += 1;
    });
    links.forEach(link => {
      if (link.dataset.columnTheme === theme) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    title.textContent = theme === 'all' ? 'すべてのコラム（新しい順）' : selected.textContent + 'のコラム';
    status.textContent = count + '記事を、新しい順で表示しています。';
    if (theme !== 'all') requestAnimationFrame(() => title.scrollIntoView({ block: 'start' }));
  };
  window.addEventListener('hashchange', applyTheme);
  applyTheme();
})();
