
import React, { useEffect, useState } from "react";
import { useGame } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { Home, RotateCcw } from "lucide-react";

const GameOverScreen: React.FC = () => {
  const { setScene, resetGame, gameTime } = useGame();
  const [rainbowVisible, setRainbowVisible] = useState(false);
  
  // Show rainbow with animation after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setRainbowVisible(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Format game time into minutes and seconds
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const handlePlayAgain = () => {
    resetGame();
    setScene("game");
  };
  
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-sky-light to-sky-light/70">
      {/* Cloud floats in the background */}
      <div className="absolute top-[10%] left-[15%] w-20 h-12 bg-white rounded-full opacity-80 animate-float"></div>
      <div className="absolute top-[20%] right-[25%] w-24 h-14 bg-white rounded-full opacity-70 animate-float" style={{animationDelay: "1s"}}></div>
      <div className="absolute top-[70%] left-[30%] w-16 h-10 bg-white rounded-full opacity-60 animate-float" style={{animationDelay: "1.5s"}}></div>
      
      {/* Rainbow */}
      <div 
        className={`absolute top-[25%] left-0 right-0 w-full h-40 transform ${rainbowVisible ? 'animate-rainbow-appear' : 'opacity-0 scale-90'}`}
      >
        <div className="relative h-full">
          <div className="absolute top-0 left-0 right-0 h-full rounded-t-full bg-gradient-to-r from-rainbow-red via-rainbow-yellow to-rainbow-violet opacity-70"></div>
        </div>
      </div>
      
      {/* Happy Cloudi */}
      <div className="absolute left-1/2 top-[45%] transform -translate-x-1/2 -translate-y-1/2 animate-float">
        <div className="w-40 h-28 bg-cloud rounded-full relative shadow-lg">
          {/* Cloudi's face - extra happy */}
          <div className="absolute w-8 h-8 bg-white rounded-full left-8 top-10 shadow-inner"></div>
          <div className="absolute w-8 h-8 bg-white rounded-full right-8 top-10 shadow-inner"></div>
          <div className="absolute w-6 h-6 bg-cloud-outline rounded-full left-9 top-11"></div>
          <div className="absolute w-6 h-6 bg-cloud-outline rounded-full right-9 top-11"></div>
          <div className="absolute w-12 h-6 bg-cloud rounded-full left-1/2 bottom-6 transform -translate-x-1/2"></div>
          <div className="absolute w-10 h-1 bg-cloud-outline rounded-full left-1/2 bottom-4 transform -translate-x-1/2 rotate-180"></div>
          
          {/* Heart bubbles for extra happiness */}
          <div className="absolute -top-4 -left-2 text-2xl animate-pulse-soft">❤️</div>
          <div className="absolute -top-6 right-0 text-2xl animate-pulse-soft" style={{animationDelay: "0.5s"}}>✨</div>
        </div>
      </div>
      
      {/* Victory text */}
      <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 text-center">
        <h1 className="text-4xl font-bold text-rainbow-indigo mb-2">Rainbow Complete!</h1>
        <p className="text-xl text-cloud-outline mb-6">You collected all the rainbow pieces!</p>
        <p className="text-lg text-cloud-outline mb-2">Your time: {formatTime(gameTime)}</p>
      </div>
      
      {/* Action buttons */}
      <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 flex flex-col gap-4 w-64">
        <Button 
          onClick={handlePlayAgain}
          className="game-button"
        >
          <RotateCcw size={20} />
          Play Again
        </Button>
        
        <Button 
          onClick={() => {
            resetGame();
            setScene("start");
          }}
          className="game-button"
        >
          <Home size={20} />
          Back to Menu
        </Button>
      </div>
      
      {/* Credits */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-cloud-outline text-center">
        Created, Directed & Designed by Zeina ElNemr
      </div>
    </div>
  );
};

export default GameOverScreen;
