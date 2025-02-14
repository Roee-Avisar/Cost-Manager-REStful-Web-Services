import express from "express";
import { addCost, getMonthlyReport } from "../controllers/costsController.js";

const router = express.Router();

router.post("/add", addCost);
router.get("/report", getMonthlyReport);

export default router;