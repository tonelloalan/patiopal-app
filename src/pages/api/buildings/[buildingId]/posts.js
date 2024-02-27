import dbConnect from "../../../../../db/connect";
import Building from "../../../../../db/models/Building";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import Post from "../../../../../db/models/Post";

export default async function handler(req, res) {
  await dbConnect();

  const session = await getServerSession(req, res, authOptions); // Authorization check, protecting the route

  console.log("SESSION IN API ROUTE BE: ", session);

  if (!session) {
    console.log("NO SESSION? THIS IS SESSION: ", session);
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { buildingId } = req.query; // Capture the buildingId from the request's query parameters.
  console.log("BUILDING ID BE: ", buildingId);

  if (req.method === "POST") {
    try {
      const { content, buildingId } = req.body;

      // ... validation ... //

      const newPost = new Post({
        content,
        building: buildingId,
        author: session.user._id,
      });
      await newPost.save();

      console.log("BUILDING ID BE (UPDATE): ", buildingId);
      console.log("BUILDING ID FILTER QUERY", buildingIdFilterQuery);

      // Update the Building
      const building = await Building.findByIdAndUpdate(
        buildingId,
        { $push: { posts: newPost._id } },
        { new: true }
      );

      // ... handle success ... //
      return res
        .status(200)
        .json({ message: "New post submitted successfully." });
    } catch (error) {
      // ... handle error ... //
    }
  } else if (req.method === "GET") {
    try {
      const building = await Post.find({ building: buildingId }).populate(
        "author"
      );
      //.populate({
      //     path: "posts", // Name of the field to populate
      //     populate: {
      //       path: "author", // Populate the 'author' field within each post
      //       select: "firstName lastName username", // Select specific fields

      //   });
      console.log("BUILDING POSTS: ", building);

      if (!building) {
        return res.status(404).json({ error: "Building not found" });
      }

      res.status(200).json(building);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching posts" });
    }
  } else {
    // Handle other methods if you plan to add more in the future
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
