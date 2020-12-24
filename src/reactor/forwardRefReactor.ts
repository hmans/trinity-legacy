import { forwardRef, ForwardRefRenderFunction } from "react"
import { ReactorComponentProps } from "./types"

type ModifiedProps<T, O> = Omit<ReactorComponentProps<T>, keyof O> & O

export const forwardRefReactor = <Ref, OverrideProps = {}>(
  fn: ForwardRefRenderFunction<Ref, ModifiedProps<Ref, OverrideProps>>
) => forwardRef(fn)
