import { RefObject, useState } from "react"
import * as THREE from "three"
import { ThreeObjectWithOptionalEventHandlers, TrinityPointerEvent } from "../types"
import { useEngine } from "./hooks"
import { intersectInList } from "../common"
import { normalizePointerPosition } from "../common/normalizePointerPosition"

export const useSceneEventHandling = (scene: THREE.Scene, camera: THREE.Camera | undefined) => {
  const { renderer } = useEngine()

  /* Some mutable internal state */
  const [internalState] = useState(() => ({
    intersections: new Array<THREE.Intersection>(),
    pointer: new THREE.Vector2()
  }))

  /* Event handling */
  const executeHandler = (
    object: ThreeObjectWithOptionalEventHandlers,
    eventName: string,
    event: TrinityPointerEvent,
    seenObjects = new Set<THREE.Object3D>()
  ) => {
    /* If there is a handler for this event, execute it */
    const handler = object.__handlers && object.__handlers[eventName]
    if (handler) handler(event)

    /* Keep track of the object so we don't pass the event to it again */
    seenObjects.add(object)

    /* Bubble up to parents */
    if (
      event.propagating &&
      object.parent &&
      !(object.parent instanceof THREE.Scene) &&
      !seenObjects.has(object.parent)
    ) {
      executeHandler(object.parent, eventName, event, seenObjects)
    }
  }

  const updatePointerAndIntersections = (
    event: TrinityPointerEvent,
    scene: THREE.Scene,
    camera: THREE.Camera
  ) => {
    normalizePointerPosition(renderer, event.clientX, event.clientY, internalState.pointer)

    const raycaster = new THREE.Raycaster()
    raycaster.layers.enableAll()
    raycaster.setFromCamera(internalState.pointer, camera)
    internalState.intersections = raycaster.intersectObjects(scene.children, true)
  }

  const eventHandlers = {
    onPointerMove: (event: TrinityPointerEvent) => {
      if (!camera || !scene) return

      const previousIntersects = internalState.intersections
      updatePointerAndIntersections(event, scene, camera)

      const seenObjects = new Set<THREE.Object3D>()

      /* pointermove */
      event.propagating = true
      for (const intersection of internalState.intersections) {
        executeHandler(intersection.object, "pointermove", { ...event, intersection }, seenObjects)
        if (!event.propagating) break
      }

      /* pointerenter */
      event.propagating = true
      for (const intersection of internalState.intersections) {
        if (!intersectInList(intersection, previousIntersects)) {
          executeHandler(
            intersection.object,
            "pointerenter",
            { ...event, intersection },
            seenObjects
          )
          if (!event.propagating) break
        }
      }

      /* pointerleave */
      event.propagating = true
      for (const intersection of previousIntersects) {
        if (!intersectInList(intersection, internalState.intersections)) {
          executeHandler(
            intersection.object,
            "pointerleave",
            { ...event, intersection },
            seenObjects
          )
          if (!event.propagating) return
        }
      }
    },

    onPointerDown: (event: TrinityPointerEvent) => {
      if (!camera || !scene) return

      updatePointerAndIntersections(event, scene, camera)

      const seenObjects = new Set<THREE.Object3D>()

      event.propagating = true
      for (const intersection of internalState.intersections) {
        executeHandler(
          intersection.object,
          "pointerdown",
          {
            ...event,
            intersection
          },
          seenObjects
        )

        if (!event.propagating) break
      }
    },

    onPointerUp: (event: TrinityPointerEvent) => {
      if (!camera || !scene) return

      updatePointerAndIntersections(event, scene, camera)

      const seenObjects = new Set<THREE.Object3D>()

      event.propagating = true
      for (const intersection of internalState.intersections) {
        executeHandler(
          intersection.object,
          "pointerup",
          {
            ...event,
            intersection
          },
          seenObjects
        )

        if (!event.propagating) break
      }
    }
  }

  return eventHandlers
}
