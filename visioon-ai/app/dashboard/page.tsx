'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Button from '@/app/components/ui/Button';
import { useState, FormEvent } from 'react';

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isGeneratingResume, setIsGeneratingResume] = useState(false);
  const [isGeneratingModernPortfolio, setIsGeneratingModernPortfolio] = useState(false);
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
  const [modernPortfolioData, setModernPortfolioData] = useState({
    fullName: '',
    professionalTitle: '',
    email: '',
    location: '',
    aboutMe: '',
    projects: '',
    skills: '',
    theme: '',
    colorScheme: ''
  });
  const [generatedResume, setGeneratedResume] = useState('');
  const [generatedModernPortfolio, setGeneratedModernPortfolio] = useState('');
  const [error, setError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState({
    resumeScore: 0,
    portfolioScore: 0,
    suggestions: [] as string[]
  });
  const [uploadedFiles, setUploadedFiles] = useState<{
    resume: File | null;
    portfolio: File | null;
  }>({
    resume: null,
    portfolio: null
  });

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

  const handleModernPortfolioChange = (e: any) => {
    const { name, value } = e.target;
    setModernPortfolioData(prev => ({ ...prev, [name]: value }));
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

  const handleModernPortfolioSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsGeneratingModernPortfolio(true);
    
    try {
      const response = await fetch('/api/generate-modern-portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modernPortfolioData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate modern portfolio');
      }
      
      setGeneratedModernPortfolio(data.html);
    } catch (error: any) {
      setError(error.message || 'An error occurred while generating your modern portfolio');
    } finally {
      setIsGeneratingModernPortfolio(false);
    }
  };

  const handleFileUpload = (type: 'resume' | 'portfolio', file: File) => {
    setUploadedFiles(prev => ({
      ...prev,
      [type]: file
    }));
  };

  const handlePasteText = (type: 'resume' | 'portfolio', text: string) => {
    // Create a text file from the pasted content
    const file = new File([text], `${type}_content.txt`, { type: 'text/plain' });
    setUploadedFiles(prev => ({
      ...prev,
      [type]: file
    }));
  };

  const analyzeContent = async () => {
    if (!uploadedFiles.resume && !uploadedFiles.portfolio) {
      setError('Please upload or paste your resume or portfolio content');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      // Create FormData to send files
      const formData = new FormData();
      if (uploadedFiles.resume) {
        formData.append('resume', uploadedFiles.resume);
      }
      if (uploadedFiles.portfolio) {
        formData.append('portfolio', uploadedFiles.portfolio);
      }

      // Make API call to analyze content
      const response = await fetch('/api/analyze-content', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze content');
      }

      const data = await response.json();
      
      // Update analysis results
      setAnalysisResults({
        resumeScore: data.resumeScore || 0,
        portfolioScore: data.portfolioScore || 0,
        suggestions: data.suggestions || []
      });

    } catch (error: any) {
      setError(error.message || 'An error occurred while analyzing your content');
    } finally {
      setIsAnalyzing(false);
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
            <div className="text-gray-300">
              Welcome, {user?.firstName || 'User'}
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
                className={`p-2 rounded-md text-left ${activeTab === 'modern-portfolio' ? 'bg-red-900/30 text-red-400' : 'hover:bg-neutral-800 text-gray-300'}`}
                onClick={() => setActiveTab('modern-portfolio')}
              >
                Modern Portfolio Builder
              </button>
              <button 
                className={`p-2 rounded-md text-left ${activeTab === 'analysis' ? 'bg-red-900/30 text-red-400' : 'hover:bg-neutral-800 text-gray-300'}`}
                onClick={() => setActiveTab('analysis')}
              >
                AI Analysis
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
                    <h2 className="text-xl font-semibold text-white">Modern Portfolio Builder</h2>
                  </div>
                  <p className="text-gray-400 mb-4">Create a stunning modern portfolio website with advanced animations and responsive design. Fill in your details below and let our AI craft the perfect portfolio for you.</p>
                  <Button onClick={() => setActiveTab('modern-portfolio')} className="bg-red-800 hover:bg-red-900 text-white">Create Modern Portfolio</Button>
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
          
          {activeTab === 'modern-portfolio' && (
            <div className="bg-neutral-800 shadow-lg rounded-lg p-6 border border-red-900/30">
              <h1 className="text-2xl font-bold text-white mb-6">Modern Portfolio Builder</h1>
              <p className="text-gray-300 mb-6">Create a stunning modern portfolio website with advanced animations and responsive design. Fill in your details below and let our AI craft the perfect portfolio for you.</p>
              
              {generatedModernPortfolio ? (
                <div className="space-y-6">
                  <div className="prose prose-invert max-w-none bg-white text-black p-6 rounded-lg" dangerouslySetInnerHTML={{ __html: generatedModernPortfolio }} />
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setGeneratedModernPortfolio('')}
                      className="bg-neutral-700 text-white hover:bg-neutral-600 border-red-900/30"
                    >
                      Edit Information
                    </Button>
                    <Button
                      onClick={() => {
                        const blob = new Blob([generatedModernPortfolio], { type: 'text/html' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${modernPortfolioData.fullName.replace(/\s+/g, '_')}_Modern_Portfolio.html`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }}
                      className="bg-red-800 hover:bg-red-900 text-white"
                    >
                      Download Modern Portfolio
                    </Button>
                  </div>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleModernPortfolioSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Personal Information</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        name="fullName"
                        value={modernPortfolioData.fullName}
                        onChange={handleModernPortfolioChange}
                        placeholder="Full Name" 
                        className="px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white" 
                      />
                      <input 
                        type="text" 
                        name="professionalTitle"
                        value={modernPortfolioData.professionalTitle}
                        onChange={handleModernPortfolioChange}
                        placeholder="Professional Title" 
                        className="px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white" 
                      />
                      <input 
                        type="email" 
                        name="email"
                        value={modernPortfolioData.email}
                        onChange={handleModernPortfolioChange}
                        placeholder="Email" 
                        className="px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white" 
                      />
                      <input 
                        type="text" 
                        name="location"
                        value={modernPortfolioData.location}
                        onChange={handleModernPortfolioChange}
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
                      value={modernPortfolioData.aboutMe}
                      onChange={handleModernPortfolioChange}
                      placeholder="Introduce yourself and your professional background" 
                      className="w-full px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Projects</label>
                    <textarea 
                      rows={4} 
                      name="projects"
                      value={modernPortfolioData.projects}
                      onChange={handleModernPortfolioChange}
                      placeholder="Describe your projects (Format: Project Name, Description, Technologies Used, Link)" 
                      className="w-full px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Skills</label>
                    <input 
                      type="text" 
                      name="skills"
                      value={modernPortfolioData.skills}
                      onChange={handleModernPortfolioChange}
                      placeholder="List your technical and creative skills, separated by commas" 
                      className="w-full px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Portfolio Theme</label>
                    <select 
                      className="w-full px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                      name="theme"
                      value={modernPortfolioData.theme}
                      onChange={handleModernPortfolioChange}
                    >
                      <option value="">Select a theme</option>
                      <option value="minimalist">Minimalist</option>
                      <option value="creative">Creative</option>
                      <option value="professional">Professional</option>
                      <option value="dark mode">Dark Mode</option>
                      <option value="glassmorphism">Glassmorphism</option>
                      <option value="neumorphism">Neumorphism</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Color Preference</label>
                    <select 
                      className="w-full px-4 py-2 bg-neutral-700 border border-red-900/30 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                      name="colorScheme"
                      value={modernPortfolioData.colorScheme}
                      onChange={handleModernPortfolioChange}
                    >
                      <option value="">Select a color scheme</option>
                      <option value="red">Red</option>
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                      <option value="purple">Purple</option>
                      <option value="orange">Orange</option>
                      <option value="monochrome">Monochrome</option>
                      <option value="gradient">Gradient</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={isGeneratingModernPortfolio}
                      className="bg-red-800 hover:bg-red-900 text-white disabled:bg-red-900/50"
                    >
                      {isGeneratingModernPortfolio ? 'Generating...' : 'Generate Modern Portfolio with AI'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}
          
          {activeTab === 'analysis' && (
            <div className="bg-neutral-800 shadow-lg rounded-lg p-6 border border-red-900/30">
              <h1 className="text-2xl font-bold text-white mb-6">AI Resume & Portfolio Analysis</h1>
              <p className="text-gray-300 mb-6">Get instant feedback and suggestions to improve your resume and portfolio.</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Chat Interface */}
                <div className="bg-neutral-900 p-8 rounded-xl shadow-sm border border-red-900">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-white">Smart Analysis Chat</h3>
                      <p className="text-gray-400">Get instant feedback on your resume & portfolio</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-black/50 p-4 rounded-lg">
                      <p className="text-gray-300">Upload your resume and portfolio to get started</p>
                    </div>
                    <div className="flex space-x-4">
                      <label className="flex-1 bg-red-900/30 hover:bg-red-900/50 text-white px-4 py-2 rounded-lg border border-red-900 flex items-center justify-center cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Upload Files
                        <input 
                          type="file" 
                          className="hidden" 
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload('resume', file);
                            }
                          }}
                        />
                      </label>
                      <button 
                        className="flex-1 bg-red-900/30 hover:bg-red-900/50 text-white px-4 py-2 rounded-lg border border-red-900 flex items-center justify-center"
                        onClick={() => {
                          const text = prompt('Paste your resume or portfolio content here:');
                          if (text) {
                            handlePasteText('resume', text);
                          }
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2z" />
                        </svg>
                        Paste Text
                      </button>
                    </div>
                    {uploadedFiles.resume && (
                      <div className="bg-black/30 p-3 rounded-lg flex items-center justify-between">
                        <span className="text-gray-300 text-sm truncate">
                          {uploadedFiles.resume.name}
                        </span>
                        <button 
                          className="text-red-500 hover:text-red-400"
                          onClick={() => setUploadedFiles(prev => ({ ...prev, resume: null }))}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                    <button
                      className="w-full bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                      onClick={analyzeContent}
                      disabled={isAnalyzing || (!uploadedFiles.resume && !uploadedFiles.portfolio)}
                    >
                      {isAnalyzing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Analyzing...
                        </>
                      ) : (
                        'Analyze Content'
                      )}
                    </button>
                  </div>
                </div>

                {/* Analysis Results */}
                <div className="bg-neutral-900 p-8 rounded-xl shadow-sm border border-red-900">
                  <h3 className="text-2xl font-semibold text-white mb-6">Analysis Results</h3>
                  
                  {analysisResults.resumeScore > 0 || analysisResults.portfolioScore > 0 ? (
                    <>
                      {/* Resume Score */}
                      {analysisResults.resumeScore > 0 && (
                        <div className="mb-8">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-300">Resume Score</span>
                            <span className="text-2xl font-bold text-red-600">{analysisResults.resumeScore}/100</span>
                          </div>
                          <div className="w-full bg-black/50 rounded-full h-2">
                            <div className="bg-red-600 h-2 rounded-full" style={{ width: `${analysisResults.resumeScore}%` }}></div>
                          </div>
                        </div>
                      )}

                      {/* Portfolio Score */}
                      {analysisResults.portfolioScore > 0 && (
                        <div className="mb-8">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-300">Portfolio Score</span>
                            <span className="text-2xl font-bold text-red-600">{analysisResults.portfolioScore}/100</span>
                          </div>
                          <div className="w-full bg-black/50 rounded-full h-2">
                            <div className="bg-red-600 h-2 rounded-full" style={{ width: `${analysisResults.portfolioScore}%` }}></div>
                          </div>
                        </div>
                      )}

                      {/* Suggestions */}
                      {analysisResults.suggestions.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-4">Key Suggestions</h4>
                          <ul className="space-y-3">
                            {analysisResults.suggestions.map((suggestion, index) => (
                              <li key={index} className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-300">{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400">Upload your content to see analysis results</p>
                    </div>
                  )}
                </div>
              </div>
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