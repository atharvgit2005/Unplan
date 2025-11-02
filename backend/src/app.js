import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import tripRoutes from "./routes/tripRoutes.js";

dotenv.config();
const app = express();
connectDB();
app.use(express.json());
app.use("/api/trips", tripRoutes);
app.get("/", (req, res) => {
  res.send("app running");
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
