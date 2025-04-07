import express from "express";
import Contact from "../models/ContactForm.js";
import User from "../models/User.js";

const router = express.Router();

// Route to handle contact form submission
router.post("/", async (req, res) => {
    const { FullName, Email, MobileNumber, Message } = req.body;

    if (!FullName || !Email || !MobileNumber || !Message) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const NewMessage = await Contact.create({
            FullName,
            MobileNumber,
            Email,
            Message,
        });

        console.log("New Contact Message:", NewMessage);
        res.status(201).json({ message: "Message sent successfully", NewMessage });
    } catch (error) {
        console.error("Error in contact submission:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to delete a message by ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMessage = await Contact.findByIdAndDelete(id);
        if (!deletedMessage) {
            return res.status(404).json({ message: "No message found with this ID" });
        }
        res.status(200).json({ message: "Message deleted successfully", deletedMessage });
    } catch (error) {
        console.error("Error deleting message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


export default router;
