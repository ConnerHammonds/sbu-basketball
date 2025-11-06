'use client';

import SeatingChart from '@/components/SeatingChart';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          SBU Basketball Arena
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Select a section to view available seats
        </p>
        <SeatingChart />
      </div>
    </main>
  );
}
