import NextAuth from "next-auth";
import type { JWT } from "next-auth/jwt";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken?: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken?: string;
  }
}
