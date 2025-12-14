export default {
  testEnvironment: 'node',
  verbose: true,
  transform: {},
  maxWorkers: 1,
  forceExit: true,
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
