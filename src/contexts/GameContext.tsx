
import React, { createContext, useContext, useState, useEffect } from "react";
import { playSound, playBackgroundMusic, pauseBackgroundMusic, setMusicVolume, setSoundEffectsVolume } from "../utils/soundUtils";
import { DEFAULT_LIVES } from "@/types/gameTypes";

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
  score: number;
  setScore: (score: number) => void;
  lives: number;
  setLives: (lives: number) => void;
  gameResult: "victory" | "defeat" | null;
  setGameResult: (result: "victory" | "defeat" | null) => void;
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
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(DEFAULT_LIVES);
  const [gameResult, setGameResult] = useState<"victory" | "defeat" | null>(null);

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
        pauseBackgroundMusic();
        if (gameResult === "victory") {
          playSound("victory");
        } else if (gameResult === "defeat") {
          playSound("gameOver");
        }
      }
    }
  }, [scene, settings.sound, gameResult]);

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
    setScore(0);
    setLives(DEFAULT_LIVES);
    setGameResult(null);
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
        score,
        setScore,
        lives,
        setLives,
        gameResult,
        setGameResult
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
