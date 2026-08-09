import { useEffect, useState } from "react";
import './PixelPolice.css';
import { Point } from './types';



export default function PixelPolice() {
  
  const [isPixelPoliceEnabled, setIsPixelPoliceEnabled] = useState(false);
  const [mousePosition, setMousePosition] = useState<Point>({ 
    x: 0, 
    y: 0 
  });

  // toggle pixel police on and off
  const togglePixelPolice = () => {
    setIsPixelPoliceEnabled(!isPixelPoliceEnabled);
  }


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
  
  return (
    <>
      <button
        className={`pixel-police-button ${isPixelPoliceEnabled ? "enabled" : ""}`}
        onClick={togglePixelPolice}
        >
        {isPixelPoliceEnabled ? "🚨 Pixel Police 🚨" : "🚨"}
      </button>

      {isPixelPoliceEnabled && (
        <div className="pixel-police-overlay">
          <div className="pixel-police-panel">
            <h1>Pixel Police Activated</h1>
            <p>Mouse Position: <br />
              X: {Math.round(mousePosition.x)} <br />
              Y: {Math.round(mousePosition.y)}
            </p>
          </div>
        </div>
      )}
    </>
  )

}