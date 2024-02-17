import dbConnect from "../../../db/connect";
import User from "../../../db/models/User";

export default async function POST(req, res) {
  try {
    await dbConnect();
    const { username } = await req.body;
    const userId = await User.findOne({ username }).select("_id");

    console.log("USER ID: ", userId);

    return res.json({ userId });
  } catch (error) {
    console.error("ERROR: ", error);
  }
}
