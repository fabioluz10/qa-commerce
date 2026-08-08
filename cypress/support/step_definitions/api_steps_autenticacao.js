import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import AutenticacaoService from "../services/autenticacao.service";
import autenticacaoPayloads from "../payloads/autenticacao.payloads";

//Given-Dado
//When-Quando
//Then-Entao

let response;

Given("Dado que envio uma requisição POST para o endpoint de login", () => {
  // este passo pode ficar vazio ou servir como ponto de entrada do cenário
});

When("Quando envio com credenciais Admin", () => {
  AutenticacaoService.login(autenticacaoPayloads.admin).then((res) => {
    response = res;
  });
});

When("Quando envio com credenciais inexistente", () => {
  AutenticacaoService.login(autenticacaoPayloads.credenciaisInexistentes).then((res) => {
    response = res;
  });
});

When("Quando envio sem informar e-mail", () => {
  AutenticacaoService.login(autenticacaoPayloads.semEmail).then((res) => {
    response = res;
  });
});

When("Quando envio sem informar senha", () => {
  AutenticacaoService.login(autenticacaoPayloads.semSenha).then((res) => {
    response = res;
  });
});

When("Quando envio sem informar body da requisição", () => {
  const Request_enviada = AutenticacaoService.login(autenticacaoPayloads.semEmailESenha);
  cy.log(Request_enviada);
  AutenticacaoService.login(autenticacaoPayloads.sembody).then((res) => {
    response = res;
  });
});

Then("Então o status da resposta deve ser {int}", (statusEsperado) => {
  cy.log(`Status da resposta: ${response.status}`);
  cy.log(`Status esperado: ${statusEsperado}`);
  expect(response.status).to.eq(statusEsperado);
});

Then("E a request deve conter Id, Name e token de autenticação", () => {
  cy.log(`Response body:`, response.body);
  expect(response.body).to.have.property("id");
  expect(response.body).to.have.property("name");
  expect(response.body).to.have.property("token");
  expect(response.body.token).to.include("Bearer");
});

Then("E o corpo da resposta deve conter a mensagem {string}", (MensagemEsperada) => {
  expect(response.body.message).to.eq(`${MensagemEsperada}.`);
});
