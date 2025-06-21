import React, { useState } from 'react';
import axios from 'axios';

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Editor({ profile, template, templateName, setGeneratedContent, onPrev, onNext }) {
  const [loading, setLoading] = useState(false);
  const [prompts, setPrompts] = useState({ resume: '', coverletter: '' });

  const generate = async () => {
    setLoading(true);
    try {
      const [resumeRes, coverRes] = await Promise.all([
        axios.post('/api/generate', { profile, type: 'resume', template, prompt: prompts.resume }),
        axios.post('/api/generate', { profile, type: 'coverletter', template, prompt: prompts.coverletter })
      ]);
      setGeneratedContent({ resume: resumeRes.data.text, coverletter: coverRes.data.text });
      onNext(); // Navigate to preview
    } catch (error) {
      console.error("AI Generation failed", error);
      // You can add user-facing error handling here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-lg border border-blue-100 max-w-2xl mx-auto mt-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-bold text-blue-700">Template: {capitalize(templateName)}</span>
        <button
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-all"
          onClick={onPrev}
        >
          Previous
        </button>
      </div>
      <h2 className="text-2xl font-extrabold mb-2 text-blue-900 text-center">Customize Your AI Generation</h2>
      <p className="text-center text-blue-700 mb-6">Add any extra instructions in the prompt fields below, then click "Generate & Preview" to create your AI-powered resume and cover letter.</p>
      
      <div className="bg-white rounded-xl shadow p-6 mb-6 border border-blue-100">
        <label className="block text-lg font-bold text-blue-800 mb-2">Resume Prompt</label>
        <input 
          className="w-full rounded-lg border border-blue-200 p-3 text-base focus:ring-2 focus:ring-blue-400 outline-none bg-blue-50 mb-2"
          value={prompts.resume}
          onChange={e => setPrompts({ ...prompts, resume: e.target.value })}
          placeholder="e.g., Emphasize my experience with React and Node.js"
        />
        <label className="block text-lg font-bold text-blue-800 mb-2">Cover Letter Prompt</label>
        <input 
          className="w-full rounded-lg border border-blue-200 p-3 text-base focus:ring-2 focus:ring-blue-400 outline-none bg-blue-50 mb-2"
          value={prompts.coverletter}
          onChange={e => setPrompts({ ...prompts, coverletter: e.target.value })}
          placeholder="e.g., Mention that I'm excited about their new AI project"
        />
      </div>

      <button className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold text-lg shadow hover:bg-blue-700 transition-all duration-150" onClick={generate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate & Preview'}
      </button>
    </div>
  );
} 