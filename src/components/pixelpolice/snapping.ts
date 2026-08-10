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


// check if the corner is hide or not
function isCornerVisible(
  element: Element,
  point: Point,
  position: CornerPosition
): boolean {
  const overlay = document.querySelector(".pixel-police-overlay");

  if (overlay instanceof HTMLElement) {
    overlay.style.pointerEvents = "none";
  }

  const offset = 2;

  let checkPoints: Point[] = [];

  switch (position) {
    case "top-left":
      checkPoints = [
        { x: point.x + offset, y: point.y + offset },
        { x: point.x + offset * 2, y: point.y + offset },
        { x: point.x + offset, y: point.y + offset * 2 },
      ];
      break;

    case "top-right":
      checkPoints = [
        { x: point.x - offset, y: point.y + offset },
        { x: point.x - offset * 2, y: point.y + offset },
        { x: point.x - offset, y: point.y + offset * 2 },
      ];
      break;

    case "bottom-left":
      checkPoints = [
        { x: point.x + offset, y: point.y - offset },
        { x: point.x + offset * 2, y: point.y - offset },
        { x: point.x + offset, y: point.y - offset * 2 },
      ];
      break;

    case "bottom-right":
      checkPoints = [
        { x: point.x - offset, y: point.y - offset },
        { x: point.x - offset * 2, y: point.y - offset },
        { x: point.x - offset, y: point.y - offset * 2 },
      ];
      break;
  }

  const isVisible = checkPoints.some((checkPoint) => {
    const elementAtPoint = document.elementFromPoint(
      checkPoint.x,
      checkPoint.y
    );

    if (!elementAtPoint) {
      return false;
    }

    return (
      elementAtPoint === element ||
      element.contains(elementAtPoint)
    );
  });

  if (overlay instanceof HTMLElement) {
    overlay.style.pointerEvents = "";
  }

  return isVisible;
}




// getting nearby corners
export function getNearbyCorners(mousePosition: Point): SnappableCorner[] {
  const elements = document.querySelectorAll("*");
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
    if (
      closestDistance <= 50 &&
      isCornerVisible(
        element,
        closestCorner.point,
        closestCorner.position
      )
    ) {
      nearbyCorners.push({
        point: closestCorner.point,
        distance: closestDistance,
        element,
        position: closestCorner.position,
      });
    }


  });
  


  return nearbyCorners;
}


// choosing closet corner less than 25px
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