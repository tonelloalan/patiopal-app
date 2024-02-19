import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { username, password } = credentials;

        try {
          await dbConnect(); // Connect to MongoDB database
          const user = await User.findOne({ username }); // Get the user with the username entered on the credentials

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          // Include specific user properties needed on the client.
          return {
            id: user._id, // Using a MongoDB _id
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          };
        } catch (error) {
          console.log("ERROR: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Json Web Token
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    signOut: "/", // Redirect to index ('/') after logout
  },
};

export default NextAuth(authOptions);

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
