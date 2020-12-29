export interface IStringIndexable {
  [key: string]: any
}

export interface IConstructable<T = any> {
  new (...args: any[]): T
}

/** The wrapper component we will be generating to wrap around THREE classes. */
export type ReactorComponent<T, ExtraProps = {}> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<ReactorComponentProps<T>> & React.RefAttributes<T> & ExtraProps
>

/**
 * Props of a Reactor component. These are based on the wrapped THREE class' props, with
 * some extra added convenience properties.
 */
export type ReactorComponentProps<T> = Partial<Omit<T, HiddenProps | keyof EasierSetterProps<T>>> &
  EasierSetterProps<T> &
  ConstructorArgsProps<T> &
  SceneEventHandlerProps &
  ChildrenProp &
  AttachProp &
  ObjectProp<T>

/**
 * Our wrapper components allow the user to pass an already instantiated object, or it will create a new
 * instance of the class it wraps around.
 */
type ObjectProp<T> = {
  /** If you already have an instance of the class you want to wrap, you can pass it here. */
  object?: T | (ThreeObjectWithOptionalEventHandlers<T> & { dispose?: () => void })
}

/** Some extra props we will be accepting on our wrapper component. */
type ConstructorArgsProps<T> = {
  /** Arguments passed to the wrapped THREE class' constructor. */
  args?: T extends new (...args: any) => any ? ConstructorParameters<T> : any
}

/* Some properties exposed by THREE objects can be written to through their .set method, so
   we're using this fact to provide some slightly more easier to use props. */
type Settable = { set: (...args: any) => any }
type SetterArguments<T extends Settable> = Parameters<T["set"]>
type FirstSetterArgument<T extends Settable> = SetterArguments<T>[0]

/** A bunch of THREE.Object3D properties that we override with a Settable type. */
export type EasierSetterProps<T> = EasierProp<T, "color", FirstSetterArgument<THREE.Color>> &
  EasierProp<T, "position", SetterArguments<THREE.Vector3>> &
  EasierProp<T, "rotation", SetterArguments<THREE.Vector3>> &
  EasierProp<T, "scale", SetterArguments<THREE.Vector3> | FirstSetterArgument<THREE.Vector3>> &
  EasierProp<T, "up", SetterArguments<THREE.Vector3>> &
  EasierProp<T, "quaternion", SetterArguments<THREE.Quaternion>> &
  EasierProp<T, "matrix", SetterArguments<THREE.Matrix4>> &
  EasierProp<T, "layers", SetterArguments<THREE.Layers>>

/**
 * Convenience type that provides an easier to set prop if it wraps around an object property that
 * can be set through a .set method.
 */
type EasierProp<T, Key, NewType = Key extends keyof T ? T[Key] : unknown> = Key extends keyof T
  ? { [key in Key]?: NewType }
  : {}

/** A list of inherited props that we don't want to expose. */
type HiddenProps = "children" | "attach"

/* FIXME: forwardRef apparently doesn't inject these itself? So we'll do it ourselves. */
type ChildrenProp = { children?: React.ReactNode }

type AttachProp = {
  /** Attach the object to the parent property specified here. */
  attach?: string
}

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
