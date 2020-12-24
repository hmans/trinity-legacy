import React from "react"
import THREE from "three"

const ParentContext = React.createContext<THREE.Object3D | undefined>(undefined)

ParentContext.displayName = "ParentContext"

export default ParentContext
