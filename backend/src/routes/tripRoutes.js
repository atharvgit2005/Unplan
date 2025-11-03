import express from "express";
import {
  createTrip,
  getAllTrips,
  getTripById,
  joinTrip,
  leaveTrip,
} from "../controllers/tripController.js"; 

const router = express.Router();

router.post('/',createTrip);
router.get("/", getAllTrips); 
router.get("/:id", getTripById);
router.put("/:id/join", joinTrip);
router.put("/:id/leave", leaveTrip); 

export default router;