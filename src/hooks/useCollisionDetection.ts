
import { GameEntity, CloudiEntity, POINTS_PER_RAINBOW } from '@/types/gameTypes';
import { useGame } from '@/contexts/GameContext';
import { useState, useEffect } from 'react';

export const useCollisionDetection = (
  cloudi: CloudiEntity,
  gameEntities: GameEntity[],
  setBoosted: (boosted: boolean) => void,
  setGameEntities: React.Dispatch<React.SetStateAction<GameEntity[]>>
) => {
  const { 
    setScene, 
    rainbowPieces, 
    setRainbowPieces, 
    settings, 
    playGameSound,
    score,
    setScore,
    lives,
    setLives,
    setGameResult
  } = useGame();
  
  const [isInvulnerable, setIsInvulnerable] = useState(false);

  // Turn off invulnerability state after a short period
  useEffect(() => {
    let invulnerabilityTimer: NodeJS.Timeout | null = null;
    
    if (isInvulnerable) {
      invulnerabilityTimer = setTimeout(() => {
        setIsInvulnerable(false);
      }, 1500); // 1.5 seconds of invulnerability
    }
    
    return () => {
      if (invulnerabilityTimer) clearTimeout(invulnerabilityTimer);
    };
  }, [isInvulnerable]);

  const checkCollisions = () => {
    const entitiesToRemove: string[] = [];
    let shouldUpdateLives = false;
    let newRainbowCount = rainbowPieces;
    let newScore = score;
    
    for (const entity of gameEntities) {
      // Check for collision between cloudi and this entity
      if (
        cloudi.x < entity.x + entity.width &&
        cloudi.x + cloudi.width > entity.x &&
        cloudi.y < entity.y + entity.height &&
        cloudi.y + cloudi.height > entity.y
      ) {
        console.log(`Collision detected with entity type: ${entity.type}`);
        
        if (entity.type.startsWith('rainbow')) {
          console.log(`Rainbow collision - id: ${entity.id}`);
          entitiesToRemove.push(entity.id);
          newRainbowCount += 1;
          newScore += POINTS_PER_RAINBOW;
          console.log(`New rainbow count: ${newRainbowCount}, New score: ${newScore}`);
          playGameSound("collect");
          
          if (settings.vibration && navigator.vibrate) {
            navigator.vibrate(100);
          }
        } else if (entity.type === 'storm') {
          console.log('Storm collision - deducting a life');
          
          // Only take damage if not invulnerable
          if (!isInvulnerable) {
            shouldUpdateLives = true;
            playGameSound("hit"); // Play hit sound instead of storm sound
            setIsInvulnerable(true);
            
            if (settings.vibration && navigator.vibrate) {
              navigator.vibrate([100, 50, 100]); // Stronger vibration pattern for damage
            }
          }
        } else if (entity.type === 'sunshine') {
          console.log(`Sunshine collision - id: ${entity.id}`);
          entitiesToRemove.push(entity.id);
          playGameSound("sunshine");
          setBoosted(true);
          
          setTimeout(() => {
            setBoosted(false);
          }, 3000);
        } else if (entity.type === 'wind') {
          console.log(`Wind collision - id: ${entity.id}`);
          playGameSound("wind");
          entitiesToRemove.push(entity.id);
        }
      }
    }
    
    if (entitiesToRemove.length > 0) {
      console.log(`Removing entities with ids:`, entitiesToRemove);
      setGameEntities((prevEntities) => 
        prevEntities.filter(entity => !entitiesToRemove.includes(entity.id))
      );
    }
    
    // Update rainbow pieces count and score
    if (newRainbowCount > rainbowPieces || newScore > score) {
      console.log(`Setting rainbow pieces to ${newRainbowCount} and score to ${newScore}`);
      setRainbowPieces(newRainbowCount);
      setScore(newScore);
    }
    
    // Handle life loss
    if (shouldUpdateLives) {
      const newLives = lives - 1;
      console.log(`Setting lives to ${newLives}`);
      setLives(newLives);
      
      if (newLives <= 0) {
        console.log('No more lives left - ending game with defeat');
        setGameResult("defeat");
        setScene("gameOver");
      }
    }
    
    // Victory condition check
    if (newRainbowCount >= 7) {
      console.log('All rainbow pieces collected! Game over with victory');
      setGameResult("victory");
      setScene("gameOver");
    }
  };

  return { checkCollisions, isInvulnerable };
};
