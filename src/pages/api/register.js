export default async function POST(req, res) {
  try {
    // const {
    //   firstName,
    //   lastName,
    //   username,
    //   email,
    //   passwordHash,
    //   confirmPasswordHash,
    // } = await req.json();

    const {
      firstName,
      lastName,
      username,
      email,
      passwordHash,
      confirmPasswordHash,
    } = req.body;

    console.log("FIRST NAME: ", firstName);
    console.log("LAST NAME: ", lastName);
    console.log("USERNAME: ", username);
    console.log("EMAIL: ", email);
    console.log("PASSWORD: ", passwordHash);
    console.log("CONFIRM PASSWORD: ", confirmPasswordHash);

    return res.status(201).json({ status: "User created successfully." });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: e.message });
  }
}
