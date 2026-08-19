# Plano de Teste API em BDD

## Base analisada

- Swagger UI: http://localhost:3000/api-docs/
- Especificacao local: `config/swagger.json`
- Implementacao real: `src/server.js`
- Automacao atual: `cypress/e2e/api`, `cypress/e2e/web` e `cypress/support/step_definitions`

## Observacao

Este levantamento cobre os cenarios funcionais, de validacao e de autorizacao mais relevantes para a API. Ele e completo do ponto de vista pratico para QA, mas nao tenta enumerar combinacoes infinitas de dados.

## Inventario de endpoints documentados no Swagger

| Funcionalidade | Metodo | Endpoint | Link completo |
| --- | --- | --- | --- |
| Login | POST | /api/login | http://localhost:3000/api/login |
| Adicionar ao carrinho | POST | /api/carrinho | http://localhost:3000/api/carrinho |
| Listar carrinho | GET | /api/carrinho/{userId} | http://localhost:3000/api/carrinho/1 |
| Limpar carrinho do usuario | DELETE | /api/carrinho/{userId} | http://localhost:3000/api/carrinho/1 |
| Remover item especifico do carrinho | DELETE | /api/carrinho/{userId}/{productId} | http://localhost:3000/api/carrinho/1/1 |
| Finalizar checkout | POST | /api/checkout | http://localhost:3000/api/checkout |
| Listar produtos | GET | /api/produtos | http://localhost:3000/api/produtos |
| Detalhar produto | GET | /api/produtos/{id} | http://localhost:3000/api/produtos/1 |
| Listar pedidos do usuario | GET | /api/orders?userId={id} | http://localhost:3000/api/orders?userId=1 |
| Criar usuario | POST | /api/users | http://localhost:3000/api/users |
| Listar usuarios | GET | /api/users | http://localhost:3000/api/users |
| Atualizar usuario | PUT | /api/users/{id} | http://localhost:3000/api/users/1 |
| Deletar usuario | DELETE | /api/users/{id} | http://localhost:3000/api/users/1 |

## Endpoints existentes no codigo mas fora do Swagger

| Metodo | Endpoint | Link completo | Observacao |
| --- | --- | --- | --- |
| POST | /api/registrar | http://localhost:3000/api/registrar | Cadastro simples de usuario |
| POST | /api/limpar-carrinho | http://localhost:3000/api/limpar-carrinho | Limpeza via body com userId |
| GET | /api/orders/{orderId} | http://localhost:3000/api/orders/1 | Consulta status de pedido |
| GET | /api/ultimo-pedido/{userId} | http://localhost:3000/api/ultimo-pedido/1 | Busca ultimo pedido |
| PUT | /api/cart/{id} | http://localhost:3000/api/cart/1 | Atualiza item do carrinho por id da linha |
| DELETE | /api/cart/{id} | http://localhost:3000/api/cart/1 | Remove item do carrinho por id da linha |

## Plano simples de entendimento

### Objetivo

Validar que a API de ecommerce suporta autenticacao, consulta de catalogo, operacoes de carrinho, checkout, consulta de pedidos e gestao de usuarios com respostas consistentes.

### Escopo

- Testes funcionais positivos
- Testes de validacao de campos obrigatorios
- Testes de autorizacao e autenticacao
- Testes de integridade basica de dados retornados
- Testes de comportamento para recursos inexistentes

### Fora de escopo inicial

- Teste de carga e concorrencia
- Seguranca ofensiva profunda
- Performance por SLA
- Compatibilidade entre ambientes externos

### Abordagem

- Usar Cypress BDD para fluxos documentados no Swagger
- Preparar massa de dados previsivel no SQLite local
- Validar status code, schema basico, mensagens e regras de negocio
- Separar cenarios por endpoint e por tipo de comportamento

## Levantamento de testes possiveis por endpoint

### 1. Login

- Endpoint: http://localhost:3000/api/login
- Metodo: POST
- Resultados esperados:
  - 200 com `id`, `name` e `token` quando email e senha forem validos
  - 401 com mensagem `Email ou senha incorretos.` quando credenciais forem invalidas

#### Cenarios Login

- Sucesso com usuario administrador
- Sucesso com usuario comum
- Falha com email inexistente
- Falha com senha incorreta
- Falha sem email
- Falha sem senha
- Falha sem body
- Falha com email em branco
- Falha com senha em branco
- Validar formato do token Bearer

### 2. Produtos

