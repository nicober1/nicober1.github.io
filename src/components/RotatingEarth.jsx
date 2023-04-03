import React, {useRef} from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
import {Sphere} from '@react-three/drei'
import * as THREE from 'three'

function Earth() {
  const meshRef = useRef()

  useFrame(() => {
    meshRef.current.rotation.y += 0.03
  })

  const texture = new THREE.TextureLoader().load('/img/earth/1.jpg')

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  )
}

function RotatingEarth() {
  return (
      <Canvas>
        <ambientLight intensity={0.9} />
        <pointLight position={[10, 10, 10]} />
        <Earth position={[0, 0, 0]} />
      </Canvas>
  )
}

export default RotatingEarth
