import React, {useState, useEffect} from 'react'

export default function Alphabet() {
  const letters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ]

  const randomColor = () => {
    const hex = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += hex[Math.floor(Math.random() * 16)]
    }
    return color
  }

  const renderLetter = (letter) => {
    return (
      <div
        style={{
          backgroundColor: randomColor(), // Set the background color to a random color
          color: randomColor(), // Set the text color to a random color
          fontSize: '50px', // Set the font size to 50 pixels
          padding: '30px', // Set the padding to 10 pixels
          margin: '5px', // Set the margin to 5 pixels
          display: 'inline-block', // Set the display to inline-block
        }}
      >
        {letter}
      </div>
    )
  }

  return (
    <div>
      <h1>Learn A to Z with fun!</h1>
      {letters.map(renderLetter)}
    </div>
  )
}
