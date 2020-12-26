import { UpdateFunction } from "../useEngineLoop"
import { useEngine } from "./useEngine"

export const useOnRender = (fn: UpdateFunction) => {
  const { useUpdateFunction } = useEngine()
  useUpdateFunction("render", fn)
}
