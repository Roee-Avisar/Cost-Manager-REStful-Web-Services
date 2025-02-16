import express from "express";
import { addCost, getMonthlyReport } from "../controllers/costsController.js";

/**
 * @module CostsRoutes
 * @description Express router for handling cost-related operations.
 */

const router = express.Router();

/**
 * Route to add a new cost entry.
 * @name POST /api/costs/add
 * @function
 * @memberof module:CostsRoutes
 * @param {express.Request} req - Express request object containing cost details in the body.
 * @param {express.Response} res - Express response object.
 * @returns {JSON} JSON response with the created cost or an error message.
 */
router.post("/add", addCost);

/**
 * Route to fetch a user's monthly expense report.
 * @name GET /api/costs/report
 * @function
 * @memberof module:CostsRoutes
 * @param {express.Request} req - Express request object with user ID, year, and month as query parameters.
 * @param {express.Response} res - Express response object.
 * @returns {JSON} JSON response containing the user's categorized expenses for the month.
 */
router.get("/report", getMonthlyReport);

export default router;
