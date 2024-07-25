import { Schema, model, connect } from 'mongoose';

const mongoose = require('mongoose');

export default async function connection() {
    try {
        // Attempt to connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI as string);

        // Log a success message if the connection is successful
        console.log('MongoDB connection successful');
    } catch (error) {
        // Log an error message if the connection fails
        console.error('MongoDB connection error:', error);
    }
}