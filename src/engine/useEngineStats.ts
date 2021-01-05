import { useEffect, useState } from "react"
import { WebGLRenderer } from "three"

export const useEngineStats = (renderer: WebGLRenderer) => {
  const [stats] = useState(() => new Stats(renderer))
  return stats
}

export const useEngineStatsViewer = (stats: Stats) => {
  const [viewer] = useState(() => new StatsViewer(stats))

  useEffect(() => {
    viewer.start()
    return () => void viewer.stop()
  }, [stats])

  return viewer
}

export class Stats {
  beginTime = 0
  processingDoneTime = 0
  renderingDoneTime = 0

  constructor(private renderer: WebGLRenderer) {
    renderer.info.autoReset = false
  }

  startFrame() {
    this.renderer.info.reset()
    this.beginTime = performance.now()
  }

  stopProcessing() {
    this.processingDoneTime = performance.now()
  }

  stopRendering() {
    this.renderingDoneTime = performance.now()
  }

  getMeasurements() {
    const times = {
      processingTime: this.processingDoneTime - this.beginTime,
      renderingTime: this.renderingDoneTime - this.processingDoneTime,
      tickTime: this.processingDoneTime - this.beginTime
    }

    const theoreticalFps = 1000 / times.tickTime
    const drawCalls = this.renderer.info.render.calls

    return { drawCalls, theoreticalFps, ...times }
  }
}

export class StatsViewer {
  canvas: HTMLCanvasElement

  background = "rgba(0, 0, 0, 0.5)"

  constructor(private stats: Stats, public width = 100, public height = 40) {
    this.canvas = document.createElement("canvas")
    this.canvas.width = width
    this.canvas.height = height

    this.canvas.style.width = `${this.width}px`
    this.canvas.style.height = `${this.height}px`
    this.canvas.style.display = "block"
    this.canvas.style.position = "fixed"
    this.canvas.style.bottom = "0"
    this.canvas.style.right = "0"
    this.canvas.style.backgroundColor = this.background
    this.canvas.style.opacity = "0.5"
    document.body.appendChild(this.canvas)
  }

  start() {}

  stop() {}

  update(dt: number) {
    const measurements = this.stats.getMeasurements()
    const context = this.canvas.getContext("2d")!
    context.globalAlpha = 1

    /* Shift existing canvas image to the left */
    context.drawImage(
      this.canvas,
      1,
      0,
      this.width - 1,
      this.height,
      0,
      0,
      this.width - 1,
      this.height
    )

    /* Clear the right colum */
    context.globalAlpha = 0.5
    context.fillStyle = this.background
    context.fillRect(this.width - 1, 0, 1, this.height)

    /* Draw drawcalls */
    context.globalAlpha = 1
    context.fillStyle = "#f00"
    context.fillRect(
      this.width - 1,
      this.height - measurements.drawCalls,
      1,
      measurements.drawCalls
    )
  }
}
