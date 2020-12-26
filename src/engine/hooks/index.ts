import { UpdateFunction } from "../useEngineLoop"
import { useEngine } from "./useEngine"

export { useOnResize } from "./useOnResize"
export { useEngine } from "./useEngine"
export { useAutomaticTriggerFrame } from "./useAutomaticTriggerFrame"

/**
 * Registers a callback function that will be executed on every engine tick.
 *
 * @param fn Callback function to execute.
 */
export const useOnUpdate = (fn: UpdateFunction) => {
  const { useUpdateFunction } = useEngine()
  useUpdateFunction("update", fn)
}

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

/**
 * Registers a callback function that will be executed on ticks that are about to render a frame. All of these
 * will be executed after all callbacks registered through both `useUpdate` and `useLateUpdate` have
 * finished executing.
 *
 * @param fn Callback function to execute.
 */
export const useOnFrame = (fn: UpdateFunction) => {
  const { useUpdateFunction } = useEngine()
  useUpdateFunction("frame", fn)
}

export const useOnRender = (fn: UpdateFunction) => {
  const { useUpdateFunction } = useEngine()
  useUpdateFunction("render", fn)
}
