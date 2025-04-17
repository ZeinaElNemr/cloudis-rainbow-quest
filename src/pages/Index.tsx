
import React, { useEffect } from "react";
import { GameProvider } from "@/contexts/GameContext";
import GameContainer from "@/components/game/GameContainer";
import { initializeSounds } from "@/utils/soundUtils";

const Index = () => {
  useEffect(() => {
    // Initialize all game sounds when the app loads
    initializeSounds();
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
