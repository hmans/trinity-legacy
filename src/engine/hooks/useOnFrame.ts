import { UpdateFunction } from "../useEngineLoop"
import { useEngine } from "./useEngine"

/**
 * Registers a callback function that will be executed on ticks that are about to render a frame. All of these
 * will be executed after all callbacks registered through both `useUpdate` and `useLateUpdate` have
 * finished executing.
 *
 * @param fn Callback function to execute.
 */

export const useOnFrame = (fn: UpdateFunction, deps?: any[]) => {
  const { useUpdateFunction } = useEngine()
  useUpdateFunction("frame", fn, deps)
}
