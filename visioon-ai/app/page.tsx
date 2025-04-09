import Link from 'next/link';
import Button from '@/app/components/ui/Button';
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="flex flex-col text-white snap-y snap-mandatory h-screen overflow-y-scroll">
      {/* Hero Section */}
      <div className="flex flex-col items-center bg-gradient-to-br from-black to-red-900 px-4 sm:px-6 lg:px-8 min-h-screen h-screen snap-start">
        <nav className="w-full max-w-7xl flex justify-between items-center pt-8">
          <div className="text-3xl font-bold text-red-600">Visioon AI</div>
          <div className="flex gap-4">
            <SignedIn>
              <Link href="/dashboard">
                <Button className="bg-red-800 hover:bg-red-900 text-white">Dashboard</Button>
              </Link>
            </SignedIn>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto text-center flex flex-col justify-center flex-grow">
          <div className="mb-6 inline-block mx-auto">
            <div className="bg-black/30 text-white rounded-full px-6 py-2 inline-flex items-center">
              <span>Optimized for Careers</span>
              <span className="ml-4 px-3 py-1 rounded-full bg-red-900 text-white text-sm">Try Now</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6">
            AI Resume & Portfolio Platform
          </h1>
          <p className="text-xl text-gray-300 mb-10">
            Integrates with your career goals to create professional profiles
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignedOut>
              <Link href="/login">
                <Button size="lg" className="bg-red-700 hover:bg-red-800 text-white rounded-full px-8 py-3 flex items-center">
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" className="bg-red-700 hover:bg-red-800 text-white rounded-full px-8 py-3 flex items-center">
                  Go to Dashboard
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </Link>
            </SignedIn>
          </div>

          <div className="mt-14 text-center">
            <p className="text-gray-400">14 Days Free Trial | No Credit Card Required</p>
          </div>

          <div className="mt-8 flex items-center justify-center">
            <p className="text-gray-400 mr-4">Powered by</p>
            <span className="bg-red-800 text-white px-2 py-1 rounded">V</span>
            <span className="ml-2 text-white">Vireon AI</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 sm:px-6 lg:px-8 bg-black min-h-screen h-screen flex items-center snap-start">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Why Choose Visioon AI</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-neutral-900 p-6 rounded-xl shadow-sm border border-red-900">
              <div className="w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Content</h3>
              <p className="text-gray-400">Let AI help you craft compelling descriptions and highlight your strengths.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-neutral-900 p-6 rounded-xl shadow-sm border border-red-900">
              <div className="w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Beautiful Templates</h3>
              <p className="text-gray-400">Choose from professionally designed templates to make your resume stand out.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-neutral-900 p-6 rounded-xl shadow-sm border border-red-900">
              <div className="w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">ATS-Optimized</h3>
              <p className="text-gray-400">Ensure your resume passes Applicant Tracking Systems with our optimization.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Analysis Section */}
      <div className="px-4 sm:px-6 lg:px-8 bg-neutral-900 min-h-screen h-screen flex items-center snap-start">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Smart Resume Analysis</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Analysis Tools */}
            <div className="bg-black/50 p-8 rounded-xl shadow-sm border border-red-900">
              <h3 className="text-2xl font-semibold text-white mb-6">AI-Powered Analysis Tools</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-300">ATS-friendliness check</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-300">Readability score</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-300">Keyword match for target job role</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-300">Grammar check</span>
                </li>
              </ul>
            </div>

            {/* Results */}
            <div className="bg-black/50 p-8 rounded-xl shadow-sm border border-red-900">
              <h3 className="text-2xl font-semibold text-white mb-6">Comprehensive Results</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-red-600">100</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold text-white">Overall Score</h4>
                    <p className="text-gray-400">Get a clear rating of your resume's effectiveness</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold text-white">Detailed Suggestions</h4>
                    <p className="text-gray-400">Receive actionable feedback to improve your resume</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-4 border-t border-red-900 min-h-screen h-screen flex items-center snap-start">
        <div className="max-w-7xl mx-auto text-center w-full">
          <div className="text-2xl font-bold text-red-600 mb-4">Visioon AI</div>
          <p className="text-gray-400">© 2023 Visioon AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
