import 'dotenv/config';
import mongoose from 'mongoose';
import Sweet from '../models/sweetSchema.js';

const sweets = [
    { name: "Gulab Jamun", category: "Milk", price: 25, quantity: 100 },
    { name: "Kaju Katli", category: "Dry", price: 50, quantity: 80 },
    { name: "Rasgulla", category: "Milk", price: 20, quantity: 150 },
    { name: "Jalebi", category: "Fried", price: 15, quantity: 200 },
    { name: "Barfi", category: "Milk", price: 30, quantity: 90 },
    { name: "Ladoo", category: "Dry", price: 18, quantity: 120 },
    { name: "Peda", category: "Milk", price: 22, quantity: 100 },
    { name: "Mysore Pak", category: "Ghee", price: 40, quantity: 60 },
    { name: "Soan Papdi", category: "Dry", price: 35, quantity: 70 },
    { name: "Rasmalai", category: "Milk", price: 45, quantity: 50 }
];

const seedSweets = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');

        // Clear existing sweets
        await Sweet.deleteMany({});
        console.log('Cleared existing sweets');

        // Insert new sweets
        const created = await Sweet.insertMany(sweets);
        console.log(`✅ Created ${created.length} sweets successfully!`);

        console.log('\n📦 Sweets added:');
        created.forEach((s, i) => {
            console.log(`  ${i + 1}. ${s.name} - ₹${s.price} (${s.quantity} in stock)`);
        });

        await mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

seedSweets();
