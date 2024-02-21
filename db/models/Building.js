import mongoose from "mongoose";

const { Schema } = mongoose;

const buildingSchema = new Schema({
  streetName: { type: String, required: [true, "Street name is required"] },
  streetNumber: { type: String, required: [true, "Street number is required"] },
  zipcode: { type: String, required: [true, "Zipcode is required"] },
  city: { type: String, required: [true, "City is required"] },
  country: { type: String, required: [true, "Country is required"] },
  residents: [{ type: Schema.Types.ObjectId, ref: "User" }],
  isAdmin: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

// Create a unique compound index to prevent duplicate buildings
buildingSchema.index(
  { streetName: 1, streetNumber: 1, zipcode: 1, city: 1, country: 1 },
  { unique: true }
);

const Building =
  mongoose.models.Building || mongoose.model("Building", buildingSchema);

export default Building;
