import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.PROD ? import.meta.env.VITE_BACKEND_URL : '';

export default function DownloadButton({ template, profile, text, type }) {
  const [loading, setLoading] = useState(false);
  const documentName = type === 'coverletter' ? 'Cover_Letter' : 'Resume';

  const download = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/render`, { template, profile, text, type });
      const filledHtml = res.data;

      const pdfRes = await axios.post(`${API_BASE_URL}/api/pdf`, { html: filledHtml, filename: `${profile.name}_${documentName}` }, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([pdfRes.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${profile.name}_${documentName}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error(`Download ${type} failed`, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold text-lg shadow-lg hover:from-blue-700 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-150 w-full max-w-xs"
      onClick={download}
      disabled={loading}
      style={{ minWidth: 220 }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0l-6-6m6 6l6-6" />
      </svg>
      {loading ? `Generating ${documentName}...` : `Download ${documentName}`}
    </button>
  );
} 