const fs = require('fs');

const serverContent = `import express from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  let ai: GoogleGenAI | null = null;
  function getAI() {
    if (!ai) {
      ai = new GoogleGenAI({});
    }
    return ai;
  }

  const SYSTEM_INSTRUCTION = "Você é um professor particular amigável e especialista em medicina. O usuário está respondendo a questões de múltipla escolha ou casos clínicos (banco PR1). Sua tarefa é tirar dúvidas sobre as questões, explicar conceitos de fisiopatologia, farmacologia, propedêutica ou bases cirúrgicas. Seja conciso, direto e muito didático. Responda em português.";

  app.post('/api/chat', async (req, res) => {
    try {
      const { history, message, context } = req.body;
      
      const aiClient = getAI();
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: [
          ...history,
          { role: 'user', parts: [{ text: \`Contexto da questão atual: \${context}\\n\\nPergunta do usuário: \${message}\` }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error('Chat error:', error);
      res.status(500).json({ error: error.message || 'Erro ao comunicar com o assistente.' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(\`Server running on http://localhost:\${PORT}\`);
  });
}

startServer();
`;

fs.writeFileSync('server.ts', serverContent);
