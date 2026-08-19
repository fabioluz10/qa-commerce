
Feature: Autenticacao
    Eu como cliente
    Quero me autenticar na aplicação
    Para fazer meu pedido de compra


  Background: Envio de Autenticacao
    Given que a API de "Login" esteja disponível em "http://localhost:3000/api/login"

  Scenario: Autenticação de usuário Admin com sucesso
    When envio com credenciais Admin
    Then o status da resposta deve ser 200
    And a request deve conter Id, Name e token de autenticação

  Scenario: Autenticação de usuário comum com sucesso
    When envio com credenciais de usuário comum
    Then o status da resposta deve ser 200
    And a request deve conter Id, Name e token de autenticação

  Scenario: Autenticação de usuário com credenciais inexistente
    When envio com credenciais inexistente
    Then o status da resposta deve ser 401
    And o corpo da resposta deve conter a mensagem "Email ou senha incorretos"

  Scenario: Autenticação de usuário com senha incorreta
    When envio com senha incorreta
    Then o status da resposta deve ser 401
    And o corpo da resposta deve conter a mensagem "Email ou senha incorretos"

  Scenario: Autenticação de usuário sem informar e-mail
    When envio sem informar e-mail
    Then o status da resposta deve ser 401
    And o corpo da resposta deve conter a mensagem "Email ou senha incorretos"

  Scenario: Autenticação de usuário sem informar senha
    When envio sem informar senha
    Then o status da resposta deve ser 401
    And o corpo da resposta deve conter a mensagem "Email ou senha incorretos"

  Scenario: Autenticação de usuário com e-mail em branco
    When envio com e-mail em branco
    Then o status da resposta deve ser 401
    And o corpo da resposta deve conter a mensagem "Email ou senha incorretos"

  Scenario: Autenticação de usuário com senha em branco
    When envio com senha em branco
    Then o status da resposta deve ser 401
    And o corpo da resposta deve conter a mensagem "Email ou senha incorretos"

  Scenario: Autenticação de usuário sem informar body da requisição
    When envio sem informar body da requisição
    Then o status da resposta deve ser 401
    And o corpo da resposta deve conter a mensagem "Email ou senha incorretos"