import './commands';
import 'cypress-wait-until';

// Cypress Test Configuration
Cypress.config({
  watchForFileChanges: false,
  videoCompression: 32,
  videoUploadOnPasses: false,
  video: true,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'cypress/results/output.xml',
  },
  env: {
    codeCoverageTaskName: `instrumented-code-coverage`,
  },
  tsCompilerOptions: {
    sourceMap: true, // <-- Remove this line or set it to false
    inlineSourceMap: false, // <-- Remove this line or set it to false
    types: ['cypress', 'node'],
  },
});