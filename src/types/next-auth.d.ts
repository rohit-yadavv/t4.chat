import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      openRouterApiKey: string;
    } & DefaultSession["user"];
  }

  interface User {
    openRouterApiKey?: string;
  }
  
  interface JWT {
    id?: string;
    openRouterApiKey?: string;
  }
}