const baseUrl = Cypress.env("apiBaseUrl");

class CarrinhoService {
  static adicionar(payload) {
    return cy.request({
      method: "POST",
      url: `${baseUrl}/carrinho`,
      body: payload,
      failOnStatusCode: false,
    });
  }

  static listar(userId) {
    return cy.request({
      method: "GET",
      url: `${baseUrl}/carrinho/${userId}`,
      failOnStatusCode: false,
    });
  }

  static limpar(userId) {
    return cy.request({
      method: "DELETE",
      url: `${baseUrl}/carrinho/${userId}`,
      failOnStatusCode: false,
    });
  }

  static removerItem(userId, productId) {
    return cy.request({
      method: "DELETE",
      url: `${baseUrl}/carrinho/${userId}/${productId}`,
      failOnStatusCode: false,
    });
  }
}

export default CarrinhoService;