import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { cookies } from 'next/headers'
const prisma = new PrismaClient();

export const Next_AUTH_CONFIG = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password", placeholder: "Your password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
      
        const {username: email, password } = credentials;
        console.log(email,password);
        // Check for bus owner first
        const bowner = await prisma.blueBusOwner.findFirst({
          where: {
            email: email,
            password: password,
          },
        });
      console.log("b"+bowner)
        // If found, return bus owner details
        if (bowner) {
          console.log("Returning bus owner:", bowner);
          cookies().set('role', bowner.role)
          return {
            id: bowner.bid,
            email: bowner.email,
            role: bowner.role,
          };
        }
      
        // If no bus owner is found, check for regular user
        const user = await prisma.blueBusUser.findFirst({
          where: {
            gmail: email,
            password: password,
          },
        });
      console.log("u"+user)
        // If found, return user details
        if (user) {
          console.log("Returning user:", user);
          cookies().set('role', user.role)
          return {
            id: user.id,
            email: user.gmail,
            role: user.role,
          };
        }
      
        // If neither is found, return null
        console.log("No user or bus owner found for the provided credentials.");
        return null;
      }
      
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    jwt: async ({ token, user ,bowner}) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      if(bowner){
        token.id=bowner.id
        token.email=bowner.email
        token.role=bowner.role
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        id: token.id,
        email: token.email,
        role: token.role,
      };
      return session;
    },
  },
};
