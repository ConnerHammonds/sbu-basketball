"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full py-4 px-6 flex items-center justify-between">
      <div className="text-lg font-semibold">SBU Basketball</div>

      <nav>
        {session?.user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-200">{session.user.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-white hover:bg-white/10 transition"
            >
              Sign out
            </button>
          </div>
        ) : (
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-md hover:from-purple-700 hover:to-purple-600 transition-all ring-0 hover:ring-2 hover:ring-purple-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4"
              aria-hidden
            >
              <path
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m4-6V9a4 4 0 10-8 0v2"
              />
              <rect x={4} y={11} width={16} height={9} rx={2} strokeWidth={1.5} />
            </svg>
            <span className="text-sm font-medium">Admin Login</span>
          </Link>
        )}
      </nav>
    </header>
  );
}
