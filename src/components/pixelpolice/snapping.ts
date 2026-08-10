import { Point } from "./types";


export type CornerPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";



export type SnappableCorner = {
  point: Point,
  distance: number,
  element: Element,
  position: CornerPosition
}


// getting nearby corners
export function getNearbyCorners(mousePosition: Point): SnappableCorner[] {
  const elements = document.querySelectorAll('*');

  const nearbyCorners: SnappableCorner[] = [];


  // getting ech element corners
  elements.forEach((element) => {
    const rect = element.getBoundingClientRect();

    const elementCorners = [
      {
        point: { x: rect.left, y: rect.top },
        position: "top-left" as CornerPosition,
      },
      {
        point: { x: rect.right, y: rect.top },
        position: "top-right" as CornerPosition,
      },
      {
        point: { x: rect.left, y: rect.bottom },
        position: "bottom-left" as CornerPosition,
      },
      {
        point: { x: rect.right, y: rect.bottom },
        position: "bottom-right" as CornerPosition,
      },
    ];

    const distances = elementCorners.map((corner) => {
      return Math.hypot(
        corner.point.x - mousePosition.x,
        corner.point.y - mousePosition.y
      )
    })


    // getting closest corner to the mouse position 
    const closestDistance = Math.min(...distances);
    const closestIndex = distances.indexOf(closestDistance);
    const closestCorner = elementCorners[closestIndex];


    // getting distance less than 50px
    if (closestDistance <= 50) {
      nearbyCorners.push({
        point: closestCorner.point,
        distance: closestDistance,
        element,
        position: closestCorner.position,
      });
    }
  })


  return nearbyCorners;
}


// choosing closet corner less than 20px
export function getSnappableCorner(nearbyCorners: SnappableCorner[]): Point | null{
  if (nearbyCorners.length === 0) {
    return null;
  } 


const closestCorner = nearbyCorners.reduce((closest, corner) => {

  if (corner.distance < closest.distance) {
    return corner;
  }

  return closest;
  });

  if (closestCorner.distance <= 25) {
    return closestCorner.point;
  }

  return null;

} 