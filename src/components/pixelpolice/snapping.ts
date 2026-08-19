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



// helper function to check is the corner behind the panel
function isCornerBehindPanel(point: Point): boolean {
  const panel = document.querySelector(
    '[role="dialog"][data-state="open"]'
  );

  if (!(panel instanceof HTMLElement)) {
    return false;
  }

  const rect = panel.getBoundingClientRect();
  
  console.log(rect)

  return (
    point.x >= rect.left &&
    point.x <= rect.right &&
    point.y >= rect.top &&
    point.y <= rect.bottom
  );
}




// getting nearby corners
export function getNearbyCorners(mousePosition: Point, elements:Element[]): SnappableCorner[] {
  // const elements = document.body.querySelectorAll('#root *');

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
      !isCornerBehindPanel(closestCorner.point)
    ) {
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

// export function getSnappableCorner(nearbyCorners: SnappableCorner[]): Point | null{
//   if (nearbyCorners.length === 0) {
//     return null;
//   } 


//   const closestCorner = nearbyCorners.reduce((closest, corner) => {

//     if (corner.distance < closest.distance) {
//       return corner;
//     }

//     return closest;

//   });


//   if (closestCorner.distance <= 25) {
//     return closestCorner.point;
//   }

//   return null;

// } 



export function getSnappableCorner(nearbyCorners: SnappableCorner[]): Point | null {
  if (nearbyCorners.length === 0) {
    return null;
  }

  let closestCorner = nearbyCorners[0];

  for (const corner of nearbyCorners) {
    if (corner.distance < closestCorner.distance) {
      closestCorner = corner;
    }
  }

  return closestCorner.distance <= 25 ? closestCorner.point : null;
}