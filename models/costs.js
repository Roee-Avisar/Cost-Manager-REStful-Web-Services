import mongoose from "mongoose";

/**
 * Mongoose schema for storing cost/expense details.
 * 
 * @typedef {Object} Cost
 * @property {string} description - A short description of the cost.
 * @property {string} category - The category of the cost. Must be one of: 'food', 'health', 'housing', 'sport', 'education'.
 * @property {string} userid - The ID of the user associated with the cost.
 * @property {number} sum - The total amount spent.
 * @property {Date} createdAt - Timestamp indicating when the cost was created.
 * @property {Date} updatedAt - Timestamp indicating when the cost was last updated.
 */
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

/**
 * Mongoose model for the Cost schema.
 * @type {mongoose.Model<Cost>}
 */
const Cost = mongoose.model("Cost", costSchema);

export default Cost;
