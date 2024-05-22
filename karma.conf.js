const { ArtifactArchiver } = require("@serenity-js/core");
const { JasmineReporter } = require("@serenity-js/jasmine");

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-coverage"),
      require("karma-jasmine-html-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
      {
        "reporter:jasmine-done": ["type", JasmineReporter],
        "reporter:artifact-archiver": ["type", ArtifactArchiver],
      },
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage/your-app-name"),
      subdir: ".",
      reporters: [{ type: "html" }, { type: "text-summary" }],
    },
    reporters: ["progress", "kjhtml", "jasmine-done", "artifact-archiver"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false,
    restartOnFileChange: true,
    files: [
      // Include only files with the .test.ts extension
      { pattern: "test/*.test.ts", watched: true },
      { pattern: "src/**/*.spec.ts", included: false, watched: false },
    ],
  });
};
