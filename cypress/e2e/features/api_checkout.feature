Feature: Checkout
  Eu como cliente
  Quero finalizar meu pedido na API
  Para concluir a compra

  Scenario: Finalizar pedido com dados validos
    When eu finalizo o pedido com dados validos
    Then o status da resposta deve ser 201
    And a resposta deve conter o id do pedido e o numero do pedido

  Scenario: Finalizar pedido com dados invalidos
    When eu finalizo o pedido sem informar o nome
    Then o status da resposta deve ser 400
