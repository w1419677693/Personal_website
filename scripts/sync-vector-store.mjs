import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import OpenAI from 'openai';
import { listKnowledgeFiles } from '../api/_lib/avatar-knowledge.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

function loadDotEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const raw = fs.readFileSync(filePath, 'utf8');
  raw.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const separator = trimmed.indexOf('=');
    if (separator === -1) return;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key && process.env[key] == null) {
      process.env[key] = value;
    }
  });
}

loadDotEnvFile(path.join(projectRoot, '.env.local'));
loadDotEnvFile(path.join(projectRoot, 'vector_store_file', '.env'));

if (!process.env.OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY. Put it in .env.local or vector_store_file/.env before running this script.');
  process.exit(1);
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  ...(process.env.OPENAI_BASE_URL ? { baseURL: process.env.OPENAI_BASE_URL } : {}),
});

const { files, skippedFiles } = await listKnowledgeFiles();
if (files.length === 0) {
  console.error('No non-empty knowledge files found.');
  process.exit(1);
}

const vectorStore = await client.vectorStores.create({
  name: 'wang-congli-portfolio-avatar',
  expires_after: { anchor: 'last_active_at', days: 30 },
  metadata: {
    app: 'portfolio-avatar',
    owner: 'wang-congli',
    deployment: 'vercel',
  },
});

await client.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, {
  files: files.map((file) => fs.createReadStream(file.path)),
});

console.log('Vector store created successfully.');
console.log(`OPENAI_VECTOR_STORE_ID=${vectorStore.id}`);
console.log(`Indexed files: ${files.map((file) => file.name).join(', ')}`);
if (skippedFiles.length) {
  console.log(`Skipped empty files: ${skippedFiles.join(', ')}`);
}
