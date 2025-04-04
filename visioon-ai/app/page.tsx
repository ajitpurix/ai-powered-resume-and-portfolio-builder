import Link from 'next/link';
import Button from '@/app/components/ui/Button';
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col text-white">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center bg-gradient-to-br from-black to-red-900 py-16 px-4 sm:px-6 lg:px-8">
        <nav className="w-full max-w-7xl flex justify-between items-center mb-16">
          <div className="text-3xl font-bold text-red-600">Visioon AI</div>
          <div className="flex gap-4">
            <SignedIn>
              <Link href="/dashboard">
                <Button className="bg-red-800 hover:bg-red-900 text-white">Dashboard</Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <Link href="/login">
                <Button className="bg-red-800 hover:bg-red-900 text-white">Get Started</Button>
              </Link>
            </SignedOut>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Create Professional Resumes & Portfolios with AI
          </h1>
          <p className="text-xl text-gray-300 mb-10">
            Build stunning, personalized resumes and portfolios in minutes with the power of artificial intelligence.
            Stand out from the crowd and land your dream job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignedOut>
              <Link href="/login">
                <Button size="lg" className="bg-red-800 hover:bg-red-900 text-white">Get Started</Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" className="bg-red-800 hover:bg-red-900 text-white">Go to Dashboard</Button>
              </Link>
            </SignedIn>
            <Button size="lg" variant="secondary" className="bg-neutral-800 text-gray-200 hover:bg-neutral-700">See Examples</Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
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

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-4 border-t border-red-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold text-red-600 mb-4">Visioon AI</div>
          <p className="text-gray-400">© 2023 Visioon AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
