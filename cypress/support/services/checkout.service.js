const baseUrl = Cypress.env("apiBaseUrl");

class CheckoutService {
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