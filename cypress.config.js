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
    // Define a URL base usada pelo Cypress para acessar a aplicação local.
    baseUrl: "http://localhost:3000",
    // Faz o Cypress buscar arquivos .feature como especificações de teste.
    specPattern: "**/*.feature",
    //os reporter serve para demosntrar no log do terminal o resultado dos testes, e o reporterOptions serve para configurar o local onde será salvo o relatório.
     reporter: 'json',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: true
    },
    setupNodeEvents(on, config) {
      // Ativa o suporte ao Cucumber/Gherkin no Cypress.
      addCucumberPreprocessorPlugin(on, config);
      // Configura o Allure para gerar relatórios de teste.
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });
      // Configura o bundler para processar os arquivos de teste corretamente.
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
