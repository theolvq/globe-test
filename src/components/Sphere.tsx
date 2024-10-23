import React from 'react'

type Props = {
  radius: number
}

const Sphere = ({ radius = 6 }: Props) => {
  return (
    <mesh castShadow>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshPhongMaterial
        attach='material'
        opacity={0.7}
        shininess={20}
        color='#006C87'
        transparent
      />
    </mesh>
  )
}

export default Sphere
