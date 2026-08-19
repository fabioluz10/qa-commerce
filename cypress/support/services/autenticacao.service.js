import UsuariosService from "./usuarios.service";

class AutenticacaoService {
  static login(payload) {
    return cy.request({
      method: "POST",
      url: "http://localhost:3000/api/login",
      body: payload,
      failOnStatusCode: false,
    });
  }

  static criarUsuarioComumParaLogin() {
    const payload = {
      name: `Usuario ${Date.now()}`,
      email: `usuario.${Date.now()}@example.com`,
      password: "123456",
      isAdmin: false,
    };

    return UsuariosService.criar(payload).then(() => payload);
  }

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