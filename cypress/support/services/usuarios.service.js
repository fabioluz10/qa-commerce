import usuariosPayloads from "../payloads/usuarios.payloads";

const baseUrl = Cypress.env("apiBaseUrl");

class UsuariosService {
  static criar(payload) {
    return cy.request({
      method: "POST",
      url: `${baseUrl}/users`,
      body: payload,
      failOnStatusCode: false,
    });
  }

  static criarUsuarioTemporario(overrides = {}) {
    const payload = usuariosPayloads.novoUsuario(overrides);

    return this.criar(payload).then((response) => ({
      response,
      payload,
    }));
  }

  static listar() {
    return cy.request({
      method: "GET",
      url: `${baseUrl}/users`,
      failOnStatusCode: false,
    });
  }

  static atualizar(userId, payload, token) {
    return cy.request({
      method: "PUT",
      url: `${baseUrl}/users/${userId}`,
      body: payload,
      headers: token ? { Authorization: token } : {},
      failOnStatusCode: false,
    });
  }

  static deletar(userId, token) {
    return cy.request({
      method: "DELETE",
      url: `${baseUrl}/users/${userId}`,
      headers: token ? { Authorization: token } : {},
      failOnStatusCode: false,
    });
  }
}

export default UsuariosService;