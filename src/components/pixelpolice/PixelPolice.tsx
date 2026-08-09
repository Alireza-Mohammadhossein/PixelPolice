import { useEffect, useState } from "react";
import './PixelPolice.css';
import { Point, PixelPoliceMeasurement } from './types';



export default function PixelPolice() {
  
  const [isPixelPoliceEnabled, setIsPixelPoliceEnabled] = useState(false);
  const [mousePosition, setMousePosition] = useState<Point>({ 
    x: 0, 
    y: 0 
  });
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [endPoint, setEndPoint] = useState<Point | null>(null);
  const [measurements, setMeasurements] = useState<PixelPoliceMeasurement[]>([]);


  // toggle pixel police on and off
  const togglePixelPolice = () => {
    setIsPixelPoliceEnabled(!isPixelPoliceEnabled);
  }


  // getting mouse position when pixel police is enabled
  useEffect(() => {
    if(!isPixelPoliceEnabled) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ 
        x: event.clientX, 
        y: event.clientY 
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };

  },[isPixelPoliceEnabled]);


  const handleMouseClick = () => {
    if (!startPoint) {
      setStartPoint(mousePosition);
      return;
    }

    const distance = Math.round(
      Math.hypot(
        mousePosition.x - startPoint.x, 
        mousePosition.y - startPoint.y
      )
    )

    const PixelPoliceMeasurement: PixelPoliceMeasurement = {
      id: Date.now(),
      start: startPoint,
      end: mousePosition,
      distance: distance
    }

    setMeasurements([...measurements, PixelPoliceMeasurement]);

    console.log(measurements);

    setStartPoint(null);
  }
  
  return (
    <>
      <button
        className={`pixel-police-button ${isPixelPoliceEnabled ? "enabled" : ""}`}
        onClick={togglePixelPolice}
        >
        {isPixelPoliceEnabled ? "🚨 Pixel Police 🚨" : "🚨"}
      </button>

      {isPixelPoliceEnabled && (
        <div 
          className="pixel-police-overlay"
          onClick={handleMouseClick}
        >
          <div className="pixel-police-panel">
            <h1>Pixel Police Activated</h1>
            <p>Mouse Position: <br />
              X: {Math.round(mousePosition.x)} <br />
              Y: {Math.round(mousePosition.y)}
            </p>
            <p>
              Measurements: {measurements.length}
            </p>
            {startPoint && (
              <p>
                Selecting second point...
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )

}