const baseUrl = Cypress.env("apiBaseUrl");

class PedidosService {
  // Lista todos os pedidos ou apenas os pedidos de um usuário específico.
  static listar(userId) {
    const endpoint = userId === undefined ? "/orders" : `/orders?userId=${userId}`;

    return cy.request({
      method: "GET",
      url: `${baseUrl}${endpoint}`,
      failOnStatusCode: false,
    });
  }

  // Consulta os dados de um pedido pelo identificador.
  static consultar(orderId) {
    return cy.request({
      method: "GET",
      url: `${baseUrl}/orders/${orderId}`,
      failOnStatusCode: false,
    });
  }
}

export default PedidosService;