
import React, { createContext, useContext, useState, useEffect } from "react";
import { playSound, playBackgroundMusic, pauseBackgroundMusic, setMusicVolume, setSoundEffectsVolume } from "../utils/soundUtils";

type GameScene = "start" | "instructions" | "settings" | "game" | "gameOver" | "credits";

type SettingsType = {
  sound: boolean;
  brightness: number;
  vibration: boolean;
  accessibilityMode: boolean;
};

type GameContextType = {
  scene: GameScene;
  setScene: (scene: GameScene) => void;
  settings: SettingsType;
  updateSettings: (settings: Partial<SettingsType>) => void;
  rainbowPieces: number;
  setRainbowPieces: (pieces: number) => void;
  totalRainbowPieces: number;
  gameTime: number;
  isGamePaused: boolean;
  setIsGamePaused: (paused: boolean) => void;
  resetGame: () => void;
  playGameSound: (sound: string) => void;
};

const defaultSettings: SettingsType = {
  sound: true,
  brightness: 100,
  vibration: true,
  accessibilityMode: false,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scene, setScene] = useState<GameScene>("start");
  const [settings, setSettings] = useState<SettingsType>(defaultSettings);
  const [rainbowPieces, setRainbowPieces] = useState<number>(0);
  const [gameTime, setGameTime] = useState<number>(0);
  const [isGamePaused, setIsGamePaused] = useState<boolean>(false);
  const [totalRainbowPieces] = useState<number>(7); // Total pieces to collect

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("cloudiGameSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save settings to localStorage when changed
  useEffect(() => {
    localStorage.setItem("cloudiGameSettings", JSON.stringify(settings));
  }, [settings]);

  // Game timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (scene === "game" && !isGamePaused) {
      timer = setInterval(() => {
        setGameTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [scene, isGamePaused]);

  // Handle scene changes and associated sounds
  useEffect(() => {
    if (settings.sound) {
      if (scene === "game") {
        playBackgroundMusic();
      } else if (scene === "gameOver") {
        playSound("gameOver");
        pauseBackgroundMusic();
      }
    }
  }, [scene, settings.sound]);

  // Pause and resume music based on game pause state
  useEffect(() => {
    if (scene === "game" && settings.sound) {
      if (isGamePaused) {
        pauseBackgroundMusic();
      } else {
        playBackgroundMusic();
      }
    }
  }, [isGamePaused, scene, settings.sound]);

  // Handle sound settings changes
  useEffect(() => {
    if (!settings.sound) {
      pauseBackgroundMusic();
    } else if (scene === "game" && !isGamePaused) {
      playBackgroundMusic();
    }
  }, [settings.sound, scene, isGamePaused]);

  const updateSettings = (newSettings: Partial<SettingsType>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetGame = () => {
    setRainbowPieces(0);
    setGameTime(0);
    setIsGamePaused(false);
  };

  const playGameSound = (sound: string) => {
    if (settings.sound) {
      playSound(sound);
    }
  };

  return (
    <GameContext.Provider
      value={{
        scene,
        setScene,
        settings,
        updateSettings,
        rainbowPieces,
        setRainbowPieces,
        totalRainbowPieces,
        gameTime,
        isGamePaused,
        setIsGamePaused,
        resetGame,
        playGameSound,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
