import express from 'express';
import ejs from 'ejs';
import path from 'path';
import fs from 'fs';

const router = express.Router();
const templatesDir = path.resolve('backend/templates');

router.post('/', (req, res) => {
  const { template, profile, text, type = 'resume' } = req.body; // Default to 'resume'
  const templatePath = path.join(templatesDir, `${template}.ejs`);

  if (!fs.existsSync(templatePath)) {
    return res.status(404).json({ error: 'Template not found' });
  }

  const data = {};
  for (const key in profile) {
    data[key.toUpperCase()] = profile[key];
  }

  const contentToRender = type === 'coverletter' ? text.coverletter : text.resume;

  const templateData = {
    ...data,
    CONTENT: contentToRender,
  };

  ejs.renderFile(templatePath, templateData, (err, html) => {
    if (err) {
      console.error('EJS Rendering Error:', err);
      return res.status(500).json({ error: 'Failed to render template' });
    }
    res.send(html);
  });
});

export default router; 