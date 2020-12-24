import { EngineContext } from "../EngineContext"
import React from "react"

/**
 * Gives access to the current Trinity renderer context.
 */
export const useRenderer = () =>
  React.useContext(EngineContext) ||
  console.error(
    "You tried to access the Trinity engine context from a component that does not live underneath an instance of Trinity.Engine."
  )

/* Backwards compatibility */
export const useTrinity = useRenderer
