import express from 'express';
import Feedback from '../models/feedback.model.js';  

const router = express.Router();

router.post('/feedback',async (req,res) =>{
    const {email, feedback} = req.body;
    if (!email || !feedback){
        return res.status(400).json({success:false, message: 'Please provide all fields'});
    }
    const newFeedback = new Feedback({email,feedback});
 
    try {
        await newFeedback.save();
        res.status(201).json({success: true, data: newFeedback, message: "Feedback Sent"});
    } catch(error) {
        if (error.code == 11000){
            res.status(409).json({success: false, message: "Feedback already sent"});
            return;
        };
        console.log("Error in saving feedback: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    
    }


});

export default router;
