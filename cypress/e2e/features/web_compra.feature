Feature: Compra na aplicacao web
  Eu como cliente
  Quero comprar um produto pela loja
  Para concluir minha compra com seguranca

  Background:
    Given que o carrinho do usuario esteja limpo

  Scenario: Adicionar produto ao carrinho
    Given E que eu esteja na pagina inicial da loja
    When eu adiciono 2 unidades do primeiro produto ao carrinho
    Then o produto deve ser adicionado ao carrinho com quantidade 2

  Scenario: Checkout completo com Pix
    Given E que eu esteja na pagina inicial da loja
    And eu adicione 1 unidade do primeiro produto ao carrinho
    When eu acesso o carrinho e avanço para o checkout
    And eu preencho os dados de entrega, seleciono Pix e aceito os termos
    And eu finalizo o pedido
    Then devo visualizar o status do pedido criado

  Scenario: Checkout completo com cartao de credito
    Given E que eu esteja na pagina inicial da loja
    And eu adicione 1 unidade do primeiro produto ao carrinho
    When eu acesso o carrinho e avanço para o checkout
    And eu preencho os dados de entrega, seleciono cartao de credito e aceito os termos
    And eu finalizo o pedido
    Then devo visualizar o status do pedido criado

  Scenario Outline: Checkout bloqueia campo de entrega obrigatorio vazio
    Given eu acesso diretamente a pagina de checkout
    When eu preencho todos os dados obrigatorios do checkout
    And eu limpo o campo "<campo>"
    And eu finalizo o pedido
    Then o checkout deve exibir erro de validacao no campo "<campo>"
    And o checkout deve exibir a mensagem "Por favor, preencha todos os campos obrigatório"

    Examples:
      | campo        |
      | #first-name  |
      | #last-name   |
      | #address     |
      | #number      |
      | #cep         |
      | #email       |

  Scenario: Checkout bloqueia CEP com tamanho invalido
    Given eu acesso diretamente a pagina de checkout
    When eu preencho todos os dados obrigatorios do checkout
    And eu limpo o campo "#cep"
    And eu digito "1234567" no campo "#cep"
    And eu finalizo o pedido
    Then o checkout deve exibir a mensagem "Por favor, preencha todos os campos obrigatório marcados com asteriscos!"

  Scenario: Checkout bloqueia email em formato invalido
    Given eu acesso diretamente a pagina de checkout
    When eu preencho todos os dados obrigatorios do checkout
    And eu limpo o campo "#email"
    And eu digito "email-invalido" no campo "#email"
    And eu finalizo o pedido
    Then o checkout deve exibir a mensagem "Por favor, preencha todos os campos obrigatório marcados com asteriscos!"

  Scenario: Checkout bloqueia ausencia de forma de pagamento
    Given eu acesso diretamente a pagina de checkout
    When eu preencho os dados de entrega sem selecionar pagamento
    And eu finalizo o pedido
    Then o checkout deve exibir a mensagem "Por favor, preencha todos os campos obrigatório"

  Scenario: Checkout bloqueia termos nao aceitos
    Given eu acesso diretamente a pagina de checkout
    When eu preencho os dados de entrega e seleciono Pix sem aceitar os termos
    And eu finalizo o pedido
    Then o checkout deve exibir erro de validacao no campo "#terms"

  Scenario Outline: Checkout com cartao bloqueia campo obrigatorio vazio
    Given eu acesso diretamente a pagina de checkout
    When eu seleciono cartao de credito, preencho os dados e limpo o campo "<campo>"
    And eu finalizo o pedido
    Then o checkout deve exibir erro de validacao no campo "<campo>"
    And o checkout deve exibir a mensagem "Por favor, preencha todos os campos obrigatório"

    Examples:
      | campo        |
      | #card-number |
      | #card-expiry |
      | #card-cvc    |

  Scenario Outline: Checkout com criacao de conta bloqueia senha obrigatoria vazia
    Given eu acesso diretamente a pagina de checkout
    When eu ativo a criacao de conta e limpo o campo "<campo>"
    And eu finalizo o pedido
    Then o checkout deve exibir a mensagem "Por favor, preencha todos os campos obrigatório marcados com asteriscos!"

    Examples:
      | campo             |
      | #password         |
      | #confirm-password |
