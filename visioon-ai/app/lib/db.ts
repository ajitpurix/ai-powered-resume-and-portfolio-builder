import mongoose from 'mongoose';

// Check if we should use in-memory database
const USE_IN_MEMORY = process.env.USE_IN_MEMORY_DB === 'true';

// Get the MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Memory storage for when MongoDB isn't available
const inMemoryDB = {
  users: [] as any[],
};

// Define the interface for the cached mongoose connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
  useInMemory: boolean;
}

// Define the global namespace to include mongoose
declare global {
  var mongoose: MongooseCache | undefined;
}

// Initialize cached with default value if global.mongoose is undefined
const cached: MongooseCache = global.mongoose || { 
  conn: null, 
  promise: null, 
  useInMemory: USE_IN_MEMORY // Set initial value based on environment
};

// Set global.mongoose if it doesn't exist
if (!global.mongoose) {
  global.mongoose = cached;
}

// Force in-memory mode if environment variable is set
if (USE_IN_MEMORY && !cached.useInMemory) {
  console.log('Forcing in-memory database mode based on environment variable');
  cached.useInMemory = true;
  cached.conn = null;
  cached.promise = null;
}

async function connectDB() {
  // If we're already using in-memory mode, return immediately
  if (cached.useInMemory) {
    console.log('Using in-memory database (MongoDB not available)');
    return null; // Return null instead of cached.conn which would be mongoose
  }

  // If we already have a connection, return it
  if (cached.conn) {
    return cached.conn;
  }

  // Check if MONGODB_URI is defined
  if (!MONGODB_URI) {
    console.warn('MONGODB_URI not defined. Using in-memory database instead.');
    cached.useInMemory = true;
    return null;
  }

  // Log which MongoDB we're connecting to (with credentials hidden)
  const sanitizedUri = MONGODB_URI.includes('@') 
    ? MONGODB_URI.replace(/mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/, 'mongodb$1://$2:****@')
    : MONGODB_URI;
  console.log(`MongoDB URI: ${sanitizedUri}`);

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Reduce timeout to 5 seconds
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        
        // Provide helpful error messages for common issues
        if (error.name === 'MongooseServerSelectionError') {
          if (MONGODB_URI.includes('localhost') || MONGODB_URI.includes('127.0.0.1')) {
            console.error('Could not connect to local MongoDB. Make sure MongoDB is running on your machine.');
          } else if (MONGODB_URI.includes('your_username') || MONGODB_URI.includes('your_password')) {
            console.error('You are using placeholder values in your MONGODB_URI. Replace them with actual credentials.');
          } else {
            console.error('Could not connect to remote MongoDB. Check your network and credentials.');
          }
          console.warn('Falling back to in-memory database for testing.');
          cached.useInMemory = true;
        }
        
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null; // Reset the promise on error
    console.error('Failed to connect to MongoDB, using in-memory database instead');
    cached.useInMemory = true;
    return null;
  }
}

// Function to get in-memory database (used when MongoDB isn't available)
export function getInMemoryDB() {
  // Ensure we're in in-memory mode
  if (!cached.useInMemory) {
    cached.useInMemory = true;
    console.log('Switching to in-memory database mode');
  }
  return inMemoryDB;
}

// Export function to check if we're using in-memory mode
export function isUsingInMemory() {
  return cached.useInMemory;
}

// Force in-memory mode for development without MongoDB
export function forceInMemoryMode() {
  cached.useInMemory = true;
  cached.conn = null;
  cached.promise = null;
  console.log('Forced in-memory database mode');
  return null;
}

export default connectDB; 