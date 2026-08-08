import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

const baseUrl = Cypress.env("apiBaseUrl");

function setResponse(res) {
  globalThis.__apiResponse = res;
}

function getResponse() {
  return globalThis.__apiResponse;
}

function request(method, endpoint, body) {
  return cy.request({
    method,
    url: `${baseUrl}${endpoint}`,
    body,
    failOnStatusCode: false,
  });
}

When("eu solicito os pedidos do usuario {int}", (userId) => {
  request("GET", `/orders?userId=${userId}`).then((res) => {
    setResponse(res);
  });
});

Then("a resposta deve retornar uma lista de pedidos", () => {
  const response = getResponse();
  expect(response.body).to.be.an("array");
});
