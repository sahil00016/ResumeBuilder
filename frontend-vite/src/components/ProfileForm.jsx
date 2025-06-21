import React, { useState } from 'react';

export default function ProfileForm({ onNext }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', education: '', experience: '', skills: '', projects: '', role: '', company: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-lg border border-blue-100" onSubmit={e => { e.preventDefault(); onNext(form); }}>
      <h2 className="text-2xl font-extrabold mb-6 text-blue-900 text-center">Profile Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-blue-800 mb-1">Name</label>
          <input className="w-full rounded-lg border border-blue-200 p-2 focus:ring-2 focus:ring-blue-400 outline-none" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-blue-800 mb-1">Email</label>
          <input className="w-full rounded-lg border border-blue-200 p-2 focus:ring-2 focus:ring-blue-400 outline-none" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-blue-800 mb-1">Phone</label>
          <input className="w-full rounded-lg border border-blue-200 p-2 focus:ring-2 focus:ring-blue-400 outline-none" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-blue-800 mb-1">Education</label>
          <input className="w-full rounded-lg border border-blue-200 p-2 focus:ring-2 focus:ring-blue-400 outline-none" name="education" placeholder="Education" value={form.education} onChange={handleChange} required />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-blue-800 mb-1">Experience</label>
          <textarea className="w-full rounded-lg border border-blue-200 p-2 focus:ring-2 focus:ring-blue-400 outline-none" name="experience" placeholder="Experience" value={form.experience} onChange={handleChange} required rows={2} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-blue-800 mb-1">Skills <span className="text-xs text-blue-400">(comma separated)</span></label>
          <input className="w-full rounded-lg border border-blue-200 p-2 focus:ring-2 focus:ring-blue-400 outline-none" name="skills" placeholder="Skills (comma separated)" value={form.skills} onChange={handleChange} required />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-blue-800 mb-1">Projects <span className="text-xs text-blue-400">(optional)</span></label>
          <input className="w-full rounded-lg border border-blue-200 p-2 focus:ring-2 focus:ring-blue-400 outline-none" name="projects" placeholder="Projects (optional)" value={form.projects} onChange={handleChange} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-blue-800 mb-1">Target Role <span className="text-xs text-blue-400">(for cover letter)</span></label>
          <input className="w-full rounded-lg border border-blue-200 p-2 focus:ring-2 focus:ring-blue-400 outline-none" name="role" placeholder="Target Role (for cover letter)" value={form.role} onChange={handleChange} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-blue-800 mb-1">Target Company <span className="text-xs text-blue-400">(for cover letter)</span></label>
          <input className="w-full rounded-lg border border-blue-200 p-2 focus:ring-2 focus:ring-blue-400 outline-none" name="company" placeholder="Target Company (for cover letter)" value={form.company} onChange={handleChange} />
        </div>
      </div>
      <button className="mt-8 w-full py-3 rounded-lg bg-blue-600 text-white font-bold text-lg shadow hover:bg-blue-700 transition-all duration-150" type="submit">Next</button>
    </form>
  );
} 