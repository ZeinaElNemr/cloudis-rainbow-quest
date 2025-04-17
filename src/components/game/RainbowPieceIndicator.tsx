
import React from "react";

interface RainbowPieceIndicatorProps {
  collected: number;
  total: number;
}

const RainbowPieceIndicator: React.FC<RainbowPieceIndicatorProps> = ({ 
  collected, 
  total 
}) => {
  // Calculate percentages for the rainbow gradient
  const pieceWidth = 100 / total;
  const collectedWidth = (collected / total) * 100;
  
  // Create CSS variables for the gradient
  const style = {
    '--red-percent': `${Math.min(pieceWidth, collectedWidth)}%`,
    '--orange-percent': `${Math.min(pieceWidth * 2, collectedWidth)}%`,
    '--yellow-percent': `${Math.min(pieceWidth * 3, collectedWidth)}%`,
    '--green-percent': `${Math.min(pieceWidth * 4, collectedWidth)}%`,
    '--blue-percent': `${Math.min(pieceWidth * 5, collectedWidth)}%`,
    '--indigo-percent': `${Math.min(pieceWidth * 6, collectedWidth)}%`,
    '--violet-percent': `${Math.min(pieceWidth * 7, collectedWidth)}%`,
  } as React.CSSProperties;
  
  return (
    <div className="bg-white/70 px-3 py-2 rounded-full flex items-center gap-2">
      <div className="rainbow-progress w-48" style={style}></div>
      <span className="font-bold text-sm">{collected}/{total}</span>
    </div>
  );
};

export default RainbowPieceIndicator;
