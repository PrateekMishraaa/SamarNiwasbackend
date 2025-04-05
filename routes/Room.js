import express from "express";
const router = express.Router();
import Room from "../models/Room.js"


router.post("/rooms",async(req,res)=>{
    const {Title,Price,Description} = req.body;
        if(!Title || !Price || !Description){
            return res.status(400).json({message:"All fields are required"})
        }
        try{
                const newRoom = await Room.create({
                    Title,
                    Price,
                    Description
                })
                console.log("Room created successfully",newRoom);
                res.status(201).json({message:"Room created Successfully",newRoom});
        }catch(error){
            console.log(error);
            res.status(500).json({message:"Internal server error",error});
        }
})
router.get("/allRoom",async(req,res)=>{
    try{
            const alldata = await Room.find();
            console.log(alldata);
            res.json({message:"All Rooms",alldata});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error",error});
    }
})


export default router