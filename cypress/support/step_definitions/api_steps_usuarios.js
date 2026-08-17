import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import AutenticacaoService from "../services/autenticacao.service";
import UsuariosService from "../services/usuarios.service";
import usuariosPayloads from "../payloads/usuarios.payloads";
import ApiService from "../services/api.service";

When("eu crio um novo usuario com dados validos", () => {
  UsuariosService.criarUsuarioTemporario().then(({ response }) => {
    ApiService.setResponse(response);
  });
});

When("eu tento criar um usuario com email duplicado", () => {
  UsuariosService.criar(usuariosPayloads.usuarioComEmailDuplicado()).then((res) => {
    ApiService.setResponse(res);
  });
});

When("eu solicito a listagem de usuarios", () => {
  UsuariosService.listar().then((res) => {
    ApiService.setResponse(res);
  });
});

When("eu atualizo o proprio usuario autenticado com dados validos", () => {
  UsuariosService.criarUsuarioTemporario().then(({ response, payload }) => {
    const userId = response.body.id;

    AutenticacaoService.login({ email: payload.email, password: payload.password }).then((loginResponse) => {
      UsuariosService.atualizar(
        userId,
        usuariosPayloads.usuarioAtualizacao(payload.name, payload.password),
        loginResponse.body.token
      ).then((res) => {
        ApiService.setResponse(res);
      });
    });
  });
});

When("eu tento atualizar outro usuario com token valido", () => {
  UsuariosService.criarUsuarioTemporario().then(({ response: actorResponse, payload: actorPayload }) => {
    UsuariosService.criarUsuarioTemporario().then(({ response: targetResponse }) => {
      AutenticacaoService.login({ email: actorPayload.email, password: actorPayload.password }).then((loginResponse) => {
        UsuariosService.atualizar(
          targetResponse.body.id,
          usuariosPayloads.usuarioAtualizacao("Outro Usuario", actorPayload.password, "outro"),
          loginResponse.body.token
        ).then((res) => {
          ApiService.setResponse(res);
        });
      });
    });
  });
});

When("eu atualizo um usuario sem token", () => {
  UsuariosService.criarUsuarioTemporario().then(({ response }) => {
    UsuariosService.atualizar(response.body.id, usuariosPayloads.usuarioSemToken("Sem Token")).then((res) => {
        ApiService.setResponse(res);
    });
  });
});

When("eu atualizo o usuario com email ja cadastrado por outro usuario", () => {
  UsuariosService.criarUsuarioTemporario().then(({ response: actorResponse, payload: actorPayload }) => {
    UsuariosService.criarUsuarioTemporario().then(({ payload: targetPayload }) => {
      AutenticacaoService.login({ email: actorPayload.email, password: actorPayload.password }).then((loginResponse) => {
        UsuariosService.atualizar(
          actorResponse.body.id,
          usuariosPayloads.usuarioComEmailExistente(actorPayload.name, targetPayload.email, actorPayload.password),
          loginResponse.body.token
        ).then((res) => {
          ApiService.setResponse(res);
        });
      });
    });
  });
});

When("eu deleto um usuario com token admin", () => {
  UsuariosService.criarUsuarioTemporario().then(({ response }) => {
    AutenticacaoService.login({ email: "admin@admin.com", password: "admin" }).then((loginResponse) => {
      UsuariosService.deletar(response.body.id, loginResponse.body.token).then((res) => {
        ApiService.setResponse(res);
      });
    });
  });
});

When("eu deleto um usuario sem token", () => {
  UsuariosService.criarUsuarioTemporario().then(({ response }) => {
    UsuariosService.deletar(response.body.id).then((res) => {
      ApiService.setResponse(res);
    });
  });
});

When("eu tento deletar um usuario com token de usuario comum", () => {
  UsuariosService.criarUsuarioTemporario().then(({ payload: actorPayload }) => {
    UsuariosService.criarUsuarioTemporario().then(({ response: targetResponse }) => {
      AutenticacaoService.login({ email: actorPayload.email, password: actorPayload.password }).then((loginResponse) => {
        UsuariosService.deletar(targetResponse.body.id, loginResponse.body.token).then((res) => {
          ApiService.setResponse(res);
        });
      });
    });
  });
});

Then("a resposta deve retornar o id do usuario criado", () => {
  const response = ApiService.getResponse();
  expect(response.body).to.have.property("id");
});

Then("a resposta deve retornar uma lista de usuarios", () => {
  const response = ApiService.getResponse();
  expect(response.body).to.be.an("array");
});
