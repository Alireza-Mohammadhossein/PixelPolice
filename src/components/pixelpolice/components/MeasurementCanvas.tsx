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

      
      // draw completed measurements
      measurements.forEach((measurement) => {
        ctx.beginPath();
        ctx.moveTo(measurement.start.x, measurement.start.y);
        ctx.lineTo(measurement.end.x, measurement.end.y);
        ctx.stroke();


        // add circle at start point
        ctx.setLineDash([]);
        ctx.fillStyle = "#ff3b30";
        ctx.beginPath();
        ctx.arc(
          measurement.start.x,
          measurement.start.y,
          5,
          0,
          2 * Math.PI
        );
        ctx.fill();


        // add circle at end point
        ctx.fillStyle = "#0a84ff";
        ctx.beginPath();
        ctx.arc(
          measurement.end.x,
          measurement.end.y,
          5,
          0,
          2 * Math.PI
        );
        ctx.fill();

        ctx.setLineDash([6, 6]);
      });


      // draw preview line
      if (startPoint) {
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(mousePosition.x, mousePosition.y);
        ctx.stroke();

        // add circle at start point
        ctx.setLineDash([]);
        ctx.fillStyle = "#ff3b30";
        ctx.beginPath();
        ctx.arc(
          startPoint.x,
          startPoint.y,
          5,
          0,
          2 * Math.PI
        );
        ctx.fill();


        // add circle at mouse position
        ctx.fillStyle = "#0a84ff";
        ctx.beginPath();
        ctx.arc(
          mousePosition.x,
          mousePosition.y,
          5,
          0,
          2 * Math.PI
        );
        ctx.fill();

        ctx.setLineDash([6, 6]);
      }

      // add circle at mouse position
      if (!startPoint) {
        ctx.setLineDash([]);
        ctx.fillStyle = "#ffe5b4";
        ctx.beginPath();
        ctx.arc(
          mousePosition.x,
          mousePosition.y,  
        5,
          0,
          2 * Math.PI
        );
        ctx.fill();
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
