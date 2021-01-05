import { Group } from "three"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import { useLoader } from "./useLoader"

export const useFBX = (url: string) => useLoader<Group>(FBXLoader, url)
