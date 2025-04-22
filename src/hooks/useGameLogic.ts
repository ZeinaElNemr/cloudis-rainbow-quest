
import { useState, useRef, useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import { GameEntity, CloudiEntity, CLOUDI_SIZE } from '@/types/gameTypes';

export const useGameLogic = () => {
  const { 
    setScene, 
    rainbowPieces, 
    setRainbowPieces, 
    settings,
    playGameSound
  } = useGame();

  const [gameEntities, setGameEntities] = useState<GameEntity[]>([]);
  const [cloudi, setCloudi] = useState<CloudiEntity>({
    id: 'cloudi',
    x: window.innerWidth / 2 - CLOUDI_SIZE / 2,
    y: window.innerHeight / 2 - CLOUDI_SIZE / 2,
    width: CLOUDI_SIZE,
    height: CLOUDI_SIZE,
    type: 'cloudi',
    velocity: { x: 0, y: 0 }
  });
  const [boosted, setBoosted] = useState(false);
  
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  const handleKeyDown = (e: KeyboardEvent) => {
    keysPressed.current[e.key] = true;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    keysPressed.current[e.key] = false;
  };

  // Log when boost state changes
  useEffect(() => {
    console.log("Boost state changed:", boosted);
  }, [boosted]);

  return {
    gameEntities,
    setGameEntities,
    cloudi,
    setCloudi,
    boosted,
    setBoosted,
    keysPressed,
    handleKeyDown,
    handleKeyUp
  };
};
