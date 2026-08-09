import { useEffect, useState } from "react";
import './PixelPolice.css';


export default function PixelPolice() {
  const [isPixelPoliceEnabled, setIsPixelPoliceEnabled] = useState(false);

  const togglePixelPolice = () => {
    setIsPixelPoliceEnabled(!isPixelPoliceEnabled);
  }

  return (
    <button
      className={`pixel-police-button ${isPixelPoliceEnabled ? "enabled" : ""}`}
      onClick={togglePixelPolice}
    >
      {isPixelPoliceEnabled ? "🚨 Pixel Police 🚨" : "🚨"}
    </button>

  )

}