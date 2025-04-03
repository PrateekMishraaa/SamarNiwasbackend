import express from "express";
const router = express.Router();
import Prices from "../models/Prices.js";

// Create a Price
router.post("/price", async (req, res) => {
    try {
        const { Title, Description, Price } = req.body;

        if (!Title || !Description || !Price) {
            return res.status(400).json({ message: "All fields must be provided" });
        }

        const data = await Prices.create({ Title, Description, Price });

        console.log("New Price Created:", data);
        res.status(201).json({ message: "Your data has been created", data });

    } catch (error) {
        console.error("Error creating price:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Get All Prices
router.get("/all-prices", async (req, res) => {
    try {
        const prices = await Prices.find();

        if (prices.length === 0) {
            return res.status(404).json({ message: "No prices found" });
        }

        console.log("All Prices Fetched:", prices);
        res.status(200).json({ message: "All prices fetched successfully", data: prices });

    } catch (error) {
        console.error("Error fetching prices:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

export default router;
