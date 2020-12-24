/**
 * Just like PointerEvent, but with some added Trinity specific properties.
 */
export type TrinityPointerEvent = React.PointerEvent & {
  intersection: THREE.Intersection
  propagating: boolean
}

export type TrinityPointerEventHandler = (event: TrinityPointerEvent) => void

/** An object instance from the THREE.* namespace with additional Trinity event handlers. */
export type ThreeObjectWithOptionalEventHandlers<T = any> = T & {
  /** A dictionary holding event handlers attached to this object. */
  __handlers?: { [eventName: string]: TrinityPointerEventHandler | undefined }
  dispose?: Function
}

export type SceneEventHandlerProps = {
  onPointerDown?: TrinityPointerEventHandler
  onPointerUp?: TrinityPointerEventHandler
  onPointerMove?: TrinityPointerEventHandler
  onPointerEnter?: TrinityPointerEventHandler
  onPointerLeave?: TrinityPointerEventHandler
}
