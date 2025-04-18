
import React, { useEffect } from "react";
import { GameProvider } from "@/contexts/GameContext";
import GameContainer from "@/components/game/GameContainer";
import { initializeSounds } from "@/utils/soundUtils";

const Index = () => {
  useEffect(() => {
    const loadGameAssets = async () => {
      // Initialize all game sounds when the app loads
      await initializeSounds();
      
      // Preload images for smoother gameplay
      const imageUrls = [
        // Add any image URLs you want to preload
      ];
      
      imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    };
    
    loadGameAssets();
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden">
      <GameProvider>
        <GameContainer />
      </GameProvider>
    </div>
  );
};

export default Index;
