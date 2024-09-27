import {  TMetaErrorResponse, VSLogin } from "@/entities";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PostLogin } from "@/app/(auth)/auth/login/_modules/login-api";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../prisma-client";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "Email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password) {
            throw new Error("Email dan Password cannot be empty");
          }
          const validatedFields = VSLogin.safeParse(credentials);

          if (validatedFields.success) {
            const { email, password } = validatedFields.data;
            const user = await PostLogin({
              email,
              password,
            });
            console.log(user);
            return user;
          }

          return null;

        } catch (err) {

          const error = err as TMetaErrorResponse;

          throw new Error(
            typeof error?.response?.data === "string"
              ? error?.response?.data
              : error?.response?.data?.message
          );
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async jwt({ token,account,profile, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.user = user as any;
      }
      return { ...token, ...user };
    },

    async session({ session, token }) {
      console.log("Session Token:", token.accessToken);
      session.user = token as any;
      return session;
    },
  },
};
