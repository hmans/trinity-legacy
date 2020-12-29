export default {
  verbose: true,
  preset: "ts-jest",
  testMatch: ["**/?(*.)+(spec|test).+(ts|tsx|js)"],
  testPathIgnorePatterns: ["node_modules"],
  moduleFileExtensions: ["ts", "tsx", "js"],
  globals: {
    "ts-jest": {
      isolatedModules: true
    }
  }
}
