import express from "express";
import {
  createTrip,
  getAllTrips,
  getTripById,
  joinTrip,
  leaveTrip,
} from "../controllers/tripController.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), createTrip);
router.get("/", getAllTrips);
router.get("/:id", getTripById);
router.put("/:id/join", joinTrip);
router.put("/:id/leave", leaveTrip);

export default router;