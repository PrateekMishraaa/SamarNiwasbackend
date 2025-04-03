import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import Contact from "./routes/ContactForm.js";
import Price from "./routes/Price.js"

configDotenv();
const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:4000"], // Fixed the typo (removed extra quote)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

// Apply CORS middleware before routes
app.use(cors(corsOptions));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    // MongoDB connection options can be added here if needed
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api", Contact);
app.use("/api", Price);

app.get("/", (req, res) => {
    console.log("Hello baba");
    res.send("baba pandit");
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));