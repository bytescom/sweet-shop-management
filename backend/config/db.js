import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    console.log('MONGO_URL:', process.env.MONGO_URL ? 'Set ✓' : 'NOT SET ✗');
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB Connected ✓');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
  }
};

export default connectDB;