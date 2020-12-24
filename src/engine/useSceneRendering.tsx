import * as THREE from "three"
import { onRender, useTrinity } from "./hooks"

export const useSceneRendering = (
  scene: THREE.Scene,
  camera?: THREE.Camera,
  options: {
    clear: boolean
    render: boolean
  } = { clear: true, render: true }
) => {
  const { renderer } = useTrinity()

  if (options.render)
    onRender(() => {
      if (!camera || !scene) return

      renderer.clearDepth()

      if (options.clear) {
        renderer.clearColor()
      }

      renderer.render(scene, camera)
    })
}
