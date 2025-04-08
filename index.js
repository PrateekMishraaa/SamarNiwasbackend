import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ContactRouter from "./routes/ContactForm.js";
import PriceRouter from "./routes/Price.js";
import Room from "./routes/Room.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Configuration
const corsOptions = {
  origin: ["http://localhost:5173", "https://samarniwasbackend-4.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // only needed if you're using cookies or auth headers
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle pre-flight requests

// ✅ Middleware
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Routes
app.use("/api/contact", ContactRouter);
app.use("/api/price", PriceRouter);
app.use("/api", Room);

app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
