module.exports = {
  verbose: true,
  preset: "ts-jest",
  roots: ["src"],
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
  testPathIgnorePatterns: ["node_modules"],
  globals: {
    "ts-jest": {
      isolatedModules: true
    }
  }
}
