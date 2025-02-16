import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/usersRoutes.js";
import costRoutes from "./routes/costsRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

/**
 * @module Server
 * @description Main entry point for the Express application.
 */

/**
 * Middleware to parse incoming JSON requests.
 * @name bodyParserMiddleware
 * @memberof module:Server
 */
app.use(bodyParser.json());

/**
 * Connects to the MongoDB database using environment variables.
 * @memberof module:Server
 */
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

/**
 * Mounts user-related routes under `/api`.
 * @name userRoutes
 * @memberof module:Server
 */
app.use("/api", userRoutes);

/**
 * Mounts cost-related routes under `/api`.
 * @name costRoutes
 * @memberof module:Server
 */
app.use("/api", costRoutes);

/**
 * Starts the Express server on the specified port.
 * @name startServer
 * @memberof module:Server
 * @param {number} port - The port number on which the server runs.
 */
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
