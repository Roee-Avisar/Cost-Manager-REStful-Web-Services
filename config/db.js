import mongoose from 'mongoose';


/**
 * Connects to MongoDB database using environment variable MONGO_URI.
 * If the connection fails, the process will exit with error status.
 *
 * @async
 * @function connectDB
 * @throws {Error} Logs the error message and exits process on failure.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

export default connectDB;