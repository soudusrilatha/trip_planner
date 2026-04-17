const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri || uri.includes('<username>')) {
        throw new Error('Please configure a valid MongoDB URI in your .env file!');
    }
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`\n❌ Database Connection Failed!`);
    console.error(`Error: ${error.message}`);
    console.error(`\n👉 ACTION REQUIRED:`);
    console.error(`Please provide a valid MongoDB connection string in the .env file.`);
    console.error(`You can get a free cloud database at https://www.mongodb.com/atlas\n`);
    process.exit(1);
  }
};

module.exports = connectDB;
