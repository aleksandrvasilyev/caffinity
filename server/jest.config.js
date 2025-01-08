export default {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  modulePathIgnorePatterns: ["__testUtils__"],
  transformIgnorePatterns: [],
  setupFiles: ["<rootDir>/jest.setup.js"],
  testTimeout: 40000,
};
