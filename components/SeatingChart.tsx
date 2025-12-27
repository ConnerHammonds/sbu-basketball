'use client';

import { useState } from 'react';
import SectionDetail from './SectionDetail';
import BasketballCourt from './BasketballCourt';

interface Section {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
}

const sections: Section[] = [
  // Top sections
  { id: 'A1', name: 'A1', x: 280, y: 100, width: 160, height: 120 },
  { id: 'A2', name: 'A2', x: 460, y: 100, width: 160, height: 120 },
  { id: 'A3', name: 'A3', x: 640, y: 100, width: 160, height: 120 },
  
  // Left sections
  { id: 'B1', name: 'B1', x: 120, y: 240, width: 120, height: 144 },
  { id: 'B2', name: 'B2', x: 120, y: 404, width: 120, height: 144 },
  
  // Right sections
  { id: 'C1', name: 'C1', x: 840, y: 240, width: 120, height: 144 },
  { id: 'C2', name: 'C2', x: 840, y: 404, width: 120, height: 144 },
  
  // Bottom sections
  { id: 'D1', name: 'D1', x: 280, y: 548, width: 160, height: 120 },
  { id: 'D2', name: 'D2', x: 460, y: 548, width: 160, height: 120 },
  { id: 'D3', name: 'D3', x: 640, y: 548, width: 160, height: 120 },
];

interface SeatingChartProps {
  isAdminMode?: boolean;
}

export default function SeatingChart({ isAdminMode = false }: SeatingChartProps) {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const handleSectionClick = (section: Section) => {
    setSelectedSection(section);
  };

  const handleBackToChart = () => {
    setSelectedSection(null);
  };

  if (selectedSection) {
    return <SectionDetail section={selectedSection} onBack={handleBackToChart} isAdminMode={isAdminMode} />;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <svg
        viewBox="0 0 1081 768"
        className="w-full h-auto"
        style={{ maxHeight: '80vh' }}
      >
        {/* Background - Arena floor */}
        <rect width="1081" height="768" fill="#e5e7eb" />

        {/* Basketball Court */}
        <BasketballCourt />

        {/* Seating Sections */}
        {sections.map((section) => (
          <g key={section.id}>
            <rect
              x={section.x}
              y={section.y}
              width={section.width}
              height={section.height}
              rx="8"
              fill={hoveredSection === section.id ? '#7c3aed' : '#6b21a8'}
              stroke={hoveredSection === section.id ? '#fbbf24' : '#4b5563'}
              strokeWidth={hoveredSection === section.id ? '3' : '2'}
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
              onClick={() => handleSectionClick(section)}
              style={{
                filter: hoveredSection === section.id ? 'brightness(1.2)' : 'none',
              }}
            />
            {/* Section dividers (gray lines) */}
            {section.id.startsWith('A') && section.id !== 'A3' && (
              <rect
                x={section.x + section.width}
                y={section.y}
                width="20"
                height={section.height}
                fill="#6b7280"
              />
            )}
            {section.id.startsWith('D') && section.id !== 'D3' && (
              <rect
                x={section.x + section.width}
                y={section.y}
                width="20"
                height={section.height}
                fill="#6b7280"
              />
            )}
            {section.id === 'B1' && (
              <rect
                x={section.x}
                y={section.y + section.height}
                width={section.width}
                height="16"
                fill="#6b7280"
              />
            )}
            {section.id === 'C1' && (
              <rect
                x={section.x}
                y={section.y + section.height}
                width={section.width}
                height="16"
                fill="#6b7280"
              />
            )}
            
            {/* Section labels */}
            <text
              x={section.x + section.width / 2}
              y={section.y + section.height / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="18"
              fontWeight="bold"
              className="pointer-events-none select-none"
            >
              {section.name}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-6 text-center text-gray-600">
      </div>
    </div>
  );
}
