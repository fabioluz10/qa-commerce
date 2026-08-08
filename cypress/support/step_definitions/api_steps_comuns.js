import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

function getResponse() {
  return globalThis.__apiResponse;
}

Given("que a API esteja disponível", () => {
  cy.log("API pronta para receber requisições");
});

Then("o status da resposta deve ser {int}", (statusEsperado) => {
  const response = getResponse();
  expect(response.status).to.eq(statusEsperado);
});
