import { useLayoutEffect, useRef, useState } from "react"

export const useFutureRef = <T = any>(initialValue: T | null = null) => {
  const [state, setState] = useState(0)
  const ref = useRef<T | null>(initialValue)

  useLayoutEffect(() => {
    setState(state + 1)
  }, [])

  return ref
}
