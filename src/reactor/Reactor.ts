import * as THREE from "three"
import { IConstructable } from "../common"
import { makeComponent } from "./makeComponent"
import { ReactorComponent } from "./types"

/**
 * A bit of typing magic that will register all of the classes in THREE.* underneath our
 * Reactor proxy object.
 */

type THREE = typeof THREE

type Reactor = {
  [K in keyof THREE]: THREE[K] extends IConstructable
    ? ReactorComponent<InstanceType<THREE[K]>>
    : undefined
}

/**
 * The Trinity proxy object. Insert documentation here.
 */

export const Reactor = new Proxy<Reactor>({} as Reactor, {
  get: (cache, prop) => {
    const name = prop.toString() as keyof THREE

    /* Create and memoize a wrapper component for the specified symbol. */
    if (!cache[name]) {
      /* Try and find a constructor within the THREE namespace. */
      const constructor = THREE[name as keyof typeof THREE] as IConstructable

      /* If nothing could be found, bail. */
      if (!constructor)
        return undefined

        /* Otherwise, create and memoize a component for that constructor. */
      ;(cache[name] as ReactorComponent<typeof constructor>) = makeComponent(constructor, name)
    }

    return cache[name]
  }
})
