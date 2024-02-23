import dbConnect from "../../../db/connect";
import Building from "../../../db/models/Building";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  await dbConnect(); // Connect to DB.

  const session = await getSession({ req }); // This protects the current route, making sure only logged in users can access it.

  //   console.log("SESSION BE: ", session);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Fetch buildings where the logged in user's ID is in included in the `residents` array
    // Then populate the residents array with the first name, last name, and username of each resident within the response
    const buildings = await Building.find({
      residents: session.user._id,
    }).populate("residents", "firstName lastName username");

    // console.log("BUILDINGS BE: ", buildings);

    res.status(200).json(buildings); // Upon success, send the array of buildings as JSON.
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch buildings" }); // Generic catch block to handle unforeseen errors.
  }
}
