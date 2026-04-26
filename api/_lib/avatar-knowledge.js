import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import OpenAI from 'openai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');
const knowledgeDir = path.join(projectRoot, 'vector_store_file');
const deploymentCache = globalThis.__avatarKnowledgeCache || {
  vectorStoreId: null,
  indexedFiles: [],
  skippedFiles: [],
  syncing: false,
  ensurePromise: null,
};

globalThis.__avatarKnowledgeCache = deploymentCache;

export function createClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const options = { apiKey };
  if (process.env.OPENAI_BASE_URL) {
    options.baseURL = process.env.OPENAI_BASE_URL;
  }
  return new OpenAI(options);
}

export async function listKnowledgeFiles() {
  const entries = await fsp.readdir(knowledgeDir, { withFileTypes: true });
  const files = [];
  const skippedFiles = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;

    const ext = path.extname(entry.name).toLowerCase();
    const allowed = new Set(['.md', '.pdf', '.txt']);
    if (!allowed.has(ext)) continue;
    if (entry.name.toLowerCase() === 'readme.md') continue;

    const filePath = path.join(knowledgeDir, entry.name);
    const stat = await fsp.stat(filePath);
    if (stat.size === 0) {
      skippedFiles.push(entry.name);
      continue;
    }

    files.push({
      name: entry.name,
      path: filePath,
      size: stat.size,
      mtimeMs: stat.mtimeMs,
    });
  }

  return { files, skippedFiles };
}

export function getConfiguredVectorStoreId() {
  return process.env.OPENAI_VECTOR_STORE_ID || '';
}

export async function ensureKnowledgeBase(client) {
  if (!client) {
    throw new Error('OPENAI_API_KEY is missing.');
  }

  const configuredVectorStoreId = getConfiguredVectorStoreId();
  const { files, skippedFiles } = await listKnowledgeFiles();
  deploymentCache.skippedFiles = skippedFiles;

  if (files.length === 0) {
    throw new Error('No non-empty knowledge files found in vector_store_file.');
  }

  if (configuredVectorStoreId) {
    const indexedFiles = files.map((file) => file.name);
    deploymentCache.vectorStoreId = configuredVectorStoreId;
    deploymentCache.indexedFiles = indexedFiles;
    return {
      vectorStoreId: configuredVectorStoreId,
      indexedFiles,
      skippedFiles,
      managedByEnv: true,
    };
  }

  if (deploymentCache.vectorStoreId) {
    return {
      vectorStoreId: deploymentCache.vectorStoreId,
      indexedFiles: deploymentCache.indexedFiles,
      skippedFiles,
      managedByEnv: false,
    };
  }

  if (deploymentCache.ensurePromise) {
    return deploymentCache.ensurePromise;
  }

  deploymentCache.syncing = true;
  deploymentCache.ensurePromise = (async function () {
    const vectorStore = await client.vectorStores.create({
      name: 'wang-congli-portfolio-avatar-vercel',
      expires_after: { anchor: 'last_active_at', days: 30 },
      metadata: {
        app: 'portfolio-avatar',
        owner: 'wang-congli',
        deployment: 'vercel-fallback',
      },
    });

    await client.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, {
      files: files.map((file) => fs.createReadStream(file.path)),
    });

    deploymentCache.vectorStoreId = vectorStore.id;
    deploymentCache.indexedFiles = files.map((file) => file.name);
    return {
      vectorStoreId: vectorStore.id,
      indexedFiles: deploymentCache.indexedFiles,
      skippedFiles,
      managedByEnv: false,
    };
  })().finally(() => {
    deploymentCache.syncing = false;
    deploymentCache.ensurePromise = null;
  });

  return deploymentCache.ensurePromise;
}

export function buildInstructions(lang) {
  if (lang === 'en') {
    return [
      "You are Congli Wang's AI persona on a portfolio website.",
      'You must use file search before answering.',
      'Answer only with information grounded in the uploaded personal files.',
      'Write in first person when describing Congli Wang.',
      'If the answer is not supported by the files, say that clearly and do not invent details.',
      'Keep answers concise, warm, and interview-ready.',
    ].join(' ');
  }

  return [
    '你是王聪立个人作品集网页里的 AI 分身。',
    '你必须先检索资料，再回答问题。',
    '回答时只能基于已上传的个人资料文件，不要编造经历。',
    '介绍自己时使用第一人称。',
    '如果资料里没有明确依据，就直接说明“现有资料里没有提到这一点”。',
    '回答风格保持简洁、真实、适合求职沟通。',
  ].join(' ');
}

export function extractCitations(response) {
  const citations = [];
  const output = Array.isArray(response?.output) ? response.output : [];

  for (const item of output) {
    if (item?.type !== 'file_search_call' || !Array.isArray(item.results)) continue;
    for (const result of item.results) {
      if (!result) continue;
      citations.push({
        filename: result.filename || result.file_name || result.file_id || 'knowledge-file',
        score: typeof result.score === 'number' ? result.score : null,
      });
    }
  }

  return citations.slice(0, 5);
}

export function getKnowledgeCacheStatus() {
  return {
    vectorStoreId: deploymentCache.vectorStoreId,
    indexedFiles: deploymentCache.indexedFiles,
    skippedFiles: deploymentCache.skippedFiles,
    syncing: deploymentCache.syncing,
  };
}
