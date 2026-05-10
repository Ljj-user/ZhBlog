# ZhBlog

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Content Management

This project now separates mutable content from page code.

Main content files:

- `content/site/profile.json`
- `content/site/home.json`
- `content/site/social-links.json`
- `content/site/navigation.json`
- `content/site/friends.json`
- `content/site/projects.json`
- `content/photos/albums.json`
- `content/photos/photos.json`

Admin scaffold:

- `http://localhost:3000/admin`
- `public/admin/config.yml`

Admin is intended for local-only content editing.

- Local development: `/admin` is enabled by default
- Vercel deployments: `/admin` is disabled by default and returns `404`
- If you ever need to re-enable it in another environment, set `ADMIN_ENABLED=true`

Before using the CMS in production, replace the placeholder GitHub repo in `public/admin/config.yml`.

More details:

- `CONTENT_ADMIN_SETUP.md`

## GitHub Contributions

The projects page renders real GitHub contribution data for the last year by default from the public GitHub contributions page.

If you want to use the GitHub GraphQL API instead, set `GITHUB_TOKEN` in `.env.local` and restart `npm run dev`.

`.env.local` is already ignored by git.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
