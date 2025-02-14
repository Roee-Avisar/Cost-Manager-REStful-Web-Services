import mongoose from "mongoose";

const costSchema = new mongoose.Schema({
    description: { type: String, required: true },
    category: { 
        type: String, 
        enum: ['food', 'health', 'housing', 'sports', 'education', 'other'], 
        required: true, 
        lowercase: true 
    },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sum: { type: Number, required: true },
}, { timestamps: true });

const Cost = mongoose.model("Cost", costSchema);
export default Cost;
