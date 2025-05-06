import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
    try {
        const { MONGODB_URI } = process.env;
        if (!MONGODB_URI) {
            console.error("Error: Missing required environment variable (MONGODB_URI).");
            process.exit(1);
        }
        const instance=await mongoose.connect(`${MONGODB_URI}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("!!!!!! MongoDB connected successfully.-----");
        console.log("MongoDB instance:", instance.connection.host); // Log the database name
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the process on failure
    }
}

export default connectDB;