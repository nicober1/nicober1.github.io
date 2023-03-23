import React, {useRef, useEffect} from 'react'
import * as THREE from 'three'

function ThreeScene() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const renderer = new THREE.WebGLRenderer({canvas})

    const camera = new THREE.PerspectiveCamera(
      75, // FOV
      canvas.clientWidth / canvas.clientHeight, // aspect ratio
      0.1, // near clipping plane
      1000, // far clipping plane
    )
    camera.position.z = 5

    const scene = new THREE.Scene()

    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshStandardMaterial({color: 0x00ff00})
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    const light = new THREE.PointLight(0xffffff, 1, 100)
    light.position.set(0, 0, 10)
    scene.add(light)

    const resizeRenderer = () => {
      const pixelRatio = window.devicePixelRatio
      const width = canvas.clientWidth * pixelRatio
      const height = canvas.clientHeight * pixelRatio
      renderer.setSize(width, height, false)
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    resizeRenderer()

    window.addEventListener('resize', resizeRenderer)

    const animate = () => {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeRenderer)
    }
  }, [])

  return <canvas ref={canvasRef} style={{width: '100%', height: '100vh'}} />
}

export default ThreeScene
