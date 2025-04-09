import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import axios from 'axios';

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

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['fullName', 'professionalTitle', 'email', 'location', 'aboutMe', 'projects', 'skills', 'theme', 'colorScheme'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Generate modern portfolio using Gemini API
    const portfolioHtml = await generateModernPortfolio(data);
    
    return NextResponse.json({ html: portfolioHtml });
  } catch (error: any) {
    console.error('Modern portfolio generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate modern portfolio' },
      { status: 500 }
    );
  }
}

async function generateModernPortfolio(portfolioData: any): Promise<string> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    
    const prompt: string = `
      Generate a modern, visually appealing portfolio website for ${portfolioData.fullName} who is a ${portfolioData.professionalTitle}.
      
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
      
      Theme: ${portfolioData.theme}
      Color Scheme: ${portfolioData.colorScheme}
      
      Create a complete, standalone HTML portfolio with the following specifications:
      1. Use modern HTML5, CSS3 (with Flexbox and Grid), and optional vanilla JavaScript
      2. Design should be visually stunning with a ${portfolioData.theme} theme and ${portfolioData.colorScheme} color scheme
      3. Must be fully responsive for mobile, tablet, and desktop
      4. Include attention-grabbing animations using CSS transitions/animations 
      5. Use modern UI principles with clean typography, adequate white space, and visual hierarchy
      6. Incorporate sections for: hero/intro, about me, projects (with images placeholders), skills, and contact
      7. Include social media icons and links (placeholder URLs)
      8. Add subtle parallax effects or scroll animations 
      9. Use Font Awesome or similar icon set (via CDN)
      10. Include Google Fonts for beautiful typography
      
      Provide ONLY the complete HTML with embedded CSS and JavaScript.
    `;
    
    console.log('Sending request to Gemini API for modern portfolio generation');
    
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
    console.error('Error generating modern portfolio:', error.response?.data || error.message);
    throw new Error('Failed to generate modern portfolio. Please try again later.');
  }
} 