- Endpoint lista: http://localhost:3000/api/produtos
- Endpoint detalhe: http://localhost:3000/api/produtos/1
- Metodos: GET
- Resultados esperados:
  - 200 com lista paginada em `products`, `totalPages`, `currentPage`
  - 200 com objeto de produto no detalhe
  - 404 para produto inexistente

#### Cenarios Produtos

- Listar produtos com pagina padrao
- Listar produtos com `page` e `limit` validos
- Listar produtos com pagina acima do total
- Listar produtos com `limit` 1
- Validar estrutura dos campos `id`, `name`, `description`, `price`, `image`
- Buscar detalhe de produto existente
- Buscar detalhe de produto inexistente
- Buscar detalhe com id nao numerico

### 3. Carrinho

- Endpoint adicionar: http://localhost:3000/api/carrinho
- Endpoint listar: http://localhost:3000/api/carrinho/1
- Endpoint limpar usuario: http://localhost:3000/api/carrinho/1
- Endpoint remover item: http://localhost:3000/api/carrinho/1/1
- Resultados esperados:
  - POST retorna 201 quando insere item novo
  - POST retorna 200 quando o item ja existe e a quantidade e incrementada
  - GET retorna 200 com lista de itens
  - DELETE por usuario retorna 200 com mensagem de sucesso
  - DELETE por item retorna 200 com mensagem de sucesso

#### Cenarios Carrinho

- Adicionar item novo ao carrinho
- Adicionar item repetido e validar incremento de quantidade
- Adicionar com quantidade valida maior que 1
- Adicionar com produto inexistente
- Adicionar com userId inexistente
- Adicionar sem campos obrigatorios
- Adicionar com quantidade zero
- Adicionar com quantidade negativa
- Listar carrinho com itens
- Listar carrinho vazio
- Limpar carrinho com itens
- Limpar carrinho vazio
- Remover item especifico existente
- Remover item especifico inexistente

### 4. Checkout

- Endpoint: http://localhost:3000/api/checkout
- Metodo: POST
- Resultados esperados:
  - 201 com `id` e `orderNumber` para pedido valido
  - 400 quando faltar campo obrigatorio
  - 400 quando email ja existir no fluxo `createAccount`
  - 400 quando houver inconsistencias de validacao do Joi

#### Cenarios Checkout


- Finalizar pedido valido com `paymentMethod = pix`
- Finalizar pedido valido com `paymentMethod = boleto`
- Finalizar pedido valido com `paymentMethod = credit_card`
- Finalizar pedido sem `firstName`
- Finalizar pedido sem `lastName`
- Finalizar pedido sem `address`
- Finalizar pedido sem `number`
- Finalizar pedido com `cep` invalido
- Finalizar pedido com email invalido
- Finalizar pedido com `paymentMethod` invalido
- Finalizar pedido com cartao sem `cardNumber`
- Finalizar pedido com cartao sem `cardExpiry`
- Finalizar pedido com cartao sem `cardCvc`
- Finalizar pedido com `createAccount = true` e email novo
- Finalizar pedido com `createAccount = true` e email repetido
- Finalizar pedido com carrinho vazio para observar regra atual de negocio

### 5. Pedidos

- Endpoint lista: http://localhost:3000/api/orders?userId=1
- Endpoint detalhe extra do codigo: http://localhost:3000/api/orders/1
- Resultados esperados:
  - 200 com array para pedidos do usuario
  - 200 com detalhe de pedido existente
  - 404 para pedido inexistente no detalhe

#### Cenarios Pedidos

- Listar pedidos de usuario com historico
- Listar pedidos de usuario sem historico
- Listar pedidos sem informar `userId`
- Buscar status de pedido existente por id
- Buscar status de pedido inexistente por id
- Validar campos de pedido retornados
- Buscar ultimo pedido do usuario em endpoint extra

### 6. Usuarios

- Endpoint criar/listar: http://localhost:3000/api/users
- Endpoint atualizar/deletar: http://localhost:3000/api/users/1
- Resultados esperados:
  - 201 ao criar usuario valido
  - 400 ao criar email duplicado
  - 200 ao listar usuarios
  - 200 ao atualizar o proprio usuario autenticado
  - 401 sem token para update
  - 403 ao tentar atualizar outro usuario
  - 400 ao atualizar com email ja usado por outro usuario
  - 200 ao deletar usuario com token de admin
  - 401 sem token para delete
  - 403 com token invalido ou token sem privilegio admin

