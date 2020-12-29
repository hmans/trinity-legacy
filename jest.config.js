export default {
  verbose: true,
  preset: "ts-jest",
  roots: ["test"],
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
  testPathIgnorePatterns: ["node_modules"],
  moduleFileExtensions: ["ts", "tsx", "js"],
  globals: {
    "ts-jest": {
      isolatedModules: true
    }
  }
}
