import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';

const API_URL = import.meta.env.PROD ? import.meta.env.VITE_BACKEND_URL : '/api';

export default function Preview({ template, profile, text, type, title }) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    if (template && profile && text) {
      axios.post(`${API_URL}/render`, { template, profile, text, type })
        .then(res => setHtml(res.data))
        .catch(err => console.error(`Rendering ${type} failed`, err));
    }
  }, [template, profile, text, type]);

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-lg border border-blue-100 max-w-2xl w-full mt-2">
      <h2 className="text-2xl font-extrabold mb-6 text-blue-900 text-center">{title}</h2>
      <div className="bg-white rounded-xl shadow p-8 border border-blue-100 min-h-[200px]">
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
      </div>
    </div>
  );
} 