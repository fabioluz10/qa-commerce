const baseUrl = Cypress.env("apiBaseUrl");

class CarrinhoService {
  // Adiciona um produto ao carrinho de um usuário.
  static adicionar(payload) {
    return cy.request({
      method: "POST",
      url: `${baseUrl}/carrinho`,
      body: payload,
      failOnStatusCode: false,
    });
  }

  // Lista os produtos do carrinho de um usuário.
  static listar(userId) {
    return cy.request({
      method: "GET",
      url: `${baseUrl}/carrinho/${userId}`,
      failOnStatusCode: false,
    });
  }

  // Remove todos os produtos do carrinho de um usuário.
  static limpar(userId) {
    return cy.request({
      method: "DELETE",
      url: `${baseUrl}/carrinho/${userId}`,
      failOnStatusCode: false,
    });
  }

  // Remove um produto específico do carrinho de um usuário.
  static removerItem(userId, productId) {
    return cy.request({
      method: "DELETE",
      url: `${baseUrl}/carrinho/${userId}/${productId}`,
      failOnStatusCode: false,
    });
  }
}

export default CarrinhoService;