
interface BackgroundProps {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
}

export const drawBackground = ({ ctx, width, height }: BackgroundProps) => {
  // Draw background (sky)
  const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
  skyGradient.addColorStop(0, '#C1E8FF');
  skyGradient.addColorStop(1, '#E2EAFC');
  ctx.fillStyle = skyGradient;
  ctx.fillRect(0, 0, width, height);
  
  // Draw decorative background clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  for (let i = 0; i < 5; i++) {
    const x = (Date.now() / 10000 + i * 0.2) % 1 * width;
    const y = height * (0.1 + i * 0.15);
    const cloudWidth = 100 + i * 20;
    const cloudHeight = 60 + i * 10;
    
    ctx.beginPath();
    ctx.ellipse(x, y, cloudWidth/2, cloudHeight/2, 0, 0, Math.PI * 2);
    ctx.fill();
  }
};
