import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not set in the server environment");
        }

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected successfully`);
    } catch (error) {
        console.error("DB connection error:", error.message);
        process.exit(1); 
    }
};

export default connectDB;
