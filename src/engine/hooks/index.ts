import { UpdateFunction } from "../useEngineLoop"
import { useTrinity } from "./useTrinity"

export { onResize } from "./onResize"
export { useTrinity } from "./useTrinity"
export { useAutomaticTriggerFrame } from "./useAutomaticTriggerFrame"

/**
 * Registers a callback function that will be executed on every engine tick.
 *
 * @param fn Callback function to execute.
 */
export const onUpdate = (fn: UpdateFunction) => {
  const { useUpdateFunction } = useTrinity()
  useUpdateFunction("update", fn)
}

/**
 * Registers a callback function that will be executed on every engine tick. Unlike its sibling
 * useUpdate, callbacks registered with useLateUpdate are guaranteed to run _after_ all useUpdate
 * callbacks have finished executing.
 *
 * @param fn Callback function to execute.
 */
export const onLateUpdate = (fn: UpdateFunction) => {
  const { useUpdateFunction } = useTrinity()
  useUpdateFunction("lateUpdate", fn)
}

/**
 * Registers a callback function that will be executed on ticks that are about to render a frame. All of these
 * will be executed after all callbacks registered through both `useUpdate` and `useLateUpdate` have
 * finished executing.
 *
 * @param fn Callback function to execute.
 */
export const onFrame = (fn: UpdateFunction) => {
  const { useUpdateFunction } = useTrinity()
  useUpdateFunction("frame", fn)
}

export const onRender = (fn: UpdateFunction) => {
  const { useUpdateFunction } = useTrinity()
  useUpdateFunction("render", fn)
}
