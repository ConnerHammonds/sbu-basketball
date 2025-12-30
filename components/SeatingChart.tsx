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
  // Top sections - above the court, spanning full court width
  { id: 'A1', name: 'A1', x: 180, y: 10, width: 300, height: 130 },
  { id: 'A2', name: 'A2', x: 500, y: 10, width: 300, height: 130 },
  { id: 'A3', name: 'A3', x: 820, y: 10, width: 300, height: 130 },
  
  // Left sections - left of the court, spanning full court height
  { id: 'B1', name: 'B1', x: 20, y: 150, width: 150, height: 245 },
  { id: 'B2', name: 'B2', x: 20, y: 405, width: 150, height: 245 },
  
  // Right sections - right of the court, spanning full court height
  { id: 'C1', name: 'C1', x: 1130, y: 150, width: 150, height: 245 },
  { id: 'C2', name: 'C2', x: 1130, y: 405, width: 150, height: 245 },
  
  // Bottom sections - below the court, spanning full court width
  { id: 'D1', name: 'D1', x: 180, y: 660, width: 300, height: 130 },
  { id: 'D2', name: 'D2', x: 500, y: 660, width: 300, height: 130 },
  { id: 'D3', name: 'D3', x: 820, y: 660, width: 300, height: 130 },
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
        viewBox="0 0 1300 800"
        className="w-full h-auto"
        style={{ maxHeight: '80vh' }}
      >
        {/* Background - Arena floor */}
        <rect width="1300" height="800" fill="#e5e7eb" />

        {/* Basketball Court - Centered */}
        <g transform="translate(180, 150)">
          <BasketballCourt />
        </g>

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
