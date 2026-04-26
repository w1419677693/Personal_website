import { createClient, ensureKnowledgeBase, getConfiguredVectorStoreId, getKnowledgeCacheStatus } from './_lib/avatar-knowledge.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const client = createClient();
  const configured = Boolean(client);
  const model = process.env.OPENAI_MODEL || 'gpt-4.1';
  const configuredVectorStoreId = getConfiguredVectorStoreId();

  if (!configured) {
    res.status(200).json({
      configured: false,
      ready: false,
      syncing: false,
      indexedFiles: [],
      skippedFiles: [],
      message: 'Missing OPENAI_API_KEY in Vercel environment variables.',
      model,
    });
    return;
  }

  try {
    const knowledge = await ensureKnowledgeBase(client);
    const cache = getKnowledgeCacheStatus();
    res.status(200).json({
      configured: true,
      ready: true,
      syncing: cache.syncing,
      indexedFiles: knowledge.indexedFiles,
      skippedFiles: knowledge.skippedFiles,
      message: configuredVectorStoreId
        ? `Knowledge base ready with ${knowledge.indexedFiles.length} file(s).`
        : `Knowledge base ready with ${knowledge.indexedFiles.length} file(s) using temporary runtime vector store.`,
      model,
    });
  } catch (error) {
    const cache = getKnowledgeCacheStatus();
    res.status(200).json({
      configured: true,
      ready: false,
      syncing: cache.syncing,
      indexedFiles: cache.indexedFiles,
      skippedFiles: cache.skippedFiles,
      message: error.message || 'Failed to prepare the knowledge base.',
      model,
    });
  }
}
