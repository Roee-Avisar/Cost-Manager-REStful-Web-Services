import User from "../models/user.js";
import Cost from "../models/costs.js";

/**
 * Adds a new user to the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const addUser = async (req, res) => {
    try {
        const { id, first_name, last_name, birthday, marital_status } = req.body;

        if (!id || !first_name || !last_name || !birthday || !marital_status) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const existingUser = await User.findOne({ id });
        if (existingUser) {
            return res.status(400).json({ error: `User with ID ${id} already exists` });
        }

        const newUser = new User({ id, first_name, last_name, birthday, marital_status });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Server error" });
    }
};

/**
 * Fetches details of a specific user along with their total costs.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const getUserDetails = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const costs = await Cost.find({ userid: req.params.id });
        const totalCosts = costs.reduce((sum, cost) => sum + cost.sum, 0);

        res.json({ id: user.id, first_name: user.first_name, last_name: user.last_name, total: totalCosts });
    } catch (error) {
        console.error("Error in getUserDetails:", error);
        res.status(500).json({ error: "Server error" });
    }
};

/**
 * Fetches only the first name and last name of all users.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { first_name: 1, last_name: 1, _id: 0 });

        if (!users || users.length === 0) {
            return res.status(404).json({ error: "No users found" });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error("Error in getAllUsers:", error);
        res.status(500).json({ error: "Server error" });
    }
};

/**
 * Fetches only the developers (team members).
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const getDevelopers = async (req, res) => {
    try {
        const developers = await User.find(
            {
                $or: [
                    { first_name: "Roee", last_name: "Avisar" },
                    { first_name: "Daniel", last_name: "Bar Natan" }
                ]
            },
            { first_name: 1, last_name: 1, _id: 0 }
        );

        if (!developers || developers.length === 0) {
            return res.status(404).json({ error: "No developers found" });
        }

        res.status(200).json(developers);
    } catch (error) {
        console.error("Error in getDevelopers:", error);
        res.status(500).json({ error: "Server error" });
    }
};
