
import { GameEntity } from '@/types/gameTypes';

interface RainbowPieceProps {
  ctx: CanvasRenderingContext2D;
  entity: GameEntity;
  settings: any;
}

export const drawRainbowPiece = ({ ctx, entity, settings }: RainbowPieceProps) => {
  // Get the rainbow piece index
  const index = parseInt(entity.type.split('-')[1]);
  const rainbowColors = [
    '#FF5E5B', // Red
    '#FFB16C', // Orange
    '#FFDE59', // Yellow
    '#8CD867', // Green
    '#4CB9E7', // Blue
    '#6A7FDB', // Indigo
    '#9B5DE5'  // Violet
  ];
  
  // Draw a sparkling rainbow piece
  ctx.fillStyle = rainbowColors[index % rainbowColors.length];
  ctx.beginPath();
  ctx.arc(
    entity.x + entity.width/2, 
    entity.y + entity.height/2, 
    entity.width/2 * (0.8 + Math.sin(Date.now() / 300) * 0.2), 
    0, 
    Math.PI * 2
  );
  ctx.fill();
  
  // Add sparkle
  if (!settings.accessibilityMode) {
    const sparkleTime = Date.now() / 500;
    for (let i = 0; i < 4; i++) {
      const angle = sparkleTime + i * Math.PI/2;
      const distance = 5 + Math.sin(sparkleTime * 2) * 2;
      const sx = entity.x + entity.width/2 + Math.cos(angle) * distance;
      const sy = entity.y + entity.height/2 + Math.sin(angle) * distance;
      
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(sx, sy, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
};
