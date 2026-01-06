'use client';

import React, { useState, useEffect } from "react";
import Button from "./Button";
import ReservationMenu from "./ReservationMenu";

interface Section {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface SectionDetailProps {
  section: Section;
  onBack: () => void;
  isAdminMode?: boolean;
  originPosition?: { x: number; y: number } | null;
}

interface Seat {
  id: number;
  row: number;
  seat: number;
  status: 'available' | 'reserved' | 'selected' | 'sold';
}

export default function SectionDetail({ section, onBack, isAdminMode = false, originPosition }: SectionDetailProps) {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadSeats = async () => {
      const res = await fetch(`/api/seats/by-section?section=${section.id}`);
      const data = await res.json();

      setSeats(
        data.seats.map((s: any) => ({
          id: s.id,
          row: s.row_number,
          seat: s.seat_number,
          status: s.status
        }))
      );
    };

    loadSeats();
  }, [section.id]);

  const handleAdminStatusChange = async (seatId: number, newStatus: string) => {
    await fetch("/api/seats/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seatId, status: newStatus }),
    });

    setSeats((prevSeats) =>
      prevSeats.map((s) =>
        s.id === seatId ? { ...s, status: newStatus as any } : s
      )
    );
  };

  const handleSeatClick = (seatId: number) => {
    const seat = seats.find((s) => s.id === seatId);
    if (!seat) return;

    if (isAdminMode) {
      // In admin mode, cycle through: available → reserved → sold → available
      const statusCycle: { [key: string]: string } = {
        'available': 'reserved',
        'reserved': 'sold',
        'sold': 'available'
      };
      const newStatus = statusCycle[seat.status] || 'available';
      handleAdminStatusChange(seatId, newStatus);
      return;
    }
    
    // Regular user mode
    if (seat.status === 'sold' || seat.status === 'reserved') return;

    const newStatus = seat.status === 'available' ? 'selected' : 'available';

    setSeats((prevSeats) =>
      prevSeats.map((s) =>
        s.id === seatId ? { ...s, status: newStatus } : s
      )
    );

    setSelectedSeats((prev) =>
      newStatus === 'selected'
        ? prev.includes(seatId) ? prev : [...prev, seatId]
        : prev.filter((id) => id !== seatId)
    );
  };

  const getSeatColor = (status: string) => {
    switch (status) {
      case 'available':
        return '#d9d9d9';
      case 'reserved':
        return '#fbbf24';
      case 'selected':
        return '#10b981';
      case 'sold':
        return '#ef4444';
      default:
        return '#d9d9d9';
    }
  };

  const handleConfirmSelection = async (userData: { name: string; email: string; phone: string }) => {
    if (selectedSeats.length === 0) return;

    // Update seats to reserved status in the database with user info
    const response = await fetch("/api/seats/reserve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        seatIds: selectedSeats,
        userData: {
          name: userData.name,
          email: userData.email,
          phone: userData.phone
        }
      }),
    });

    if (response.ok) {
      // Update local state to show seats as reserved (yellow)
      setSeats((prevSeats) =>
        prevSeats.map((s) =>
          selectedSeats.includes(s.id) ? { ...s, status: 'reserved' } : s
        )
      );

      setSelectedSeats([]);
      setIsModalOpen(false);
    } else {
      const error = await response.json();
      console.error('Reservation failed:', error);
      alert(`Reservation failed: ${error.error || 'Unknown error'}`);
    }
  };

  const isVertical = section.height > section.width;
  const rows = isVertical ? 16 : 8;
  const seatsPerRow = isVertical ? 8 : 16;

  // ----------------------------
  //           RETURN UI
  // ----------------------------
  const containerStyle = originPosition ? {
    transformOrigin: `${originPosition.x}% ${originPosition.y}%`
  } : {};

  return (
    <div className="section-detail-container bg-white rounded-lg shadow-lg p-8" style={containerStyle}>
      {/* Back Button */}
      <div className="mb-6">
        <Button
          onClick={onBack}
          variant="ghost"
          size="md"
        >
          <span className="text-lg">←</span>
          Back to Seating Chart
        </Button>
      </div>

      {/* Seating Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-b from-purple-700 to-purple-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Select Your Seats
          </h2>

          {/* Seat grid */}
          <div className="flex justify-center">
            <div className="inline-flex bg-purple-600 rounded-xl p-8 relative">
              <div className="flex flex-col gap-2">
                {Array.from({ length: rows }, (_, rowIndex) => (
                  <div key={`row-${section.id}-${rowIndex}`} className="flex items-center gap-4 relative z-0">
                    {/* Row Label */}
                    <span className="text-white font-semibold text-sm w-14 text-right flex-shrink-0">
                      Row {String.fromCharCode(65 + rowIndex)}
                    </span>
                    <div className="flex gap-2 relative">
                      {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
                        const seat = seats.find(
                        (s) => s.row === rowIndex + 1 && s.seat === seatIndex + 1
                      );
                      const isAvailable = seat?.status === 'available';
                      const textColor = isAvailable ? '#1f2937' : '#ffffff';

                      if (isAdminMode && seat) {
                        return (
                          <button
                            key={`seat-${section.id}-${rowIndex}-${seatIndex}`}
                            onClick={() => handleSeatClick(seat.id)}
                            className="w-9 h-9 flex-shrink-0 rounded-full cursor-pointer hover:scale-110 hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                            style={{
                              backgroundColor: getSeatColor(seat.status),
                            }}
                            title={`Row ${String.fromCharCode(65 + rowIndex)}, Seat ${seatIndex + 1} - Click to change status`}
                          >
                            <span className="text-[10px] font-bold leading-none" style={{ color: textColor }}>
                              {seatIndex + 1}
                            </span>
                          </button>
                        );
                      }

                      return (
                        <button
                          key={`seat-${section.id}-${rowIndex}-${seatIndex}`}
                          onClick={() => seat && handleSeatClick(seat.id)}
                          disabled={seat?.status === 'sold' || seat?.status === 'reserved'}
                          className={`w-9 h-9 flex-shrink-0 rounded-full transition-all duration-200 flex items-center justify-center ${
                            seat?.status === 'sold' || seat?.status === 'reserved'
                              ? 'cursor-not-allowed'
                              : 'cursor-pointer hover:scale-110 hover:shadow-lg'
                          }`}
                          style={{
                            backgroundColor: seat ? getSeatColor(seat.status) : '#d1d5db',
                          }}
                          title={seat ? `Row ${String.fromCharCode(65 + rowIndex)}, Seat ${seatIndex + 1}` : ''}
                        >
                          <span className="text-[10px] font-bold leading-none" style={{ color: textColor }}>
                            {seatIndex + 1}
                          </span>
                        </button>
                      );
                    })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend + Selected */}
      <div className="border-t pt-6">
        <div className="flex justify-center gap-6 mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-200 border border-gray-300"></div>
            <span className="text-sm text-gray-700 font-medium">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-yellow-400"></div>
            <span className="text-sm text-gray-700 font-medium">Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-700 font-medium">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-700 font-medium">Unavailable</span>
          </div>
        </div>

        {!isAdminMode && selectedSeats.length > 0 && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-2">
              Selected Seats ({selectedSeats.length})
            </h3>

            <div className="flex flex-col gap-2">
              {selectedSeats.map((seatId, idx) => {
                const seat = seats.find((s) => s.id === seatId);
                return (
                  <span
                    key={`${seatId}-${idx}`}
                    className="bg-purple-200 text-purple-900 px-3 py-1 rounded text-sm"
                  >
                    Row {seat && String.fromCharCode(64 + seat.row)}, Seat {seat?.seat}
                  </span>
                );
              })}
            </div>

            <Button
              onClick={() => setIsModalOpen(true)}
              disabled={selectedSeats.length === 0}
              variant="primary"
              size="lg"
              fullWidth
              className="mt-4"
            >
              ✅ Reserve Seats
            </Button>
          </div>
        )}

        {/* Reservation Menu */}
        <ReservationMenu
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedSeats={seats.filter(s => selectedSeats.includes(s.id))}
          onConfirm={handleConfirmSelection}
        />
      </div>
    </div>
  );
}
