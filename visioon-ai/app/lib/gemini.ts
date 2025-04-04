/**
 * Gemini AI service for generating resume and portfolio content
 */
import axios from 'axios';

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  workExperience: string;
  education: string;
  skills: string;
  targetRole: string;
}

interface PortfolioData {
  fullName: string;
  professionalTitle: string;
  email: string;
  location: string;
  aboutMe: string;
  projects: string;
  skills: string;
  style: string;
  colorScheme: string;
}

// Gemini API response interface
interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: {
        text?: string;
      }[];
    };
  }[];
  error?: {
    message: string;
    code: number;
  };
}

export async function generateResume(resumeData: ResumeData): Promise<string> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    
    const prompt: string = `
      Generate a professional resume for ${resumeData.fullName} who is applying for a ${resumeData.targetRole} position.
      
      Personal Details:
      - Name: ${resumeData.fullName}
      - Email: ${resumeData.email}
      - Phone: ${resumeData.phone}
      - Location: ${resumeData.location}
      
      Professional Summary:
      ${resumeData.summary}
      
      Work Experience:
      ${resumeData.workExperience}
      
      Education:
      ${resumeData.education}
      
      Skills:
      ${resumeData.skills}
      
      Format the resume in a clean, professional layout. Include all relevant sections such as profile summary, 
      work experience, education, skills, and contact information. Make sure the content is ATS-friendly.
      Provide the result in HTML format that can be directly displayed or converted to PDF.
    `;
    
    console.log('Sending request to Gemini API for resume generation');
    
    const response = await axios.post<GeminiResponse>(
      `${url}?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Gemini API response received');
    
    if (response.data.error) {
      throw new Error(`Gemini API error: ${response.data.error.message}`);
    }
    
    // Extract text response safely with optional chaining
    const generatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    if (!generatedText) {
      console.error('Unexpected response format');
      throw new Error('Failed to get text from the API response');
    }
    
    return generatedText;
  } catch (error: any) {
    console.error('Error generating resume:', error.response?.data || error.message);
    throw new Error('Failed to generate resume. Please try again later.');
  }
}

export async function generatePortfolio(portfolioData: PortfolioData): Promise<string> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    
    const prompt: string = `
      Generate a professional portfolio website for ${portfolioData.fullName} who is a ${portfolioData.professionalTitle}.
      
      Personal Details:
      - Name: ${portfolioData.fullName}
      - Professional Title: ${portfolioData.professionalTitle}
      - Email: ${portfolioData.email}
      - Location: ${portfolioData.location}
      
      About Me:
      ${portfolioData.aboutMe}
      
      Projects:
      ${portfolioData.projects}
      
      Skills:
      ${portfolioData.skills}
      
      Style Preference: ${portfolioData.style}
      Color Scheme: ${portfolioData.colorScheme}
      
      Generate a complete portfolio website with a ${portfolioData.style} design using the ${portfolioData.colorScheme} color scheme.
      Include sections for About Me, Projects, Skills, and Contact Information.
      Provide the result as HTML and CSS code that can be directly used in a Next.js application.
    `;
    
    console.log('Sending request to Gemini API for portfolio generation');
    
    const response = await axios.post<GeminiResponse>(
      `${url}?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Gemini API response received');
    
    if (response.data.error) {
      throw new Error(`Gemini API error: ${response.data.error.message}`);
    }
    
    // Extract text response safely with optional chaining
    const generatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    if (!generatedText) {
      console.error('Unexpected response format');
      throw new Error('Failed to get text from the API response');
    }
    
    return generatedText;
  } catch (error: any) {
    console.error('Error generating portfolio:', error.response?.data || error.message);
    throw new Error('Failed to generate portfolio. Please try again later.');
  }
} 