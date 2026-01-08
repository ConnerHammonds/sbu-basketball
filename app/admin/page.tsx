'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ConfirmModal from '@/components/ConfirmModal';

export default function AdminPage() {
  const [message, setMessage] = useState('');
  const [isClearing, setIsClearing] = useState(false);
  const [showFirstConfirm, setShowFirstConfirm] = useState(false);
  const [showSecondConfirm, setShowSecondConfirm] = useState(false);
  const router = useRouter();

  const handleClearSeating = async () => {
    setIsClearing(true);
    setMessage('');
    setShowSecondConfirm(false);

    try {
      const res = await fetch('/api/admin/clear-seating', {
        method: 'POST',
      });

      if (!res.ok) {
        throw new Error('Failed to clear seating chart');
      }

      setMessage('Seating chart cleared successfully!');
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      setMessage('Error: Failed to clear seating chart');
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setIsClearing(false);
    }
  };

  const handleFirstConfirm = () => {
    setShowFirstConfirm(false);
    setShowSecondConfirm(true);
  };

  const handleManageSeats = () => {
    router.push('/?admin=true');
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <ConfirmModal
        isOpen={showFirstConfirm}
        onClose={() => setShowFirstConfirm(false)}
        onConfirm={handleFirstConfirm}
        title="Clear Seating Chart?"
        message={`Are you sure you want to clear the entire seating chart?\n\nThis will:\n- Reset all seat reservations\n- Set all seats to available\n- Delete all customer reservation data\n\nThis action CANNOT be undone!`}
        confirmText="Yes, Continue"
        cancelText="Cancel"
        isDestructive={true}
      />

      <ConfirmModal
        isOpen={showSecondConfirm}
        onClose={() => setShowSecondConfirm(false)}
        onConfirm={handleClearSeating}
        title="FINAL WARNING"
        message={`This will permanently delete all seating data.\n\nAre you absolutely sure you want to proceed?`}
        confirmText="Clear All Data"
        cancelText="Cancel"
        isDestructive={true}
      />

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Admin Dashboard
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Manage sections, seats, and reservations here.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Manage Admin Accounts */}
          <div className="p-6 border rounded-lg hover:shadow-lg transition bg-purple-50">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">
              Manage Admin Accounts
            </h2>
            <p className="text-gray-700 mb-4">
              View, add, or modify admin email accounts.
            </p>
            <button
              onClick={() => router.push('/admin/manage-admins')}
              className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg"
            >
              Go to Admin Accounts
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
            <button
              onClick={handleManageSeats}
              className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg"
            >
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
            <button
              onClick={() => router.push('/admin/reservations')}
              className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg"
            >
              View Reservations
            </button>
          </div>

          {/* Clear Seating Chart */}
          <div className="p-6 border rounded-lg hover:shadow-lg transition bg-red-50">
            <h2 className="text-xl font-semibold text-red-700 mb-2">
              Clear Seating Chart
            </h2>
            <p className="text-gray-700 mb-4">
              Reset all seats and delete all reservation data.
            </p>
            <button
              onClick={() => setShowFirstConfirm(true)}
              disabled={isClearing}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isClearing ? 'Clearing...' : 'Clear All Data'}
            </button>
            {message && (
              <p className={`font-medium mt-3 ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
