import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
        const adminPasswordPlain = process.env.ADMIN_PASSWORD; // fallback for quick dev

        if (!adminEmail) return null;

        // If a hashed password is provided, verify with bcrypt
        if (adminPasswordHash) {
          const match = await bcrypt.compare(password || "", adminPasswordHash);
          if (email === adminEmail && match) {
            return { id: "1", name: "Admin", email: adminEmail, role: "admin" };
          }
          return null;
        }

        // Fallback: plaintext env var (dev only)
        if (adminPasswordPlain && email === adminEmail && password === adminPasswordPlain) {
          return { id: "1", name: "Admin", email: adminEmail, role: "admin" };
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };
