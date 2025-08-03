// types/next-auth.d.ts

import 'next-auth';
import 'next-auth/jwt';

// We are extending the built-in session and user types from NextAuth
// to include the properties we get back from our API.

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's access token from the backend. This is NOT optional. */
      accessToken: string;
      role: string; // Let's also make role non-optional for a logged-in user
    } & DefaultSession['user']; // This keeps the default properties like 'name', 'email', 'image'
  }

  // The User object is the raw object you return from your `authorize` function
  interface User {
    accessToken: string;
    role: string;
    // You can also include other properties from your API response here
    id: string;
    email: string;
    name: string;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** The user's access token */
    accessToken: string;
    role: string;
  }
}