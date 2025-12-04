'use client';

import { useState } from 'react';
import SectionDetail from './SectionDetail';

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
  { id: 'A1', name: 'A1', x: 264, y: 146, width: 172, height: 94 },
  { id: 'A2', name: 'A2', x: 456, y: 146, width: 172, height: 94 },
  { id: 'A3', name: 'A3', x: 648, y: 146, width: 172, height: 94 },
  
  // Left sections
  { id: 'B1', name: 'B1', x: 154, y: 256, width: 94, height: 172 },
  { id: 'B2', name: 'B2', x: 154, y: 440, width: 94, height: 172 },
  
  // Right sections
  { id: 'C1', name: 'C1', x: 834, y: 256, width: 94, height: 172 },
  { id: 'C2', name: 'C2', x: 834, y: 440, width: 94, height: 172 },
  
  // Bottom sections
  { id: 'D1', name: 'D1', x: 264, y: 628, width: 172, height: 94 },
  { id: 'D2', name: 'D2', x: 456, y: 628, width: 172, height: 94 },
  { id: 'D3', name: 'D3', x: 648, y: 628, width: 172, height: 94 },
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
        {/* Background */}
        <rect width="1081" height="768" fill="#d1d5db" />

        {/* Basketball Court */}
        <g>
          {/* Court outline */}
          <rect
            x="288"
            y="290"
            width="505"
            height="288"
            fill="#f5deb3"
            stroke="#4a90e2"
            strokeWidth="3"
          />
          
          {/* Center circle */}
          <circle cx="540" cy="434" r="30" fill="none" stroke="#000" strokeWidth="2" />
          <circle cx="540" cy="434" r="4" fill="#000" />
          
          {/* Center line */}
          <line x1="540" y1="290" x2="540" y2="578" stroke="#000" strokeWidth="2" />
          
          {/* Left paint area */}
          <rect x="288" y="384" width="60" height="100" fill="#492779" />
          <path d="M 288 434 Q 318 434 318 384 L 288 384 Z" fill="none" stroke="#fff" strokeWidth="2" />
          <path d="M 288 434 Q 318 434 318 484 L 288 484 Z" fill="none" stroke="#fff" strokeWidth="2" />
          <circle cx="318" cy="434" r="3" fill="#fff" />
          
          {/* Right paint area */}
          <rect x="733" y="384" width="60" height="100" fill="#492779" />
          <path d="M 793 434 Q 763 434 763 384 L 793 384 Z" fill="none" stroke="#fff" strokeWidth="2" />
          <path d="M 793 434 Q 763 434 763 484 L 793 484 Z" fill="none" stroke="#fff" strokeWidth="2" />
          <circle cx="763" cy="434" r="3" fill="#fff" />
          
          {/* Left three-point line */}
          <path
            d="M 288 320 Q 380 434 288 548"
            fill="none"
            stroke="#000"
            strokeWidth="2"
          />
          
          {/* Right three-point line */}
          <path
            d="M 793 320 Q 701 434 793 548"
            fill="none"
            stroke="#000"
            strokeWidth="2"
          />

          {/* Wood grain effect */}
          <defs>
            <pattern id="woodGrain" x="0" y="0" width="100" height="4" patternUnits="userSpaceOnUse">
              <rect width="100" height="2" fill="#f5deb3" />
              <rect y="2" width="100" height="2" fill="#f0d9a8" />
            </pattern>
          </defs>
          <rect x="288" y="290" width="505" height="288" fill="url(#woodGrain)" opacity="0.3" />
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
