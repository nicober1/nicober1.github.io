import React, {useRef} from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
import {Sphere} from '@react-three/drei'
import * as THREE from 'three'

// A function component that renders a 3D sphere with an earth texture
function Earth() {
  // Use the useRef hook to create a reference to the sphere mesh
  const meshRef = useRef()

  // Use the useFrame hook to animate the sphere rotation
  useFrame(() => {
    // Rotate the sphere by 0.01 radians on each frame
    meshRef.current.rotation.y += 0.01
  })

  // Load the earth texture using THREE.TextureLoader()
  const texture = new THREE.TextureLoader().load(
    '/img/earth/1.jpg',
  )

  // Return the JSX element for the sphere
  return (
    <Sphere ref={meshRef} args={[4, 200, 100]}>
      {/* Use a standard material with the loaded earth texture */}
      <meshStandardMaterial map={texture} />
    </Sphere>
  )
}

// A function component that renders a canvas with a spinning earth
function App() {
  // Return the JSX element for the canvas
  return (
    <Canvas>
      {/* Add some ambient light and a point light */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {/* Add the Earth component */}
      <Earth />
    </Canvas>
  )
}

export default App
