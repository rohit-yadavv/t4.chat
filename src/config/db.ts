import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI!;
    
    await mongoose.connect(mongoUri);
    
    console.log('✅ MongoDB Connected Successfully!');

  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
  }
};

export default connectDB; 