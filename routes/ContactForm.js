import express from 'express';
const router = express.Router();
import Contact from "../models/ContactForm.js";

// Route to handle contact form submission
router.post("/contact", async (req, res) => {
    const { FullName, Email, MobileNumber, Message } = req.body;

    if (!FullName || !Email || !MobileNumber || !Message) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const NewMessage = await Contact.create({
            FullName,
            MobileNumber,
            Email,
            Message
        });

        console.log(NewMessage); // Logs the actual saved document

        res.status(201).json({ message: "Message sent successfully", NewMessage });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to delete a message by ID
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params; // Get ID from route params
    try {
        const deletedMessage = await Contact.findByIdAndDelete(id);
        if (!deletedMessage) {
            return res.status(404).json({ message: "No message found with this ID" });
        }
        res.status(200).json({ message: "Message deleted successfully", deletedMessage });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
