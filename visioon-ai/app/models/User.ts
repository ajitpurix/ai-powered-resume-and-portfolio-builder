import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser, IUserModel } from '../lib/types';
import { getInMemoryDB, isUsingInMemory } from '../lib/db';

const UserSchema = new Schema<IUser, IUserModel>({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [50, 'Name cannot be more than 50 characters'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
    index: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
}, {
  timestamps: true,
});

// Hash the password before saving
UserSchema.pre('save', async function(next) {
  try {
    // Only hash the password if it's modified (or new)
    if (!this.isModified('password')) {
      return next();
    }
    
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password along with the new salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare password for login
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    // Use bcrypt to compare the provided password with the hashed password
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
};

// Add a static method to find a user by email
UserSchema.statics.findByEmail = async function(email: string) {
  // If using in-memory database, use that instead
  if (isUsingInMemory()) {
    const inMemoryDB = getInMemoryDB();
    return inMemoryDB.users.find((user: any) => user.email.toLowerCase() === email.toLowerCase());
  }
  
  return this.findOne({ email: email.toLowerCase() });
};

// Initialize variables for models
let inMemoryModel: any = null;
let mongooseModel: IUserModel | null = null;

// Set up in-memory model if needed
if (isUsingInMemory()) {
  const inMemoryDB = getInMemoryDB();
  
  inMemoryModel = {
    findOne: async (query: any) => {
      if (query.email) {
        return inMemoryDB.users.find((user: any) => 
          user.email.toLowerCase() === query.email.toLowerCase());
      }
      return null;
    },
    
    create: async (userData: any) => {
      const id = Math.random().toString(36).substring(2, 15);
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      const newUser = {
        _id: id,
        id: id,
        name: userData.name,
        email: userData.email.toLowerCase(),
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        comparePassword: async (candidatePassword: string) => {
          return bcrypt.compare(candidatePassword, hashedPassword);
        }
      };
      
      inMemoryDB.users.push(newUser);
      
      // Return a copy without the password
      const { password, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
    }
  };
  
  console.log('Using in-memory User model');
} else {
  // Use mongoose model
  mongooseModel = (mongoose.models.User || mongoose.model<IUser, IUserModel>('User', UserSchema)) as IUserModel;
}

// Single export that works for both cases
const User = isUsingInMemory() ? inMemoryModel as unknown as IUserModel : mongooseModel as IUserModel;
export default User; 