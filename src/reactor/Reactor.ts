import { makeComponent } from "./makeComponent"
import { ReactorComponent } from "./types"
import * as THREE from "three"
import { IConstructable } from "../common"

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

const reactorCache = {} as Reactor

export const Reactor = new Proxy<Reactor>(reactorCache, {
  get: (cache, prop) => {
    const name = prop.toString() as keyof THREE

    /* Create and memoize a wrapper component for the specified symbol. */
    if (!cache[name]) {
      const constructor = THREE[name as keyof typeof THREE] as IConstructable

      if (!constructor)
        console.error(
          `Can't find THREE.${name}, so I can't create a component around it, either. Boo!`
        )
      ;(cache[name] as ReactorComponent<typeof constructor>) = makeComponent(constructor, name)
    }

    return cache[name]
  }
})
