
import React, { useState, useEffect, useRef } from "react";
import { useGame } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { Settings, Pause, Play } from "lucide-react";
import RainbowPieceIndicator from "./RainbowPieceIndicator";

// Game entities
interface GameEntity {
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
}

interface CloudiEntity extends GameEntity {
  velocity: { x: number; y: number };
}

// Game parameters
const CLOUDI_SIZE = 60;
const RAINBOW_PIECE_SIZE = 30;
const STORM_SIZE = 80;
const SUNSHINE_SIZE = 40;
const WIND_SIZE = 100;
const CLOUDI_SPEED = 5;
const BOOST_MULTIPLIER = 1.5;

const GameScreen: React.FC = () => {
  
  const { 
    setScene, 
    rainbowPieces, 
    setRainbowPieces, 
    totalRainbowPieces,
    settings,
    isGamePaused,
    setIsGamePaused,
    playGameSound
  } = useGame();
  
  const [gameEntities, setGameEntities] = useState<GameEntity[]>([]);
  const [cloudi, setCloudi] = useState<CloudiEntity>({
    x: window.innerWidth / 2 - CLOUDI_SIZE / 2,
    y: window.innerHeight / 2 - CLOUDI_SIZE / 2,
    width: CLOUDI_SIZE,
    height: CLOUDI_SIZE,
    type: 'cloudi',
    velocity: { x: 0, y: 0 }
  });
  const [boosted, setBoosted] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  
  // Set up the game when the component mounts
  useEffect(() => {
    // Initialize the game
    initializeGame();
    
    // Set up keyboard controls
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Start the game loop
    startGameLoop();
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);
  
  // Handle game pause
  useEffect(() => {
    if (isGamePaused) {
      cancelAnimationFrame(animationRef.current);
    } else {
      startGameLoop();
    }
  }, [isGamePaused]);
  
  // Update game state when settings change
  useEffect(() => {
    // Apply brightness to the canvas
    if (canvasRef.current) {
      canvasRef.current.style.filter = `brightness(${settings.brightness}%)`;
    }
  }, [settings]);
  
  // Check for game completion
  useEffect(() => {
    if (rainbowPieces >= totalRainbowPieces) {
      setScene("gameOver");
      playGameSound("victory");
    }
  }, [rainbowPieces, totalRainbowPieces, setScene, playGameSound]);
  
  const initializeGame = () => {
    // Create rainbow pieces
    const rainbowColors = [
      '#FF5E5B', // Red
      '#FFB16C', // Orange
      '#FFDE59', // Yellow
      '#8CD867', // Green
      '#4CB9E7', // Blue
      '#6A7FDB', // Indigo
      '#9B5DE5'  // Violet
    ];
    
    const newEntities: GameEntity[] = [];
    
    // Add rainbow pieces
    for (let i = 0; i < totalRainbowPieces; i++) {
      newEntities.push({
        x: Math.random() * (window.innerWidth - RAINBOW_PIECE_SIZE),
        y: Math.random() * (window.innerHeight - RAINBOW_PIECE_SIZE),
        width: RAINBOW_PIECE_SIZE,
        height: RAINBOW_PIECE_SIZE,
        type: `rainbow-${i}`,
      });
    }
    
    // Add storms
    for (let i = 0; i < 3; i++) {
      newEntities.push({
        x: Math.random() * (window.innerWidth - STORM_SIZE),
        y: Math.random() * (window.innerHeight - STORM_SIZE),
        width: STORM_SIZE,
        height: STORM_SIZE,
        type: 'storm',
      });
    }
    
    // Add sunshine
    for (let i = 0; i < 2; i++) {
      newEntities.push({
        x: Math.random() * (window.innerWidth - SUNSHINE_SIZE),
        y: Math.random() * (window.innerHeight - SUNSHINE_SIZE),
        width: SUNSHINE_SIZE,
        height: SUNSHINE_SIZE,
        type: 'sunshine',
      });
    }
    
    // Add wind currents
    for (let i = 0; i < 2; i++) {
      newEntities.push({
        x: Math.random() * (window.innerWidth - WIND_SIZE),
        y: Math.random() * (window.innerHeight - WIND_SIZE),
        width: WIND_SIZE,
        height: WIND_SIZE,
        type: 'wind',
      });
    }
    
    setGameEntities(newEntities);
  };
  
  const handleKeyDown = (e: KeyboardEvent) => {
    keysPressed.current[e.key] = true;
    
    // Prevent default browser behavior for arrow keys
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
      e.preventDefault();
    }
  };
  
  const handleKeyUp = (e: KeyboardEvent) => {
    keysPressed.current[e.key] = false;
  };
  
  const startGameLoop = () => {
    const gameLoop = () => {
      updateGame();
      renderGame();
      animationRef.current = requestAnimationFrame(gameLoop);
    };
    
    animationRef.current = requestAnimationFrame(gameLoop);
  };
  
  const updateGame = () => {
    // Update Cloudi's position based on keys pressed
    let dx = 0;
    let dy = 0;
    
    if (keysPressed.current['ArrowLeft']) dx -= 1;
    if (keysPressed.current['ArrowRight']) dx += 1;
    if (keysPressed.current['ArrowUp']) dy -= 1;
    if (keysPressed.current['ArrowDown']) dy += 1;
    
    // Normalize diagonal movement
    if (dx !== 0 && dy !== 0) {
      dx *= 0.7071; // 1/sqrt(2)
      dy *= 0.7071;
    }
    
    // Apply speed and boost if active
    const speed = boosted ? CLOUDI_SPEED * BOOST_MULTIPLIER : CLOUDI_SPEED;
    dx *= speed;
    dy *= speed;
    
    // Update Cloudi's position
    setCloudi(prev => {
      const newX = Math.max(0, Math.min(window.innerWidth - prev.width, prev.x + dx));
      const newY = Math.max(0, Math.min(window.innerHeight - prev.height, prev.y + dy));
      
      return {
        ...prev,
        x: newX,
        y: newY,
        velocity: { x: dx, y: dy }
      };
    });
    
    // Check collisions
    checkCollisions();
  };
  
  const checkCollisions = () => {
    // Create a temporary array to store entities to be removed
    const entitiesToRemove: string[] = [];
    
    // Check each entity for collision with Cloudi
    gameEntities.forEach(entity => {
      if (
        cloudi.x < entity.x + entity.width &&
        cloudi.x + cloudi.width > entity.x &&
        cloudi.y < entity.y + entity.height &&
        cloudi.y + cloudi.height > entity.y
      ) {
        // Handle collision based on entity type
        if (entity.type.startsWith('rainbow')) {
          entitiesToRemove.push(entity.type);
          // Fix: update number directly instead of using a callback function
          setRainbowPieces(rainbowPieces + 1);
          
          // Play sound
          playGameSound("collect");
          
          // Vibrate if enabled
          if (settings.vibration && navigator.vibrate) {
            navigator.vibrate(100);
          }
        } else if (entity.type === 'storm') {
          // Play storm sound
          playGameSound("storm");
          
          // Lose the game or reduce health
          // For now, just go back to the start screen
          setScene("start");
        } else if (entity.type === 'sunshine') {
          entitiesToRemove.push(entity.type);
          
          // Play powerup sound
          playGameSound("sunshine");
          
          setBoosted(true);
          
          // Boost lasts for 3 seconds
          setTimeout(() => {
            setBoosted(false);
          }, 3000);
        } else if (entity.type === 'wind') {
          // Play wind sound
          playGameSound("wind");
          
          // Increase Cloudi's velocity in a random direction
          setCloudi(prev => ({
            ...prev,
            velocity: {
              x: prev.velocity.x * 1.2,
              y: prev.velocity.y * 1.2
            }
          }));
        }
      }
    });
    
    // Remove entities that have been collected
    if (entitiesToRemove.length > 0) {
      setGameEntities(prev => 
        prev.filter(entity => !entitiesToRemove.includes(entity.type))
      );
    }
  };
  
  const renderGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background (sky)
    const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    skyGradient.addColorStop(0, '#C1E8FF');
    skyGradient.addColorStop(1, '#E2EAFC');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw decorative background clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    for (let i = 0; i < 5; i++) {
      const x = (Date.now() / 10000 + i * 0.2) % 1 * canvas.width;
      const y = canvas.height * (0.1 + i * 0.15);
      const width = 100 + i * 20;
      const height = 60 + i * 10;
      
      ctx.beginPath();
      ctx.ellipse(x, y, width/2, height/2, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw game entities
    gameEntities.forEach(entity => {
      if (entity.type.startsWith('rainbow')) {
        // Get the rainbow piece index
        const index = parseInt(entity.type.split('-')[1]);
        const rainbowColors = [
          '#FF5E5B', // Red
          '#FFB16C', // Orange
          '#FFDE59', // Yellow
          '#8CD867', // Green
          '#4CB9E7', // Blue
          '#6A7FDB', // Indigo
          '#9B5DE5'  // Violet
        ];
        
        // Draw a sparkling rainbow piece
        ctx.fillStyle = rainbowColors[index % rainbowColors.length];
        ctx.beginPath();
        ctx.arc(
          entity.x + entity.width/2, 
          entity.y + entity.height/2, 
          entity.width/2 * (0.8 + Math.sin(Date.now() / 300) * 0.2), 
          0, 
          Math.PI * 2
        );
        ctx.fill();
        
        // Add sparkle
        if (!settings.accessibilityMode) {
          const sparkleTime = Date.now() / 500;
          for (let i = 0; i < 4; i++) {
            const angle = sparkleTime + i * Math.PI/2;
            const distance = 5 + Math.sin(sparkleTime * 2) * 2;
            const sx = entity.x + entity.width/2 + Math.cos(angle) * distance;
            const sy = entity.y + entity.height/2 + Math.sin(angle) * distance;
            
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(sx, sy, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else if (entity.type === 'storm') {
        // Draw storm cloud
        ctx.fillStyle = '#465362';
        ctx.beginPath();
        ctx.ellipse(
          entity.x + entity.width/2, 
          entity.y + entity.height/2, 
          entity.width/2, 
          entity.height/3, 
          0, 
          0, 
          Math.PI * 2
        );
        ctx.fill();
        
        // Add lightning if accessibility mode is off
        if (!settings.accessibilityMode && Math.random() < 0.05) {
          ctx.strokeStyle = '#F9DC5C';
          ctx.lineWidth = 3;
          ctx.beginPath();
          const lightningX = entity.x + entity.width/2;
          const startY = entity.y + entity.height/2;
          ctx.moveTo(lightningX, startY);
          ctx.lineTo(lightningX - 10, startY + 20);
          ctx.lineTo(lightningX + 5, startY + 25);
          ctx.lineTo(lightningX - 15, startY + 45);
          ctx.stroke();
        }
      } else if (entity.type === 'sunshine') {
        // Draw sunshine orb
        ctx.fillStyle = '#FFDE59';
        ctx.beginPath();
        ctx.arc(
          entity.x + entity.width/2, 
          entity.y + entity.height/2, 
          entity.width/2, 
          0, 
          Math.PI * 2
        );
        ctx.fill();
        
        // Add rays
        ctx.strokeStyle = '#FFDE59';
        ctx.lineWidth = 2;
        const numRays = 8;
        const time = Date.now() / 1000;
        
        for (let i = 0; i < numRays; i++) {
          const angle = time + (i * Math.PI * 2 / numRays);
          const innerRadius = entity.width/2;
          const outerRadius = entity.width/2 + 8;
          
          ctx.beginPath();
          ctx.moveTo(
            entity.x + entity.width/2 + Math.cos(angle) * innerRadius,
            entity.y + entity.height/2 + Math.sin(angle) * innerRadius
          );
          ctx.lineTo(
            entity.x + entity.width/2 + Math.cos(angle) * outerRadius,
            entity.y + entity.height/2 + Math.sin(angle) * outerRadius
          );
          ctx.stroke();
        }
      } else if (entity.type === 'wind') {
        // Draw wind current
        ctx.strokeStyle = '#E2EAFC';
        ctx.lineWidth = 3;
        
        const time = Date.now() / 1000;
        const centerX = entity.x + entity.width/2;
        const centerY = entity.y + entity.height/2;
        
        for (let i = 0; i < 3; i++) {
          const radius = 10 + i * 15;
          const rotation = time * (i + 1) * 0.2;
          
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, rotation, rotation + Math.PI * 1.5);
          ctx.stroke();
        }
      }
    });
    
    // Draw Cloudi
    ctx.fillStyle = '#A6DCEF';
    ctx.beginPath();
    ctx.ellipse(
      cloudi.x + cloudi.width/2, 
      cloudi.y + cloudi.height/2, 
      cloudi.width/2, 
      cloudi.height/3, 
      0, 
      0, 
      Math.PI * 2
    );
    ctx.fill();
    
    // Draw Cloudi's face
    const eyeSize = 8;
    ctx.fillStyle = '#33415C';
    
    // Eyes
    ctx.beginPath();
    ctx.arc(
      cloudi.x + cloudi.width/2 - 15, 
      cloudi.y + cloudi.height/2, 
      eyeSize/2, 
      0, 
      Math.PI * 2
    );
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(
      cloudi.x + cloudi.width/2 + 15, 
      cloudi.y + cloudi.height/2, 
      eyeSize/2, 
      0, 
      Math.PI * 2
    );
    ctx.fill();
    
    // Mouth (happy)
    ctx.beginPath();
    ctx.arc(
      cloudi.x + cloudi.width/2, 
      cloudi.y + cloudi.height/2 + 10, 
      10, 
      0, 
      Math.PI
    );
    ctx.stroke();
    
    // Draw boost effect if active
    if (boosted) {
      ctx.fillStyle = 'rgba(255, 222, 89, 0.3)';
      ctx.beginPath();
      ctx.arc(
        cloudi.x + cloudi.width/2, 
        cloudi.y + cloudi.height/2, 
        cloudi.width/1.5, 
        0, 
        Math.PI * 2
      );
      ctx.fill();
    }
  };
  
  return (
    <div className="relative h-full w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
      
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
    </div>
  );
};

export default GameScreen;
