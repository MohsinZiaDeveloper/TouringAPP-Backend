import mongoose from "mongoose";

const tourScheme = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  creator: String,
  tags: [String],
  imageFile: String,
  createdAt: { type: Date, default: new Date() },
  likeCount: { type: Number, default: 0 },
});

const TourModel = mongoose.model("Tour", tourScheme);
export default TourModel;
