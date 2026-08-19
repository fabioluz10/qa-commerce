Feature: Checkout
  Eu como cliente
  Quero finalizar meu pedido na API
  Para concluir a compra


  Background: Envio de Checkout
    Given que a API de "Checkout" esteja disponível em "http://localhost:3000/api/checkout"

  Scenario: Finalizar pedido com dados validos
    When eu finalizo o pedido com dados validos
    Then o status da resposta deve ser 201
    And a resposta deve conter o id do pedido e o numero do pedido

  Scenario: Finalizar pedido com boleto
    When eu finalizo o pedido com boleto
    Then o status da resposta deve ser 201
    And a resposta deve conter o id do pedido e o numero do pedido

  Scenario: Finalizar pedido com cartao de credito
    When eu finalizo o pedido com cartao de credito
    Then o status da resposta deve ser 201
    And a resposta deve conter o id do pedido e o numero do pedido

  Scenario: Finalizar pedido com dados invalidos
    When eu finalizo o pedido sem informar o nome
    Then o status da resposta deve ser 400

  Scenario: Finalizar pedido com email invalido
    When eu finalizo o pedido com email invalido
    Then o status da resposta deve ser 400

  Scenario: Finalizar pedido criando conta com sucesso
    When eu finalizo o pedido criando uma nova conta
    Then o status da resposta deve ser 201
    And a resposta deve conter o id do pedido e o numero do pedido

  Scenario: Finalizar pedido criando conta com email ja cadastrado
    When eu finalizo o pedido criando conta com email ja cadastrado
    Then o status da resposta deve ser 400
    And a resposta deve conter a mensagem "E-mail já registrado. Tente um email diferente"
