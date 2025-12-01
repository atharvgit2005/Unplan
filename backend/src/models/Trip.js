import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  maxMembers: { type: Number, required: true },
  category: { type: String, enum: ['adventure', 'trekking', 'beach', 'cultural', 'spiritual', 'family', 'others'], required: true },
  image: { type: String },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;

