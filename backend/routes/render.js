import express from 'express';
import ejs from 'ejs';
import path from 'path';
import fs from 'fs';

const router = express.Router();
const templatesDir = path.resolve('backend/templates');

router.post('/', (req, res) => {
  let { template, profile, text, type = 'resume' } = req.body;

  // For AI-Styled, the cover letter should use a standard template for rendering.
  if (template === 'ai-styled' && type === 'coverletter') {
    template = 'classic'; 
  }

  if (template === 'ai-styled' && type === 'resume') {
    try {
      // Find and extract the JSON object from the AI's response string
      const jsonMatch = text.resume.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No valid JSON object found in AI response.");
      }
      const resumeData = JSON.parse(jsonMatch[0]);

      console.log('--- Parsed AI Resume Data ---');
      console.log(JSON.stringify(resumeData, null, 2));
      const templatePath = path.join(templatesDir, 'ai-styled.ejs');
      
      const fullData = {
        NAME: profile.name,
        EMAIL: profile.email,
        PHONE: profile.phone,
        ...resumeData
      };

      return ejs.renderFile(templatePath, fullData, (err, html) => {
        if (err) {
          console.error('EJS Rendering Error (AI-Styled):', err);
          return res.status(500).json({ error: 'Failed to render AI-Styled template' });
        }
        res.send(html);
      });
    } catch (e) {
      console.error('Failed to parse AI-generated JSON:', e);
      return res.status(500).send('<p>Error: The AI-generated content was not valid. Please try generating again.</p>');
    }
  }

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