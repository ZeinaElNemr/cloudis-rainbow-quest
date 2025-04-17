
import React from "react";
import { useGame } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Cloud, CloudLightning, Sun } from "lucide-react";

const InstructionsScreen: React.FC = () => {
  const { setScene } = useGame();

  return (
    <div className="relative h-full w-full overflow-auto bg-gradient-to-b from-sky-light to-sky-light/80 p-6">
      <div className="max-w-2xl mx-auto bg-white/90 rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-cloud-outline">How to Help Cloudi!</h1>
        
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-cloud/20 rounded-lg">
            <div className="flex gap-2">
              <ArrowUp size={24} className="text-cloud-outline" />
              <ArrowLeft size={24} className="text-cloud-outline" />
              <ArrowDown size={24} className="text-cloud-outline" />
              <ArrowRight size={24} className="text-cloud-outline" />
            </div>
            <p className="font-medium">Use Arrow Keys or swipe (mobile) to move Cloudi.</p>
          </div>
          
          {/* Rainbow pieces */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-cloud/20 rounded-lg">
            <div className="w-8 h-8 bg-rainbow-violet rounded-full animate-pulse-soft"></div>
            <p className="font-medium">Collect 7 rainbow pieces before the sun sets!</p>
          </div>
          
          {/* Avoid storms */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-cloud/20 rounded-lg">
            <CloudLightning size={32} className="text-cloud-stormi" />
            <p className="font-medium">Avoid storm clouds and lightning bolts.</p>
          </div>
          
          {/* Sunshine */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-cloud/20 rounded-lg">
            <Sun size={32} className="text-game-sunshine" />
            <p className="font-medium">Catch sunshine orbs for a speed boost!</p>
          </div>
          
          {/* Wind */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-cloud/20 rounded-lg">
            <div className="w-8 h-8 relative">
              <div className="absolute inset-0 border-2 border-game-wind rounded-full animate-spin-slow"></div>
            </div>
            <p className="font-medium">Fly into wind currents to glide faster.</p>
          </div>
          
          {/* Complete rainbow */}
          <div className="p-4 bg-rainbow-green/20 rounded-lg">
            <p className="font-medium">Each piece brings color back to the sky. Complete the rainbow and make Cloudi happy again!</p>
          </div>
        </div>
        
        {/* Cloudi */}
        <div className="flex justify-center my-8">
          <div className="relative">
            <Cloud size={80} className="text-cloud" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-6">
              <div className="w-3 h-3 bg-cloud-outline rounded-full absolute left-1 top-1"></div>
              <div className="w-3 h-3 bg-cloud-outline rounded-full absolute right-1 top-1"></div>
              <div className="w-6 h-1 bg-cloud-outline rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <Button 
            onClick={() => setScene("start")}
            className="game-button"
          >
            Back to Menu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsScreen;
