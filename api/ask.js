import { buildInstructions, createClient, ensureKnowledgeBase, extractCitations } from './_lib/avatar-knowledge.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const client = createClient();
  if (!client) {
    res.status(500).json({ error: 'OPENAI_API_KEY is missing.' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const question = String(body.question || '').trim();
    const lang = body.lang === 'en' ? 'en' : 'zh';

    if (!question) {
      res.status(400).json({ error: 'Question is required.' });
      return;
    }

    const knowledge = await ensureKnowledgeBase(client);
    const model = process.env.OPENAI_MODEL || 'gpt-4.1';
    const response = await client.responses.create({
      model,
      instructions: buildInstructions(lang),
      input: [
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text:
                lang === 'en'
                  ? `Answer this question about Congli Wang based only on the uploaded files: ${question}`
                  : `请仅基于已上传资料回答这个关于王聪立的问题：${question}`,
            },
          ],
        },
      ],
      tool_choice: 'required',
      tools: [
        {
          type: 'file_search',
          vector_store_ids: [knowledge.vectorStoreId],
          max_num_results: 5,
        },
      ],
      include: ['file_search_call.results'],
    });

    res.status(200).json({
      answer: response.output_text || (lang === 'en' ? 'No answer returned.' : '模型没有返回有效回答。'),
      citations: extractCitations(response),
      model,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Request failed.' });
  }
}
