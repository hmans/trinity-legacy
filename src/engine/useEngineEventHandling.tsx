import React, { useCallback, useMemo } from "react"
import * as THREE from "three"
import { ThreeObjectWithOptionalEventHandlers, TrinityPointerEvent } from "./types"

export const useEngineEventHandling = (root: THREE.Object3D) => {
  const makeEventHandler = useCallback(
    (eventName: string) => (reactEvent: React.PointerEvent) => {
      const event = reactEvent as TrinityPointerEvent
      event.propagating = true

      /* Override stopPropagation */
      const oldStopPropagation = event.stopPropagation.bind(event)
      event.stopPropagation = () => {
        event.propagating = false
        oldStopPropagation()
      }

      /* Go through all scenes and call their pointerdown event handlers */
      for (let i = root.children.length - 1; i >= 0; i--) {
        const node = root.children[i] as ThreeObjectWithOptionalEventHandlers
        node.__handlers?.[eventName]?.(event)

        /* Bail as soon as something decided to stop propagating this event */
        if (!event.propagating) break
      }
    },
    []
  )

  const eventHandlers: { [key: string]: (event: React.PointerEvent) => void } = useMemo(
    () => ({
      onPointerMove: makeEventHandler("pointermove"),
      onPointerDown: makeEventHandler("pointerdown"),
      onPointerUp: makeEventHandler("pointerup")
    }),
    []
  )

  return eventHandlers
}
