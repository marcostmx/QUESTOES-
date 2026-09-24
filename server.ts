import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // API endpoint for Prof. Assistente (Medical Tutor Gemini Chat)
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, context, history } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Mensagem inválida ou ausente.' });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          text: 'A chave GEMINI_API_KEY não foi detectada no ambiente. Para ativar respostas ao vivo da IA, configure sua chave no menu de configurações da plataforma. Enquanto isso, revise o gabarito comentado da questão!'
        });
      }

      const ai = getAI();

      const systemInstruction = `Você é o "Prof. Assistente", um preceptor médico e tutor acadêmico para estudantes de medicina no curso Estudo PR1.
Suas áreas de domínio são: Farmacologia Básica e Clínica, Propedêutica Médica, Fisiopatologia, Bases da Técnica Cirúrgica e GIS 2 (Gastroenterologia/Digestório).

REGRAS ACADÊMICAS OBRIGATÓRIAS (FONTE DE VERDADE GOOGLE DRIVE):
1. O Google Drive do semestre é a fonte oficial da verdade acadêmica da plataforma.
2. Cada resposta, explicação ou raciocínio deve ser fundamentado nos materiais acadêmicos do semestre (slides, apostilas, resumos de aula e provas antigas).
3. NUNCA invente diretrizes, conceitos ou referências que não sejam compatíveis com a literatura e materiais médicos da disciplina.
4. Sempre que responder, indique claramente o material de origem, nome do arquivo ou prova de referência quando disponível no contexto.
5. Se o estudante perguntar por que uma alternativa (ex: Alternativa B) está incorreta ou correta, explique com profundidade e rigor fisiopatológico/farmacológico baseado nos conceitos da aula. Se você não encontrar base suficiente nos materiais do curso fornecidos no contexto, informe explicitamente que o material específico daquela aula precisa ser consultado no Drive.
6. Sempre responda em português brasileiro culto e didático, com formatação Markdown clara (listas curtas, destaques em negrito) para leitura em dispositivos móveis e computadores.

Contexto da aula, materiais do Google Drive ou questão que o aluno está visualizando atualmente:
"""
${context || 'Nenhuma questão ou material específico selecionado no momento. O aluno está na navegação geral da plataforma.'}
"""`;

      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const msg of history.slice(-6)) {
          if (msg && msg.role && msg.parts && Array.isArray(msg.parts) && msg.parts[0]?.text) {
            contents.push({
              role: msg.role === 'model' ? 'model' : 'user',
              parts: [{ text: String(msg.parts[0].text) }]
            });
          }
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      let responseText = '';
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });
        responseText = response.text || '';
      } catch (firstErr: any) {
        // Fallback retry with gemini-flash-latest
        console.warn('First Gemini attempt failed, retrying with fallback model...', firstErr?.message);
        await new Promise(resolve => setTimeout(resolve, 800));
        const retryResponse = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });
        responseText = retryResponse.text || '';
      }

      res.json({ text: responseText || 'Desculpe, não consegui formular uma resposta no momento.' });
    } catch (err: any) {
      console.error('Gemini Chat error:', err);
      const isHighDemand = String(err?.message || '').includes('high demand') || String(err?.message || '').includes('503');
      if (isHighDemand) {
        return res.json({
          text: 'O modelo de inteligência artificial está enfrentando uma alta demanda momentânea nos servidores. Por favor, reenvie sua pergunta em alguns instantes ou consulte o Gabarito Comentado e as Pistas da questão!'
        });
      }
      res.status(500).json({
        error: 'Falha ao processar a resposta do assistente.',
        details: err?.message || String(err),
      });
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
