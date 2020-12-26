import * as THREE from "three"
import { IConstructable, ReactorComponent } from "../types"
import { makeComponent } from "./makeComponent"

/**
 * A bit of typing magic that will register all of the classes in THREE.* underneath our
 * Reactor proxy object.
 */

type THREE = typeof THREE

type THREEKey = keyof THREE

type Reactor = {
  [K in THREEKey]: THREE[K] extends IConstructable
    ? ReactorComponent<InstanceType<THREE[K]>>
    : undefined
}

// const makeReactor = () => {
//   const reactor = {} as Reactor

//   for (const key in THREE) {
//     Object.assign(reactor, {
//       [key]: makeComponent(THREE[key as THREEKey] as IConstructable, key)
//     })
//   }

//   return reactor
// }

// export const Reactor = makeReactor()

const cache = {} as Record<string, ReactorComponent<any>>

/**
 * The Trinity Reactor. For every class exposed by THREE, this object contains a
 * Trinity component that wraps the class (see `makeComponent`.)
 */
export const Reactor = new Proxy<Reactor>({} as Reactor, {
  get: (_, name: string) => {
    /* Create and memoize a wrapper component for the specified property. */
    if (!cache[name]) {
      /* Try and find a constructor within the THREE namespace. */
      const constructor = THREE[name as THREEKey] as IConstructable

      /* If nothing could be found, bail. */
      if (!constructor) return undefined

      /* Otherwise, create and memoize a component for that constructor. */
      cache[name] = makeComponent(constructor, name)
    }

    return cache[name]
  }
})
