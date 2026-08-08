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

When("eu finalizo o pedido com dados validos", () => {
  request("POST", "/checkout", {
    userId: 1,
    firstName: "Maria",
    lastName: "Silva",
    address: "Rua das Flores",
    number: "123",
    cep: "12345678",
    phone: "11999999999",
    email: "maria@example.com",
    paymentMethod: "pix",
    createAccount: false,
  }).then((res) => {
    setResponse(res);
  });
});

When("eu finalizo o pedido sem informar o nome", () => {
  request("POST", "/checkout", {
    userId: 1,
    lastName: "Silva",
    address: "Rua das Flores",
    number: "123",
    cep: "12345678",
    phone: "11999999999",
    email: "maria@example.com",
    paymentMethod: "pix",
    createAccount: false,
  }).then((res) => {
    setResponse(res);
  });
});

Then("a resposta deve conter o id do pedido e o numero do pedido", () => {
  const response = getResponse();
  expect(response.body).to.have.property("id");
  expect(response.body).to.have.property("orderNumber");
});
