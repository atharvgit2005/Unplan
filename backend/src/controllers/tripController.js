import Trip from '../models/Trip.js';

export const createTrip = async (req, res) => {
  try {
    const { title, destination, startDate, endDate, description, budget, maxMembers, category, createdBy } = req.body;

    let imagePath = "";
    if (req.file) {
      imagePath = req.file.path;
    }

    const trip = new Trip({
      title: title || "Untitled Trip",
      destination,
      startDate,
      endDate,
      description,
      budget,
      maxMembers,
      category,
      image: imagePath,
      createdBy
    });

    console.log("Saving trip:", trip);
    const savedTrip = await trip.save();
    console.log("Trip saved successfully:", savedTrip);

    res.status(201).json({ message: "Trip created successfully", trip: savedTrip });
  } catch (error) {
    console.error("Error creating trip:", error);
    res.status(500).json({ message: "Error creating trip", error: error.message });
  }
};

export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find().populate("createdBy", "name email");
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trips", error: error.message });
  }
};

export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id).populate("createdBy", "name email");
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trip", error: error.message });
  }
};

export const joinTrip = async (req, res) => {
  try {
    const { userId } = req.body;
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    if (trip.members.includes(userId)) {
      return res.status(400).json({ message: "User already joined" });
    }

    trip.members.push(userId);
    await trip.save();

    res.status(200).json({ message: "User joined the trip", trip });
  } catch (error) {
    res.status(500).json({ message: "Error joining trip", error: error.message });
  }
};

export const leaveTrip = async (req, res) => {
  try {
    const { userId } = req.body;
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    trip.members = trip.members.filter((member) => member.toString() !== userId);
    await trip.save();

    res.status(200).json({ message: "User left the trip", trip });
  } catch (error) {
    res.status(500).json({ message: "Error leaving trip", error: error.message });
  }
};


