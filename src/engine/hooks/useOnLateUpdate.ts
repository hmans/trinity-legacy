import { UpdateFunction } from "../useEngineLoop"
import { useEngine } from "./useEngine"

/**
 * Registers a callback function that will be executed on every engine tick. Unlike its sibling
 * useUpdate, callbacks registered with useLateUpdate are guaranteed to run _after_ all useUpdate
 * callbacks have finished executing.
 *
 * @param fn Callback function to execute.
 */

export const useOnLateUpdate = (fn: UpdateFunction) => {
  const { useUpdateFunction } = useEngine()
  useUpdateFunction("lateUpdate", fn)
}
