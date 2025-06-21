import express from 'express';
import puppeteer from 'puppeteer';

const router = express.Router();

router.post('/', async (req, res) => {
  const { html, filename } = req.body;
  if (!html) return res.status(400).json({ error: 'HTML required' });

  try {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename || 'resume'}.pdf"`
    });
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ error: 'PDF generation failed', details: err.message });
  }
});

export default router; 