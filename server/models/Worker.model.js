import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
  userId: { 
    type: String,          // 🔥 Firebase UID
    required: true,
    unique: true
  },
  skills: [{ type: String }],
  pricePerHour: { type: Number },
  bio: { type: String },
  isVerified: { type: Boolean, default: false },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' }
  }
}, { timestamps: true });

workerSchema.index({ location: '2dsphere' });

export default mongoose.model('Worker', workerSchema);
