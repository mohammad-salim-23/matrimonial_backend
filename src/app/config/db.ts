
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/ecoloop';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log('MongoDB Connected successfully!');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); //if connection fails, exit the process
  }
};

export default connectDB;