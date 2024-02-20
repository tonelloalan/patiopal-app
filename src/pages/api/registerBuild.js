import dbConnect from "../../../db/connect";
import Building from "../../../db/models/Building";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await dbConnect(); // db connection is essential before proceeding to POST new information to itself

      const newBuilding = new Building(req.body); // Assuming form data in req.body
      await newBuilding.save();
      res.status(201).json({ message: "Building added!" });
    } catch (e) {
      console.error(e);
      if (error.name === "ValidationError") {
        // Handle Mongoose validation errors
        let errors = {};
        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });
        res.status(400).json({ error: errors });
      } else {
        res.status(500).json({ error: "Server error" }); // Generic server error
      }
    }
  }
}
