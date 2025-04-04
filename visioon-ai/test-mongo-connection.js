// Script to test MongoDB connection
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('ERROR: MONGODB_URI is not defined. Check your .env.local file.');
  process.exit(1);
}

console.log('Attempting to connect to MongoDB with URI:', MONGODB_URI);
console.log('(URI displayed with credentials hidden for security)');

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('SUCCESS: Connected to MongoDB successfully!');
    // List databases to confirm connection
    return mongoose.connection.db.admin().listDatabases();
  })
  .then(result => {
    console.log('\nAvailable databases:');
    result.databases.forEach(db => {
      console.log(`- ${db.name}`);
    });
    console.log('\nYour MongoDB connection is working properly.');
  })
  .catch(err => {
    console.error('ERROR: Failed to connect to MongoDB:', err.message);
    if (MONGODB_URI.includes('your_username') || MONGODB_URI.includes('your_password')) {
      console.error('\nYou are using placeholder values in your MONGODB_URI.');
      console.error('Replace "your_username" and "your_password" with your actual MongoDB credentials.');
    }
  })
  .finally(() => {
    mongoose.disconnect();
  }); 