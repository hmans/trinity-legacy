import { render } from "@testing-library/react"
import React from "react"
import { Mesh } from "three"
import { Primitive } from "../../reactor/Primitive"

describe("Primitive", () => {
  it("accepts any THREE object and manages it", () => {
    const ref = React.createRef<Mesh>()
    const mesh = new Mesh()

    render(<Primitive object={mesh} ref={ref} />)
    expect(ref.current).toBe(mesh)
  })
})
