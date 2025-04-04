'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useState } from 'react';
import Button from '@/app/components/ui/Button';
import UserButton from '../components/UserButton';

export default function DashboardNew() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="text-2xl font-bold text-indigo-600">Visioon AI</div>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="text-gray-600">
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
        <div className="w-64 min-h-[calc(100vh-64px)] bg-white shadow-sm">
          <div className="p-4">
            <div className="flex flex-col gap-2">
              <button 
                className={`p-2 rounded-md text-left ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'}`}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </button>
              <button 
                className={`p-2 rounded-md text-left ${activeTab === 'resume' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'}`}
                onClick={() => setActiveTab('resume')}
              >
                AI Resume Builder
              </button>
              <button 
                className={`p-2 rounded-md text-left ${activeTab === 'portfolio' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'}`}
                onClick={() => setActiveTab('portfolio')}
              >
                AI Portfolio Builder
              </button>
              <button 
                className={`p-2 rounded-md text-left ${activeTab === 'profile' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'}`}
                onClick={() => setActiveTab('profile')}
              >
                My Profile
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
              <p className="text-gray-600 mb-6">Welcome to your Visioon AI dashboard. Begin creating your AI-powered resume and portfolio.</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">AI Resume Builder</h2>
                  </div>
                  <p className="text-gray-600 mb-4">Build a professional resume with AI assistance. Just input your details and our AI will craft a stunning resume tailored to your industry.</p>
                  <Button onClick={() => setActiveTab('resume')}>Create Resume</Button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">AI Portfolio Builder</h2>
                  </div>
                  <p className="text-gray-600 mb-4">Create an impressive portfolio website that showcases your work and skills. Our AI will generate a personalized portfolio based on your information.</p>
                  <Button onClick={() => setActiveTab('portfolio')}>Create Portfolio</Button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'resume' && (
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">AI Resume Builder</h1>
              <p className="text-gray-600 mb-6">Create a professional resume with the power of AI. Fill in your details below and let our AI craft the perfect resume for you.</p>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Personal Information</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Full Name" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <input type="email" placeholder="Email" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <input type="tel" placeholder="Phone" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <input type="text" placeholder="Location" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
                  <textarea rows={3} placeholder="Brief summary of your professional background and skills" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Work Experience</label>
                  <textarea rows={4} placeholder="List your work experiences (Format: Company, Position, Date Range, Responsibilities)" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                  <textarea rows={3} placeholder="List your educational background (Format: Institution, Degree, Date Range)" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                  <input type="text" placeholder="List your skills, separated by commas" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Job Role</label>
                  <input type="text" placeholder="What position are you applying for?" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                
                <div className="flex justify-end">
                  <Button>Generate Resume with AI</Button>
                </div>
              </form>
            </div>
          )}
          
          {activeTab === 'portfolio' && (
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">AI Portfolio Builder</h1>
              <p className="text-gray-600 mb-6">Create a stunning portfolio website with the power of AI. Fill in your details below and let our AI craft the perfect portfolio for you.</p>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Personal Information</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Full Name" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <input type="text" placeholder="Professional Title" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <input type="email" placeholder="Email" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <input type="text" placeholder="Location" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">About Me</label>
                  <textarea rows={3} placeholder="Introduce yourself and your professional background" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Projects</label>
                  <textarea rows={4} placeholder="Describe your projects (Format: Project Name, Description, Technologies Used, Link)" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                  <input type="text" placeholder="List your technical and creative skills, separated by commas" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio Style</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">Select a style</option>
                    <option value="minimalist">Minimalist</option>
                    <option value="creative">Creative</option>
                    <option value="professional">Professional</option>
                    <option value="technical">Technical</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color Preference</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">Select a color scheme</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="purple">Purple</option>
                    <option value="monochrome">Monochrome</option>
                  </select>
                </div>
                
                <div className="flex justify-end">
                  <Button>Generate Portfolio with AI</Button>
                </div>
              </form>
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 overflow-hidden">
                    {user?.imageUrl ? (
                      <img src={user.imageUrl} alt={user.firstName || 'User'} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-400">
                        {user?.firstName?.charAt(0) || 'U'}
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm">Update Photo</Button>
                </div>
                
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                      <div className="text-lg font-medium">{user?.firstName} {user?.lastName}</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                      <div className="text-lg">{user?.emailAddresses?.[0]?.emailAddress}</div>
                    </div>
                    
                    <div className="col-span-2 mt-4">
                      <Button>Edit Profile</Button>
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