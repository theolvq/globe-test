import * as THREE from 'three'
export const centerVector = new THREE.Vector3(0, 0, 0)
export const tempObject = new THREE.Object3D()
export const getDistance = (circlePosition: THREE.Vector3) => {
  const distance = new THREE.Vector3()
  distance.subVectors(centerVector, circlePosition).normalize()
  const { x, y, z } = distance
  const cordX = 1 - (0.5 + Math.atan2(z, x) / (2 * Math.PI))
  const cordY = 0.5 + Math.asin(y) / Math.PI
  return new THREE.Vector2(cordX, cordY)
}

export const getAlpha = (distanceVector: THREE.Vector2, imgData: ImageData) => {
  const { width, height } = imgData
  const { x, y } = distanceVector
  const index = 4 * Math.floor(x * width) + Math.floor(y * height) * (4 * width)
  // 4 because r, g, b, a stored against each pixel
  return imgData.data[index + 3]
}

export const getImageData = (imageEl: HTMLImageElement) => {
  const ctx = document.createElement('canvas')
  ctx.width = imageEl.width
  ctx.height = imageEl.height
  const canv = ctx.getContext('2d')
  if (!canv) {
    throw new Error('Failed to create canvas context')
  }
  canv.drawImage(imageEl, 0, 0)

  return canv.getImageData(0, 0, ctx.width, ctx.height)
}
