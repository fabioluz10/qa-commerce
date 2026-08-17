Feature: Usuarios
  Eu como cliente
  Quero gerenciar usuarios na API
  Para criar e consultar cadastros

# Given-Dado
# When-Quando
# Then-Entao

  Background: Envio de Usuarios
    Given que a API de "Usuarios" esteja disponível em "http://localhost:3000/api/users"

  Scenario: Criar usuario com sucesso
    When eu crio um novo usuario com dados validos
    Then o status da resposta deve ser 201
    And a resposta deve retornar o id do usuario criado

  Scenario: Criar usuario com email duplicado
    When eu tento criar um usuario com email duplicado
    Then o status da resposta deve ser 400
    And a resposta deve conter a mensagem "Email já cadastrado."

  Scenario: Listar usuarios com sucesso
    When eu solicito a listagem de usuarios
    Then o status da resposta deve ser 200
    And a resposta deve retornar uma lista de usuarios

  Scenario: Atualizar o proprio usuario autenticado com sucesso
    When eu atualizo o proprio usuario autenticado com dados validos
    Then o status da resposta deve ser 200
    And a resposta deve conter a mensagem "Usuário atualizado com sucesso."

  Scenario: Impedir atualizacao de outro usuario com token valido
    When eu tento atualizar outro usuario com token valido
    Then o status da resposta deve ser 403
    And a resposta deve conter a mensagem "Acesso negado. Você só pode editar seu próprio perfil."

  Scenario: Impedir atualizacao sem token
    When eu atualizo um usuario sem token
    Then o status da resposta deve ser 401
    And a resposta deve conter a mensagem "Token não fornecido."

  Scenario: Impedir atualizacao com email de outro usuario
    When eu atualizo o usuario com email ja cadastrado por outro usuario
    Then o status da resposta deve ser 400
    And a resposta deve conter a mensagem "Email já cadastrado por outro usuário."

  Scenario: Deletar usuario com token admin
    When eu deleto um usuario com token admin
    Then o status da resposta deve ser 200
    And a resposta deve conter a mensagem "Usuário deletado com sucesso."

  Scenario: Impedir delete sem token
    When eu deleto um usuario sem token
    Then o status da resposta deve ser 401
    And a resposta deve conter a mensagem "Token ausente."

  Scenario: Impedir delete com token de usuario comum
    When eu tento deletar um usuario com token de usuario comum
    Then o status da resposta deve ser 403
    And a resposta deve conter a mensagem "Acesso negado. Apenas administradores."
