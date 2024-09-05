import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setupTests.ts'],
  testMatch: ['**/__tests__/**/*.(spec|test).ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Handle both .ts and .tsx files with ts-jest
    '^.+\\.jsx?$': 'babel-jest', // Use babel-jest for JavaScript files (if needed)
    '^.+\\.css$': 'jest-transform-stub',
    '^.+\\.(jpg|jpeg|png|gif|svg|webp|avif)$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': 'jest-transform-stub',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!react-bootstrap|classnames)', // Transpile specific node_modules
  ],
};

export default config;
