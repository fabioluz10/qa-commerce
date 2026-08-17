const usuariosPayloads = {
  novoUsuario(overrides = {}) {
    return {
      name: `Carlos ${Date.now()}`,
      email: `carlos.${Date.now()}@example.com`,
      password: "123456",
      isAdmin: false,
      ...overrides,
    };
  },

  usuarioComEmailDuplicado() {
    return {
      name: "Carlos",
      email: "admin@admin.com",
      password: "123456",
      isAdmin: false,
    };
  },

  usuarioAtualizacao(nomeBase, password, emailPrefix = "atualizado") {
    return {
      name: `${nomeBase} Atualizado`,
      email: `${emailPrefix}.${Date.now()}@example.com`,
      password,
    };
  },

  usuarioSemToken(nomeBase) {
    return {
      name: nomeBase,
      email: `semtoken.${Date.now()}@example.com`,
      password: "123456",
    };
  },

  usuarioComEmailExistente(nomeBase, emailExistente, password) {
    return {
      name: nomeBase,
      email: emailExistente,
      password,
    };
  },
};

export default usuariosPayloads;