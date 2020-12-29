import * as THREE from "three"
import { useEngine } from "./hooks"
import { useOnRender } from "./hooks/useOnRender"

export const useSceneRendering = (
  scene: THREE.Scene,
  camera?: THREE.Camera,
  options: {
    clear: boolean
    render: boolean
  } = { clear: true, render: true }
) => {
  const { renderer } = useEngine()

  if (options.render)
    useOnRender(() => {
      if (!camera || !scene) return

      renderer.clearDepth()

      if (options.clear) {
        renderer.clearColor()
      }

      renderer.render(scene, camera)
    })
}
