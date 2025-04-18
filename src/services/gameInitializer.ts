
import { GameEntity, RAINBOW_PIECE_SIZE, STORM_SIZE, SUNSHINE_SIZE, WIND_SIZE } from '@/types/gameTypes';

export const initializeGame = (totalRainbowPieces: number): GameEntity[] => {
  const newEntities: GameEntity[] = [];
  
  // Add rainbow pieces
  for (let i = 0; i < totalRainbowPieces; i++) {
    newEntities.push({
      x: Math.random() * (window.innerWidth - RAINBOW_PIECE_SIZE),
      y: Math.random() * (window.innerHeight - RAINBOW_PIECE_SIZE),
      width: RAINBOW_PIECE_SIZE,
      height: RAINBOW_PIECE_SIZE,
      type: `rainbow-${i}`,
    });
  }
  
  // Add storms
  for (let i = 0; i < 3; i++) {
    newEntities.push({
      x: Math.random() * (window.innerWidth - STORM_SIZE),
      y: Math.random() * (window.innerHeight - STORM_SIZE),
      width: STORM_SIZE,
      height: STORM_SIZE,
      type: 'storm',
    });
  }
  
  // Add sunshine
  for (let i = 0; i < 2; i++) {
    newEntities.push({
      x: Math.random() * (window.innerWidth - SUNSHINE_SIZE),
      y: Math.random() * (window.innerHeight - SUNSHINE_SIZE),
      width: SUNSHINE_SIZE,
      height: SUNSHINE_SIZE,
      type: 'sunshine',
    });
  }
  
  // Add wind currents
  for (let i = 0; i < 2; i++) {
    newEntities.push({
      x: Math.random() * (window.innerWidth - WIND_SIZE),
      y: Math.random() * (window.innerHeight - WIND_SIZE),
      width: WIND_SIZE,
      height: WIND_SIZE,
      type: 'wind',
    });
  }
  
  return newEntities;
};
