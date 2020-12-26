import { useEffect } from "react"
import { useEngine } from "./useEngine"

/**
 * Makes sure that a new frame is rendered every time the component is rendered.
 */
export const useAutomaticTriggerFrame = () => {
  const { triggerFrame } = useEngine()

  useEffect(() => {
    triggerFrame()
  })
}