#### Cenarios Usuarios

- Criar usuario valido
- Criar usuario admin valido
- Criar usuario com email duplicado
- Criar usuario sem nome
- Criar usuario sem email
- Criar usuario sem senha
- Listar usuarios
- Atualizar o proprio usuario com token valido
- Tentar atualizar outro usuario com token valido
- Atualizar usuario sem token
- Atualizar usuario com email duplicado
- Deletar usuario com token admin
- Deletar usuario sem token
- Deletar usuario com token de usuario comum
- Deletar usuario inexistente

## Plano BDD simples

```gherkin
Feature: Autenticacao API
  Como consumidor da API
  Quero autenticar usuarios
  Para acessar recursos protegidos

  Scenario: Login com credenciais validas
    When eu envio uma requisicao POST para http://localhost:3000/api/login com email e senha validos
    Then o status da resposta deve ser 200
    And a resposta deve conter id, name e token Bearer

  Scenario: Login com senha invalida
    When eu envio uma requisicao POST para http://localhost:3000/api/login com senha invalida
    Then o status da resposta deve ser 401
    And a resposta deve conter a mensagem "Email ou senha incorretos."
```

```gherkin
Feature: Produtos API
  Como consumidor da API
  Quero consultar o catalogo
  Para visualizar itens disponiveis

  Scenario: Listar produtos com sucesso
    When eu envio uma requisicao GET para http://localhost:3000/api/produtos
    Then o status da resposta deve ser 200
    And a resposta deve conter products, totalPages e currentPage

  Scenario: Consultar produto inexistente
    When eu envio uma requisicao GET para http://localhost:3000/api/produtos/999999
    Then o status da resposta deve ser 404
    And a resposta deve conter a mensagem "Produto nao encontrado."
```

```gherkin
Feature: Carrinho API
  Como consumidor da API
  Quero gerenciar o carrinho
  Para controlar os itens da compra

  Scenario: Adicionar item novo ao carrinho
    When eu envio uma requisicao POST para http://localhost:3000/api/carrinho com userId, productId e quantity validos
    Then o status da resposta deve ser 201
    And a resposta deve conter mensagem de sucesso no carrinho

  Scenario: Adicionar item ja existente ao carrinho
    When eu envio uma requisicao POST para http://localhost:3000/api/carrinho com um item que ja existe para o usuario
    Then o status da resposta deve ser 200
    And a quantidade do item deve ser incrementada

  Scenario: Listar itens do carrinho
    When eu envio uma requisicao GET para http://localhost:3000/api/carrinho/1
    Then o status da resposta deve ser 200
    And a resposta deve retornar uma lista de itens

  Scenario: Remover item especifico do carrinho
    When eu envio uma requisicao DELETE para http://localhost:3000/api/carrinho/1/1
    Then o status da resposta deve ser 200
    And a resposta deve conter mensagem de remocao
```

```gherkin
Feature: Checkout API
  Como consumidor da API
  Quero finalizar pedidos
  Para concluir a compra

  Scenario: Finalizar checkout com pix
    When eu envio uma requisicao POST para http://localhost:3000/api/checkout com dados validos de pix
    Then o status da resposta deve ser 201
    And a resposta deve conter id e orderNumber

  Scenario: Finalizar checkout sem nome
    When eu envio uma requisicao POST para http://localhost:3000/api/checkout sem firstName
    Then o status da resposta deve ser 400

  Scenario: Finalizar checkout com cartao sem numero
    When eu envio uma requisicao POST para http://localhost:3000/api/checkout com paymentMethod credit_card e sem cardNumber
    Then o status da resposta deve ser 400
```

```gherkin
Feature: Pedidos API
  Como consumidor da API
  Quero consultar meus pedidos
  Para acompanhar o status da compra

  Scenario: Listar pedidos do usuario
    When eu envio uma requisicao GET para http://localhost:3000/api/orders?userId=1
    Then o status da resposta deve ser 200
    And a resposta deve retornar uma lista de pedidos

  Scenario: Consultar pedido inexistente por id
    When eu envio uma requisicao GET para http://localhost:3000/api/orders/999999
    Then o status da resposta deve ser 404
    And a resposta deve conter a mensagem "Pedido nao encontrado."
```

