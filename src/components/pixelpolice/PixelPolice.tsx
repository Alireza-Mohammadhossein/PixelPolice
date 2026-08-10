import { useEffect, useState } from "react";
import './PixelPolice.css';
import { Point, PixelPoliceMeasurement } from './types';
import MeasurementsCanvas from "./components/MeasurementCanvas";
import { getNearbyCorners, SnappableCorner, getSnappableCorner } from "./snapping";




export default function PixelPolice() {
  
  const [isPixelPoliceEnabled, setIsPixelPoliceEnabled] = useState(false);

  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [measurements, setMeasurements] = useState<PixelPoliceMeasurement[]>([]);

  const [nearbyCorners, setNearbyCorners] = useState<SnappableCorner[]>([]);

  const [selectionPosition, setSelectionPosition] = useState<Point>({
    x: 0,
    y: 0
  });


  // reset measurements
  const resetMeasurements = () => {
    setMeasurements([]);
    setStartPoint(null);
  };

  
  // toggle pixel police on and off
  const togglePixelPolice = () => {
   
    if (isPixelPoliceEnabled) {
      resetMeasurements();
    }

    setIsPixelPoliceEnabled((prev) => !prev);
  }


  // getting mouse position and nearby corners when pixel police is enabled
  useEffect(() => {
    if(!isPixelPoliceEnabled) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const position = {
        x: event.clientX,
        y: event.clientY
      };


      const corners = getNearbyCorners(position);

      setNearbyCorners(corners);

      const snapPoint = getSnappableCorner(corners);

      if (snapPoint) {
        setSelectionPosition(snapPoint);
      } else {
        setSelectionPosition(position);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };

  },[isPixelPoliceEnabled]);


  // handle mouse click to set start and end points for measurement
  const handleMouseClick = () => {
    if (!startPoint) {
      setStartPoint(selectionPosition);
      return;
    }

    const distance = Math.round(
      Math.hypot(
        selectionPosition.x - startPoint.x,
        selectionPosition.y - startPoint.y
      )
    );

    const measurement: PixelPoliceMeasurement = {
      id: Date.now(),
      start: startPoint,
      end: selectionPosition,
      distance: distance
    };

    setMeasurements((prev) => [
      ...prev,
      measurement
    ]);

    setStartPoint(null);
  };
  

  useEffect(() => {
    if (!isPixelPoliceEnabled) {
      return;
    }
    
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      if (target.closest(".pixel-police-overlay")) {
        event.stopPropagation();
      }
    };

    document.addEventListener(
      "pointerdown",
      handlePointerDown,
      true
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
        true
      );
    };
  }, [isPixelPoliceEnabled]);
  



  return (
    <>
      <button
        className={`pixel-police-button ${isPixelPoliceEnabled ? "enabled" : ""}`}
        onPointerDown={(event) => event.stopPropagation()}
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
            nearbyCorners={nearbyCorners}
            selectionPosition={selectionPosition}
          />

          <div className="pixel-police-panel">
            

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