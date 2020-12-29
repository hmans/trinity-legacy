import { render } from "@testing-library/react"
import React from "react"
import { Mesh, Vector3 } from "three"
import { ThreeObjectWithOptionalEventHandlers } from "../types"
import { makeComponent } from "./makeComponent"

describe("makeComponent", () => {
  const Component = makeComponent(Mesh)
  const ref = React.createRef<ThreeObjectWithOptionalEventHandlers<Mesh>>()

  it("creates a component that manages an instance of a THREE class", () => {
    render(<Component ref={ref} />)
    expect(ref.current).toBeInstanceOf(Mesh)
  })

  it("applies properties to the managed object", () => {
    render(<Component ref={ref} userData={{ foo: "bar" }} />)
    expect(ref.current!.userData.foo).toEqual("bar")
  })

  it("supports nested properties to directly set nested members of object properties", () => {
    render(<Component ref={ref} position-x={123} />)
    expect(ref.current!.position.x).toEqual(123)
  })

  it("supports array arguments to vector properties", () => {
    render(<Component ref={ref} position={[1, 2, 3]} />)
    expect(ref.current!.position).toEqual(new Vector3(1, 2, 3))
  })

  it("supports single scalar values to properties that support setScalar", () => {
    render(<Component ref={ref} scale={5} />)
    expect(ref.current!.scale).toEqual(new Vector3(5, 5, 5))
  })

  it("stores interaction event handlers in the object's __handlers property", () => {
    const handlePointerMove = jest.fn()
    render(<Component ref={ref} onPointerMove={handlePointerMove} />)
    expect(ref.current!.__handlers!.pointermove).toEqual(handlePointerMove)
  })

  it("mounts objects to their respective parents", () => {
    const parentRef = React.createRef<ThreeObjectWithOptionalEventHandlers<Mesh>>()

    render(
      <Component ref={parentRef}>
        <Component ref={ref} />
      </Component>
    )

    expect(ref.current!.parent).not.toBeUndefined()
    expect(ref.current!.parent).toEqual(parentRef.current)
  })

  it("optionally accepts an existing object instead of creating its own", () => {
    const mesh = new Mesh()

    render(<Component object={mesh} ref={ref} />)
    expect(ref.current).toBe(mesh)
  })
})
