import { EngineContext } from "../EngineContext"
import React from "react"

/**
 * Gives access to the current Trinity renderer context.
 */
export const useEngine = () =>
  React.useContext(EngineContext) ||
  console.error(
    "You tried to access the Trinity Engine context from a component that does not live underneath an instance of Trinity.Engine."
  )
