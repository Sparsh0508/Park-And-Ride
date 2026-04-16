// import "./corn/autoCancelBookings.js";
import authRouters from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouters);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
