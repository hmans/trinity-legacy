import React from "react"
import * as THREE from "three"
import { UpdateFunction } from "./useEngineLoop"

export type EngineContext = {
  renderer: THREE.WebGLRenderer

  triggerFrame: () => void
  useUpdateFunction: (category: string, fn: UpdateFunction, deps?: any[]) => void
}

export const EngineContext = React.createContext<EngineContext>({} as EngineContext)

EngineContext.displayName = "EngineContext"
