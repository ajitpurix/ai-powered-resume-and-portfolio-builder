'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Button from '@/app/components/ui/Button';
import UserButton from '../components/UserButton';
import { useState, FormEvent } from 'react';

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isGeneratingResume, setIsGeneratingResume] = useState(false);
  const [isGeneratingPortfolio, setIsGeneratingPortfolio] = useState(false);
  const [resumeData, setResumeData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    workExperience: '',
    education: '',
    skills: '',
    targetRole: ''
  });
  const [portfolioData, setPortfolioData] = useState({
    fullName: '',
    professionalTitle: '',
    email: '',
    location: '',
    aboutMe: '',
    projects: '',
    skills: '',
    style: '',
    colorScheme: ''
  });
  const [generatedResume, setGeneratedResume] = useState('');
  const [generatedPortfolio, setGeneratedPortfolio] = useState('');
  const [error, setError] = useState('');

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="animate-spin h-12 w-12 border-4 border-red-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  const handleResumeChange = (e: any) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, [name]: value }));
  };

  const handlePortfolioChange = (e: any) => {
    const { name, value } = e.target;
    setPortfolioData(prev => ({ ...prev, [name]: value }));
  };

  const handleResumeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsGeneratingResume(true);
    
    try {
      const response = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate resume');
      }
      
      setGeneratedResume(data.html);
    } catch (error: any) {
      setError(error.message || 'An error occurred while generating your resume');
    } finally {
      setIsGeneratingResume(false);
    }
  };

  const handlePortfolioSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsGeneratingPortfolio(true);
    
    try {
      const response = await fetch('/api/generate-portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(portfolioData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate portfolio');
      }
      
      setGeneratedPortfolio(data.html);
    } catch (error: any) {
      setError(error.message || 'An error occurred while generating your portfolio');
    } finally {
      setIsGeneratingPortfolio(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <header className="bg-black shadow-md border-b border-red-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="text-2xl font-bold text-red-600">Visioon AI</div>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="text-gray-300">
                Welcome, {user?.firstName || 'User'}
              </div>
              <div className="relative">
                <UserButton />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-[calc(100vh-64px)] bg-black shadow-md border-r border-red-900/30">
          <div className="p-4">
            <div className="flex flex-col gap-2">
              <button 
                className={`p-2 rounded-md text-left ${activeTab === 'dashboard' ? 'bg-red-900/30 text-red-400' : 'hover:bg-neutral-800 text-gray-300'}`}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </button>
              <button 
                className={`p-2 rounded-md text-left ${activeTab === 'resume' ? 'bg-red-900/30 text-red-400' : 'hover:bg-neutral-800 text-gray-300'}`}
                onClick={() => setActiveTab('resume')}
              >
                AI Resume Builder
              </button>
              <button 
                className={`p-2 rounded-md text-left ${activeTab === 'portfolio' ? 'bg-red-900/30 text-red-400' : 'hover:bg-neutral-800 text-gray-300'}`}
                onClick={() => setActiveTab('portfolio')}
              >
                AI Portfolio Builder
              </button>
              <button 
                className={`p-2 rounded-md text-left ${activeTab === 'profile' ? 'bg-red-900/30 text-red-400' : 'hover:bg-neutral-800 text-gray-300'}`}
                onClick={() => setActiveTab('profile')}
              >
                My Profile
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          {error && (
            <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}
          
          {activeTab === 'dashboard' && (
            <div className="bg-neutral-800 shadow-lg rounded-lg p-6 border border-red-900/30">
              <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
              <p className="text-gray-300 mb-6">Welcome to your Visioon AI dashboard. Begin creating your AI-powered resume and portfolio.</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-red-900/30 rounded-lg p-6 hover:shadow-md bg-neutral-900 transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-red-900/30 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-white">AI Resume Builder</h2>
                  </div>
                  <p className="text-gray-400 mb-4">Build a professional resume with Gemini AI assistance. Just input your details and our AI will craft a stunning resume tailored to your industry.</p>
                  <Button onClick={() => setActiveTab('resume')} className="bg-red-800 hover:bg-red-900 text-white">Create Resume</Button>
                </div>
                
                <div className="border border-red-900/30 rounded-lg p-6 hover:shadow-md bg-neutral-900 transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-red-900/30 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-white">AI Portfolio Builder</h2>
                  </div>
                  <p className="text-gray-400 mb-4">Create an impressive portfolio website with Gemini AI. Our advanced AI will generate a custom portfolio based on your projects and skills.</p>
                  <Button onClick={() => setActiveTab('portfolio')} className="bg-red-800 hover:bg-red-900 text-white">Create Portfolio</Button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'resume' && (
            <div className="bg-neutral-800 shadow-lg rounded-lg p-6 border border-red-900/30">
              <h1 className="text-2xl font-bold text-white mb-6">AI Resume Builder</h1>
              <p className="text-gray-300 mb-6">Create a professional resume with the power of AI. Fill in your details below and let our AI craft the perfect resume for you.</p>
              
              {generatedResume ? (
                <div className="space-y-6">
                  <div className="prose prose-invert max-w-none bg-white text-black p-6 rounded-lg" dangerouslySetInnerHTML={{ __html: generatedResume }} />
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setGeneratedResume('')}
                      className="bg-neutral-700 text-white hover:bg-neutral-600 border-red-900/30"
                    >
                      Edit Information
                    </Button>
                    <Button
                      onClick={() => {
                        const blob = new Blob([generatedResume], { type: 'text/html' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${resumeData.fullName.replace(/\s+/g, '_')}_Resume.html`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }}
                      className="bg-red-800 hover:bg-red-900 text-white"
                    >
                      Download Resume
                    </Button>
                  </div>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleResumeSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Personal Information</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        name="fullName"
                        value={resumeData.fullName}
                        onChange={handleResumeChange}
                        placeholder="Full Name" 
                        className="px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white" 
                      />
                      <input 
                        type="email" 
                        name="email"
                        value={resumeData.email}
                        onChange={handleResumeChange}
                        placeholder="Email" 
                        className="px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white" 
                      />
                      <input 
                        type="tel" 
                        name="phone"
                        value={resumeData.phone}
                        onChange={handleResumeChange}
                        placeholder="Phone" 
                        className="px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white" 
                      />
                      <input 
                        type="text" 
                        name="location"
                        value={resumeData.location}
                        onChange={handleResumeChange}
                        placeholder="Location" 
                        className="px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Professional Summary</label>
                    <textarea 
                      rows={3} 
                      name="summary"
                      value={resumeData.summary}
                      onChange={handleResumeChange}
                      placeholder="Brief summary of your professional background and skills" 
                      className="w-full px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Work Experience</label>
                    <textarea 
                      rows={4} 
                      name="workExperience"
                      value={resumeData.workExperience}
                      onChange={handleResumeChange}
                      placeholder="List your work experiences (Format: Company, Position, Date Range, Responsibilities)" 
                      className="w-full px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Education</label>
                    <textarea 
                      rows={3} 
                      name="education"
                      value={resumeData.education}
                      onChange={handleResumeChange}
                      placeholder="List your educational background (Format: Institution, Degree, Date Range)" 
                      className="w-full px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Skills</label>
                    <input 
                      type="text" 
                      name="skills"
                      value={resumeData.skills}
                      onChange={handleResumeChange}
                      placeholder="List your skills, separated by commas" 
                      className="w-full px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Target Job Role</label>
                    <input 
                      type="text" 
                      name="targetRole"
                      value={resumeData.targetRole}
                      onChange={handleResumeChange}
                      placeholder="What position are you applying for?" 
                      className="w-full px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white" 
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={isGeneratingResume}
                      className="bg-red-800 hover:bg-red-900 text-white disabled:bg-red-900/50"
                    >
                      {isGeneratingResume ? 'Generating...' : 'Generate Resume with AI'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}
          
          {activeTab === 'portfolio' && (
            <div className="bg-neutral-800 shadow-lg rounded-lg p-6 border border-red-900/30">
              <h1 className="text-2xl font-bold text-white mb-6">AI Portfolio Builder</h1>
              <p className="text-gray-300 mb-6">Create a stunning portfolio website with the power of AI. Fill in your details below and let our AI craft the perfect portfolio for you.</p>
              
              {generatedPortfolio ? (
                <div className="space-y-6">
                  <div className="prose prose-invert max-w-none bg-white text-black p-6 rounded-lg" dangerouslySetInnerHTML={{ __html: generatedPortfolio }} />
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setGeneratedPortfolio('')}
                      className="bg-neutral-700 text-white hover:bg-neutral-600 border-red-900/30"
                    >
                      Edit Information
                    </Button>
                    <Button
                      onClick={() => {
                        const blob = new Blob([generatedPortfolio], { type: 'text/html' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${portfolioData.fullName.replace(/\s+/g, '_')}_Portfolio.html`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }}
                      className="bg-red-800 hover:bg-red-900 text-white"
                    >
                      Download Portfolio
                    </Button>
                  </div>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handlePortfolioSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Personal Information</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        name="fullName"
                        value={portfolioData.fullName}
                        onChange={handlePortfolioChange}
                        placeholder="Full Name" 
                        className="px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white" 
                      />
                      <input 
                        type="text" 
                        name="professionalTitle"
                        value={portfolioData.professionalTitle}
                        onChange={handlePortfolioChange}
                        placeholder="Professional Title" 
                        className="px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white" 
                      />
                      <input 
                        type="email" 
                        name="email"
                        value={portfolioData.email}
                        onChange={handlePortfolioChange}
                        placeholder="Email" 
                        className="px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white" 
                      />
                      <input 
                        type="text" 
                        name="location"
                        value={portfolioData.location}
                        onChange={handlePortfolioChange}
                        placeholder="Location" 
                        className="px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">About Me</label>
                    <textarea 
                      rows={3} 
                      name="aboutMe"
                      value={portfolioData.aboutMe}
                      onChange={handlePortfolioChange}
                      placeholder="Introduce yourself and your professional background" 
                      className="w-full px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Projects</label>
                    <textarea 
                      rows={4} 
                      name="projects"
                      value={portfolioData.projects}
                      onChange={handlePortfolioChange}
                      placeholder="Describe your projects (Format: Project Name, Description, Technologies Used, Link)" 
                      className="w-full px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Skills</label>
                    <input 
                      type="text" 
                      name="skills"
                      value={portfolioData.skills}
                      onChange={handlePortfolioChange}
                      placeholder="List your technical and creative skills, separated by commas" 
                      className="w-full px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Portfolio Style</label>
                    <select 
                      className="w-full px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                      name="style"
                      value={portfolioData.style}
                      onChange={handlePortfolioChange}
                    >
                      <option value="">Select a style</option>
                      <option value="minimalist">Minimalist</option>
                      <option value="creative">Creative</option>
                      <option value="professional">Professional</option>
                      <option value="technical">Technical</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Color Preference</label>
                    <select 
                      className="w-full px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                      name="colorScheme"
                      value={portfolioData.colorScheme}
                      onChange={handlePortfolioChange}
                    >
                      <option value="">Select a color scheme</option>
                      <option value="red">Red</option>
                      <option value="black">Black</option>
                      <option value="red-black">Red & Black</option>
                      <option value="monochrome">Monochrome</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={isGeneratingPortfolio}
                      className="bg-red-800 hover:bg-red-900 text-white disabled:bg-red-900/50"
                    >
                      {isGeneratingPortfolio ? 'Generating...' : 'Generate Portfolio with AI'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div className="bg-neutral-800 shadow-lg rounded-lg p-6 border border-red-900/30">
              <h1 className="text-2xl font-bold text-white mb-6">My Profile</h1>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 bg-neutral-700 rounded-full mb-4 overflow-hidden border-2 border-red-900/50">
                    {user?.imageUrl ? (
                      <img src={user.imageUrl} alt={user.firstName || 'User'} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-red-500">
                        {user?.firstName?.charAt(0) || 'U'}
                      </div>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-neutral-700 text-white hover:bg-neutral-600 border-red-900/30"
                  >
                    Update Photo
                  </Button>
                </div>
                
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                      <div className="text-lg font-medium text-white">{user?.firstName} {user?.lastName}</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                      <div className="text-lg text-white">{user?.emailAddresses[0]?.emailAddress}</div>
                    </div>
                    
                    <div className="col-span-2 mt-4">
                      <Button className="bg-red-800 hover:bg-red-900 text-white">Edit Profile</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 