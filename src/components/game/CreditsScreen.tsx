
import React from "react";
import { useGame } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const CreditsScreen: React.FC = () => {
  const { setScene } = useGame();
  
  return (
    <div className="relative h-full w-full overflow-auto bg-gradient-to-b from-sky-light to-sky-light/80 p-6">
      <div className="max-w-lg mx-auto bg-white/90 rounded-xl p-8 shadow-lg mt-8">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-rainbow-red via-rainbow-yellow to-rainbow-violet">
          Credits
        </h1>
        
        <div className="space-y-6 text-center mb-10">
          <div>
            <h2 className="text-xl font-semibold text-cloud-outline">Created by</h2>
            <p className="text-2xl font-bold">Zeina ElNemr</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-cloud-outline">Directed by</h2>
            <p className="text-2xl font-bold">Zeina ElNemr</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-cloud-outline">Designed by</h2>
            <p className="text-2xl font-bold">Zeina ElNemr</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-cloud-outline">Special Thanks</h2>
            <p className="text-lg">Everyone who believes in magic and clouds! ☁️🌈</p>
          </div>
        </div>
        
        {/* Cloud decoration */}
        <div className="flex justify-center my-8">
          <div className="w-28 h-20 bg-cloud rounded-full relative shadow-lg">
            {/* Cloudi's face */}
            <div className="absolute w-6 h-6 bg-white rounded-full left-6 top-7 shadow-inner"></div>
            <div className="absolute w-6 h-6 bg-white rounded-full right-6 top-7 shadow-inner"></div>
            <div className="absolute w-4 h-4 bg-cloud-outline rounded-full left-7 top-8"></div>
            <div className="absolute w-4 h-4 bg-cloud-outline rounded-full right-7 top-8"></div>
            <div className="absolute w-8 h-1 bg-cloud-outline rounded-full left-1/2 bottom-5 transform -translate-x-1/2"></div>
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <Button 
            onClick={() => setScene("start")}
            className="game-button"
          >
            <Home size={20} />
            Back to Menu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreditsScreen;
