import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import User from '@/app/models/User';
import connectDB, { isUsingInMemory, getInMemoryDB } from '@/app/lib/db';
import bcrypt from 'bcryptjs';

// Extend the standard session type to include userId
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }

        try {
          try {
            await connectDB();
            
            if (isUsingInMemory()) {
              console.log('Using in-memory database for authentication');
            }
          } catch (dbError) {
            console.error('Database connection error:', dbError);
            throw new Error('Database connection failed. Please check if MongoDB is running or verify your connection string.');
          }

          // Handle in-memory authentication directly
          if (isUsingInMemory()) {
            const inMemoryDB = getInMemoryDB();
            const user = inMemoryDB.users.find((user: any) => 
              user.email.toLowerCase() === credentials.email.toLowerCase()
            );
            
            if (!user) {
              throw new Error('No user found with this email');
            }
            
            // Check password
            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
            
            if (!isPasswordCorrect) {
              throw new Error('Invalid password');
            }
            
            // Return user data without the password
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
          } else {
            // Regular MongoDB flow
            const user = await User.findOne({ email: credentials.email.toLowerCase() });
            
            if (!user) {
              throw new Error('No user found with this email');
            }

            // Check if user.password exists before comparing
            if (!user.password) {
              throw new Error('Invalid user data, please contact support');
            }

            // Use either the model method or direct comparison
            let isPasswordCorrect = false;
            if (typeof user.comparePassword === 'function') {
              isPasswordCorrect = await user.comparePassword(credentials.password);
            } else {
              isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
            }

            if (!isPasswordCorrect) {
              throw new Error('Invalid password');
            }

            const userData = {
              id: user._id?.toString() || user.id,
              name: user.name,
              email: user.email,
            };

            return userData;
          }
        } catch (error) {
          console.error('NextAuth authorize error:', error);
          
          // Handle MongoDB connection errors specifically
          if (error instanceof Error && error.name === 'MongooseServerSelectionError') {
            throw new Error('Database connection failed. Please check your MongoDB setup.');
          }
          
          throw new Error(error instanceof Error ? error.message : 'Authentication failed');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
  pages: {
    signIn: '/login',
    error: '/login', // Error page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 