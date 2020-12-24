import React from "react"

export const useTicker = (tickFn: (dt: number) => void, deps: any[]) => {
  React.useLayoutEffect(() => {
    console.log("Starting ticker")

    let lastNow = performance.now()
    let alive = true

    const tick = () => {
      /* Figure out deltatime */
      const now = performance.now()
      const dt = (now - lastNow) / 1000
      lastNow = now

      /* Render scene */
      tickFn(dt)

      /* Loop as long as this ticker is active */
      if (alive) requestAnimationFrame(tick)
    }

    tick()

    return () => {
      console.log("Stopping ticker")
      alive = false
    }
  }, deps)
}
