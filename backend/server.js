import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import aiRoutes from './routes/ai.js';
import pdfRoutes from './routes/pdf.js';
import templateRoutes from './routes/templates.js';
import renderRoutes from './routes/render.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, './.env') });

const app = express();

// Configure CORS
const corsOptions = {
  origin: '*', // For now, allow all. For production, you'd restrict this to your Vercel URL.
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json({ limit: '2mb' }));

app.use('/api/generate', aiRoutes);
app.use('/api/pdf', pdfRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/render', renderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
}); 