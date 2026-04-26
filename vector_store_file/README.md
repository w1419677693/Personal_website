# AI Avatar Setup

## What this does

`server.mjs` serves the portfolio site and adds two API endpoints:

- `GET /api/status`
- `POST /api/ask`

It uses the files in `vector_store_file/` as the personal knowledge base and uploads non-empty `.md`, `.pdf`, or `.txt` files to an OpenAI vector store.

## Files used as knowledge

- `resume.pdf`
- `about_me.md`
- `projects.md`
- `faq.md`

Empty files are skipped automatically.

## Setup

1. Copy `.env.example` to `.env`
2. Fill in:
   - `OPENAI_API_KEY`
   - `OPENAI_BASE_URL`
   - `OPENAI_MODEL`
3. Start the server:

```bash
cd vector_store_file
npm start
```

4. Open:

```text
http://localhost:3000
```

## Notes

- The first startup may take longer because the vector store needs to be created and files need to be indexed.
- A local cache file named `.ai-avatar-state.json` is created to reuse the same vector store when the knowledge files have not changed.
- If you update the resume or markdown files, the server will build a new vector store automatically on next start.
