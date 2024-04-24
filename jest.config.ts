import type { Config } from 'jest';
import { compilerOptions } from './tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest';

const config: Config = {
  verbose: true,
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/**/*.spec.ts'],
  collectCoverage: true,
  // collectCoverageFrom: ['src/app/**/*.ts'],
  collectCoverageFrom: ['src/app/services/*.ts'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};

export default config;
