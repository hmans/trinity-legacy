/*

WARNING:

We're currently not creating bundles. But one day we will, and then we'll
be happy we have this extremely WIP rollup configuration sitting there,
waiting for us.

*/

import { terser } from "rollup-plugin-terser"
import typescript from "rollup-plugin-typescript2"

import pkg from "./package.json"

const config = {
  terser: false,
  sourcemaps: true
}

const defaults = {
  input: "src/index.ts",
  external: [
    "react/jsx-runtime",
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    typescript({
      typescript: require("typescript"),
      check: false
    }),
    config.terser && terser()
  ]
}

export default [
  {
    ...defaults,
    output: {
      file: pkg.module,
      format: "esm",
      sourcemap: config.sourcemaps,
      exports: "named"
    }
  },
  {
    ...defaults,
    output: {
      file: pkg.main,
      format: "cjs",
      sourcemap: config.sourcemaps,
      exports: "named"
    }
  }
]
