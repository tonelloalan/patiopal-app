import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }, // Hashing functions are one-way and transform a password into an  irreversible string (the hash). You store the hash and not the original password itself. When verifying a user login, you hash the provided password and compare it to the stored hash. If they match, the password was correct.
  buildingAddress: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
