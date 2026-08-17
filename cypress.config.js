const { defineConfig } = require("cypress");
import { allureCypress } from "allure-cypress/reporter";
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  allowCypressEnv: true,

  env: {
    apiBaseUrl: "http://localhost:3000/api",
    webBaseUrl: "http://localhost:3000",
  },

  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "**/*.feature",
    defaultCommandTimeout: 10000,
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: true
    },
    setupNodeEvents(on, config) {
      addCucumberPreprocessorPlugin(on, config);

      allureCypress(on, config, {
        resultsDir: "allure-results",
      });
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  },
});
