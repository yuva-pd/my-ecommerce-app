import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DefaultSession, DefaultUser } from "next-auth";

// Define the AccessToken interface to structure the token properties
interface AccessToken {
  accessToken: string; // The access token string
  refreshToken?: string; // Optional, the refresh token if available
  expiresAt?: number; // Optional, the expiration time for the token
}

// Augment the NextAuth types to include accessToken, user.id, and other custom properties
declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: AccessToken; // AccessToken is now part of the session
    user: {
      id: string; // Add id to the user object
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string; // Add id to the User interface
  }
}

// Define the NextAuth handler with Google provider and custom callbacks
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
        // Add access token details to the JWT token
        token.accessToken = {
          accessToken: account.access_token,
          refreshToken: account.refresh_token, // Optional, if available
          expiresAt: account.expires_at, // Optional, expiration time
        };

        // Safely handle profile.sub, ensuring it's treated as a string
        if (profile?.sub) {
          token.id = profile.sub as string;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        // Attach user ID and access token to the session
        session.user.id = token.id as string;
        session.accessToken = token.accessToken as AccessToken | undefined;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret for signing the JWT
});

// Export GET and POST to handle requests
export { handler as GET, handler as POST };
