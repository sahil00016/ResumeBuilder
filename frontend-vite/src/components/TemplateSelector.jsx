import React, { useState } from 'react';

const templates = [
  { id: 'classic', name: 'Classic', description: "A timeless, professional layout suitable for any industry." },
  { id: 'modern', name: 'Modern', description: "A stylish, contemporary design that stands out." },
  { id: 'minimalist', name: 'Minimalist', description: "A clean, simple design focusing on content and readability." },
  { id: 'ai-styled', name: 'AI-Styled (Beta)', description: "Let the AI design your resume's layout and style. (Editing is disabled for this option)." }
];

export default function TemplateSelector({ onPrev, onNext }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-lg border border-blue-100 max-w-2xl mx-auto mt-8">
      <div className="flex items-center justify-between mb-4">
        <button
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-all"
          onClick={onPrev}
        >
          Previous
        </button>
        <h2 className="text-2xl font-extrabold text-blue-900">Choose Your Template</h2>
        <div style={{ width: 88 }}></div>
      </div>
      
      <div className="flex flex-col gap-4 mt-6">
        {templates.map(tpl => (
          <div 
            key={tpl.id}
            className={`cursor-pointer rounded-lg p-4 shadow-sm transition-all duration-300 border-2 ${selected === tpl.id ? 'border-blue-500 scale-105 bg-blue-50' : 'border-transparent hover:border-blue-200 bg-white'}`}
            onClick={() => setSelected(tpl.id)}
          >
            <h3 className="font-bold text-lg text-blue-900">{tpl.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{tpl.description}</p>
          </div>
        ))}
      </div>

      <button
        className="mt-8 w-full py-3 rounded-lg bg-blue-600 text-white font-bold text-lg shadow hover:bg-blue-700 transition-all duration-150 disabled:bg-gray-400"
        onClick={() => onNext(selected)}
        disabled={!selected}
      >
        Next
      </button>
    </div>
  );
} 