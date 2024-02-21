import dbConnect from "../../../db/connect";
import Building from "../../../db/models/Building";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import User from "../../../db/models/User";

export default async function handler(req, res) {
  await dbConnect(); // Establish database connection

  const session = await getServerSession(req, res, authOptions);

  const userId = session.user._id;
  const buildingId = req.query.buildingId;

  if (req.method === "POST") {
    try {
      await dbConnect(); // DB connection is essential before proceeding to POST new information to itself

      const newBuilding = new Building(req.body); // Assuming form data in req.body, this gather the information about the new building

      // Add User as Resident and Admin:
      const user = await User.findById(userId); // Finds the logged in user
      newBuilding.residents.push(user._id); // Pushes the logged in user's ID to the new Building's resident's array
      newBuilding.isAdmin.push(user._id); // Pushes the logged in user's ID to the new Building's resident's array
      // newBuilding.isAdmin = true; // Adds the Admin status to the Building's first resident
      await newBuilding.save(); // Saves the new Building to the DB
      res.status(201).json({ message: "Building added!" }); // Success handling
    } catch (e) {
      console.error("getSession ERROR:", e); // Log #3
      if (e.name === "ValidationError") {
        // Handle Mongoose validation errors
        let errors = {};
        Object.keys(e.errors).forEach((key) => {
          errors[key] = e.errors[key].message;
        });
        res.status(400).json({ error: errors });
      } else if (e.code === 11000) {
        // MongoDB duplicate key error code
        res
          .status(400)
          .json({ error: "A building with this address already exists" });
      } else {
        res.status(500).json({ error: "Server error" }); // Generic server error
      }
    }
  }
}
