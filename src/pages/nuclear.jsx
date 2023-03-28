import React from 'react'

import Sketch from 'react-p5'

// Define a function component called Explosion
export default function Explosion(props) {
  // Define some variables for the animation
  let x = 0 // The x position of the explosion center
  let y = 0 // The y position of the explosion center
  let r = 0 // The radius of the explosion
  let c = 255 // The color of the explosion

  // Define a setup function for p5.js
  const setup = (p5, canvasParentRef) => {
    // Create a canvas element and attach it to the parent component
    p5.createCanvas(300, 300).parent(canvasParentRef)
    // Set the background color to black
    p5.background(0)
    // Set the initial position of the explosion center to the center of the canvas
    x = p5.width / 2
    y = p5.height / 2
  }

  // Define a draw function for p5.js
  const draw = (p5) => {
    // Increase the radius of the explosion by a random amount
    r += p5.random(1, 10)
    // Decrease the color of the explosion by a random amount
    c -= p5.random(1, 10)
    // If the color reaches zero, reset the animation
    if (c < 0) {
      r = 0
      c = 255
      p5.background(0)
    }
    // Set the stroke color and weight for the explosion circle
    p5.stroke(c, c, 0)
    p5.strokeWeight(10)
    // Draw a circle with the current position, radius, and color
    p5.circle(x, y, r)
  }

  // Return JSX with a Sketch component that takes setup and draw functions as props
  return <Sketch setup={setup} draw={draw} />
}
