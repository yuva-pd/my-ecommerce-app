import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DefaultSession, DefaultUser } from "next-auth";

// Define the AccessToken interface to represent the token structure
interface AccessToken {
  accessToken: string; // The access token string
  refreshToken?: string; // Optionally, the refresh token if available
  expiresAt?: number; // Optionally, expiration time for the token
}

// Augment the NextAuth types to include accessToken, user.id, and other custom properties
declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: AccessToken; // Use the AccessToken interface in the session
    user: {
      id: string; // Add id to the user object
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string; // Add id to the User interface
  }
}

// Define the NextAuth handler directly
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        // Add the access token details to the JWT token
        token.accessToken = {
          accessToken: account.access_token, // The actual access token
          refreshToken: account.refresh_token, // Optional, if available
          expiresAt: account.expires_at, // Optional, expiration time
        };
        // Safely handle profile.sub, ensuring it is treated as a string
        if (profile?.sub) {
          token.id = profile.sub as string;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // Ensure id is correctly set
        // Ensure session.accessToken is of type AccessToken
        session.accessToken = token.accessToken as AccessToken | undefined;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

// Export GET and POST to handle requests
export { handler as GET, handler as POST };
