import { useEffect, useState } from "react"
import { Scene } from "three"
import { ThreeObjectWithOptionalEventHandlers } from "../types"

/**
 * Manages the lifecycle of a THREE.* object instance, making sure it gets disposed once
 * the component using it is unmounted.
 */
export const useManagedThreeObject = <T = any>(fn: () => T) => {
  const [instance] = useState<ThreeObjectWithOptionalEventHandlers<T>>(fn)

  /* Automatically dispose the object if we can */
  useEffect(() => {
    if (!instance || instance instanceof Scene) return

    return () => {
      if (instance?.dispose) {
        console.debug("Disposing", instance.constructor.name)
        instance.dispose()
      }
    }
  }, [instance])

  return instance
}
