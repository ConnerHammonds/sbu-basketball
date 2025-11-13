'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [message, setMessage] = useState('');

  const handleSync = () => {
    setMessage('Data synced successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Admin Dashboard
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Manage sections, seats, and reservations here.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Manage Sections */}
          <div className="p-6 border rounded-lg hover:shadow-lg transition bg-purple-50">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">
              Manage Sections
            </h2>
            <p className="text-gray-700 mb-4">
              View, add, or modify seating sections.
            </p>
            <button className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg">
              Go to Sections
            </button>
          </div>

          {/* Manage Seats */}
          <div className="p-6 border rounded-lg hover:shadow-lg transition bg-purple-50">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">
              Manage Seats
            </h2>
            <p className="text-gray-700 mb-4">
              Update availability or reset seat selections.
            </p>
            <button className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg">
              Go to Seats
            </button>
          </div>

          {/* Reservation Overview */}
          <div className="p-6 border rounded-lg hover:shadow-lg transition bg-purple-50">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">
              Reservation Overview
            </h2>
            <p className="text-gray-700 mb-4">
              Check recent bookings and current reserved seats.
            </p>
            <button className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg">
              View Reservations
            </button>
          </div>

          {/* Sync or Maintenance */}
          <div className="p-6 border rounded-lg hover:shadow-lg transition bg-purple-50">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">
              System Maintenance
            </h2>
            <p className="text-gray-700 mb-4">
              Perform data sync or clear temporary files.
            </p>
            <button
              onClick={handleSync}
              className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg"
            >
              Sync Data
            </button>
            {message && (
              <p className="text-green-600 font-medium mt-3">{message}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
