import React, {useEffect, useRef} from 'react'
import Layout from '@theme/Layout'

const Canvas = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create the alphabet of characters
    const katakana =
      'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン'
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const nums = '0123456789'
    const alphabet = katakana + latin + nums

    // Calculate the number of columns based on font size and window width
    const fontSize = 16
    const columns = canvas.width / fontSize

    // Create an array to store and render the raindrops
    const rainDrops = []
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1
    }

    // Define a draw function to create the matrix rain effect
    const draw = () => {
      // Paint the whole canvas with a transparent black color
      context.fillStyle = 'rgba(0, 0, 0, 0.05)'
      context.fillRect(0, 0, canvas.width, canvas.height)

      // Loop through the columns and draw the characters with a green color and a white head
      context.fillStyle = '#0f0'
      context.font = fontSize + 'px monospace'
      for (let i = 0; i < rainDrops.length; i++) {
        // Pick a random character from the alphabet
        const text = alphabet[Math.floor(Math.random() * alphabet.length)]
        // Get the x and y coordinates of the raindrop
        const x = i * fontSize
        const y = rainDrops[i] * fontSize
        // Draw the character on the canvas
        context.fillText(text, x, y)
        // Draw a white character at the head of the raindrop
        context.fillStyle = '#fff'
        context.fillText(text, x, y - fontSize)
        // Reset the color to green for the next character
        context.fillStyle = '#0f0'
        // Randomly reset the y coordinate to create a continuous effect
        if (y > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0
        }
        // Increment the y coordinate for the next loop
        rainDrops[i]++
      }
    }

    // Use requestAnimationFrame to animate the effect
    let animationFrameId
    const renderFrame = () => {
      animationFrameId = window.requestAnimationFrame(renderFrame)
      draw()
    }
    renderFrame()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  //   return <canvas ref={canvasRef} />

  return (
    <Layout noFooter>
      <canvas ref={canvasRef} />
    </Layout>
  )
}

export default Canvas
