'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/sign-in/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
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
    <main className="min-h-screen p-8" style={{ backgroundColor: '#e5e7eb' }}>
      <div className="mb-4">
        <Button
          onClick={() => router.push('/')}
          variant="primary"
          size="xl"
        >
          ← Back to Seating
        </Button>
      </div>
      
      <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 120px)' }}>
        <div className="w-[450px] h-[400px] bg-[#492779] shadow-lg p-8 flex flex-col" style={{ borderRadius: '12px' }}>
          <h1 className="text-3xl font-bold text-center mb-6 font-quantico" style={{ color: 'white' }}>
            Admin Login
          </h1>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col font-quantico">
            <div className="mb-8">
              <label htmlFor="email" className="block text-sm font-medium mb-2 w-[70%] mx-auto" style={{ color: 'white' }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[70%] mx-auto block px-4 border-none focus:ring-2 focus:ring-white focus:outline-none text-gray-800 font-quantico"
                style={{ paddingTop: '10px', paddingBottom: '10px', borderRadius: '8px', fontSize: '16px', backgroundColor: 'white' }}
                placeholder="admin@example.com"
                required
              />
            </div>

            <div className="mb-8">
              <label htmlFor="password" className="block text-sm font-medium mb-2 w-[70%] mx-auto" style={{ color: 'white' }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[70%] mx-auto block px-4 border-none focus:ring-2 focus:ring-white focus:outline-none text-gray-800 font-quantico"
                style={{ paddingTop: '10px', paddingBottom: '10px', borderRadius: '8px', fontSize: '16px', backgroundColor: 'white' }}
                placeholder="Password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500 text-white px-4 py-2 rounded-lg text-center text-sm font-quantico mb-8">
                {error}
              </div>
            )}

            <div className="flex justify-center" style={{ marginTop: '28px', marginBottom: '28px' }}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-[30%]"
                style={{ 
                  paddingTop: '12px', 
                  paddingBottom: '12px',
                  backgroundColor: 'white',
                  color: 'black',
                  borderColor: '#d1d5db',
                  height: '35px',
                  fontSize: '16px',
                  whiteSpace: 'nowrap'
                }}
              >
                Sign In
              </Button>
            </div>

            <div className="flex-1"></div>
          </form>
        </div>
      </div>
    </main>
  );
}
