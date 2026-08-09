import { useEffect, useState } from "react";
import './PixelPolice.css';


export default function PixelPolice() {
  const [isPixelPoliceEnabled, setIsPixelPoliceEnabled] = useState(false);

  const togglePixelPolice = () => {
    setIsPixelPoliceEnabled(!isPixelPoliceEnabled);
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
        <div className="pixel-police-overlay">
          <div className="pixel-police-panel">
            <p>Pixel Police Activated</p>
          </div>
        </div>
      )}
    </>
  )

}