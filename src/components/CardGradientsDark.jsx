import React, {useEffect} from 'react'

const gradients = [
  'linear-gradient(109.6deg, rgba(209, 0, 116, 1) 11.2%, rgba(110, 44, 107, 1) 91.1%)',
  'linear-gradient( 35.2deg,  rgba(0,119,182,1) -18.7%, rgba(8,24,68,1) 54.3% )',
  'radial-gradient( circle farthest-corner at 10% 20%,  rgba(14,174,87,1) 0%, rgba(12,116,117,1) 90% )',
  'linear-gradient( 358.4deg,  rgba(249,151,119,1) -2.1%, rgba(98,58,162,1) 90% )',
  'linear-gradient( 109.6deg,  rgba(15,2,2,1) 11.2%, rgba(36,163,190,1) 91.1% )',
  'linear-gradient( 113.3deg,  rgba(217,9,27,1) 6.9%, rgba(22,68,150,1) 75% )',
  'linear-gradient( 97.3deg,  rgba(25,50,70,0.81) 10.7%, rgba(155,65,25,0.72) 39.5%, rgba(255,192,0,0.81) 69.7% )',
  'linear-gradient( 109.6deg,  rgba(48,207,208,1) 11.2%, rgba(51,8,103,1) 92.5% )',
  'linear-gradient( 135.9deg,  rgba(109,25,252,1) 16.4%, rgba(125,31,165,1) 56.1% )',
  'radial-gradient( circle farthest-corner at 5.6% 54.5%,  rgba(47,71,79,1) 0%, rgba(159,188,198,1) 83.6% )',
  'radial-gradient( circle farthest-corner at 50.4% 50.5%,  rgba(251,32,86,1) 0%, rgba(135,2,35,1) 90% )',
  'radial-gradient( circle farthest-corner at 7.2% 19%,  rgba(120,0,0,1) 0%, rgba(239,75,75,1) 100.2% )',
  'linear-gradient( 179.2deg,  rgba(34,34,34,1) 0%, rgba(8,0,153,1) 29.7%, rgba(118,6,166,1) 63.4%, rgba(233,0,64,0.58) 100.1% )',
  'linear-gradient( 99.6deg,  rgba(112,128,152,1) 10.6%, rgba(242,227,234,1) 32.9%, rgba(234,202,213,1) 52.7%, rgba(220,227,239,1) 72.8%, rgba(185,205,227,1) 81.1%, rgba(154,180,212,1) 102.4% )',
]

function CardGradientsDark({children}) {
  useEffect(() => {
    const setRandomBackground = () => {
      const cards = document.querySelectorAll('.card')
      cards.forEach((card) => {
        const randomIndex = Math.floor(Math.random() * gradients.length)
        card.style.background = gradients[randomIndex]
      })
    }

    setRandomBackground()
  }, [])

  return <>{children}</>
}

export default CardGradientsDark
