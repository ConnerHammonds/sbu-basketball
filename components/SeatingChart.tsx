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
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null);

  const handleSectionClick = (section: Section, event: React.MouseEvent<SVGElement>) => {
    const svg = event.currentTarget.ownerSVGElement;
    if (svg) {
      const rect = svg.getBoundingClientRect();
      const clickX = ((event.clientX - rect.left) / rect.width) * 100;
      const clickY = ((event.clientY - rect.top) / rect.height) * 100;
      setClickPosition({ x: clickX, y: clickY });
    }
    setSelectedSection(section);
  };

  const handleBackToChart = () => {
    setSelectedSection(null);
  };

  if (selectedSection) {
    return <SectionDetail section={selectedSection} onBack={handleBackToChart} isAdminMode={isAdminMode} originPosition={clickPosition} />;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <svg
        viewBox="0 0 1300 800"
        className="w-full h-auto"
        style={{ maxHeight: '80vh' }}
      >
        {/* Background - Arena floor */}
        <rect width="1300" height="800" fill="#FFFFFF" />

        {/* Basketball Court - Centered */}
        <g transform="translate(180, 150)">
          <BasketballCourt />
        </g>

        {/* Seating Sections */}
        {sections.map((section) => {
          // Determine border radius based on section position
          let borderRadius = '0';
          if (section.id === 'A1') borderRadius = '8 0 0 8'; // Left rounded
          else if (section.id === 'A3') borderRadius = '0 8 8 0'; // Right rounded
          else if (section.id === 'D1') borderRadius = '8 0 0 8'; // Left rounded
          else if (section.id === 'D3') borderRadius = '0 8 8 0'; // Right rounded
          else if (section.id === 'B1') borderRadius = '8 8 0 0'; // Top rounded
          else if (section.id === 'B2') borderRadius = '0 0 8 8'; // Bottom rounded
          else if (section.id === 'C1') borderRadius = '8 8 0 0'; // Top rounded
          else if (section.id === 'C2') borderRadius = '0 0 8 8'; // Bottom rounded

          return (
          <g key={section.id}>
            {borderRadius === '0' ? (
              <rect
                x={section.x}
                y={section.y}
                width={section.width}
                height={section.height}
                fill={hoveredSection === section.id ? '#7c3aed' : '#6b21a8'}
                stroke={hoveredSection === section.id ? '#fbbf24' : '#4b5563'}
                strokeWidth={hoveredSection === section.id ? '3' : '2'}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                onClick={(e) => handleSectionClick(section, e)}
                style={{
                  filter: hoveredSection === section.id ? 'brightness(1.2)' : 'none',
                }}
              />
            ) : (
              <path
                d={(() => {
                  const x = section.x;
                  const y = section.y;
                  const w = section.width;
                  const h = section.height;
                  const r = 8;
                  const [tl, tr, br, bl] = borderRadius.split(' ').map(v => parseInt(v) || 0);
                  
                  return `
                    M ${x + tl} ${y}
                    L ${x + w - tr} ${y}
                    ${tr > 0 ? `Q ${x + w} ${y} ${x + w} ${y + tr}` : `L ${x + w} ${y}`}
                    L ${x + w} ${y + h - br}
                    ${br > 0 ? `Q ${x + w} ${y + h} ${x + w - br} ${y + h}` : `L ${x + w} ${y + h}`}
                    L ${x + bl} ${y + h}
                    ${bl > 0 ? `Q ${x} ${y + h} ${x} ${y + h - bl}` : `L ${x} ${y + h}`}
                    L ${x} ${y + tl}
                    ${tl > 0 ? `Q ${x} ${y} ${x + tl} ${y}` : `L ${x} ${y}`}
                    Z
                  `;
                })()}
                fill={hoveredSection === section.id ? '#7c3aed' : '#6b21a8'}
                stroke={hoveredSection === section.id ? '#fbbf24' : '#4b5563'}
                strokeWidth={hoveredSection === section.id ? '3' : '2'}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                onClick={(e) => handleSectionClick(section, e)}
                style={{
                  filter: hoveredSection === section.id ? 'brightness(1.2)' : 'none',
                }}
              />
            )}
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
          );
        })}
      </svg>

      <div className="mt-6 text-center text-gray-600">
      </div>
    </div>
  );
}
