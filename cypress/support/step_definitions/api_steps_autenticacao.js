import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import AutenticacaoService from "../services/autenticacao.service";
import autenticacaoPayloads from "../payloads/autenticacao.payloads";
import ApiService from "../services/api.service";

When("envio com credenciais Admin", () => {
  AutenticacaoService.login(autenticacaoPayloads.admin).then((res) => {
    ApiService.setResponse(res);
  });
});

When("envio com credenciais de usuário comum", () => {
  AutenticacaoService.criarUsuarioComumParaLogin().then((payload) => {
    AutenticacaoService.login({
      email: payload.email,
      password: payload.password,
    }).then((res) => {
      ApiService.setResponse(res);
    });
  });
});

When("envio com credenciais inexistente", () => {
  AutenticacaoService.login(autenticacaoPayloads.credenciaisInexistentes).then((res) => {
    ApiService.setResponse(res);
  });
});

When("envio com senha incorreta", () => {
  AutenticacaoService.login(autenticacaoPayloads.senhaIncorreta).then((res) => {
    ApiService.setResponse(res);
  });
});

When("envio sem informar e-mail", () => {
  AutenticacaoService.login(autenticacaoPayloads.semEmail).then((res) => {
    ApiService.setResponse(res);
  });
});

When("envio sem informar senha", () => {
  AutenticacaoService.login(autenticacaoPayloads.semSenha).then((res) => {
    ApiService.setResponse(res);
  });
});

When("envio com e-mail em branco", () => {
  AutenticacaoService.login(autenticacaoPayloads.emailEmBranco).then((res) => {
    ApiService.setResponse(res);
  });
});

When("envio com senha em branco", () => {
  AutenticacaoService.login(autenticacaoPayloads.senhaEmBranco).then((res) => {
    ApiService.setResponse(res);
  });
});

When("envio sem informar body da requisição", () => {
  const Request_enviada = AutenticacaoService.login(autenticacaoPayloads.sembody);
  cy.log(Request_enviada);
  AutenticacaoService.login(autenticacaoPayloads.sembody).then((res) => {
    ApiService.setResponse(res);
  });
});


Then("a request deve conter Id, Name e token de autenticação", () => {
  const response = ApiService.getResponse();
  cy.log(`Response body:`, response.body);
  expect(response.body).to.have.property("id");
  expect(response.body).to.have.property("name");
  expect(response.body).to.have.property("token");
  expect(response.body.token).to.include("Bearer");
});

Then("o corpo da resposta deve conter a mensagem {string}", (MensagemEsperada) => {
  const response = ApiService.getResponse();
  expect(response.body.message).to.eq(`${MensagemEsperada}.`);
});
