
const mongoose = require('mongoose');


const costSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['food', 'health', 'housing', 'sport', 'education'],
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sum: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now, 
    }
});

const Cost = mongoose.model('Cost', costSchema);

module.exports = Cost;