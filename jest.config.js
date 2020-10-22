module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  collectCoverageFrom: ["**/src/**/*.js"],
  coverageThreshold: {
    global: {
      statements: 1,
      branches: 0,
      functions: 1,
      lines: 1,
    },
  },
};
