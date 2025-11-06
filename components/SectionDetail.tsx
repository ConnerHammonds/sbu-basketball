'use client';

import { useState } from 'react';

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
}

interface Seat {
  id: string;
  row: number;
  seat: number;
  status: 'available' | 'reserved' | 'selected' | 'sold';
}

export default function SectionDetail({ section, onBack }: SectionDetailProps) {
  // Generate seats for the section
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const rows = section.height > section.width ? 12 : 8;
    const seatsPerRow = section.height > section.width ? 8 : 12;
    
    for (let row = 1; row <= rows; row++) {
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const rand = Math.random();
        let status: 'available' | 'reserved' | 'selected' | 'sold';
        if (rand > 0.85) {
          status = 'sold'; // unavailable
        } else if (rand > 0.7) {
          status = 'reserved';
        } else {
          status = 'available';
        }
        seats.push({
          id: `${section.id}-R${row}-S${seat}`,
          row,
          seat,
          status,
        });
      }
    }
    return seats;
  };

  const [seats, setSeats] = useState<Seat[]>(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find((s) => s.id === seatId);
    if (!seat || seat.status === 'sold' || seat.status === 'reserved') return;

    setSeats((prevSeats) =>
      prevSeats.map((s) => {
        if (s.id === seatId) {
          const newStatus = s.status === 'available' ? 'selected' : 'available';
          if (newStatus === 'selected') {
            setSelectedSeats((prev) => [...prev, seatId]);
          } else {
            setSelectedSeats((prev) => prev.filter((id) => id !== seatId));
          }
          return { ...s, status: newStatus };
        }
        return s;
      })
    );
  };

  const getSeatColor = (status: string) => {
    switch (status) {
      case 'available':
        return '#d9d9d9'; // light gray/white
      case 'reserved':
        return '#fbbf24'; // yellow
      case 'selected':
        return '#10b981'; // green
      case 'sold':
        return '#ef4444'; // red
      default:
        return '#d9d9d9'; // light gray/white
    }
  };

  const rows = section.height > section.width ? 12 : 8;
  const seatsPerRow = section.height > section.width ? 8 : 12;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-purple-700 hover:text-purple-900 font-semibold transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Seating Chart
        </button>
      </div>

      <div className="mb-8">
        {/* Purple seating area container */}
        <div className="bg-gradient-to-b from-purple-700 to-purple-800 rounded-2xl p-8 shadow-2xl">
          {/* Title */}
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Select Your Seats
          </h2>

          {/* Seating grid */}
          <div className="flex justify-center">
            <div className="inline-block bg-purple-600 rounded-xl p-6">
              {Array.from({ length: rows }, (_, rowIndex) => (
                <div key={rowIndex} className="flex items-center gap-1 mb-1">
                  <div className="flex gap-1">
                    {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
                      const seat = seats.find(
                        (s) => s.row === rowIndex + 1 && s.seat === seatIndex + 1
                      );
                      const isAvailable = seat?.status === 'available';
                      const textColor = isAvailable ? '#1f2937' : '#ffffff';
                      
                      return (
                        <button
                          key={seatIndex}
                          onClick={() => seat && handleSeatClick(seat.id)}
                          disabled={seat?.status === 'sold' || seat?.status === 'reserved'}
                          className={`w-7 h-7 rounded transition-all duration-200 ${
                            seat?.status === 'sold' || seat?.status === 'reserved'
                              ? 'cursor-not-allowed'
                              : 'cursor-pointer hover:scale-110 hover:shadow-lg'
                          }`}
                          style={{
                            backgroundColor: seat ? getSeatColor(seat.status) : '#d1d5db',
                          }}
                          title={seat ? `Row ${String.fromCharCode(65 + rowIndex)}, Seat ${seatIndex + 1}` : ''}
                        >
                          <span className="text-[10px] font-bold" style={{ color: textColor }}>
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

      <div className="border-t pt-6">
        <div className="flex justify-center gap-6 mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gray-200 border border-gray-300"></div>
            <span className="text-sm text-gray-700 font-medium">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-yellow-400"></div>
            <span className="text-sm text-gray-700 font-medium">Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-green-500"></div>
            <span className="text-sm text-gray-700 font-medium">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-red-500"></div>
            <span className="text-sm text-gray-700 font-medium">Unavailable</span>
          </div>
        </div>

        {selectedSeats.length > 0 && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-2">
              Selected Seats ({selectedSeats.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seatId) => {
                const seat = seats.find((s) => s.id === seatId);
                return (
                  <span
                    key={seatId}
                    className="bg-purple-200 text-purple-900 px-3 py-1 rounded text-sm"
                  >
                    Row {seat && String.fromCharCode(64 + seat.row)}, Seat {seat?.seat}
                  </span>
                );
              })}
            </div>
            <button className="mt-4 w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg transition-colors">
              Continue to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
