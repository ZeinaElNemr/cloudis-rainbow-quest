import React, { useRef, useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import { GameEntity, CloudiEntity } from '@/types/gameTypes';

interface GameCanvasProps {
  gameEntities: GameEntity[];
  cloudi: CloudiEntity;
  boosted: boolean;
  settings: any;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ gameEntities, cloudi, boosted, settings }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background (sky)
    const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    skyGradient.addColorStop(0, '#C1E8FF');
    skyGradient.addColorStop(1, '#E2EAFC');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw decorative background clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    for (let i = 0; i < 5; i++) {
      const x = (Date.now() / 10000 + i * 0.2) % 1 * canvas.width;
      const y = canvas.height * (0.1 + i * 0.15);
      const width = 100 + i * 20;
      const height = 60 + i * 10;
      
      ctx.beginPath();
      ctx.ellipse(x, y, width/2, height/2, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw game entities
    gameEntities.forEach(entity => {
      if (entity.type.startsWith('rainbow')) {
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
      } else if (entity.type === 'storm') {
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
      } else if (entity.type === 'sunshine') {
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
      } else if (entity.type === 'wind') {
        // Draw wind current
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
      }
    });
    
    // Draw Cloudi
    ctx.fillStyle = '#A6DCEF';
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
    
    // Mouth (happy)
    ctx.beginPath();
    ctx.arc(
      cloudi.x + cloudi.width/2, 
      cloudi.y + cloudi.height/2 + 10, 
      10, 
      0, 
      Math.PI
    );
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

  // Apply brightness filter when settings change
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.filter = `brightness(${settings.brightness}%)`;
    }
  }, [settings.brightness]);

  useEffect(() => {
    renderGame();
  }, [gameEntities, cloudi, boosted, settings]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
    />
  );
};

export default GameCanvas;
