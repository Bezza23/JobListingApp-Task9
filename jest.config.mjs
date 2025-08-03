// jest.config.mjs
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',

  // --- THE FIX IS HERE ---
  // Make this mapper match your tsconfig.json paths
  moduleNameMapper: {
    // This tells Jest to map '@/' to the '<rootDir>/app/' directory.
    '^@/(.*)$': '<rootDir>/app/$1',
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);