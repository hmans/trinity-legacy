import { terser } from "rollup-plugin-terser"
import typescript from "rollup-plugin-typescript2"
import pkg from "./package.json"

const config = {
  terser: false,
  sourcemaps: true
}

const defaults = {
  input: "src/index.ts",
  external: ["react", "three", "react/jsx-runtime"],
  plugins: [
    typescript({
      typescript: require("typescript")
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
      sourcemap: config.sourcemaps
    }
  },
  {
    ...defaults,
    output: {
      file: pkg.main,
      format: "cjs",
      sourcemap: config.sourcemaps
    }
  }
]
