module.exports = {
  verbose: true,
  testMatch: ["**/tests/**/*.test.js"],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    "node_modules/(?!(axios)/)"
  ],
  testEnvironment: 'jsdom',
  presets: [
    '@babel/preset-react'
  ],
};
