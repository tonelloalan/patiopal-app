import dbConnect from "../../../db/connect";
import User from "../../../db/models/User";
import bcrypt from "bcryptjs";

export default async function POST(req, res) {
  try {
    await dbConnect(); // db connection is essential before proceeding to POST new information to itself

    const { firstName, lastName, username, email, password, confirmPassword } =
      req.body;

    const passwordHashed = await bcrypt.hash(password, 10); // bcrypt.hash method will hash the password in 10 rounds and value will be assigned to variable passwordHashed
    const confirmPasswordHashed = await bcrypt.hash(confirmPassword, 10); // same here
    await User.create({
      firstName,
      lastName,
      username,
      email,
      password: passwordHashed,
      confirmPassword: confirmPasswordHashed,
    }); // This is the code that will store the data in the MongoDB database.

    return res.status(201).json({ status: "User created successfully." });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: e.message });
  }
}
