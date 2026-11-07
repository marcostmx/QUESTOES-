/**
 * Servidor do app: em desenvolvimento usa o Vite como middleware;
 * em produção serve os arquivos estáticos de dist/.
 */
import express from 'express';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { maxAge: '1y', index: false }));
    app.get('*', (_req, res) => {
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor em http://localhost:${PORT}`);
  });
}

startServer();
