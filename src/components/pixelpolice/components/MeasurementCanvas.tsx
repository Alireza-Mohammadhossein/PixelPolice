import { useEffect, useRef } from "react";
import { MeasurementsCanvasProps } from "../types";

export default function MeasurementsCanvas({
  measurements,
  startPoint,
  selectionPosition,
  nearbyCorners
}: MeasurementsCanvasProps) {

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


      // show closest corners
      nearbyCorners.forEach((corner) => {
        const { x, y } = corner.point;

        ctx.setLineDash([]);
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;

        const size = 10;

        ctx.beginPath();

        switch (corner.position) {
          case "top-left":
            ctx.moveTo(x, y);
            ctx.lineTo(x + size, y);

            ctx.moveTo(x, y);
            ctx.lineTo(x, y + size);
            break;

          case "top-right":
            ctx.moveTo(x, y);
            ctx.lineTo(x - size, y);

            ctx.moveTo(x, y);
            ctx.lineTo(x, y + size);
            break;

          case "bottom-left":
            ctx.moveTo(x, y);
            ctx.lineTo(x + size, y);

            ctx.moveTo(x, y);
            ctx.lineTo(x, y - size);
            break;

          case "bottom-right":
            ctx.moveTo(x, y);
            ctx.lineTo(x - size, y);

            ctx.moveTo(x, y);
            ctx.lineTo(x, y - size);
            break;
        }

        ctx.stroke();
      });
      

      // draw completed measurements
      measurements.forEach((measurement) => {
        ctx.setLineDash([6, 6]);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;

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


        // calculate the middle of the line
        const middleX = (measurement.start.x + measurement.end.x) / 2;
        const middleY = (measurement.start.y + measurement.end.y) / 2;


        // draw label background
        ctx.fillStyle = "#ffffff";

        ctx.beginPath();
        ctx.roundRect(
          middleX - 20,
          middleY - 16,
          40,
          22,
          6
        );
        ctx.fill();


        // draw label text
        ctx.fillStyle = "#222";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(
          `${measurement.distance}px`,
          middleX,
          middleY - 5
        );


      });


      // draw preview line
      if (startPoint) {
        ctx.setLineDash([6, 6]);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(selectionPosition.x, selectionPosition.y);
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
          selectionPosition.x,
          selectionPosition.y,
          5,
          0,
          2 * Math.PI
        );
        ctx.fill();

        ctx.setLineDash([6, 6]);


        // calculate the middle of the preview line
        const previewDistance = Math.round(
          Math.hypot(
            selectionPosition.x - startPoint.x,
            selectionPosition.y - startPoint.y
          )
        );

        const middleX = (startPoint.x + selectionPosition.x) / 2;
        const middleY = (startPoint.y + selectionPosition.y) / 2;


        // draw label background
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.roundRect(
          middleX - 20,
          middleY - 16,
          40,
          22,
          6
        );
        ctx.fill();


        // draw label text
        ctx.fillStyle = "#222";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(
          `${previewDistance}px`,
          middleX,
          middleY - 5
        );
      }
      

      // add circle at mouse position
      if (!startPoint) {
        ctx.setLineDash([]);
        ctx.fillStyle = "#ffe5b4";
        ctx.beginPath();
        ctx.arc(
          selectionPosition.x,
          selectionPosition.y,  
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

  }, [
      measurements, 
      startPoint, 
      nearbyCorners, 
      selectionPosition
    ])


  return (
    <canvas 
      ref={canvasRef}
      className="measurements-canvas"
    />
  )
}
