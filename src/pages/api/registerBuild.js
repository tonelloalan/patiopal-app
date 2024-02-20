import Building from "../../../db/models/Building";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const newBuilding = new Building(req.body); // Assuming form data in req.body
      await newBuilding.save();
      res.status(201).json({ message: "Building added!" });
    } catch (error) {
      // Handle duplicate entry errors or other validation issues
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
