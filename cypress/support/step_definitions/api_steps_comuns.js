import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

function getResponse() {
  return globalThis.__apiResponse;
}

Given("que a API de {string} esteja disponível em {string}", (apiName, endpoint) => {
  cy.log(`API ${apiName} pronta para receber requisicoes em ${endpoint}`);
});

Then("o status da resposta deve ser {int}", (statusEsperado) => {
  const response = getResponse();
  cy.log(`Status da resposta: ${response.status}`);
  cy.log(`Status esperado: ${statusEsperado}`);
  expect(response.status).to.eq(statusEsperado);
});
