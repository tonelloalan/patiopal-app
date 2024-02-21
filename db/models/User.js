import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    // isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true } // This will store the time and date when the data was added or updated
);

const User = models.User || mongoose.model("User", userSchema); // If you already have a the model, it will return the User, if not it will create a new model called User with the userSchema

export default User;
