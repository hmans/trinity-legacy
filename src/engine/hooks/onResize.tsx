import { useEffect } from "react"
import { useTrinity } from "./useTrinity"

export const onResize = (fn: (width: number, height: number) => void, deps?: []) => {
  const { renderer } = useTrinity()

  useEffect(() => {
    const handleResize = () => {
      const { width, height } = renderer.domElement
      fn(width, height)
    }

    /* Call it once to initialize things */
    handleResize()

    /* Automatically call the handler when the viewport is resized */
    window.addEventListener("resize", handleResize, false)

    return () => {
      window.removeEventListener("resize", handleResize, false)
    }
  }, deps)
}
