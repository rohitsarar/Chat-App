import path from 'path';
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import CORS
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from './routes/user.routes.js';
import { app, server } from './socket/socket.js';

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const PORT = process.env.PORT || 5000;
const __dirname=path.resolve();

// Middleware to parse incoming JSON requests
app.use(cors({
    origin: "http://localhost:3000", // Allow this origin
    credentials: true // Allow credentials (like cookies)
}));
app.use(express.json());
app.use(cookieParser());

// Define routes for the application
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname,"/Fronted/dist")))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"Fronted","disk","index.html"))
})

// Start server and connect to MongoDB
server.listen(PORT, async () => {
    try {
        await connectToMongoDB();
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
});
