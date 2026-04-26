# Deploy To Vercel

## 1. Install dependencies locally

```bash
npm install
```

## 2. Create the vector store once

```bash
npm run sync:vector-store
```

The script will print:

```text
OPENAI_VECTOR_STORE_ID=vs_xxx
```

## 3. Push this repo to GitHub

Upload the project, but do **not** upload secrets such as `.env` files.

## 4. Import the repo into Vercel

Set these environment variables in Vercel:

- `OPENAI_API_KEY`
- `OPENAI_BASE_URL`
- `OPENAI_MODEL`
- `OPENAI_VECTOR_STORE_ID`

Recommended values:

- `OPENAI_BASE_URL=https://api.openai.com/v1`
- `OPENAI_MODEL=gpt-5.5`

## 5. Deploy

Vercel will serve:

- static files from the project root
- serverless API routes from `api/`

## Notes

- If `OPENAI_VECTOR_STORE_ID` is missing, the app can still create a temporary vector store at runtime, but that is only a fallback and is not recommended for production.
- The recommended production setup is: create the vector store once, store its id in Vercel, and let the API reuse it.
