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

Admin is intended for local-only content editing.

- Local development: `/admin` is enabled by default
- Vercel deployments: `/admin` is disabled by default and returns `404`
- If you ever need to re-enable it in another environment, set `ADMIN_ENABLED=true`

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
npm run sync:obsidian
npm run publish
```

## Obsidian Sync

This project includes a local-only Obsidian publishing sync.

Setup:

1. Copy `obsidian-sync.config.example.json` to `obsidian-sync.config.json`
2. Update `vaultPath`, `notesDir`, and `attachmentsDir`
3. Add `publish: true` to the notes you want to publish
4. Run `npm run sync:obsidian`

Shortcut:

- `npm run publish`

Recommended frontmatter:

```md
---
title: My Post
slug: my-post
description: Short summary
date: 2026-05-22
category: Notes
tags:
  - Obsidian
  - Blog
publish: true
draft: false
---
```

Current sync behavior:

- Reads `.md` and `.mdx` files under your configured `notesDir`
- Publishes only notes with `publish: true`
- Outputs blog posts into `content/posts`
- Copies Obsidian embed images like `![[image.png]]` into `public/images/posts/<slug>/`
- Converts wiki links like `[[note-name]]` to blog post links when the target note is also published
