import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Cloud, Sky } from '@react-three/drei'
import * as THREE from 'three'

const DAY_DURATION = 150 // 5 minutes in seconds

function MovingCloud({ speed, ...props }) {
  const ref = useRef()
  const initialPosition = useMemo(() => [-15 - Math.random() * 10, props.position[1], props.position[2]], [props.position])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.position.x += speed * delta
      if (ref.current.position.x > 15) {
        ref.current.position.x = initialPosition[0]
      }
    }
  })

  return <Cloud ref={ref} {...props} position={initialPosition} />
}

function Rain({ count = 1000 }) {
  const rainGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = Math.random() * 40 - 20
      positions[i + 1] = Math.random() * 20 - 10
      positions[i + 2] = Math.random() * 40 - 20
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [count])

  const rainMaterial = useMemo(() => new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.1,
    transparent: true
  }), [])

  const rainRef = useRef()

  useFrame((state, delta) => {
    const positions = rainRef.current.geometry.attributes.position.array
    for (let i = 1; i < positions.length; i += 3) {
      positions[i] -= delta * 10
      if (positions[i] < -10) {
        positions[i] = 20
      }
    }
    rainRef.current.geometry.attributes.position.needsUpdate = true
  })

  return <points ref={rainRef} geometry={rainGeo} material={rainMaterial} />
}

function Lightning() {
  const lightningRef = useRef()
  const [isFlashing, setIsFlashing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance of lightning every 5 seconds
        setIsFlashing(true)
        setTimeout(() => setIsFlashing(false), 150)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <pointLight
      ref={lightningRef}
      position={[0, 10, 0]}
      intensity={isFlashing ? 50 : 0}
      color="#f0f0ff"
    />
  )
}

function DynamicSky() {
  const [timeOfDay, setTimeOfDay] = useState(0)
  const [weather, setWeather] = useState('clear')

  useFrame((state, delta) => {
    setTimeOfDay((prevTime) => (prevTime + delta / DAY_DURATION) % 1)
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.random()
      if (random < 0.7) setWeather('clear')
      else if (random < 0.9) setWeather('rainy')
      else setWeather('stormy')
    }, 30000) // Change weather every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const sunPosition = useMemo(() => {
    const theta = timeOfDay * Math.PI * 2
    return [
      Math.cos(theta) * 100,
      Math.abs(Math.sin(theta)) * 100,
      Math.sin(theta) * 100
    ]
  }, [timeOfDay])

  return (
    <>
      <Sky sunPosition={sunPosition} />
      <ambientLight intensity={0.1 + Math.abs(Math.sin(timeOfDay * Math.PI * 2)) * 0.7} />
      <directionalLight position={sunPosition} intensity={1} color="#FDB813" />
      {weather === 'rainy' && <Rain />}
      {weather === 'stormy' && (
        <>
          <Rain count={2000} />
          <Lightning />
        </>
      )}
    </>
  )
}

function CloudsGroup() {
  return (
    <>
      <MovingCloud segments={50} bounds={[10, 2, 2]} volume={6} color="white" fade={10} speed={1} position={[0, 2, 0]} />
      <MovingCloud segments={50} bounds={[10, 2, 2]} volume={6} color="white" fade={10} speed={0.7} position={[0, 0, -2]} />
      <MovingCloud segments={50} bounds={[10, 2, 2]} volume={6} color="white" fade={10} speed={1.2} position={[0, -1, -1]} />
    </>
  )
}

export default function DynamicWeatherBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
        <DynamicSky />
        <CloudsGroup />
      </Canvas>
    </div>
  )
}