import React from 'react';
import { SignedIn, SignedOut, SignIn, SignUp, UserButton } from '@clerk/clerk-react';
import { useSessionStorageState } from './hooks/useSessionStorageState';
import ProfileForm from './components/ProfileForm';
import TemplateSelector from './components/TemplateSelector';
import Editor from './components/Editor';
import Preview from './components/Preview';
import DownloadButton from './components/DownloadButton';

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function App() {
  const [profile, setProfile] = useSessionStorageState('profile', null);
  const [template, setTemplate] = useSessionStorageState('template', null);
  const [generatedContent, setGeneratedContent] = useSessionStorageState('generatedContent', { resume: '', coverletter: '' });
  const [step, setStep] = useSessionStorageState('step', 'profile');

  const handleContentChange = (type, value) => {
    setGeneratedContent(prev => ({ ...prev, [type]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto p-4">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">AI Resume + Cover Letter Builder</h1>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
        <SignedOut>
          <SignIn />
        </SignedOut>
        <SignedIn>
          {step === 'profile' && (
            <ProfileForm onNext={data => { setProfile(data); setStep('template'); }} />
          )}
          {step === 'template' && (
            <TemplateSelector 
              onPrev={() => setStep('profile')}
              onNext={tpl => { setTemplate(tpl); setStep('ai'); }}
            />
          )}
          {step === 'ai' && (
            <Editor
              profile={profile}
              template={template}
              templateName={template}
              setGeneratedContent={setGeneratedContent}
              onPrev={() => setStep('template')}
              onNext={() => setStep('edit')}
            />
          )}
          {step === 'edit' && (
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-between w-full max-w-4xl mb-2">
                <span className="text-lg font-bold text-blue-700">Template: {capitalize(template)}</span>
                <button
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-all"
                  onClick={() => setStep('ai')}
                >
                  Previous
                </button>
              </div>
              <div className="flex flex-col items-center gap-12 w-full max-w-4xl mt-4">
                {/* Resume Section */}
                <div className="flex flex-col items-center w-full gap-4">
                  <h3 className="text-3xl font-bold text-blue-900 self-start">Edit & Preview Resume</h3>
                  
                  {template === 'ai-styled' && (
                    <div className="w-full bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-sm">
                      <p className="font-bold">You are editing the raw JSON data for your resume.</p>
                      <p>Be careful to only change the text content (e.g., a job description). Avoid changing the structure or keys (e.g., "company", "role").</p>
                    </div>
                  )}

                  <textarea
                    className="w-full rounded-lg border border-blue-200 p-4 text-base focus:ring-2 focus:ring-blue-400 outline-none bg-white shadow-sm font-mono text-sm"
                    value={generatedContent.resume}
                    onChange={e => handleContentChange('resume', e.target.value)}
                    rows={20}
                    placeholder="Your AI-generated resume will appear here. You can edit it directly."
                  />
                  
                  <Preview 
                    template={template} 
                    profile={profile} 
                    text={generatedContent}
                    type="resume"
                    title={template === 'ai-styled' ? 'AI-Styled Resume Preview' : 'Live Preview'}
                  />
                  <div className="mt-2">
                    <DownloadButton 
                      template={template} 
                      profile={profile} 
                      text={generatedContent}
                      type="resume"
                    />
                  </div>
                </div>
                {/* Cover Letter Section */}
                <div className="flex flex-col items-center w-full gap-4">
                  <h3 className="text-3xl font-bold text-blue-900 self-start">Edit & Preview Cover Letter</h3>
                  <textarea
                    className="w-full rounded-lg border border-blue-200 p-4 text-base focus:ring-2 focus:ring-blue-400 outline-none bg-white shadow-sm"
                    value={generatedContent.coverletter}
                    onChange={e => handleContentChange('coverletter', e.target.value)}
                    rows={15}
                    placeholder="Your AI-generated cover letter will appear here. You can edit it directly."
                  />
                  <Preview 
                    template={template} 
                    profile={profile} 
                    text={generatedContent}
                    type="coverletter"
                    title={template === 'ai-styled' ? 'Cover Letter Preview' : 'Live Preview'}
                  />
                  <div className="mt-2">
                    <DownloadButton 
                      template={template} 
                      profile={profile} 
                      text={generatedContent}
                      type="coverletter"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </SignedIn>
      </div>
    </div>
  );
}

export default App;
