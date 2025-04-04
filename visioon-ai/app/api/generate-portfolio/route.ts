import { NextRequest, NextResponse } from 'next/server';
import { generatePortfolio } from '@/app/lib/gemini';
import { currentUser } from '@clerk/nextjs/server';

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
    const requiredFields = ['fullName', 'professionalTitle', 'email', 'location', 'aboutMe', 'projects', 'skills', 'style', 'colorScheme'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Generate portfolio using Gemini API
    const portfolioHtml = await generatePortfolio(data);
    
    return NextResponse.json({ html: portfolioHtml });
  } catch (error: any) {
    console.error('Portfolio generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate portfolio' },
      { status: 500 }
    );
  }
} 