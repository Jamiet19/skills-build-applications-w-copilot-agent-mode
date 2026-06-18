import express from 'express';
import cors from 'cors';
import apiRoutes from './routes';
import { connectToDatabase } from './config/database';

const app = express();
const PORT = 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

connectToDatabase()
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/api/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API', baseUrl });
});

app.use('/api', apiRoutes);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

export default app;