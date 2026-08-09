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

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "#ffffff";
      ctx.fillStyle = "#ffffff";
      ctx.setLineDash([6, 6]);

      
      // Draw completed measurements
      measurements.forEach((measurement) => {
        ctx.beginPath();
        ctx.moveTo(measurement.start.x, measurement.start.y);
        ctx.lineTo(measurement.end.x, measurement.end.y);
        ctx.stroke();
      });


      // Draw preview line
      if (startPoint) {
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(mousePosition.x, mousePosition.y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);

    }


    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
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
