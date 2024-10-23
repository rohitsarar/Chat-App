import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from './routes/user.routes.js';

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;  // Access environment variable for PORT

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cookieParser());  // Invoking cookieParser correctly

// Define routes for the application
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);  // Ensure messageRoutes is properly exported
app.use("/api/users",userRoutes);






// Start server and connect to MongoDB
app.listen(PORT, async () => {
    try {
        await connectToMongoDB();  // Make sure to connect to MongoDB
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);  // Exit process with failure if MongoDB connection fails
    }
});
