# Criação de cenários de testes

Feature: Autenticacao
    Eu como cliente
    Quero me autenticar na aplicação
    Para fazer meu pedido de compra

//Given-Dado
//When-Quando
//Then-Entao

//estou utilizando Background para economizar linhas de código, pois ele se repete em todos os cenários.
  Background: Envio de Autenticacao
    Given Dado que envio uma requisição POST para o endpoint de login

  Scenario: Autenticação de usuário Admin com sucesso
//  Given Dado que envio uma requisição POST para o endpoint de login
    When Quando envio com credenciais Admin
    Then Então o status da resposta deve ser 200
    And E a request deve conter Id, Name e token de autenticação

  Scenario: Autenticação de usuário com credenciais inexistente
//  Given Dado que envio uma requisição POST para o endpoint de login
    When Quando envio com credenciais inexistente
    Then Então o status da resposta deve ser 401
    And E o corpo da resposta deve conter a mensagem "Email ou senha incorretos"

  Scenario: Autenticação de usuário sem informar e-mail
//  Given Dado que envio uma requisição POST para o endpoint de login
    When Quando envio sem informar e-mail
    Then Então o status da resposta deve ser 401
    And E o corpo da resposta deve conter a mensagem "Email ou senha incorretos"

  Scenario: Autenticação de usuário sem informar senha
//  Given Dado que envio uma requisição POST para o endpoint de login
    When Quando envio sem informar senha
    Then Então o status da resposta deve ser 401
    And E o corpo da resposta deve conter a mensagem "Email ou senha incorretos"

  Scenario: Autenticação de usuário sem informar body da requisição
//  Given Dado que envio uma requisição POST para o endpoint de login
    When Quando envio sem informar body da requisição
    Then Então o status da resposta deve ser 401
    And E o corpo da resposta deve conter a mensagem "Email ou senha incorretos"