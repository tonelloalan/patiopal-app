import dbConnect from "../../../../db/connect";
import Building from "../../../../db/models/Building";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import User from "../../../../db/models/User";

export default async function handler(req, res) {
  await dbConnect();
  const { buildingId } = req.query;

  const session = await getServerSession(req, res, authOptions); // Add authorization check

  if (req.method === "GET") {
    try {
      const building = await Building.findById(buildingId).populate(
        "residents"
      );
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
    if (req.body && req.body.residentId) {
      // Resident deletion

      if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const { residentId } = req.body;

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
        building.residents.pull(residentId);
        await building.save();

        // Optional: Re-populate residents if needed
        const updatedResidentList = await building.populate("residents");

        res.status(200).json(updatedResidentList);
      } catch (error) {
        res.status(500).json({ error: "Failed to remove resident" });
      }
    } else {
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
    }
  } else if (req.method === "POST") {
    if (req.body.action === "searchUser") {
      // Check for specific action
      try {
        const searchTerm = req.body.searchTerm;
        const users = await User.find({
          username: { $regex: searchTerm, $options: "i" },
        }); // Case-insensitive search

        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: "Failed to search users" });
      }
    } else if (req.body.action === "addUser") {
      const searchTerm = req.body.searchTerm; // Get searchTerm
      // const { userId } = req.body;

      try {
        // 1. Find user by search term
        const user = await User.findOne({ username: searchTerm });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        // 2. Check if user is already a resident
        const building = await Building.findById(buildingId); // Need the Building document

        const isResident = building.residents.some((residentId) =>
          residentId.equals(user._id)
        );
        if (isResident) {
          return res
            .status(400)
            .json({ error: "This person is already a resident here" });
        }

        // 3. Add the user to residents
        building.residents.push(user._id);
        await building.save(); // Save the updated building

        // Re-populate the residents!!!
        const updatedResidentList = await building.populate("residents");

        console.log("Building before response:", updatedResidentList);

        res.status(200).json(updatedResidentList);
      } catch (error) {
        res.status(500).json({ error: "Failed to add user to building" });
      }
    } else {
      // Handle other actions if needed
    }
  } else {
    // Handle other methods if needed in the future
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
