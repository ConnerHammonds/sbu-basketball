'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import ConfirmModal from '@/components/ConfirmModal';

interface Reservation {
  id: string;
  status: string;
  reservedAt: string;
  expiresAt: string | null;
  cancelledAt: string | null;
  customer: {
    name: string | null;
    email: string;
    phone: string | null;
  };
  seat: {
    id: number;
    rowNumber: number;
    seatNumber: number;
    section: {
      id: string;
      name: string;
    };
  };
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/reservations');
      
      if (!res.ok) {
        throw new Error('Failed to fetch reservations');
      }
      
      const data = await res.json();
      setReservations(data.reservations || []);
      setError('');
    } catch (err) {
      setError('Failed to load reservations');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reserved':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteClick = (reservationId: string) => {
    setReservationToDelete(reservationId);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!reservationToDelete) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/reservations/${reservationToDelete}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete reservation');
      }

      // Refresh the reservations list
      await fetchReservations();
      setDeleteModalOpen(false);
      setReservationToDelete(null);
    } catch (err) {
      setError('Failed to delete reservation');
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setReservationToDelete(null);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Button
            onClick={() => router.push('/admin')}
            variant="primary"
            size="xl"
          >
            ← Back to Dashboard
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Reservation Overview
          </h1>
          
          <p className="text-center text-gray-600 mb-8">
            View all customer reservations and booking details
          </p>

          {error && (
            <div className="bg-red-500 text-white px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-12 text-gray-600">
              Loading reservations...
            </div>
          ) : reservations.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              No reservations found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Seat Info</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Reserved At</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr
                      key={reservation.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-800">
                          {reservation.customer.name || 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {reservation.customer.email}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {reservation.customer.phone || 'N/A'}
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-gray-800">
                          <span className="font-medium">{reservation.seat.section.name}</span>
                          <br />
                          <span className="text-sm text-gray-600">
                            Row {reservation.seat.rowNumber}, Seat {reservation.seat.seatNumber}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">
                        {formatDateTime(reservation.reservedAt)}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            reservation.status
                          )}`}
                        >
                          {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleDeleteClick(reservation.id)}
                          className="bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1 rounded-full font-medium text-sm transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

        <ConfirmModal
          isOpen={deleteModalOpen}
          title="Delete Reservation"
          message="Are you sure you want to delete this reservation? The seat will become available again."
          confirmText={isDeleting ? "Deleting..." : "Delete"}
          cancelText="Cancel"
          onConfirm={handleDeleteConfirm}
          onClose={handleDeleteCancel}
          isDestructive={true}
        />
            </div>
          )}

          <div className="mt-6 text-center text-gray-600">
            <p className="text-sm">
              Total Reservations: <span className="font-semibold">{reservations.length}</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
