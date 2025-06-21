import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const templateStyles = {
  classic: "Generate the content in a timeless, professional style with clear, distinct sections for each part of the document. Use traditional and formal language. The layout should be clean and easy to read.",
  modern: "Generate the content in a modern, stylish format. Use a confident and dynamic tone. Feel free to use slightly less formal sectioning if it enhances the visual flow and impact.",
  minimalist: "Generate the content in a clean, simple, and minimalist style. Focus only on the most critical information to ensure maximum readability. Be concise and direct."
};

function buildPrompt(profile, type, template, customPrompt) {
  let basePrompt = '';
  const styleInstruction = templateStyles[template] || templateStyles.classic; // Default to classic

  if (type === 'resume') {
    basePrompt = `Generate a clean, ATS-friendly resume based on the following details. ${styleInstruction}\n\nName: ${profile.name}\nEmail: ${profile.email}\nPhone: ${profile.phone}\nEducation: ${profile.education}\nExperience: ${profile.experience}\nSkills: ${profile.skills}\nProjects: ${profile.projects}\n\nKeep the format clean with clear headings and bullet points. Do not include any graphics or complex formatting.`;
  } else if (type === 'coverletter') {
    basePrompt = `Write a formal and professional cover letter for ${profile.name} applying for the ${profile.role} role at ${profile.company}. Base it on this profile and the requested style. ${styleInstruction}\n\nEducation: ${profile.education}\nExperience: ${profile.experience}\nSkills: ${profile.skills}\n\nMaintain a confident, professional, and concise tone throughout.`;
  }
  return customPrompt ? `${basePrompt}\n\nAdditional Instructions from User: ${customPrompt}` : basePrompt;
}

router.post('/', async (req, res) => {
  const { profile, type, template, prompt: customPrompt } = req.body;
  const prompt = buildPrompt(profile, type, template, customPrompt);

  console.log('--- Gemini AI Generation Request ---');
  console.log('Using API Key ending in:', process.env.GEMINI_API_KEY ? `...${process.env.GEMINI_API_KEY.slice(-4)}` : 'NOT LOADED');

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    
    console.log('--- Gemini AI Success ---');
    res.json({ text });
  } catch (err) {
    console.error('--- Gemini AI Generation Failed ---', err);
    res.status(500).json({ error: 'Gemini AI generation failed', details: err.message });
  }
});

export default router;