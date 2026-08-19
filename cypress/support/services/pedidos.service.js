const baseUrl = Cypress.env("apiBaseUrl");

class PedidosService {
  static listar(userId) {
    const endpoint = userId === undefined ? "/orders" : `/orders?userId=${userId}`;

    return cy.request({
      method: "GET",
      url: `${baseUrl}${endpoint}`,
      failOnStatusCode: false,
    });
  }

  static consultar(orderId) {
    return cy.request({
      method: "GET",
      url: `${baseUrl}/orders/${orderId}`,
      failOnStatusCode: false,
    });
  }
}

export default PedidosService;