const baseUrl = Cypress.env("apiBaseUrl");

class CheckoutService {
  // Envia os dados para finalizar uma compra e criar o pedido.
  static finalizar(payload) {
    return cy.request({
      method: "POST",
      url: `${baseUrl}/checkout`,
      body: payload,
      failOnStatusCode: false,
    });
  }
}

export default CheckoutService;