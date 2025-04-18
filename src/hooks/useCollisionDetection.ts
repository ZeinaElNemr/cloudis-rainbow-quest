
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
    
    gameEntities.forEach(entity => {
      if (
        cloudi.x < entity.x + entity.width &&
        cloudi.x + cloudi.width > entity.x &&
        cloudi.y < entity.y + entity.height &&
        cloudi.y + cloudi.height > entity.y
      ) {
        if (entity.type.startsWith('rainbow')) {
          entitiesToRemove.push(entity.type);
          setRainbowPieces(rainbowPieces + 1);
          playGameSound("collect");
          
          if (settings.vibration && navigator.vibrate) {
            navigator.vibrate(100);
          }
        } else if (entity.type === 'storm') {
          playGameSound("storm");
          setScene("start");
        } else if (entity.type === 'sunshine') {
          entitiesToRemove.push(entity.type);
          playGameSound("sunshine");
          setBoosted(true);
          
          setTimeout(() => {
            setBoosted(false);
          }, 3000);
        } else if (entity.type === 'wind') {
          playGameSound("wind");
          
          // We can't modify cloudi directly here because setCloudi isn't passed in
          // Instead, we'll just make the entity disappear for now
          entitiesToRemove.push(entity.type);
        }
      }
    });
    
    if (entitiesToRemove.length > 0) {
      setGameEntities(prevEntities => 
        prevEntities.filter(entity => !entitiesToRemove.includes(entity.type))
      );
    }
  };

  return { checkCollisions };
};
