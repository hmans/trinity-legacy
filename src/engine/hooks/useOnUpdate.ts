import { UpdateFunction } from "../useEngineLoop"
import { useEngine } from "./useEngine"

/**
 * Registers a callback function that will be executed on every engine tick.
 *
 * @param fn Callback function to execute.
 */

export const useOnUpdate = (fn: UpdateFunction) => {
  const { useUpdateFunction } = useEngine()
  useUpdateFunction("update", fn)
}
