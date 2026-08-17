import usuariosPayloads from "../payloads/usuarios.payloads";

const baseUrl = Cypress.env("apiBaseUrl");

class UsuariosService {
  // Envia os dados para criar um novo usuário.
  static criar(payload) {
    return cy.request({
      method: "POST",
      url: `${baseUrl}/users`,
      body: payload,
      failOnStatusCode: false,
    });
  }

  // Gera os dados de um usuário temporário, cria esse usuário e retorna dados e resposta.
  static criarUsuarioTemporario(overrides = {}) {
    const payload = usuariosPayloads.novoUsuario(overrides);

    return this.criar(payload).then((response) => ({
      response,
      payload,
    }));
  }

  // Solicita a lista de usuários cadastrados.
  static listar() {
    return cy.request({
      method: "GET",
      url: `${baseUrl}/users`,
      failOnStatusCode: false,
    });
  }

  // Atualiza os dados de um usuário, usando o token quando ele for informado.
  static atualizar(userId, payload, token) {
    return cy.request({
      method: "PUT",
      url: `${baseUrl}/users/${userId}`,
      body: payload,
      headers: token ? { Authorization: token } : {},
      failOnStatusCode: false,
    });
  }

  // Exclui um usuário, usando o token de autorização quando ele for informado.
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