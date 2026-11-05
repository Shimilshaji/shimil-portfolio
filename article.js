(() => {
  const host = document.querySelector('#article');
  if (!host) return;
  const slug = new URLSearchParams(location.search).get('slug');
  fetch('posts.json').then(response => response.ok ? response.json() : Promise.reject()).then(data => {
    const post = (Array.isArray(data.posts) ? data.posts : []).find(item => item.slug === slug);
    if (!post) { host.innerHTML = '<h1>Article not found</h1><p><a href="blog.html">Back to Blog</a></p>'; return; }
    const title = post.seoTitle || post.title || 'Blog | Shimil Shaji';
    document.title = `${title} | Shimil Shaji`;
    const description = document.querySelector('meta[name="description"]');
    if (description && post.metaDescription) description.content = post.metaDescription;
    let keywords = document.querySelector('meta[name="keywords"]');
    if (!keywords) { keywords = document.createElement('meta'); keywords.name = 'keywords'; document.head.append(keywords); }
    keywords.content = post.focusKeyword || '';
    const canonical = document.createElement('link'); canonical.rel = 'canonical'; canonical.href = `${location.origin}${location.pathname}?slug=${encodeURIComponent(post.slug)}`; document.head.append(canonical);
    host.replaceChildren();
    if (post.featuredImage) { const img = document.createElement('img'); img.className = 'article-hero'; img.src = post.featuredImage; img.alt = post.title || ''; host.append(img); }
    const kicker = document.createElement('p'); kicker.className = 'contact-kicker'; kicker.textContent = post.focusKeyword || 'ARTICLE';
    const heading = document.createElement('h1'); heading.textContent = post.title || '';
    const date = document.createElement('p'); date.className = 'article-meta'; date.textContent = post.date ? new Date(post.date).toLocaleDateString(undefined, {year:'numeric',month:'long',day:'numeric'}) : '';
    host.append(kicker, heading, date);
    String(post.body || '').split(/\n\s*\n/).filter(Boolean).forEach(text => { const p = document.createElement('p'); p.textContent = text; host.append(p); });
    const back = document.createElement('p'); const link = document.createElement('a'); link.href = 'blog.html'; link.textContent = '← Back to all articles'; back.append(link); host.append(back);
  }).catch(() => { host.innerHTML = '<h1>Article could not be loaded</h1><p><a href="blog.html">Back to Blog</a></p>'; });
})();
