import React, {useEffect} from 'react'

const gradients = ['linear-gradient(109.6deg, rgba(209, 0, 116, 1) 11.2%, rgba(110, 44, 107, 1) 91.1%)',



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
