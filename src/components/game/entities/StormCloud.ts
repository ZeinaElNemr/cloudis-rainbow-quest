
interface StormCloudProps {
  ctx: CanvasRenderingContext2D;
  entity: GameEntity;
  settings: any;
}

export const drawStormCloud = ({ ctx, entity, settings }: StormCloudProps) => {
  // Draw storm cloud
  ctx.fillStyle = '#465362';
  ctx.beginPath();
  ctx.ellipse(
    entity.x + entity.width/2, 
    entity.y + entity.height/2, 
    entity.width/2, 
    entity.height/3, 
    0, 
    0, 
    Math.PI * 2
  );
  ctx.fill();
  
  // Add lightning if accessibility mode is off
  if (!settings.accessibilityMode && Math.random() < 0.05) {
    ctx.strokeStyle = '#F9DC5C';
    ctx.lineWidth = 3;
    ctx.beginPath();
    const lightningX = entity.x + entity.width/2;
    const startY = entity.y + entity.height/2;
    ctx.moveTo(lightningX, startY);
    ctx.lineTo(lightningX - 10, startY + 20);
    ctx.lineTo(lightningX + 5, startY + 25);
    ctx.lineTo(lightningX - 15, startY + 45);
    ctx.stroke();
  }
};
