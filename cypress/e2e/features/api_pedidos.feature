Feature: Pedidos
  Eu como cliente
  Quero consultar os pedidos da API
  Para acompanhar minhas compras

# Given-Dado
# When-Quando
# Then-Entao

  Background: Envio de Pedidos
    Given que a API de "Pedidos" esteja disponível em "http://localhost:3000/api/orders"

  Scenario: Listar pedidos do usuario com sucesso
    When eu solicito os pedidos do usuario 1
    Then o status da resposta deve ser 200
    And a resposta deve retornar uma lista de pedidos

  Scenario: Listar pedidos sem informar usuario
    When eu solicito os pedidos sem informar usuario
    Then o status da resposta deve ser 100
    And a resposta deve retornar uma lista de pedidos vazia

  Scenario: Consultar status de um pedido existente
    When eu consulto o status de um pedido existente
    Then o status da resposta deve ser 200
    And a resposta deve retornar os dados do pedido consultado

  Scenario: Consultar status de um pedido inexistente
    When eu consulto o status do pedido 999999
    Then o status da resposta deve ser 404
    And a resposta deve conter a mensagem "Pedido não encontrado."
