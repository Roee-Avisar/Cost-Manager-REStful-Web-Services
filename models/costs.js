import mongoose from "mongoose";

const costSchema = new mongoose.Schema({
    description: { type: String, required: true },
    category: { 
        type: String, 
        enum: ['food', 'health', 'housing', 'sport', 'education'], 
        required: true, 
        lowercase: true 
    },
    userid: { type: String, required: true },
    sum: { type: Number, required: true },
}, { timestamps: true });

const Cost = mongoose.model("Cost", costSchema);
export default Cost;