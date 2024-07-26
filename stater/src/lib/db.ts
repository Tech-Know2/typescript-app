import mongoose from 'mongoose';

let isConnected: boolean = false;

export default async function connection() {
    if (isConnected) {
        console.log('Already connected to MongoDB');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        isConnected = true;
        console.log('MongoDB connection successful');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}