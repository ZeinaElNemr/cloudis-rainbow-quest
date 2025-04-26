
import { GameEntity } from '@/types/gameTypes';

interface SunshineProps {
  ctx: CanvasRenderingContext2D;
  entity: GameEntity;
}

export const drawSunshine = ({ ctx, entity }: SunshineProps) => {
  // Draw sunshine orb
  ctx.fillStyle = '#FFDE59';
  ctx.beginPath();
  ctx.arc(
    entity.x + entity.width/2, 
    entity.y + entity.height/2, 
    entity.width/2, 
    0, 
    Math.PI * 2
  );
  ctx.fill();
  
  // Add rays
  ctx.strokeStyle = '#FFDE59';
  ctx.lineWidth = 2;
  const numRays = 8;
  const time = Date.now() / 1000;
  
  for (let i = 0; i < numRays; i++) {
    const angle = time + (i * Math.PI * 2 / numRays);
    const innerRadius = entity.width/2;
    const outerRadius = entity.width/2 + 8;
    
    ctx.beginPath();
    ctx.moveTo(
      entity.x + entity.width/2 + Math.cos(angle) * innerRadius,
      entity.y + entity.height/2 + Math.sin(angle) * innerRadius
    );
    ctx.lineTo(
      entity.x + entity.width/2 + Math.cos(angle) * outerRadius,
      entity.y + entity.height/2 + Math.sin(angle) * outerRadius
    );
    ctx.stroke();
  }
};
