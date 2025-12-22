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
        <g>
          {/* Wood grain pattern definition */}
          <defs>
            <pattern id="woodGrain" x="0" y="0" width="200" height="8" patternUnits="userSpaceOnUse">
              <rect width="200" height="4" fill="#c89860" />
              <rect y="4" width="200" height="4" fill="#d4a574" />
            </pattern>
            <linearGradient id="woodShading" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e0b080" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#c89860" stopOpacity="0" />
              <stop offset="100%" stopColor="#a67c52" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Court base - hardwood floor */}
          <rect
            x="260"
            y="234"
            width="560"
            height="300"
            fill="url(#woodGrain)"
            stroke="#000"
            strokeWidth="4"
          />
          <rect
            x="260"
            y="234"
            width="560"
            height="300"
            fill="url(#woodShading)"
          />
          
          {/* Out of bounds area */}
          <rect x="260" y="234" width="560" height="300" fill="none" stroke="#fff" strokeWidth="3" />
          
          {/* Center circle */}
          <circle cx="540" cy="384" r="36" fill="none" stroke="#492779" strokeWidth="3" />
          <circle cx="540" cy="384" r="12" fill="none" stroke="#492779" strokeWidth="3" />
          
          {/* Center line */}
          <line x1="540" y1="234" x2="540" y2="534" stroke="#000" strokeWidth="3" />
          
          {/* Left basket area */}
          {/* Free throw lane */}
          <rect x="260" y="324" width="95" height="120" fill="none" stroke="#492779" strokeWidth="3" />
          <rect x="260" y="324" width="95" height="120" fill="#492779" fillOpacity="0.08" />
          
          {/* Free throw circle */}
          <circle cx="355" cy="384" r="36" fill="none" stroke="#492779" strokeWidth="3" />
          
          {/* Restricted area arc */}
          <path
            d="M 260 354 Q 295 384 260 414"
            fill="none"
            stroke="#000"
            strokeWidth="2"
            strokeDasharray="4,4"
          />
          
          {/* Left three-point line */}
          <path
            d="M 260 254 L 308 254 Q 402 384 308 514 L 260 514"
            fill="none"
            stroke="#492779"
            strokeWidth="3"
          />
          
          {/* Left basket */}
          <line x1="260" y1="374" x2="270" y2="374" stroke="#ff6b35" strokeWidth="2" />
          <line x1="260" y1="394" x2="270" y2="394" stroke="#ff6b35" strokeWidth="2" />
          <ellipse cx="275" cy="384" rx="8" ry="6" fill="none" stroke="#ff6b35" strokeWidth="2" />
          
          {/* Right basket area */}
          {/* Free throw lane */}
          <rect x="725" y="324" width="95" height="120" fill="none" stroke="#492779" strokeWidth="3" />
          <rect x="725" y="324" width="95" height="120" fill="#492779" fillOpacity="0.08" />
          
          {/* Free throw circle */}
          <circle cx="725" cy="384" r="36" fill="none" stroke="#492779" strokeWidth="3" />
          
          {/* Restricted area arc */}
          <path
            d="M 820 354 Q 785 384 820 414"
            fill="none"
            stroke="#000"
            strokeWidth="2"
            strokeDasharray="4,4"
          />
          
          {/* Right three-point line */}
          <path
            d="M 820 254 L 772 254 Q 678 384 772 514 L 820 514"
            fill="none"
            stroke="#492779"
            strokeWidth="3"
          />
          
          {/* Right basket */}
          <line x1="820" y1="374" x2="810" y2="374" stroke="#ff6b35" strokeWidth="2" />
          <line x1="820" y1="394" x2="810" y2="394" stroke="#ff6b35" strokeWidth="2" />
          <ellipse cx="805" cy="384" rx="8" ry="6" fill="none" stroke="#ff6b35" strokeWidth="2" />
          
          {/* Hash marks on free throw lanes */}
          {[0, 1, 2, 3].map((i) => (
            <g key={`hash-${i}`}>
              {/* Left side */}
              <line x1="355" y1={334 + i * 25} x2="365" y2={334 + i * 25} stroke="#000" strokeWidth="2" />
              {/* Right side */}
              <line x1="725" y1={334 + i * 25} x2="715" y2={334 + i * 25} stroke="#000" strokeWidth="2" />
            </g>
          ))}
          
          {/* Court logo at center */}
          <text
            x="540"
            y="384"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#492779"
            fillOpacity="0.15"
            fontSize="48"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
          >
            SBU
          </text>
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