```gherkin
Feature: Usuarios API
  Como consumidor da API
  Quero gerenciar usuarios
  Para manter os cadastros atualizados

  Scenario: Criar usuario com sucesso
    When eu envio uma requisicao POST para http://localhost:3000/api/users com dados validos
    Then o status da resposta deve ser 201
    And a resposta deve conter o id do usuario criado

  Scenario: Criar usuario com email duplicado
    When eu envio uma requisicao POST para http://localhost:3000/api/users com email ja cadastrado
    Then o status da resposta deve ser 400
    And a resposta deve conter a mensagem "Email ja cadastrado."

  Scenario: Atualizar o proprio usuario autenticado
    Given que eu possuo um token valido do proprio usuario
    When eu envio uma requisicao PUT para http://localhost:3000/api/users/1 com dados validos
    Then o status da resposta deve ser 200

  Scenario: Deletar usuario com token admin
    Given que eu possuo um token valido de administrador
    When eu envio uma requisicao DELETE para http://localhost:3000/api/users/1
    Then o status da resposta deve ser 200
```

## Cobertura atual do projeto

### Features existentes

- `cypress/e2e/api/api_autenticacao.feature`
- `cypress/e2e/api/api_carrinho.feature`
- `cypress/e2e/api/api_checkout.feature`
- `cypress/e2e/api/api_pedidos.feature`
- `cypress/e2e/api/api_produtos.feature`
- `cypress/e2e/api/api_usuarios.feature`

### Cenarios ja implementados

| Feature | Quantidade | Cenarios atuais |
| --- | --- | --- |
| Autenticacao | 9 | login admin, usuario comum, credenciais inexistentes, senha incorreta, ausencia de email, ausencia de senha, email em branco, senha em branco e body ausente |
| Carrinho | 6 | adicionar item, adicionar item repetido, listar itens, listar carrinho vazio, limpar carrinho e remover item especifico |
| Checkout | 7 | pedido valido, boleto, cartao de credito, dados invalidos, email invalido, criacao de conta e email ja cadastrado na criacao de conta |
| Pedidos | 4 | listar pedidos, listar sem usuario, consultar pedido existente e consultar pedido inexistente |
| Produtos | 5 | listar produtos, paginacao, pagina sem resultados, detalhe existente e detalhe inexistente |
| Usuarios | 10 | criar, email duplicado, listar, atualizar proprio usuario, impedir atualizacao de outro usuario, ausencia de token, email duplicado na atualizacao, deletar como admin, ausencia de token no delete e impedir delete por usuario comum |

Total atual identificado: 41 cenarios implementados em 6 features.

## Matriz de cobertura: o que ja existe e o que falta

| Endpoint | Cobertura atual | Falta adicionar |
| --- | --- | --- |
| POST /api/login | Boa cobertura basica | validar formato do token Bearer |
| GET /api/produtos | Boa cobertura basica | validar campos adicionais do schema e limite 1 |
| GET /api/produtos/{id} | Boa cobertura basica | validar id nao numerico |
| POST /api/carrinho | Boa cobertura funcional | validacoes negativas, produto inexistente, userId inexistente e campos obrigatorios ausentes |
| GET /api/carrinho/{userId} | Boa cobertura funcional | validar schema e campos dos itens |
| DELETE /api/carrinho/{userId} | Cobertura funcional | limpar carrinho vazio |
| DELETE /api/carrinho/{userId}/{productId} | Cobertura funcional | remover item inexistente |
| POST /api/checkout | Boa cobertura funcional | campos obrigatorios especificos, dados de cartao incompletos e carrinho vazio |
| GET /api/orders | Cobertura funcional | validar campos dos pedidos retornados |
| POST /api/users | Cobertura basica | campos obrigatorios ausentes e criar usuario admin |
| GET /api/users | Cobertura basica | validar schema e conteudo da lista |
| PUT /api/users/{id} | Boa cobertura de autorizacao | atualizar usuario com dados invalidos e usuario inexistente |
| DELETE /api/users/{id} | Boa cobertura de autorizacao | deletar usuario inexistente e token invalido explicito |

## Divergencias entre Swagger e implementacao

- `POST /api/carrinho` no codigo retorna `200` quando o item ja existe e a quantidade e somada, mas o Swagger nao documenta esse comportamento.
- `PUT /api/users/{id}` no Swagger informa apenas rota autenticada; no codigo a regra e mais restrita: o usuario so pode editar o proprio perfil.
- `DELETE /api/users/{id}` no Swagger fala em autenticacao, mas no codigo a rota exige perfil administrador.
- Existem endpoints ativos no codigo que nao aparecem no Swagger e merecem documentacao adicional.
