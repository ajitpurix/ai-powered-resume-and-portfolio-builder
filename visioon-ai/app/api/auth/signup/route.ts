import { NextRequest, NextResponse } from 'next/server';
import connectDB, { isUsingInMemory, getInMemoryDB } from '@/app/lib/db';
import User from '@/app/models/User';
import { IUser } from '@/app/lib/types';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Connect to database
    try {
      await connectDB();
      console.log("Using in-memory database:", isUsingInMemory());
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { error: 'Database connection failed. Please check if MongoDB is running or verify your connection string.' },
        { status: 500 }
      );
    }

    // Handle in-memory database directly if we're in that mode
    if (isUsingInMemory()) {
      const inMemoryDB = getInMemoryDB();
      
      // Check if user already exists in memory
      const existingUser = inMemoryDB.users.find((user: any) => 
        user.email.toLowerCase() === email.toLowerCase()
      );
      
      if (existingUser) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 400 }
        );
      }
      
      // Create user directly in memory
      const id = Math.random().toString(36).substring(2, 15);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const newUser = {
        _id: id,
        id: id,
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        comparePassword: async (candidatePassword: string) => {
          return bcrypt.compare(candidatePassword, hashedPassword);
        }
      };
      
      inMemoryDB.users.push(newUser);
      
      // Return success without password
      const { password: _, ...userWithoutPassword } = newUser;
      
      return NextResponse.json(
        {
          success: true,
          user: userWithoutPassword,
        },
        { status: 201 }
      );
    } else {
      // Regular MongoDB flow
      try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
          return NextResponse.json(
            { error: 'User with this email already exists' },
            { status: 400 }
          );
        }

        // Create new user
        const user = await User.create({
          name,
          email: email.toLowerCase(),
          password,
        });

        // Return success without password
        return NextResponse.json(
          {
            success: true,
            user: {
              id: user._id?.toString() || user.id,
              name: user.name,
              email: user.email,
            },
          },
          { status: 201 }
        );
      } catch (createError) {
        console.error('Error creating user:', createError);
        return NextResponse.json(
          { error: 'Failed to create user account. Please try again.' },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle MongoDB connection errors specifically
    if (error instanceof Error && error.name === 'MongooseServerSelectionError') {
      return NextResponse.json(
        { error: 'Could not connect to database. Please check if MongoDB is running properly.' },
        { status: 500 }
      );
    }
    
    // Check for MongoDB validation errors
    if (error instanceof Error && 'errors' in (error as any)) {
      const validationErrors = (error as any).errors;
      const errorMessage = Object.values(validationErrors)
        .map((err: any) => err.message)
        .join(', ');
      
      return NextResponse.json(
        { error: errorMessage || 'Validation failed' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Something went wrong during signup' },
      { status: 500 }
    );
  }
} 