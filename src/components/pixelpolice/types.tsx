import { SnappableCorner } from "./snapping";

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


export interface MeasurementsCanvasProps {
  measurements: PixelPoliceMeasurement[];
  startPoint: Point | null;
  selectionPosition: Point;
  nearbyCorners: SnappableCorner[];
}