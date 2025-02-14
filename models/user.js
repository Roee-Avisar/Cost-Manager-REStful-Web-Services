import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birthday: { type: Date, required: true },
    marital_status: {
        type: String,
        enum: ["Single", "Married", "Divorced", "Widowed"],
        required: true,
    }
});

const User = mongoose.model("User", userSchema);
export default User;
