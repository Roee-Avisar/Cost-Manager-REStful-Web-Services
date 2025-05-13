import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/usersRoutes.js";
import costRoutes from "./routes/costsRoutes.js";
import connectDB from "./config/db.js";


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
connectDB();

app.use("/api", userRoutes);
app.use("/api", costRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
