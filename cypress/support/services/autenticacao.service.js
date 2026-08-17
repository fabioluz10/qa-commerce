import UsuariosService from "./usuarios.service";

class AutenticacaoService {
  // Envia as credenciais para o endpoint de login da API.
  static login(payload) {
    return cy.request({
      method: "POST",
      url: "http://localhost:3000/api/login",
      body: payload,
      failOnStatusCode: false,
    });
  }

  // Cria um usuário comum com dados únicos e retorna o payload usado no cadastro.
  static criarUsuarioComumParaLogin() {
    const payload = {
      name: `Usuario ${Date.now()}`,
      email: `usuario.${Date.now()}@example.com`,
      password: "123456",
      isAdmin: false,
    };

    return UsuariosService.criar(payload).then(() => payload);
  }

  // Cria um usuário comum e usa as credenciais dele para fazer login.
  static loginComUsuarioComum() {
    return this.criarUsuarioComumParaLogin().then((payload) =>
      this.login({
        email: payload.email,
        password: payload.password,
      })
    );
  }
}

export default AutenticacaoService;