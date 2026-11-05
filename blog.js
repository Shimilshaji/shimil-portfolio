(() => {
  const host = document.querySelector('#blog-posts');
  if (!host) return;

  const escapeText = value => String(value || '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);

  fetch('posts.json')
    .then(response => response.ok ? response.json() : Promise.reject())
    .then(data => {
      const posts = Array.isArray(data.posts) ? data.posts : [];
      if (!posts.length) {
        host.innerHTML = '<p class="blog-empty">New articles are on their way. Check back soon.</p>';
        return;
      }
      host.replaceChildren(...posts.slice().sort((a, b) => String(b.date || '').localeCompare(String(a.date || ''))).map(post => {
        const card = document.createElement('article');
        card.className = 'blog-card';
        const cover = document.createElement('a');
        cover.className = 'blog-cover';
        cover.href = `article.html?slug=${encodeURIComponent(post.slug || '')}`;
        if (post.featuredImage) {
          const image = document.createElement('img');
          image.src = post.featuredImage;
          image.alt = post.title || '';
          image.loading = 'lazy';
          cover.append(image);
        }
        const copy = document.createElement('div');
        copy.className = 'blog-copy';
        const title = document.createElement('h3');
        title.textContent = post.title || 'Untitled';
        const excerpt = document.createElement('p');
        excerpt.textContent = post.excerpt || post.metaDescription || '';
        const link = document.createElement('a');
        link.className = 'blog-link';
        link.href = cover.href;
        link.textContent = 'Read article ↗';
        const category = document.createElement('p');
        category.className = 'blog-category';
        category.textContent = post.focusKeyword || 'ARTICLE';
        copy.append(category, title, excerpt, link);
        card.append(cover, copy);
        return card;
      }));
    })
    .catch(() => {
      host.innerHTML = '<p class="blog-empty">Articles could not be loaded. Please try again later.</p>';
    });
})();
