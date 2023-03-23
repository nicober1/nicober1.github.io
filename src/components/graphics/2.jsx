import React, {useEffect, useState} from 'react'

const SolarSystem2 = () => {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRotation((rotation) => rotation + 1)
    }, 10)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <svg viewBox='-300 -300 600 600' className='container h-30 w-auto'>
      {/* Sun */}
      <circle cx='0' cy='0' r='50' fill='orange' />

      {/* Earth */}
      <g transform={`rotate(${rotation} 0 0)`}>
        <circle cx='150' cy='0' r='20' fill='blue' />
      </g>

      {/* Moon */}
      <g transform={`rotate(${2 * rotation} 200 200)`}>
        <circle cx='180' cy='0' r='7' fill='white' />
      </g>
    </svg>
  )
}

export default SolarSystem2
