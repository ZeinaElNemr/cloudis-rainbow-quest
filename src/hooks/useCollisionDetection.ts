
import { GameEntity, CloudiEntity } from '@/types/gameTypes';
import { useGame } from '@/contexts/GameContext';

export const useCollisionDetection = (
  cloudi: CloudiEntity,
  gameEntities: GameEntity[],
  setBoosted: (boosted: boolean) => void,
  setGameEntities: (entities: GameEntity[]) => void
) => {
  const { 
    setScene, 
    rainbowPieces, 
    setRainbowPieces, 
    settings, 
    playGameSound 
  } = useGame();

  const checkCollisions = () => {
    const entitiesToRemove: string[] = [];
    let shouldEndGame = false;
    let newRainbowCount = rainbowPieces;
    
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
          console.log(`New rainbow count: ${newRainbowCount}`);
          playGameSound("collect");
          
          if (settings.vibration && navigator.vibrate) {
            navigator.vibrate(100);
          }
        } else if (entity.type === 'storm') {
          console.log('Storm collision - ending game');
          playGameSound("storm");
          shouldEndGame = true;
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
      setGameEntities(prevEntities => 
        prevEntities.filter(entity => !entitiesToRemove.includes(entity.id))
      );
    }
    
    // Update rainbow pieces count outside the loop
    if (newRainbowCount > rainbowPieces) {
      console.log(`Setting rainbow pieces to ${newRainbowCount}`);
      setRainbowPieces(newRainbowCount);
    }
    
    if (shouldEndGame) {
      console.log('Setting scene to gameOver');
      setScene("gameOver");
    }
  };

  return { checkCollisions };
};
