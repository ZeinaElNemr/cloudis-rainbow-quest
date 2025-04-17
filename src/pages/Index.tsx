
import React from "react";
import { GameProvider } from "@/contexts/GameContext";
import GameContainer from "@/components/game/GameContainer";

const Index = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <GameProvider>
        <GameContainer />
      </GameProvider>
    </div>
  );
};

export default Index;
