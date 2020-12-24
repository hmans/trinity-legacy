import { RefObject, useEffect, useState } from "react"
import * as THREE from "three"

export const useEngineRenderer = (divRef: RefObject<HTMLDivElement>) => {
  const [renderer] = useState<THREE.WebGLRenderer>(() => {
    const renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
      stencil: true,
      depth: true
    })

    renderer.autoClear = false

    /* Configure color space */
    renderer.outputEncoding = THREE.sRGBEncoding

    /* Enable shadow map */
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    return renderer
  })

  /* Mount/unmount the renderer's canvas and handle window resizing */
  useEffect(() => {
    const parentElement = divRef.current!

    const handleResize = () => {
      /* Determine new dimensions */
      const width = parentElement.clientWidth
      const height = parentElement.clientHeight

      /* Update renderer */
      renderer.setSize(width, height, false)
    }

    handleResize()

    parentElement.appendChild(renderer.domElement)
    window.addEventListener("resize", handleResize, false)

    return () => {
      window.removeEventListener("resize", handleResize, false)
      parentElement.removeChild(renderer.domElement)
    }
  }, [divRef.current, renderer])

  return renderer
}
