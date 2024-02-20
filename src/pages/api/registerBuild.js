import dbConnect from "../../../db/connect";
import Building from "../../../db/models/Building";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await dbConnect(); // db connection is essential before proceeding to POST new information to itself

      const newBuilding = new Building(req.body); // Assuming form data in req.body
      await newBuilding.save();
      // Success handling
      res.status(201).json({ message: "Building added!" });
    } catch (e) {
      console.error(e);
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
