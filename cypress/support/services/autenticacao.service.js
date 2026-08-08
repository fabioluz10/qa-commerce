class AutenticacaoService {
  static login(payload) {
    return cy.request({
      method: "POST",
      url: "http://localhost:3000/api/login",
      body: payload,
      failOnStatusCode: false,
    });
  }
}

export default AutenticacaoService;