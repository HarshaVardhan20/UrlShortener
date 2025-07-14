import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  ip: String,
  user: String
});

const urlSchema = new mongoose.Schema({
  shortcode: { type: String, unique: true },
  longUrl: String,
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
  clicks: [clickSchema]
});

export default mongoose.model("Url", urlSchema);
