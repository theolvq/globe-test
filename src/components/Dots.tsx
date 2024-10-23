import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { useLoader } from '@react-three/fiber'
import {
  getImageData,
  tempObject,
  centerVector,
  getAlpha,
  getDistance,
} from '@/lib/utils'

export function Dots({ count = 20000, radius = 6.2, dotRadius = 4 }) {
  const ref = useRef<THREE.InstancedMesh>(null)

  const mapElement = useLoader(THREE.ImageLoader, '/world-map.png')

  useEffect(() => {
    if (!ref.current) return
    const imageData = getImageData(mapElement)

    for (let b = 0; b < count; b++) {
      const phi = Math.acos(-1 + (2 * b) / count)
      const theta = Math.sqrt(count * Math.PI) * phi
      const { x, y, z } = new THREE.Vector3(0, 0, 0).setFromSphericalCoords(
        radius,
        phi,
        theta,
      )

      tempObject.lookAt(centerVector)
      tempObject.position.set(x, y, z)
      const distanceVector = getDistance(new THREE.Vector3(x, y, z))
      const alpha = getAlpha(distanceVector, imageData)

      if (alpha > 0) {
        tempObject.updateMatrix()
        ref.current.setMatrixAt(b, tempObject.matrix)
      }
    }

    ref.current.instanceMatrix.needsUpdate = true
  }, [mapElement, count, radius])

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <circleGeometry args={[dotRadius / 100, 6]} />
      <meshPhongMaterial
        attach='material'
        side={THREE.DoubleSide}
        color='#FFF'
      />
    </instancedMesh>
  )
}
