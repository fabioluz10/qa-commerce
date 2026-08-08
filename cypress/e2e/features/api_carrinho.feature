Feature: Carrinho
  Eu como cliente
  Quero interagir com o carrinho da API
  Para adicionar e consultar itens

  Scenario: Adicionar produto ao carrinho com sucesso
    When eu adiciono o produto ao carrinho do usuario 9999 com id 1 e quantidade 1
    Then o status da resposta deve ser 201
    And a resposta deve indicar sucesso no carrinho

  Scenario: Listar itens do carrinho com sucesso
    When eu solicito os itens do carrinho do usuario 9999
    Then o status da resposta deve ser 200
    And a resposta deve retornar uma lista de itens do carrinho
