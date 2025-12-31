import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
    async hashPassword(password: string) {
      return await bcrypt.hash(password, 10);
    },
    async verifyPassword({ password, hash }: { password: string; hash: string }) {
      if (!hash || !password) {
        console.log('Missing password or hash:', { password: !!password, hash: !!hash });
        return false;
      }
      try {
        return await bcrypt.compare(password, hash);
      } catch (error) {
        console.error('Bcrypt compare error:', error);
        return false;
      }
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (update session every day)
  },
});