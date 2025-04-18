
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
    "Champagne": "#f7e7ce",
    "Personalizado": "#f5f5f7",
    "Sob consulta": "#f5f5f7",
  };
  
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-3 text-[#1D1D1F]">Cor:</h3>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const bgColor = colorMap[color] || "#f5f5f7";
          const isSelected = selectedColor === color;
          const isDarkColor = ['Preto', 'Azul', 'Verde', 'Vermelho', 'Roxo', 'Vinho', 'Marrom'].includes(color);
          
          return (
            <motion.button
              key={color}
              onClick={() => onColorChange(color)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "relative h-11 w-11 md:h-10 md:w-10 rounded-full transition-all duration-200",
                isSelected ? "ring-2 ring-offset-2 ring-[#0071E3]" : "hover:ring-1 hover:ring-gray-300 hover:ring-offset-1"
              )}
              title={color}
              aria-label={`Selecionar cor ${color}`}
              data-testid={`color-button-${color.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <span 
                className="absolute inset-0 rounded-full border border-gray-200"
                style={{ backgroundColor: bgColor }}
              />
              
              {isSelected && (
                <motion.span 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.3 }}
                >
                  <span className={cn(
                    "w-2 h-2 rounded-full", 
                    isDarkColor ? "bg-white" : "bg-gray-800"
                  )} />
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>
      <div className="mt-2 text-sm text-[#6E6E73]">
        {selectedColor && <span>Selecionado: {selectedColor}</span>}
      </div>
    </div>
  );
};

export default ColorSelector;
