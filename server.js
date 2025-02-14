import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/usersRoutes.js";
import costRoutes from "./routes/costsRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.use("/api", userRoutes);
app.use("/api", costRoutes);

app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
