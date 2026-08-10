# Pixel Police

Implementation of the Pixel Police technical test.

Pixel Police is a browser-based measurement tool that allows users to measure distances between points on a webpage. It can detect nearby DOM element corners and snap the selection point to them for more accurate measurements.

## Features

- Toggle Pixel Police on and off.
- Track the mouse position across the page.
- Detect DOM element corners within 50px of the cursor.
- Display L-shaped indicators for available corners.
- Show a maximum of one corner per DOM element.
- Snap the selection point to the nearest corner within 25px.
- Use the snapped position when creating measurements.
- Display measurement lines and distances.
- Ignore obscured DOM elements when determining valid snapping targets.
- Continue working when the Profile settings panel is open.

## Tech Stack

- React
- TypeScript
- Vite
- HTML5 Canvas
- CSS
- ESLint / Oxlint

## How It Works

### Corner Detection

Pixel Police checks DOM elements and calculates the position of their four corners.

Corners within 50px of the cursor are considered nearby candidates.

For each element, only its closest corner is displayed.

### Cursor Snapping

When a valid corner is within 25px of the cursor, the selection position snaps to that corner.

The actual mouse position and the selection position are kept separate so that the cursor can continue moving normally while the measurement point snaps to the DOM corner.


### Measurements

Measurements are drawn using an HTML Canvas overlay.

The tool displays:

- A dashed measurement line
- Start and end points
- The measured distance in pixels
- A preview measurement while selecting the second point

## Getting Started

### Install dependencies
npm install

### Start the development server
npm run dev