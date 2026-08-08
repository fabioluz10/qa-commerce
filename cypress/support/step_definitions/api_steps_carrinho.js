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

When("eu adiciono o produto ao carrinho do usuario {int} com id {int} e quantidade {int}", (userId, productId, quantity) => {
  request("POST", "/carrinho", { userId, productId, quantity }).then((res) => {
    setResponse(res);
  });
});

When("eu solicito os itens do carrinho do usuario {int}", (userId) => {
  request("GET", `/carrinho/${userId}`).then((res) => {
    setResponse(res);
  });
});

Then("a resposta deve indicar sucesso no carrinho", () => {
  const response = getResponse();
  expect(response.body.message).to.include("carrinho");
});

Then("a resposta deve retornar uma lista de itens do carrinho", () => {
  const response = getResponse();
  expect(response.body).to.be.an("array");
  cy.log(`Itens do carrinho: ${JSON.stringify(response.body)}`);
});
