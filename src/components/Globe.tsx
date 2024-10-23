'use client'
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import Sphere from './Sphere'
import { Dots } from './Dots'

export function Globe({ radius = 6, dotsOffset = 2 }) {
  return (
    <Canvas camera={{ position: [0, 0, 15], near: 1, far: 50 }}>
      <ambientLight />
      <Sphere radius={radius} />
      <Suspense fallback={null}>
        <Dots radius={radius + dotsOffset / 10} />
        {/* <Points /> */}
      </Suspense>
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
