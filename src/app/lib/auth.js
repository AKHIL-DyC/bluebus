import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();
export const Next_AUTH_CONFIG={
    
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
  
          const { username,id, email, password} = credentials;
  
          const user = await prisma.blueBusUser.findFirst({
            where: {
              gmail: email,
              password: password,
            },
          });
  
          if (!user) {
            return null;
          }
  
          return {
            id: user.id,
            email: user.gmail,
            role:user.role
          };
        },
      }),
    ],
    
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
      jwt: async ({ user, token }) => {
      if (user) {
          token.uid = user.id;
      }
      return token;
      },
    session: ({ session, token, user }) => {
        if (session.user) {
            session.user.id = token.uid
        }
        return session
    }
  }
  };
  
