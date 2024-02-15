import mongoose from "mongoose";

const { Schema } = mongoose;

const buildingSchema = new Schema({
  address: { type: String, required: true, unique: true },
  // The reference below will allow to link individual users to a building easily. By storing resident ObjectIds, we say "these specific users are associated with this building."
  residents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Building =
  mongoose.models.Building || mongoose.model("Building", buildingSchema);

export default Building;
