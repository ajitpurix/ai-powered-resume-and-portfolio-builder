import { NextRequest, NextResponse } from 'next/server';
import { generateResume } from '@/app/lib/gemini';
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
    const requiredFields = ['fullName', 'email', 'phone', 'location', 'summary', 'workExperience', 'education', 'skills', 'targetRole'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Generate resume using Gemini API
    const resumeHtml = await generateResume(data);
    
    return NextResponse.json({ html: resumeHtml });
  } catch (error: any) {
    console.error('Resume generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate resume' },
      { status: 500 }
    );
  }
} 