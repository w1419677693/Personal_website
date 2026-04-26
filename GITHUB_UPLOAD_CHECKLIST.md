# GitHub Final Upload Checklist

## Upload These Files

Core site files:

- `index.html`
- `styles.css`
- `script.js`
- `ai-avatar.js`
- `encoding-fix.js`
- `头像.png`
- `site-assets/`

Vercel backend files:

- `api/`
- `scripts/`
- `package.json`
- `vercel.json`
- `DEPLOY_VERCEL.md`

Knowledge files:

- `vector_store_file/about_me.md`
- `vector_store_file/projects.md`
- `vector_store_file/faq.md`
- `vector_store_file/resume.pdf`
- `vector_store_file/README.md`
- `vector_store_file/.env.example`
- `vector_store_file/package.json`
- `vector_store_file/package-lock.json`
- `vector_store_file/test-openai.mjs`

Repo config:

- `.gitignore`
- `GITHUB_UPLOAD_CHECKLIST.md`

## Do Not Upload

- `vector_store_file/.env`
- `vector_store_file/.ai-avatar-state.json`
- `node_modules/`
- `vector_store_file/node_modules/`
- `.vercel/`
- Any file containing real API keys or tokens

## Vercel Environment Variables

Set these in the Vercel project settings:

- `OPENAI_API_KEY`
- `OPENAI_BASE_URL`
- `OPENAI_MODEL`
- `OPENAI_VECTOR_STORE_ID`

Recommended values:

- `OPENAI_BASE_URL=https://api.openai.com/v1`
- `OPENAI_MODEL=gpt-5.5`

## Suggested Git Commands

```powershell
git init
git branch -M main
git add .
git commit -m "Initial Vercel-ready portfolio site"
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Before Pushing

- Double-check that `.env` is not staged.
- Double-check that no real key appears in any markdown or code file.
- Confirm your `OPENAI_VECTOR_STORE_ID` is stored in Vercel, not in the repo.
