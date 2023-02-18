module.exports = {
    moduleFileExtensions: [
      "js",
      "jsx",
      "json",
      "node"
    ],
    transform: {
      "^.+\\.(js|jsx)?$": "babel-jest"
    },
    testMatch: [
      "**/__tests__/**/*.[jt]s?(x)",
      "**/?(*.)+(spec|test).[tj]s?(x)"
    ],
    testEnvironment: "jsdom",
    setupFilesAfterEnv: [
      "@testing-library/jest-dom/extend-expect"
    ],
  };
  