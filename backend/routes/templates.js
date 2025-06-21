import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const templatesDir = path.resolve('backend/templates');

// List available templates
router.get('/', (req, res) => {
  const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.ejs'));
  const templates = files.map(f => ({
    name: f.replace('.ejs', ''),
    filename: f
  }));
  res.json(templates);
});

// Get template HTML
router.get('/:name', (req, res) => {
  const filePath = path.join(templatesDir, req.params.name + '.ejs');
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Template not found' });
  const html = fs.readFileSync(filePath, 'utf-8');
  res.send(html);
});

export default router; 