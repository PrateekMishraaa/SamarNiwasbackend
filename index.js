import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import Contact from "./routes/ContactForm.js";

configDotenv();
const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
    origin: ["https://samar-niwas.netlify.app'", "http://localhost:4000"], // Allowed origins as an array
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

// Apply CORS middleware before routes
app.use(cors(corsOptions));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api", Contact);

app.get("/", (req, res) => {
    console.log("Hello baba");
    res.send("baba pandit");
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
