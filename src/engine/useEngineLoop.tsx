import { Stats, StatsViewer } from "./useEngineStats"
import { useCallback, useEffect, useState } from "react"
import { useTicker } from "./useTicker"

export type UpdateFunction = (dt: number) => void

type UpdateFunctionDictionary = { [key: string]: UpdateFunction[] }

export const useEngineLoop = (stats: Stats, statsViewer?: StatsViewer, deps: any[] = []) => {
  /* Some internal state that we're going to mutate directly. */
  const [state] = useState(() => ({
    renderNextFrame: true,
    callbacks: {} as UpdateFunctionDictionary
  }))

  const api = {
    triggerFrame: () => (state.renderNextFrame = true),

    useUpdateFunction: (category: keyof typeof state.callbacks, fn: UpdateFunction) => {
      useEffect(() => {
        /* Initialize the category if necessart */
        if (!state.callbacks[category]) {
          state.callbacks[category] = new Array<UpdateFunction>()
        }

        /* Add the callback function to our list */
        state.callbacks[category].push(fn)

        return () => {
          /* And remove it again on cleanup */
          state.callbacks[category] = state.callbacks[category].filter((f) => f !== fn)
        }
      }, [fn])
    }
  }

  /* Set up ticker */
  {
    const { callbacks } = state

    const executeCallbacks = (callbacks: UpdateFunction[], dt: number) => {
      if (!callbacks) return
      for (const callback of callbacks) callback(dt)
    }

    const engineTick = useCallback((dt: number) => {
      stats.startFrame()

      /* Processing */
      {
        executeCallbacks(callbacks.update, dt)
        executeCallbacks(callbacks.lateUpdate, dt)

        if (state.renderNextFrame) {
          executeCallbacks(callbacks.frame, dt)
        }
        stats.stopProcessing()
      }

      /* Rendering */
      {
        if (state.renderNextFrame) {
          executeCallbacks(callbacks.render, dt)
        }
        state.renderNextFrame = false

        stats.stopRendering()
      }

      /* Display stats */
      statsViewer?.update(dt)
    }, deps)

    useTicker(engineTick, deps)
  }

  return api
}
