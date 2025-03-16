
import React from 'react';

interface ColorSelectorProps {
  colors: string[];
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const ColorSelector = ({ colors, selectedColor, onColorChange }: ColorSelectorProps) => {
  if (!colors || colors.length === 0) return null;
  
  const colorMap: Record<string, string> = {
    "Branco": "#ffffff",
    "Preto": "#000000",
    "Azul": "#0066cc",
    "Azul Claro": "#66a3ff",
    "Verde": "#4cd964",
    "Vermelho": "#ff3b30",
    "Rosa": "#ff9eb6",
    "Amarelo": "#ffcc00",
    "Laranja": "#ff9500",
    "Roxo": "#5856d6",
    "Cinza": "#8e8e93",
    "Bege": "#e6d2b5",
    "Marrom": "#8b4513",
    "Creme": "#fffdd0",
    "Dourado": "#d4af37",
    "Vinho": "#722f37",
    "Cobre": "#b87333",
    "Personalizado": "#f5f5f7",
    "Sob consulta": "#f5f5f7",
  };
  
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-3 text-gray-800">Cor:</h3>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const bgColor = colorMap[color] || "#f5f5f7";
          
          return (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              className={`relative h-9 w-9 rounded-full transition-all duration-200
                ${selectedColor === color ? 'ring-2 ring-offset-2 ring-brand-red' : ''}
              `}
              title={color}
            >
              <span 
                className="absolute inset-0 rounded-full border border-gray-200"
                style={{ backgroundColor: bgColor }}
              ></span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
