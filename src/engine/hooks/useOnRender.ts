import { UpdateFunction } from "../useEngineLoop"
import { useEngine } from "./useEngine"

export const useOnRender = (fn: UpdateFunction, deps?: any[]) => {
  const { useUpdateFunction } = useEngine()
  useUpdateFunction("render", fn, deps)
}
