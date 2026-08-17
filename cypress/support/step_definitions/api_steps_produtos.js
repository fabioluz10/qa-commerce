import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

const baseUrl = Cypress.env("apiBaseUrl");

function setResponse(res) {
  globalThis.__apiResponse = res;
}

function getResponse() {
  return globalThis.__apiResponse;
}

function request(endpoint) {
  return cy.request({
    method: "GET",
    url: `${baseUrl}${endpoint}`,
    failOnStatusCode: false,
  });
}

When("eu solicito a listagem padrao de produtos", () => {
  request("/produtos").then((res) => {
    setResponse(res);
  });
});

When("eu solicito a listagem de produtos na pagina {int} com limite {int}", (page, limit) => {
  request(`/produtos?page=${page}&limit=${limit}`).then((res) => {
    setResponse(res);
  });
});

When("eu solicito o detalhe do produto {int}", (productId) => {
  request(`/produtos/${productId}`).then((res) => {
    setResponse(res);
  });
});

Then("a resposta deve conter a estrutura paginada de produtos", () => {
  const response = getResponse();

  expect(response.body).to.have.property("products");
  expect(response.body).to.have.property("totalPages");
  expect(response.body).to.have.property("currentPage");
  expect(response.body.products).to.be.an("array");
});

Then("a lista de produtos deve respeitar o limite informado {int}", (limit) => {
  const response = getResponse();

  expect(response.body.products).to.be.an("array");
  expect(response.body.products.length).to.be.at.most(limit);
  expect(response.body.currentPage).to.eq(2);
});

Then("a resposta deve retornar lista de produtos vazia", () => {
  const response = getResponse();

  expect(response.body.products).to.be.an("array");
  expect(response.body.products).to.have.length(0);
});

Then("a resposta deve retornar um produto com os campos esperados", () => {
  const response = getResponse();

  expect(response.body).to.include.all.keys("id", "name", "description", "price", "image");
});

Then("a resposta deve conter a mensagem {string}", (message) => {
  const response = getResponse();

  expect(response.body.message).to.eq(message);
});