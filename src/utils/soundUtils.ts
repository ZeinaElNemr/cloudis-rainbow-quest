
// Array of audio elements for sound effects
const soundEffects: { [key: string]: HTMLAudioElement } = {};
// Background music audio element
let backgroundMusic: HTMLAudioElement | null = null;

// Initialize sounds
export const initializeSounds = () => {
  // Create and preload background music
  backgroundMusic = new Audio('/sounds/background-music.mp3');
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.5;
  
  // Create and preload sound effects
  const effectPaths = {
    collect: '/sounds/collect.mp3',
    storm: '/sounds/storm.mp3',
    sunshine: '/sounds/powerup.mp3',
    wind: '/sounds/wind.mp3',
    gameOver: '/sounds/game-over.mp3',
    victory: '/sounds/victory.mp3',
    click: '/sounds/click.mp3',
    start: '/sounds/start.mp3',
    hit: '/sounds/hit.mp3'  // Added hit sound for damage
  };
  
  // Preload all sound effects
  Object.entries(effectPaths).forEach(([key, path]) => {
    const audio = new Audio(path);
    audio.preload = 'auto';
    soundEffects[key] = audio;
  });
};

// Play a sound effect
export const playSound = (sound: string) => {
  if (!soundEffects[sound]) return;
  
  // Create a clone to allow overlapping sounds
  const soundClone = soundEffects[sound].cloneNode(true) as HTMLAudioElement;
  soundClone.play().catch(() => {
    console.log('Sound play prevented by browser. User interaction needed first.');
  });
};

// Play background music
export const playBackgroundMusic = () => {
  if (!backgroundMusic) return;
  
  backgroundMusic.play().catch(() => {
    console.log('Music play prevented by browser. User interaction needed first.');
  });
};

// Pause background music
export const pauseBackgroundMusic = () => {
  if (!backgroundMusic) return;
  backgroundMusic.pause();
};

// Stop background music
export const stopBackgroundMusic = () => {
  if (!backgroundMusic) return;
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
};

// Set music volume
export const setMusicVolume = (volume: number) => {
  if (!backgroundMusic) return;
  backgroundMusic.volume = Math.max(0, Math.min(1, volume));
};

// Set sound effects volume
export const setSoundEffectsVolume = (volume: number) => {
  const normalizedVolume = Math.max(0, Math.min(1, volume));
  Object.values(soundEffects).forEach(sound => {
    sound.volume = normalizedVolume;
  });
};

// Check if browser allows autoplay
export const canAutoplay = async (): Promise<boolean> => {
  const audio = new Audio();
  audio.src = "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
  try {
    await audio.play();
    return true;
  } catch (e) {
    return false;
  }
};
