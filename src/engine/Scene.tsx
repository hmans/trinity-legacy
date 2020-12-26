import React, { createContext, useContext, useEffect, useState } from "react"
import * as THREE from "three"
import { forwardRefReactor, Reactor } from "../reactor"
import { useOnResize, useEngine } from "./hooks"
import { useSceneEventHandling } from "./useSceneEventHandling"
import { useSceneRendering } from "./useSceneRendering"

type SceneContextState = {
  scene: THREE.Scene
  camera?: THREE.Camera
  setCamera: (camera: THREE.Camera) => void
}

const SceneContext = createContext({} as SceneContextState)

export const Scene = forwardRefReactor<
  THREE.Scene,
  {
    render?: boolean
    clear?: boolean
    backgroundColor?: string
  }
>(({ render = true, clear = true, backgroundColor, ...props }, ref) => {
  /* Reference to our THREE.Scene */
  const [scene] = useState(() => new THREE.Scene())

  /* Active camera used for rendering */
  const [camera, setCamera] = useState<THREE.Camera | undefined>(undefined)

  useSceneBackground(scene, backgroundColor)

  useSceneRendering(scene, camera, { clear, render })

  const eventHandlers = useSceneEventHandling(scene, camera)

  /* When the viewport resizes and we have a camera, adjust it automatically */
  const { triggerFrame } = useEngine()
  useOnResize((width, height) => {
    if (!camera) return

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    triggerFrame()
  })

  return (
    <SceneContext.Provider value={{ scene, camera, setCamera }}>
      <Reactor.Scene name="Scene" object={scene} ref={ref} {...props} {...eventHandlers} />
    </SceneContext.Provider>
  )
})

/** Fetch the current scene's context. */
export const useScene = () => useContext(SceneContext)

export const useSceneBackground = (scene: THREE.Scene, backgroundColor?: string) => {
  useEffect(() => {
    scene.background = backgroundColor ? new THREE.Color(backgroundColor) : null
  }, [backgroundColor])
}
