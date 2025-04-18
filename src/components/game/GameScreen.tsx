
import React, { useEffect, useRef } from "react";
import { useGame } from "@/contexts/GameContext";
import GameCanvas from "./GameCanvas";
import GameControls from "./GameControls";
import { useGameLogic } from "@/hooks/useGameLogic";
import { initializeGame } from "@/services/gameInitializer";
import { useCollisionDetection } from "@/hooks/useCollisionDetection";
import { CLOUDI_SPEED, BOOST_MULTIPLIER } from "@/types/gameTypes";

const GameScreen: React.FC = () => {
  const { 
    setScene, 
    rainbowPieces, 
    setRainbowPieces,
    totalRainbowPieces,
    settings,
    isGamePaused,
    playGameSound
  } = useGame();
  
  const {
    gameEntities,
    setGameEntities,
    cloudi,
    setCloudi,
    boosted,
    setBoosted,
    keysPressed,
    handleKeyDown,
    handleKeyUp
  } = useGameLogic();
  
  const { checkCollisions } = useCollisionDetection(
    cloudi,
    gameEntities,
    setBoosted,
    setGameEntities
  );
  
  const animationRef = useRef<number>(0);
  
  useEffect(() => {
    // Initialize the game
    setGameEntities(initializeGame(totalRainbowPieces));
    
    // Set up keyboard controls
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Start the game loop
    startGameLoop();
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);
  
  useEffect(() => {
    if (isGamePaused) {
      cancelAnimationFrame(animationRef.current);
    } else {
      startGameLoop();
    }
  }, [isGamePaused]);
  
  useEffect(() => {
    if (rainbowPieces >= totalRainbowPieces) {
      setScene("gameOver");
      playGameSound("victory");
    }
  }, [rainbowPieces, totalRainbowPieces]);

  const startGameLoop = () => {
    const gameLoop = () => {
      updateGame();
      animationRef.current = requestAnimationFrame(gameLoop);
    };
    
    animationRef.current = requestAnimationFrame(gameLoop);
  };
  
  const updateGame = () => {
    // Update Cloudi's position based on keys pressed
    let dx = 0;
    let dy = 0;
    
    if (keysPressed.current['ArrowLeft']) dx -= 1;
    if (keysPressed.current['ArrowRight']) dx += 1;
    if (keysPressed.current['ArrowUp']) dy -= 1;
    if (keysPressed.current['ArrowDown']) dy += 1;
    
    // Update position and check for collisions
    updateCloudiPosition(dx, dy);
    checkCollisions();
  };
  
  const updateCloudiPosition = (dx: number, dy: number) => {
    // Apply speed and boost if active
    const speed = boosted ? CLOUDI_SPEED * BOOST_MULTIPLIER : CLOUDI_SPEED;
    dx *= speed;
    dy *= speed;
    
    // Update Cloudi's position
    setCloudi(prev => {
      const newX = Math.max(0, Math.min(window.innerWidth - prev.width, prev.x + dx));
      const newY = Math.max(0, Math.min(window.innerHeight - prev.height, prev.y + dy));
      
      return {
        ...prev,
        x: newX,
        y: newY,
        velocity: { x: dx, y: dy }
      };
    });
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <GameCanvas
        gameEntities={gameEntities}
        cloudi={cloudi}
        boosted={boosted}
        settings={settings}
      />
      <GameControls />
    </div>
  );
};

export default GameScreen;
