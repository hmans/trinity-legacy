import * as THREE from "three"

export const normalizePointerPosition = (
  renderer: THREE.Renderer,
  x: number,
  y: number,
  target?: THREE.Vector2
) => {
  if (!target) target = new THREE.Vector2()
  target.x = (x / renderer.domElement.clientWidth) * 2 - 1
  target.y = -(y / renderer.domElement.clientHeight) * 2 + 1
  return target
}
