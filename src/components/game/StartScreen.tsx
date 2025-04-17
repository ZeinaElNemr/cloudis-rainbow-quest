
import React, { useState, useEffect } from "react";
import { useGame } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { Settings, Info, Play } from "lucide-react";
import AccessibilityWarning from "./AccessibilityWarning";

const StartScreen: React.FC = () => {
  const { setScene } = useGame();
  const [showWarning, setShowWarning] = useState(false);
  const [cloudiPosition, setCloudiPosition] = useState(0);

  // Cloudi floating animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCloudiPosition((prev) => (prev === 0 ? -10 : 0));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleStartGame = () => {
    setShowWarning(true);
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Sky background with moving clouds */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-light to-sky-light/80">
        {/* Decorative clouds */}
        <div className="absolute top-[10%] left-[15%] w-20 h-12 bg-white rounded-full opacity-80 animate-float" />
        <div className="absolute top-[20%] right-[25%] w-24 h-14 bg-white rounded-full opacity-70 animate-float" style={{animationDelay: "1s"}} />
        <div className="absolute top-[70%] left-[30%] w-16 h-10 bg-white rounded-full opacity-60 animate-float" style={{animationDelay: "1.5s"}} />
      </div>

      {/* Cloudi character */}
      <div 
        className="absolute left-1/2 top-1/3 transform -translate-x-1/2 transition-transform duration-1500"
        style={{ transform: `translate(-50%, ${cloudiPosition}px)` }}
      >
        <div className="w-40 h-28 bg-cloud rounded-full relative shadow-lg">
          {/* Cloudi's face */}
          <div className="absolute w-8 h-8 bg-white rounded-full left-8 top-10 shadow-inner"></div>
          <div className="absolute w-8 h-8 bg-white rounded-full right-8 top-10 shadow-inner"></div>
          <div className="absolute w-6 h-6 bg-cloud-outline rounded-full left-9 top-11"></div>
          <div className="absolute w-6 h-6 bg-cloud-outline rounded-full right-9 top-11"></div>
          <div className="absolute w-4 h-1 bg-cloud-outline rounded-full left-1/2 bottom-8 transform -translate-x-1/2"></div>
          
          {/* Cloudi's swirl */}
          <div className="absolute w-8 h-8 bg-cloud rounded-full -top-4 left-1/2 transform -translate-x-1/2 border-2 border-cloud-outline"></div>
        </div>
      </div>

      {/* Rainbow sparkle above title */}
      <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 w-64 h-5">
        <div className="w-full h-full bg-gradient-to-r from-rainbow-red via-rainbow-yellow to-rainbow-violet rounded-full opacity-70 animate-pulse-soft"></div>
      </div>

      {/* Game Title */}
      <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 text-center">
        <h1 className="text-4xl font-bold text-cloud-outline mb-2">Cloudi's</h1>
        <h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-rainbow-red via-rainbow-yellow to-rainbow-violet">
          Lost Rainbows
        </h2>
      </div>

      {/* Buttons */}
      <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 w-[280px]">
        <Button 
          onClick={handleStartGame}
          className="game-button w-full"
        >
          <Play size={20} />
          Start Game
        </Button>
        
        <Button 
          onClick={() => setScene("instructions")}
          className="game-button w-full"
        >
          <Info size={20} />
          Instructions
        </Button>
        
        <Button 
          onClick={() => setScene("settings")}
          className="game-button w-full"
        >
          <Settings size={20} />
          Settings
        </Button>
      </div>

      {/* Credits */}
      <div className="absolute bottom-4 right-4 text-sm text-cloud-outline">
        Created by Zeina ElNemr
      </div>

      {/* Accessibility Warning */}
      {showWarning && (
        <AccessibilityWarning 
          onContinue={() => {
            setShowWarning(false);
            setScene("game");
          }}
          onEnableMode={() => {
            setShowWarning(false);
            // Set accessibility mode on
            setScene("game");
          }}
        />
      )}
    </div>
  );
};

export default StartScreen;
