
import { CloudiEntity } from '@/types/gameTypes';

interface CloudiProps {
  ctx: CanvasRenderingContext2D;
  cloudi: CloudiEntity;
  isInvulnerable: boolean;
  boosted: boolean;
}

export const drawCloudi = ({ ctx, cloudi, isInvulnerable, boosted }: CloudiProps) => {
  // Draw Cloudi with flashing effect when invulnerable
  if (isInvulnerable && Math.floor(Date.now() / 150) % 2 === 0) {
    ctx.fillStyle = '#FF7F7F'; // Reddish tint for damage
  } else {
    ctx.fillStyle = '#A6DCEF';
  }
  
  ctx.beginPath();
  ctx.ellipse(
    cloudi.x + cloudi.width/2, 
    cloudi.y + cloudi.height/2, 
    cloudi.width/2, 
    cloudi.height/3, 
    0, 
    0, 
    Math.PI * 2
  );
  ctx.fill();
  
  // Draw Cloudi's face
  const eyeSize = 8;
  ctx.fillStyle = '#33415C';
  
  // Eyes
  ctx.beginPath();
  ctx.arc(
    cloudi.x + cloudi.width/2 - 15, 
    cloudi.y + cloudi.height/2, 
    eyeSize/2, 
    0, 
    Math.PI * 2
  );
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(
    cloudi.x + cloudi.width/2 + 15, 
    cloudi.y + cloudi.height/2, 
    eyeSize/2, 
    0, 
    Math.PI * 2
  );
  ctx.fill();
  
  // Mouth (happy or sad based on invulnerability)
  ctx.beginPath();
  if (isInvulnerable) {
    // Sad mouth when damaged
    ctx.arc(
      cloudi.x + cloudi.width/2, 
      cloudi.y + cloudi.height/2 + 15, 
      10, 
      Math.PI, 
      0, 
      true
    );
  } else {
    // Happy mouth
    ctx.arc(
      cloudi.x + cloudi.width/2, 
      cloudi.y + cloudi.height/2 + 10, 
      10, 
      0, 
      Math.PI
    );
  }
  ctx.stroke();
  
  // Draw boost effect if active
  if (boosted) {
    ctx.fillStyle = 'rgba(255, 222, 89, 0.3)';
    ctx.beginPath();
    ctx.arc(
      cloudi.x + cloudi.width/2, 
      cloudi.y + cloudi.height/2, 
      cloudi.width/1.5, 
      0, 
      Math.PI * 2
    );
    ctx.fill();
  }
};
