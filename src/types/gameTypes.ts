export interface GameEntity {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
}

export interface CloudiEntity {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'cloudi';
  velocity: { x: number; y: number };
}

export const CLOUDI_SIZE = 80;
export const CLOUDI_SPEED = 5;
export const BOOST_MULTIPLIER = 2;
export const DEFAULT_LIVES = 3;

// Points awarded for collecting a rainbow piece
export const POINTS_PER_RAINBOW = 10;
