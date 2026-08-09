import { Point } from "./types";

type SnappableCorner = {
  point: Point,
  distance: number,
  element: Element
}

export function getNearbyCorners(mousePosition: Point): SnappableCorner[] {
  const elements = document.querySelectorAll('*');

  const nearbyCorners: SnappableCorner[] = [];


  // getting ech element corners
  elements.forEach((element) => {
    const rect = element.getBoundingClientRect();

    const elementCorners: Point[] = [
      {x: rect.left, y: rect.top},
      {x: rect.right, y: rect.top},
      {x: rect.left, y: rect.bottom},
      {x: rect.right, y: rect.bottom},
    ]

    const distances = elementCorners.map((corner) => {
      return Math.hypot(
        corner.x - mousePosition.x,
        corner.y - mousePosition.y
      )
    })


    // getting closest corner to the mouse position 
    const closestDistance = Math.min(...distances);
    const closestIndex = distances.indexOf(closestDistance);
    const closestCorner = elementCorners[closestIndex];


    // getting distance less than 50px
    if (closestDistance <= 50) {
      nearbyCorners.push({
        point: closestCorner,
        distance: closestDistance,
        element,
      });
    }
  })

  
  return nearbyCorners;
}