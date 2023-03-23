import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Sun = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: orange;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const Planet = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  position: absolute;
`

const orbitSizes = {
  mercury: 160,
  venus: 190,
  earth: 220,
  mars: 250,
  jupiter: 280,
  saturn: 340,
  uranus: 380,
  neptune: 420,
}

const planetSizes = {
  mercury: 10,
  venus: 15,
  earth: 20,
  mars: 18,
  jupiter: 45,
  saturn: 35,
  uranus: 25,
  neptune: 22,
}

const SolarSystem1 = () => {
  const [planetAngles, setPlanetAngles] = useState({
    mercury: 0,
    venus: 0,
    earth: 0,
    mars: 0,
    jupiter: 0,
    saturn: 0,
    uranus: 0,
    neptune: 0,
  })

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlanetAngles((prevAngles) => ({
        mercury: prevAngles.mercury + 2,
        venus: prevAngles.venus + 1.5,
        earth: prevAngles.earth + 1,
        mars: prevAngles.mars + 0.8,
        jupiter: prevAngles.jupiter + 0.4,
        saturn: prevAngles.saturn + 0.2,
        uranus: prevAngles.uranus + 0.1,
        neptune: prevAngles.neptune + 0.05,
      }))
    }, 10)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <Container>
      <Sun>
        <Planet
          size={planetSizes.mercury}
          color='white'
          style={{
            top:
              orbitSizes.mercury *
              Math.sin((planetAngles.mercury * Math.PI) / 180),
            left:
              orbitSizes.mercury *
              Math.cos((planetAngles.mercury * Math.PI) / 180),
          }}
        />
        <Planet
          size={planetSizes.venus}
          color='orange'
          style={{
            top:
              orbitSizes.venus * Math.sin((planetAngles.venus * Math.PI) / 180),
            left:
              orbitSizes.venus * Math.cos((planetAngles.venus * Math.PI) / 180),
          }}
        />
        <Planet
          size={planetSizes.earth}
          color='blue'
          style={{
            top:
              orbitSizes.earth * Math.sin((planetAngles.earth * Math.PI) / 180),
            left:
              orbitSizes.earth * Math.cos((planetAngles.earth * Math.PI) / 180),
          }}
        />
        <Planet
          size={planetSizes.mars}
          color='red'
          style={{
            top:
              orbitSizes.mars * Math.sin((planetAngles.mars * Math.PI) / 180),
            left:
              orbitSizes.mars * Math.cos((planetAngles.mars * Math.PI) / 180),
          }}
        />
        <Planet
          size={planetSizes.jupiter}
          color='yellow'
          style={{
            top:
              orbitSizes.jupiter *
              Math.sin((planetAngles.jupiter * Math.PI) / 180),
            left:
              orbitSizes.jupiter *
              Math.cos((planetAngles.jupiter * Math.PI) / 180),
          }}
        />
        <Planet
          size={planetSizes.saturn}
          color='purple'
          style={{
            top:
              orbitSizes.saturn *
              Math.sin((planetAngles.saturn * Math.PI) / 180),
            left:
              orbitSizes.saturn *
              Math.cos((planetAngles.saturn * Math.PI) / 180),
          }}
        />
        <Planet
          size={planetSizes.uranus}
          color='violet'
          style={{
            top:
              orbitSizes.uranus *
              Math.sin((planetAngles.uranus * Math.PI) / 180),
            left:
              orbitSizes.uranus *
              Math.cos((planetAngles.uranus * Math.PI) / 180),
          }}
        />

        <Planet
          size={planetSizes.neptune}
          color='cyan'
          style={{
            top:
              orbitSizes.neptune *
              Math.sin((planetAngles.neptune * Math.PI) / 180),
            left:
              orbitSizes.neptune *
              Math.cos((planetAngles.neptune * Math.PI) / 180),
          }}
        />
      </Sun>
    </Container>
  )
}

export default SolarSystem1
