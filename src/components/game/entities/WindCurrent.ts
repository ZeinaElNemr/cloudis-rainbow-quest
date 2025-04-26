
import { GameEntity } from '@/types/gameTypes';

interface WindCurrentProps {
  ctx: CanvasRenderingContext2D;
  entity: GameEntity;
}

export const drawWindCurrent = ({ ctx, entity }: WindCurrentProps) => {
  ctx.strokeStyle = '#E2EAFC';
  ctx.lineWidth = 3;
  
  const time = Date.now() / 1000;
  const centerX = entity.x + entity.width/2;
  const centerY = entity.y + entity.height/2;
  
  for (let i = 0; i < 3; i++) {
    const radius = 10 + i * 15;
    const rotation = time * (i + 1) * 0.2;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, rotation, rotation + Math.PI * 1.5);
    ctx.stroke();
  }
};
