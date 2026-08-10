import { useEffect, useState } from "react";
import './PixelPolice.css';
import { Point, PixelPoliceMeasurement } from './types';
import MeasurementsCanvas from "./components/MeasurementCanvas";
import { SnappableCorner ,getNearbyCorners } from "./snapping";




export default function PixelPolice() {
  
  const [isPixelPoliceEnabled, setIsPixelPoliceEnabled] = useState(false);
  const [mousePosition, setMousePosition] = useState<Point>({ 
    x: 0, 
    y: 0 
  });
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [measurements, setMeasurements] = useState<PixelPoliceMeasurement[]>([]);

  const [nearbyCorners, setNearbyCorners] = useState<SnappableCorner[]>([]);


  // reset measurements
  const resetMeasurements = () => {
    setMeasurements([]);
    setStartPoint(null);
    setMousePosition({ x: 0, y: 0 });
  };

  
  // toggle pixel police on and off
  const togglePixelPolice = () => {
   
    if (isPixelPoliceEnabled) {
      resetMeasurements();
    }

    setIsPixelPoliceEnabled((prev) => !prev);
  }


  // getting mouse position when pixel police is enabled
  useEffect(() => {
    if(!isPixelPoliceEnabled) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const position = {
        x: event.clientX,
        y: event.clientY
      };

      setMousePosition(position);

      const corners = getNearbyCorners(position);

      console.log(corners)
      setNearbyCorners(corners);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };

  },[isPixelPoliceEnabled]);


  // handle mouse click to set start and end points for measurement
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
          <MeasurementsCanvas
            measurements={measurements}
            startPoint={startPoint}
            mousePosition={mousePosition}
          />

          <div className="pixel-police-panel">
            
            {/* <p>Mouse Position: <br />
              X: {Math.round(mousePosition.x)} <br />
              Y: {Math.round(mousePosition.y)}
            </p>
            <p>
              Measurements: {measurements.length}
            </p> */}

            {measurements.length === 0 && (!startPoint) && (
              <p>No measurements yet.</p>
            )}

            
            {measurements.length > 0 && (
              <h4>Measurements</h4>
            )}


            {measurements.map((measurement, index) => (
              <div
                key={measurement.id}
                className="measurement-item"
              >
                <span>#{index + 1}</span>

                <span>{measurement.distance}px</span>
              </div>
            ))}


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