'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Redirect to admin seating chart
        router.push('/?admin=true');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#492779' }}>
      <div className="w-full max-w-xs">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-6 py-4 border-none rounded-lg focus:ring-2 focus:ring-white focus:outline-none text-gray-800"
              placeholder="Username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 border-none rounded-lg focus:ring-2 focus:ring-white focus:outline-none text-gray-800"
              placeholder="Password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500 text-white px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="outline"
            size="lg"
            fullWidth
            isLoading={isLoading}
            className="!text-white !border-white hover:!bg-white/20 focus:!ring-white"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Button
            onClick={() => router.push('/')}
            variant="ghost"
            className="!text-white hover:!bg-white/10"
          >
            ← Back to Seating Chart
          </Button>
        </div>
      </div>
    </main>
  );
}
