/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: './src',
    testPathIgnorePatterns: [
        "<rootDir>/src/__tests__/mockData.ts/"
    ]
  };