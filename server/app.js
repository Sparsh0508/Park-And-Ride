//import './cron/autoCancelBookings.js';
import authRouters from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

connectDB();


const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouters);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
