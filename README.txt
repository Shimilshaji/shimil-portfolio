Green theme blog page integration

Files:
- blog.html: replacement for the current Coming Soon page.
- styles.css: supplied site stylesheet, unchanged.
- blog-page.css: small page-specific responsive styles.
- blog.js: category/search controls and expandable Read More previews.

Preview/integration:
Place blog.html, styles.css, blog-page.css and blog.js beside the existing index.html and script.js. Keep the site's existing assets/ folder alongside them. Open blog.html directly, or serve the folder with the same static hosting setup as the rest of the site. The page keeps the existing script.js?v=14 include for the site's mobile menu and unrelated site behavior.

The Read More links expand short on-page article previews. They do not point to separate article pages because no article page structure was provided. The card artwork uses CSS shapes and does not reference external image files.
