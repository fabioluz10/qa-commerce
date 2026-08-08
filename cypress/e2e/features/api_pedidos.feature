Feature: Pedidos
  Eu como cliente
  Quero consultar os pedidos da API
  Para acompanhar minhas compras

  Scenario: Listar pedidos do usuario com sucesso
    When eu solicito os pedidos do usuario 1
    Then o status da resposta deve ser 200
    And a resposta deve retornar uma lista de pedidos
