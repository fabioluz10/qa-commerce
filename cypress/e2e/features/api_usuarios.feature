Feature: Usuarios
  Eu como cliente
  Quero gerenciar usuarios na API
  Para criar e consultar cadastros

  Scenario: Criar usuario com sucesso
    When eu crio um novo usuario com dados validos
    Then o status da resposta deve ser 201
    And a resposta deve retornar o id do usuario criado

  Scenario: Listar usuarios com sucesso
    When eu solicito a listagem de usuarios
    Then o status da resposta deve ser 200
    And a resposta deve retornar uma lista de usuarios
