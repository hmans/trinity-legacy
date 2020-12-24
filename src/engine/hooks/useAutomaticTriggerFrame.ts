import { useEffect } from "react"
import { useTrinity } from "./useTrinity"

/**
 * Makes sure that a new frame is rendered every time the component is rendered.
 */
export const useAutomaticTriggerFrame = () => {
  const { triggerFrame } = useTrinity()

  useEffect(() => {
    triggerFrame()
  })
}
