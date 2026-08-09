export interface Point {
  x: number;
  y: number;
}

export interface PixelPoliceMeasurement {
  id: number;
  start: Point;
  end: Point;
  distance: number;
}