import mongoose from 'mongoose';
import 'dotenv/config'
export async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database is connected!");
    } catch (error) {
        console.log('Something went wrong!');
        console.error(error);
    }
}