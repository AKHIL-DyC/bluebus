
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {Next_AUTH_CONFIG}from "@/app/lib/auth"


secret: process.env.NEXTAUTH_SECRET;
const handler = NextAuth(Next_AUTH_CONFIG)
export { handler as GET, handler as POST };