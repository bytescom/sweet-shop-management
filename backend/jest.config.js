module.exports = {
  testEnvironment: 'node',
  verbose: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!jest.config.js'
  ],
  testMatch: ['**/tests/**/*.test.js', '**/*.test.js'],
  setupFilesAfterEnv: [],
};
