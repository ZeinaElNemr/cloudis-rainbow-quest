
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Pause, Play } from 'lucide-react';
import RainbowPieceIndicator from './RainbowPieceIndicator';
import { useGame } from '@/contexts/GameContext';

const GameControls: React.FC = () => {
  const { 
    setScene,
    rainbowPieces,
    totalRainbowPieces,
    isGamePaused,
    setIsGamePaused
  } = useGame();

  return (
    <>
      {/* Game UI - Top Bar */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-white/30 backdrop-blur-sm">
        <RainbowPieceIndicator collected={rainbowPieces} total={totalRainbowPieces} />
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon"
            className="bg-white/70 hover:bg-white/90"
            onClick={() => setIsGamePaused(!isGamePaused)}
          >
            {isGamePaused ? <Play size={20} /> : <Pause size={20} />}
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            className="bg-white/70 hover:bg-white/90"
            onClick={() => setScene("settings")}
          >
            <Settings size={20} />
          </Button>
        </div>
      </div>

      {/* Pause Menu */}
      {isGamePaused && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Game Paused</h2>
            <div className="flex flex-col gap-3">
              <Button 
                onClick={() => setIsGamePaused(false)}
                className="game-button"
              >
                <Play size={20} />
                Resume Game
              </Button>
              
              <Button 
                onClick={() => setScene("settings")}
                className="game-button"
              >
                <Settings size={20} />
                Settings
              </Button>
              
              <Button 
                onClick={() => setScene("start")}
                variant="outline"
                className="mt-2"
              >
                Quit Game
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameControls;
