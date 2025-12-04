'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import SeatingChart from '@/components/SeatingChart';

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isAdminMode = searchParams.get('admin') === 'true';

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {isAdminMode && (
          <div className="bg-purple-700 text-white px-4 py-2 rounded-lg mb-4 text-center font-semibold">
            🔧 Admin Mode - Click seats to change status
          </div>
        )}
        {!isAdminMode && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => router.push('/login')}
              className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Admin Login
            </button>
          </div>
        )}
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          SBU Basketball Arena
        </h1>
        <p className="text-center text-gray-600 mb-8">
          {isAdminMode ? 'Manage seat availability' : 'Select a section to view available seats'}
        </p>
        <SeatingChart isAdminMode={isAdminMode} />
      </div>
    </main>
  );
}
