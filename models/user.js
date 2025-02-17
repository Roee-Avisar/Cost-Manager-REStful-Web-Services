import mongoose from "mongoose";

/**
 * @module UserModel
 * @description Mongoose schema and model for storing user details.
 */

/**
 * Represents a user in the system.
 * @typedef {Object} User
 * @property {string} id - A unique identifier for the user.
 * @property {string} first_name - The first name of the user.
 * @property {string} last_name - The last name of the user.
 * @property {Date} birthday - The user's birth date.
 * @property {"Single" | "Married" | "Divorced" | "Widowed"} marital_status - The user's marital status.
 */

/**
 * Mongoose schema for user data.
 * @const {mongoose.Schema<User>}
 */
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

/**
 * Mongoose model for interacting with the `users` collection.
 * @const {mongoose.Model<User>}
 */
const User = mongoose.model("User", userSchema);

export default User;
