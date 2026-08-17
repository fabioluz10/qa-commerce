import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CarrinhoService from "../services/carrinho.service";
import ApiService from "../services/api.service";

let itensCarrinho = {};

When("eu adiciono o produto ao carrinho do usuario {int} com id {int} e quantidade {int}", (userId, productId, quantity) => {
  CarrinhoService.adicionar({ userId, productId, quantity }).then((res) => {
    ApiService.setResponse(res);
  });
});

When("eu adiciono um novo produto ao carrinho", () => {
  const userId = Date.now();

  CarrinhoService.adicionar({ userId, productId: 1, quantity: 1 }).then((res) => {
    ApiService.setResponse(res);
  });
});

When("eu adiciono o mesmo produto duas vezes ao carrinho", () => {
  const userId = Date.now();
  const productId = 1;

  itensCarrinho = { userId, productId };

  CarrinhoService.adicionar({ userId, productId, quantity: 2 }).then(() => {
    CarrinhoService.adicionar({ userId, productId, quantity: 3 }).then((res) => {
      ApiService.setResponse(res);
    });
  });
});

When("eu solicito os itens do carrinho do usuario {int}", (userId) => {
  CarrinhoService.listar(userId).then((res) => {
    ApiService.setResponse(res);
  });
});

When("eu solicito os itens de um carrinho vazio", () => {
  itensCarrinho = { userId: Date.now() };
  CarrinhoService.listar(itensCarrinho.userId).then((res) => {
    ApiService.setResponse(res);
  });
});

When("eu limpo o carrinho de um usuario com itens", () => {
  const userId = Date.now();
  itensCarrinho = { userId };

  CarrinhoService.adicionar({ userId, productId: 1, quantity: 1 }).then(() => {
    CarrinhoService.limpar(userId).then((res) => {
      ApiService.setResponse(res);
    });
  });
});

When("eu removo um item especifico do carrinho", () => {
  const userId = Date.now();
  const productId = 1;

  itensCarrinho = { userId, productId };

  CarrinhoService.adicionar({ userId, productId, quantity: 1 }).then(() => {
    CarrinhoService.removerItem(userId, productId).then((res) => {
      ApiService.setResponse(res);
    });
  });
});

Then("a resposta deve indicar sucesso no carrinho", () => {
  const response = ApiService.getResponse();
  expect(response.body.message).to.include("carrinho");
});

Then("a resposta deve retornar uma lista de itens do carrinho", () => {
  const response = ApiService.getResponse();
  expect(response.body).to.be.an("array");
  cy.log(`Itens do carrinho: ${JSON.stringify(response.body)}`);
});

Then("a resposta deve retornar uma lista de itens do carrinho vazia", () => {
  const response = ApiService.getResponse();
  expect(response.body).to.be.an("array");
  expect(response.body).to.have.length(0);
});

Then("a quantidade do item no carrinho deve ser {int}", (expectedQuantity) => {
  CarrinhoService.listar(itensCarrinho.userId).then((res) => {
    const item = res.body.find((product) => product.productId === itensCarrinho.productId);
    expect(item).to.exist;
    expect(item.quantity).to.eq(expectedQuantity);
  });
});

Then("o carrinho do usuario deve ficar vazio", () => {
  CarrinhoService.listar(itensCarrinho.userId).then((res) => {
    expect(res.body).to.be.an("array");
    expect(res.body).to.have.length(0);
  });
});
