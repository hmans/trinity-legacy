import React, { useRef, useState } from "react"
import { Scene } from "three"
import ParentContext from "../reactor/ParentContext"
import { EngineContext } from "./EngineContext"
import { useEngineEventHandling } from "./useEngineEventHandling"
import { useEngineLoop } from "./useEngineLoop"
import { useEngineRenderer } from "./useEngineRenderer"
import { useEngineStats } from "./useEngineStats"

type EngineProps = {
  width?: string
  height?: string
}

export const Engine: React.FC<EngineProps> = ({ children, width = "100vw", height = "100vh" }) => {
  /* State */
  const divRef = useRef<HTMLDivElement>(null)
  const [root] = useState(() => new Scene())

  /* Functionality */
  const renderer = useEngineRenderer(divRef)
  const stats = useEngineStats(renderer)
  // const statsViewer = useEngineStatsViewer(stats)
  const loopAPI = useEngineLoop(stats, undefined, [renderer])
  const eventHandlers = useEngineEventHandling(root)

  const styles = {
    width,
    height,
    outline: "none",
    display: "block",
    touchAction: "none"
  }

  return (
    <div ref={divRef} style={styles} {...eventHandlers}>
      <EngineContext.Provider
        value={{
          renderer,
          ...loopAPI
        }}
      >
        <ParentContext.Provider value={root}>{children}</ParentContext.Provider>
      </EngineContext.Provider>
    </div>
  )
}
