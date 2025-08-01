// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    // Add the GoogleProvider, pulling credentials from your .env.local file
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // Your existing Credentials (email/password) Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // This is where you call your own sign-in API
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const res = await fetch("https://akil-backend.onrender.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!res.ok) {
            // You can throw an error here to be caught by the signIn function
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to login");
        }

        const user = await res.json();

        // The returned object will be embedded in the JWT.
        // We are returning the full user object which includes the token.
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  
  // Custom pages for signin
  pages: {
    signIn: '/auth/login',
  },

  // Callbacks are used to control what happens to the JWT and session
  callbacks: {
    // This callback is called whenever a JWT is created or updated.
    async jwt({ token, user, account }) {
      // The `user` object is the one returned from the `authorize` callback or Google.
      // The `account` object is available on the first sign-in, especially from OAuth providers.
      if (user) {
        // For credentials login, your API returns these properties
        token.accessToken = user.accessToken;
        token.role = user.role;
        // For Google login, you might handle it differently, e.g., call your backend to create a user
        // For now, we'll just pass the default info
      }
      return token;
    },
    // This callback is called whenever a session is accessed.
    async session({ session, token }) {
      // We are adding the custom properties from the `token` to the `session.user` object
      // so it's accessible on the client-side.
      if (session.user && token) {
        session.user.accessToken = token.accessToken;
        session.user.role = token.role;
      }
      return session;
    },
  },
  
  session: {
      strategy: "jwt", // Use JSON Web Tokens for session management
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret for signing the JWT
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };