import dbConnect from "../../../../db/connect";
import Building from "../../../../db/models/Building";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  await dbConnect();
  const { buildingId } = req.query;

  console.log("BUILDING ID BE: ", buildingId);

  try {
    const building = await Building.findById(buildingId);
    if (!building) {
      return res.status(404).json({ error: "Building not found" });
    }
    res.status(200).json(building);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch building" });
  }
}
