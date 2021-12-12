import mongoose from "mongoose";

const CoachSchema = new mongoose.Schema({
  cNum: {
    type: String,
    required: true,
    unique: true,
  },
  cType: {
    type: String,
    required: true,
  },
  cState: {
    type: String,
    required: true,
  },
});

export default mongoose.models.CoachState ||
  mongoose.model("CoachState", CoachSchema);
