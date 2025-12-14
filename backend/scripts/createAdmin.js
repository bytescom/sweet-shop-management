import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/userSchema.js';

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');

        const existingAdmin = await User.findOne({ email: 'admin@sweetshop.com' });
        if (existingAdmin) {
            console.log('Admin user already exists!');
            await mongoose.connection.close();
            return;
        }

        const hashedPassword = await bcrypt.hash('admin123', 10);

        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@sweetshop.com',
            password: hashedPassword,
            role: 'admin'
        });

        console.log('✅ Admin user created successfully!');
        console.log('Email: admin@sweetshop.com');
        console.log('Password: admin123');

        await mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

createAdmin();
