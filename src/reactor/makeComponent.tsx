import React, { forwardRef, useContext, useEffect } from "react"
import { BufferGeometry, Fog, Geometry, Material, Object3D } from "three"
import { applyProps, applyRef } from "../common"
import { applyEventProps } from "../common/applyProps"
import {
  ReactorComponentProps,
  ThreeObjectWithOptionalEventHandlers,
  IStringIndexable
} from "../types"
import ParentContext from "./ParentContext"
import { useManagedThreeObject } from "./useManagedThreeObject"

/**
 * Create a new React component that wraps around and manages an instance of the specified
 * THREE.* class.
 *
 * @param constructor Class to instantiate.
 * @param displayName displayName to assign to the generated component.
 */
export const makeComponent = <T extends object>(
  constructor?: new (...args: any) => T,
  displayName?: string
) => {
  const Component = forwardRef<T, ReactorComponentProps<T>>(
    ({ object: propObject, children, attach, args, ...props }, ref) => {
      const parent = useContext(ParentContext) as IStringIndexable

      /* Use either the object passed in via props, or construct one. */
      const object = useManagedThreeObject<ThreeObjectWithOptionalEventHandlers<T>>(() => {
        return propObject || new constructor!(...(Array.isArray(args) ? args : Array(args)))
      })

      applyRef(ref, object)

      /* Apply props every time they change */
      useEffect(() => {
        if (!object) return

        /* Assign props */
        if (props) {
          const remainingProps = applyEventProps(object, props)
          applyProps(object, remainingProps)
        }
      }, [object, props])

      /* Attach the object to a parent if it's a scene object. */
      useEffect(() => {
        if (!object || !parent) return

        /* If the object inherits from Object3D, add it to the scene */
        if (object instanceof Object3D) {
          parent.add(object)
          return () => parent.remove(object)
        }
      }, [object, parent])

      /* Handle the "attach" property */
      useEffect(() => {
        if (!object) return

        /* For specific types, set a default attach property */
        if (!attach) {
          if (object instanceof Material) attach = "material"
          else if (object instanceof Geometry) attach = "geometry"
          else if (object instanceof BufferGeometry) attach = "geometry"
          else if (object instanceof Fog) attach = "fog"
        }

        /* If the object has an "attach" property, attach it to the parent */
        if (attach) {
          if (parent[attach] !== undefined) {
            parent[attach] = object
          } else {
            console.error(
              `Property "${attach}" does not exist on parent "${object.constructor.name}"`
            )
          }
        }
      }, [object, attach])

      /* Support child functions */
      const inner = typeof children === "function" ? children() : children

      return object instanceof Object3D && inner ? (
        <ParentContext.Provider value={object}>{inner}</ParentContext.Provider>
      ) : (
        <>{inner}</>
      )
    }
  )

  Component.displayName = displayName

  return Component
}
