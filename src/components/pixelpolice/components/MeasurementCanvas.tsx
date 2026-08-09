import { useEffect, useRef } from "react";
import { Point,PixelPoliceMeasurement, MeasurementsCanvasProps } from "../types";

export default function MeasurementsCanvas({ measurements, startPoint, mousePosition }: MeasurementsCanvasProps) {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    }

  }, [measurements, startPoint, mousePosition])


  return (
    <canvas 
      ref={canvasRef}
      className="measurements-canvas"
    />
  )
}
