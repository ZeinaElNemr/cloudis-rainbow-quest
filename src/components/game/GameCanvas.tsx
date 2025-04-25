
import React, { useRef, useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import { GameEntity, CloudiEntity } from '@/types/gameTypes';
import { drawBackground } from './entities/Background';
import { drawRainbowPiece } from './entities/RainbowPiece';
import { drawStormCloud } from './entities/StormCloud';
import { drawSunshine } from './entities/Sunshine';
import { drawWindCurrent } from './entities/WindCurrent';
import { drawCloudi } from './entities/Cloudi';

interface GameCanvasProps {
  gameEntities: GameEntity[];
  cloudi: CloudiEntity;
  boosted: boolean;
  settings: any;
  isInvulnerable?: boolean;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ 
  gameEntities, 
  cloudi, 
  boosted, 
  settings,
  isInvulnerable = false
}) => {
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
    
    // Draw background
    drawBackground({ ctx, width: canvas.width, height: canvas.height });
    
    // Draw game entities
    gameEntities.forEach(entity => {
      if (entity.type.startsWith('rainbow')) {
        drawRainbowPiece({ ctx, entity, settings });
      } else if (entity.type === 'storm') {
        drawStormCloud({ ctx, entity, settings });
      } else if (entity.type === 'sunshine') {
        drawSunshine({ ctx, entity });
      } else if (entity.type === 'wind') {
        drawWindCurrent({ ctx, entity });
      }
    });
    
    // Draw Cloudi
    drawCloudi({ ctx, cloudi, isInvulnerable, boosted });
  };

  // Apply brightness filter when settings change
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.filter = `brightness(${settings.brightness}%)`;
    }
  }, [settings.brightness]);

  useEffect(() => {
    renderGame();
    
    // Set up animation loop for continuous rendering
    const animationFrame = requestAnimationFrame(function animate() {
      renderGame();
      requestAnimationFrame(animate);
    });
    
    return () => cancelAnimationFrame(animationFrame);
  }, [gameEntities, cloudi, boosted, settings, isInvulnerable]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
    />
  );
};

export default GameCanvas;
