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

When("eu crio um novo usuario com dados validos", () => {
  request("POST", "/users", {
    name: "Carlos",
    email: `carlos${Date.now()}@example.com`,
    password: "123456",
    isAdmin: false,
  }).then((res) => {
    setResponse(res);
  });
});

When("eu solicito a listagem de usuarios", () => {
  request("GET", "/users").then((res) => {
    setResponse(res);
  });
});

Then("a resposta deve retornar o id do usuario criado", () => {
  const response = getResponse();
  expect(response.body).to.have.property("id");
});

Then("a resposta deve retornar uma lista de usuarios", () => {
  const response = getResponse();
  expect(response.body).to.be.an("array");
});
