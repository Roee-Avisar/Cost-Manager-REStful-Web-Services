import express from "express";
import { getUserDetails, getAllUsers, addUser, getDevelopers } from "../controllers/usersController.js";

const router = express.Router();

router.get("/users/:id", getUserDetails);
router.get("/about", getDevelopers);
router.post("/users", addUser);
router.get("/users", getAllUsers);

export default router;
