import type { Config } from 'jest';
import { compilerOptions } from './tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest';

const config: Config = {
  verbose: true,
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testEnvironment: 'jsdom',
  globalSetup: "jest-preset-angular/global-setup",
  testMatch: ['**/tests/**/*.spec.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/app/**/*.ts'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};

export default config;
