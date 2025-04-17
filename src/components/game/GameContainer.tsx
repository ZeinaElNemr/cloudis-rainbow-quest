
import React from "react";
import { useGame } from "@/contexts/GameContext";
import StartScreen from "./StartScreen";
import InstructionsScreen from "./InstructionsScreen";
import SettingsScreen from "./SettingsScreen";
import GameScreen from "./GameScreen";
import GameOverScreen from "./GameOverScreen";
import CreditsScreen from "./CreditsScreen";

const GameContainer: React.FC = () => {
  const { scene } = useGame();

  return (
    <div className="w-full h-full overflow-hidden">
      {scene === "start" && <StartScreen />}
      {scene === "instructions" && <InstructionsScreen />}
      {scene === "settings" && <SettingsScreen />}
      {scene === "game" && <GameScreen />}
      {scene === "gameOver" && <GameOverScreen />}
      {scene === "credits" && <CreditsScreen />}
    </div>
  );
};

export default GameContainer;
