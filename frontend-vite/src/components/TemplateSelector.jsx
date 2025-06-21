import React, { useEffect, useState } from 'react';
import axios from 'axios';

const templateDescriptions = {
  classic: 'A timeless, professional layout with clear sections and traditional fonts.',
  minimalist: 'A clean, simple design focusing on content and readability.',
  modern: 'A stylish, contemporary template with bold headings and modern fonts.'
};

export default function TemplateSelector({ onPrev, onNext }) {
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get('/api/templates')
      .then(res => {
        if (Array.isArray(res.data)) {
          setTemplates(res.data);
        } else {
          setTemplates([]);
          setError('No templates found. Please check your backend.');
        }
      })
      .catch(() => {
        setTemplates([]);
        setError('Failed to fetch templates. Please check your backend.');
      });
  }, []);

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-lg border border-blue-100 max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-extrabold mb-8 text-blue-900 text-center">Select a Template</h2>
      <div className="flex flex-col gap-6">
        {templates.map(tpl => (
          <div
            key={tpl.name}
            className={`rounded-xl border-2 p-6 bg-white shadow transition-all duration-150 cursor-pointer ${selected === tpl.name ? 'border-blue-600 ring-2 ring-blue-200' : 'border-blue-100 hover:border-blue-300'}`}
            onClick={() => setSelected(tpl.name)}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-blue-800 mb-1">{tpl.name.charAt(0).toUpperCase() + tpl.name.slice(1)}</div>
                <div className="text-gray-500 text-sm mb-2">{templateDescriptions[tpl.name]}</div>
              </div>
              <button
                className={`ml-4 px-4 py-2 rounded-lg font-semibold transition-all duration-150 ${selected === tpl.name ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                onClick={e => { e.stopPropagation(); setSelected(tpl.name); }}
              >
                {selected === tpl.name ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
        ))}
      </div>
      {error && (
        <div className="text-red-500 mt-4 text-center">{error}</div>
      )}
      <div className="flex justify-between mt-10">
        <button
          className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-all"
          onClick={onPrev}
        >
          Previous
        </button>
        <button
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${selected ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-200 text-blue-400 cursor-not-allowed'}`}
          onClick={() => selected && onNext(selected)}
          disabled={!selected}
        >
          Next
        </button>
      </div>
    </div>
  );
} 