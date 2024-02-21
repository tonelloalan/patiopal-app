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

          // If login is successful, include specific user properties needed on the client.
          return {
            // ...profile,
            id: user._id, // Using a MongoDB _id
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            session: {
              userId: user.id, // Or whichever property uniquely identifies the user.
            },
          };
        } catch (error) {
          console.log("ERROR: ", error);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const user = await User.findOne({ email: session.user.email }); // Get the user with the email

      session.user.lastName = `${user.lastName}`;
      session.user.firstName = `${user.firstName}`;
      session.user.username = `${user.username}`;
      session.user._id = `${user._id}`;

      return {
        ...session,
      };
    },
  },
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
