module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  rootDir: ".",

  roots: ["<rootDir>/app-reminder/tests"],

  setupFiles: ["<rootDir>/app-reminder/tests/setup.ts"],

  transform: {
    "^.+\\.ts$": ["ts-jest", {
      tsconfig: "<rootDir>/app-reminder/tsconfig.json"
    }]
  },

  moduleFileExtensions: ["ts", "js"],
  clearMocks: true
};