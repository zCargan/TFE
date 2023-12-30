// jest.config.js
module.exports = {
    verbose: true,
    testMatch: ["**/tests/**/*.test.js"],
    transform: {
      "^.+\\.jsx?$": "babel-jest",
    },
    transformIgnorePatterns: [
      "/node_modules/(?!(@babel/preset-react)/)",
    ],
    testEnvironment: 'node',
  };
  