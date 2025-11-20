"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Use NextAuth credentials sign in.
    // Redirects to /admin on success (callbackUrl provided).
    // For local development set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local
    const res = await signIn("credentials", {
      redirect: true,
      email,
      password,
      callbackUrl: "/admin",
    } as any);

    // If signIn didn't redirect, show a generic error.
    if (!res) {
      setError("Sign-in failed. Check credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white/5 rounded-lg shadow-sm">
      <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded bg-white/5"
            placeholder="admin@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded bg-white/5"
            placeholder="password"
            required
          />
        </div>

        {error && <div className="text-sm text-red-400">{error}</div>}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-purple-700 text-white hover:bg-purple-800"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
