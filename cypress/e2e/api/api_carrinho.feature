Feature: Carrinho
  Eu como cliente
  Quero interagir com o carrinho da API
  Para adicionar e consultar itens


  Background: Envio de Carrinho
    Given que a API de "Carrinho" esteja disponível em "http://localhost:3000/api/carrinho"

  Scenario: Adicionar produto ao carrinho com sucesso
    When eu adiciono um novo produto ao carrinho
    Then o status da resposta deve ser 201
    And a resposta deve indicar sucesso no carrinho

  Scenario: Adicionar produto ja existente ao carrinho
    When eu adiciono o mesmo produto duas vezes ao carrinho
    Then o status da resposta deve ser 200
    And a quantidade do item no carrinho deve ser 5

  Scenario: Listar itens do carrinho com sucesso
    When eu solicito os itens do carrinho do usuario 9999
    Then o status da resposta deve ser 200
    And a resposta deve retornar uma lista de itens do carrinho

  Scenario: Listar carrinho vazio com sucesso
    When eu solicito os itens de um carrinho vazio
    Then o status da resposta deve ser 200
    And a resposta deve retornar uma lista de itens do carrinho vazia

  Scenario: Limpar carrinho com sucesso
    When eu limpo o carrinho de um usuario com itens
    Then o status da resposta deve ser 200
    And a resposta deve indicar sucesso no carrinho
    And o carrinho do usuario deve ficar vazio

  Scenario: Remover item especifico do carrinho com sucesso
    When eu removo um item especifico do carrinho
    Then o status da resposta deve ser 200
    And a resposta deve indicar sucesso no carrinho
    And o carrinho do usuario deve ficar vazio
