
import { GameEntity, RAINBOW_PIECE_SIZE, STORM_SIZE, SUNSHINE_SIZE, WIND_SIZE } from "@/types/gameTypes";

export const initializeGame = (totalRainbowPieces: number): GameEntity[] => {
  const entities: GameEntity[] = [];
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  
  console.log(`Initializing game with ${totalRainbowPieces} rainbow pieces`);
  
  // Add rainbow pieces
  for (let i = 0; i < totalRainbowPieces; i++) {
    const x = Math.random() * (screenWidth - RAINBOW_PIECE_SIZE);
    const y = Math.random() * (screenHeight - RAINBOW_PIECE_SIZE);
    
    entities.push({
      id: `rainbow-${i}`,
      x,
      y,
      width: RAINBOW_PIECE_SIZE,
      height: RAINBOW_PIECE_SIZE,
      type: `rainbow-${i}`
    });
  }
  
  // Add obstacles (storms)
  const numStorms = 3;
  for (let i = 0; i < numStorms; i++) {
    const x = Math.random() * (screenWidth - STORM_SIZE);
    const y = Math.random() * (screenHeight - STORM_SIZE);
    
    entities.push({
      id: `storm-${i}`,
      x,
      y,
      width: STORM_SIZE,
      height: STORM_SIZE,
      type: 'storm'
    });
  }
  
  // Add power-ups (sunshine)
  const numSunshine = 2;
  for (let i = 0; i < numSunshine; i++) {
    const x = Math.random() * (screenWidth - SUNSHINE_SIZE);
    const y = Math.random() * (screenHeight - SUNSHINE_SIZE);
    
    entities.push({
      id: `sunshine-${i}`,
      x,
      y,
      width: SUNSHINE_SIZE,
      height: SUNSHINE_SIZE,
      type: 'sunshine'
    });
  }
  
  // Add wind currents
  const numWinds = 2;
  for (let i = 0; i < numWinds; i++) {
    const x = Math.random() * (screenWidth - WIND_SIZE);
    const y = Math.random() * (screenHeight - WIND_SIZE);
    
    entities.push({
      id: `wind-${i}`,
      x,
      y,
      width: WIND_SIZE,
      height: WIND_SIZE,
      type: 'wind'
    });
  }
  
  console.log('Game initialized with entities:', entities);
  return entities;
};
