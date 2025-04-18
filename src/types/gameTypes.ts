
export interface GameEntity {
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
}

export interface CloudiEntity extends GameEntity {
  velocity: { x: number; y: number };
}

// Game parameters
export const CLOUDI_SIZE = 60;
export const RAINBOW_PIECE_SIZE = 30;
export const STORM_SIZE = 80;
export const SUNSHINE_SIZE = 40;
export const WIND_SIZE = 100;
export const CLOUDI_SPEED = 5;
export const BOOST_MULTIPLIER = 1.5;
