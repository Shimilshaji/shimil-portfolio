# Shimil Blog CMS setup

This package adds a private, login-protected Decap CMS editor at `/admin/` and a public blog backed by `posts.json`. The CMS uses Decap Turbo's hosted GitHub backend; posts are saved to the `main` branch of `Shimilshaji/shimil-portfolio`.

## Before uploading

1. In Decap Turbo, open your site's **Overview** page and copy its **Site ID**.
2. Open `admin/config.yml` in a text editor and replace `REPLACE_WITH_TURBO_SITE_ID` with that Site ID. Keep the Site ID in the config; do not put a GitHub token there.

## Add the files to GitHub

Upload these files to the repository's `main` branch, keeping the folder layout:

- Replace `blog.html`.
- Add `blog.js`, `article.html`, `article.js`, and `posts.json` at the repository root.
- Add `admin/index.html` and the updated `admin/config.yml`.
- Add `assets/favicon.svg`.

Do not upload the old standalone `admin.html`, `admin.js`, or `admin.css` as the online CMS. The online editor is `admin/index.html` and requires the Turbo login.

After the GitHub Pages deployment finishes, return to your Decap Turbo site settings. Set **Config path** to `admin/config.yml`; the “Couldn’t check” message should clear. Save the settings and open `https://shimilshaji.github.io/shimil-portfolio/admin/` to sign in.

## Publish articles

In the CMS, open **Blog → Articles**, add an item, fill in the title, SEO title, meta description, focus keyword, URL slug, image, excerpt, date, and article text, then save. The blog page lists saved posts from `posts.json`; selecting a card opens its article page. Since the GitHub repository is public, saved post content is public. Save only content that is ready to publish.
