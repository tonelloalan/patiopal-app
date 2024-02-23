import dbConnect from "../../../../db/connect";
import Building from "../../../../db/models/Building";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  await dbConnect();
  const { buildingId } = req.query;

  const session = await getServerSession(req, res, authOptions); // Add authorization check

  console.log("SESSION BE: ", session);

  if (req.method === "GET") {
    try {
      const building = await Building.findById(buildingId);
      if (!building) {
        return res.status(404).json({ error: "Building not found" });
      }
      res.status(200).json(building);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch building" });
    }
  } else if (req.method === "PUT") {
    // Authorization (Make sure the user is authorized to update buildings)
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Find the building first
    const building = await Building.findById(buildingId);
    if (!building) {
      return res.status(404).json({ error: "Building not found" });
    }

    // Check if the user is in the building's isAdmin array
    const userIsAdmin = building.isAdmin.some((adminId) =>
      adminId.equals(session.user._id)
    );

    if (!userIsAdmin) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const updatedBuilding = await Building.findByIdAndUpdate(
        buildingId,
        req.body, // Receive the updated building data
        { new: true, runValidators: true } // Return the updated document, run schema validation
      );

      if (!updatedBuilding) {
        return res.status(404).json({ error: "Building not found" });
      }
      res.status(200).json(updatedBuilding);
    } catch (error) {
      if (error.name === "ValidationError") {
        // Handle Mongoose validation errors
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to update building" });
      }
    }
  } else if (req.method === "DELETE") {
    // Authorization (Make sure the user is authorized to delete )
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const building = await Building.findById(buildingId);
    if (!building) {
      return res.status(404).json({ error: "Building not found" });
    }

    const userIsAdmin = building.isAdmin.some((adminId) =>
      adminId.equals(session.user._id)
    );

    if (!userIsAdmin) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      await Building.findByIdAndDelete(buildingId);

      res.status(200).json({ message: "Building deleted" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete building" });
    }
  } else {
    // Handle other methods if needed in the future
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
