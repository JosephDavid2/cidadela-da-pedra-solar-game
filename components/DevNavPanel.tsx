import React from 'react';
import { STORY } from '../constants.ts';

interface DevNavPanelProps {
  onNavigate: (sectionId: number) => void;
  currentSectionId: number;
}

const DevNavPanel: React.FC<DevNavPanelProps> = ({ onNavigate, currentSectionId }) => {
  // Get all section keys, convert to numbers, and sort them
  const sectionIds = Object.keys(STORY)
    .map(Number)
    .filter(id => !isNaN(id)) // Filter out any potential non-numeric keys
    .sort((a, b) => a - b);

  return (
    <nav className="fixed top-0 left-0 h-full w-48 bg-gray-800 text-white p-2 shadow-lg z-50 flex flex-col" aria-label="Navegação de Desenvolvimento">
      <h3 className="text-lg font-bold mb-2 border-b border-gray-600 pb-2 px-2">Navegação DEV</h3>
      <ul className="flex-1 overflow-y-auto space-y-1">
        {sectionIds.map(id => (
          <li key={id}>
            <button
              onClick={() => onNavigate(id)}
              className={`w-full text-left text-sm py-1 px-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${currentSectionId === id ? 'bg-blue-600 font-bold' : ''}`}
            >
              Seção {id}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DevNavPanel;
