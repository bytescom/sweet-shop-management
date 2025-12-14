import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/userSchema.js';

const testAddUser = async () => {
    try {
        console.log('Testing MongoDB connection...');
        console.log('MONGO_URL:', process.env.MONGO_URL);

        await mongoose.connect(process.env.MONGO_URL);
        console.log('✓ Connected to MongoDB');

        // Hash password
        const hashedPassword = await bcrypt.hash('password123', 10);
        console.log('✓ Password hashed:', hashedPassword);

        // Create user
        const user = await User.create({
            name: 'Test User',
            email: 'testuser@example.com',
            password: hashedPassword
        });

        console.log('✓ User created successfully!');
        console.log('User:', user);

        await mongoose.connection.close();
        console.log('✓ Connection closed');
    } catch (error) {
        console.error('✗ Error:', error.message);
        process.exit(1);
    }
};

testAddUser();
