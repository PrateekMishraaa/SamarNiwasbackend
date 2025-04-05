import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Just one import is enough
const router = express.Router();

const JWTSECRET = process.env.JWTSECRET;

// ------------------- Signup Route -------------------
router.post("/signup", async (req, res) => {
    const { FirstName, LastName, Email, Mobile, Address, Password } = req.body;

    if (!FirstName || !LastName || !Email || !Mobile || !Address || !Password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
        const userExist = await User.findOne({ Email });
        if (userExist) {
            return res.status(409).json({ message: "User already exists with this email" });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const newUser = await User.create({
            FirstName,
            LastName,
            Email,
            Mobile,
            Address,
            Password: hashedPassword,
        });

        res.status(201).json({ message: "User Created Successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ------------------- Login Route -------------------
router.post("/login", async (req, res) => {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
        return res.status(400).json({ message: "All fields are mandatory" });
    }

    try {
        const isUser = await User.findOne({ Email });
        if (!isUser) {
            return res.status(404).json({ message: "Oops! User not found" });
        }

        const isMatch = await bcrypt.compare(Password, isUser.Password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: isUser._id }, "thisissecret", { expiresIn: "1h" });

        res.json({
            message: "User logged in successfully",
            token,
            user: {
                id: isUser._id,
                FirstName: isUser.FirstName,
                LastName: isUser.LastName,
                Email: isUser.Email,
                Mobile: isUser.Mobile,
                Address: isUser.Address
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }
});

export default router;
