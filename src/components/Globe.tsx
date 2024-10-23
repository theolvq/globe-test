'use client'
import React, { Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Sphere from './Sphere'
import { Dots } from './Dots'
import { City } from '@/lib/types'

type Props = {
  radius?: number
  dotsOffset?: number
  selectedCity: City | null
}

export function Globe({ radius = 6, dotsOffset = 2, selectedCity }: Props) {
  const markerRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    if (selectedCity && markerRef.current) {
      console.log('selectedCity', selectedCity)
      const { lat, lon } = selectedCity
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lon + 180) * (Math.PI / 180)

      const x = -(radius + 0.1) * Math.sin(phi) * Math.cos(theta)
      const y = (radius + 0.1) * Math.cos(phi)
      const z = (radius + 0.1) * Math.sin(phi) * Math.sin(theta)

      markerRef.current.position.set(x, y, z)
      markerRef.current.visible = true
    } else if (markerRef.current) {
      markerRef.current.visible = false
    }
  }, [selectedCity, radius])

  return (
    <Canvas camera={{ position: [0, 0, 15], near: 1, far: 50 }}>
      <ambientLight />
      <Sphere radius={radius} />
      <Suspense fallback={null}>
        <Dots radius={radius + dotsOffset / 10} />
        {/* <Points /> */}
      </Suspense>
      <mesh ref={markerRef} visible={false}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshBasicMaterial color={0xff0000} />
      </mesh>
      <OrbitControls
        minDistance={5}
        minPolarAngle={Math.PI * 0.35}
        maxPolarAngle={Math.PI * 0.55}
        enableZoom={false}
        enablePan={false}
      />
    </Canvas>
  )
}
