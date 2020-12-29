import { render } from "@testing-library/react"
import React from "react"
import { Mesh } from "three"
import { Reactor } from "../../reactor/Reactor"

describe("makeComponent", () => {
  const ref = React.createRef<Mesh>()

  it("creates React components wrapping around the specified THREE class", () => {
    render(<Reactor.Mesh ref={ref} />)
    expect(ref.current).toBeInstanceOf(Mesh)
  })
})
