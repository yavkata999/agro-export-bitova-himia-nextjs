module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss)$': '<rootDir>/tests/styleMock.js'
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts']
};
