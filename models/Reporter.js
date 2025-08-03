import mongoose from "mongoose";

const ReporterSchema = new mongoose.Schema(
  {
    name: String,
    area: String,
    contact: String,
    photo: String,
  },
  { timestamps: true }
);

export default mongoose.models.Reporter || mongoose.model("Reporter", ReporterSchema);
