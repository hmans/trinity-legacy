import * as THREE from "three"

export const intersectInList = (intersection: THREE.Intersection, list: THREE.Intersection[]) =>
  list.find((i) => i.object === intersection.object && i.instanceId === intersection.instanceId)
