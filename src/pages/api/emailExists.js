import dbConnect from "../../../db/connect";
import User from "../../../db/models/User";

export default async function POST(req, res) {
  try {
    await dbConnect();
    const { email } = await req.body;
    const emailId = await User.findOne({ email }).select("_id");

    console.log("USER ID: ", emailId);

    return res.json({ emailId });
  } catch (error) {
    console.error("ERROR: ", error);
  }
}
