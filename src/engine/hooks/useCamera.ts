import { RefObject, useEffect } from "react"
import { Camera } from "three"
import { useScene } from "../Scene"
import { useEngine } from "./useEngine"

/**
 * A convenience hook that registers a camera as the scene's active camera.
 *
 * @param ref The React ref attached to your camera object.
 * @param callback An optional callback that will be invoked with the camera object passed as its only argument.
 */
export const useCamera = (ref: RefObject<Camera>, callback?: (camera: Camera) => any) => {
  const { setCamera } = useScene()
  const { triggerFrame } = useEngine()

  useEffect(() => {
    if (!ref.current) return

    /* Set the given camera to be the scene's active camera */
    setCamera(ref.current)

    /* If there is a callback, invoke it */
    callback?.(ref.current)

    /* Make sure we have a frame triggered */
    triggerFrame()
  }, [ref.current])
}
