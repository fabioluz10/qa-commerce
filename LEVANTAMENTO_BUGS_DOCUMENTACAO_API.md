# Levantamento de Bugs de Documentacao da API

Base comparada:
- Backend real: [src/server.js](src/server.js)
- Swagger: [config/swagger.json](config/swagger.json)
- Middleware: [middleware/auth.js](middleware/auth.js)

## Resumo

O Swagger documenta parte da API, mas o backend expõe mais rotas, mais mensagens de erro e mais combinações de status code do que o contrato atual descreve. O principal problema e que varios comportamentos validos e invalidos existem no backend, porem nao aparecem no Swagger.

## Rotas existentes no backend que nao estao no Swagger

| Metodo | Rota | Resposta real no backend | Situacao no Swagger |
| --- | --- | --- | --- |
| POST | /api/registrar | 201 `{ id }` / 500 `Erro ao registrar usuário.` | Nao documentada |
| POST | /api/limpar-carrinho | 200 `{ message: "Carrinho limpo com sucesso." }` / 500 `Erro ao limpar o carrinho.` | Nao documentada |
| GET | /api/orders/{orderId} | 200 com pedido / 404 `Pedido não encontrado.` / 500 `Erro ao buscar status do pedido.` | Nao documentada |
| GET | /api/ultimo-pedido/{userId} | 200 com ultimo pedido / 404 `Nenhum pedido encontrado.` / 500 `Erro ao buscar o último pedido.` | Nao documentada |
| PUT | /api/cart/{id} | 200 `Item do carrinho atualizado com sucesso.` / 500 `Erro ao atualizar item no carrinho.` | Nao documentada |
| DELETE | /api/cart/{id} | 200 `Item do carrinho removido com sucesso.` / 500 `Erro ao remover item do carrinho.` | Nao documentada |

## Mensagens e codigos do backend que existem, mas nao estao documentados no Swagger

### Autenticacao e autorizacao

| Rota ou middleware | Status | Mensagem real | Observacao |
| --- | --- | --- | --- |
| authenticateToken | 401 | `Token não fornecido.` | Nao documentado no Swagger |
| authenticateToken | 403 | `Token inválido.` | Nao documentado no Swagger |
| authenticateAdmin | 401 | `Token ausente.` | Nao documentado no Swagger |
| authenticateAdmin | 403 | `Token inválido.` | Nao documentado no Swagger |
| authenticateAdmin | 403 | `Acesso negado. Apenas administradores.` | Swagger nao menciona esse bloqueio especifico |
| PUT /api/users/:id | 403 | `Acesso negado. Você só pode editar seu próprio perfil.` | Regra real nao documentada |

### Produtos

| Rota | Status | Mensagem real | Observacao |
| --- | --- | --- | --- |
| GET /api/produtos | 500 | `Erro ao buscar produtos.` | Documentado parcialmente, mas sem schema de erro |
| GET /api/produtos | 500 | `Erro ao calcular o total de produtos.` | Nao documentado |
| GET /api/produtos/:id | 404 | `Produto não encontrado.` | Documentado |
| GET /api/produtos/:id | 500 | `Erro ao buscar detalhes do produto.` | Documentado parcialmente, sem payload de erro |

### Carrinho

| Rota | Status | Mensagem real | Observacao |
| --- | --- | --- | --- |
| POST /api/carrinho | 200 | `Produto adicionado ao carrinho com sucesso.` | Quando o item ja existe e a quantidade e incrementada |
| POST /api/carrinho | 201 | `Produto adicionado ao carrinho com sucesso.` | Insercao de novo item |
| POST /api/carrinho | 500 | `Erro ao buscar produto no carrinho.` | Nao documentado |
| POST /api/carrinho | 500 | `Erro ao atualizar quantidade do produto no carrinho.` | Nao documentado |
| POST /api/carrinho | 500 | `Erro ao adicionar produto ao carrinho.` | Nao documentado |
| GET /api/carrinho/:userId | 500 | `Erro ao buscar produtos no carrinho.` | Nao documentado |
| DELETE /api/carrinho/:userId | 200 | `Todos os itens do carrinho removidos com sucesso.` | Nao documentado no Swagger |
| DELETE /api/carrinho/:userId | 500 | `Erro ao remover itens do carrinho.` | Nao documentado |
| DELETE /api/carrinho/:userId/:productId | 200 | `Item do carrinho removido com sucesso.` | Nao documentado no Swagger |
| DELETE /api/carrinho/:userId/:productId | 500 | `Erro ao remover item do carrinho.` | Nao documentado |

### Checkout

| Rota | Status | Mensagem real | Observacao |
| --- | --- | --- | --- |
| POST /api/checkout | 400 | mensagem dinamica do Joi | Ex.: `"firstName" is required` / nao documentado como schema de erro |
| POST /api/checkout | 500 | `Erro ao verificar e-mail.` | Nao documentado |
| POST /api/checkout | 400 | `E-mail já registrado. Tente um email diferente` | Nao documentado |
| POST /api/checkout | 500 | `Erro ao criar conta.` | Nao documentado |
| POST /api/checkout | 500 | `Erro ao calcular total do pedido.` | Nao documentado |
| POST /api/checkout | 500 | `Erro ao finalizar pedido.` | Nao documentado |
| POST /api/checkout | 500 | `Erro ao atualizar número do pedido.` | Nao documentado |
| POST /api/checkout | 500 | `Erro ao limpar o carrinho.` | Nao documentado |

### Pedidos

| Rota | Status | Mensagem real | Observacao |
| --- | --- | --- | --- |
| GET /api/orders | 200 | array vazio quando `userId` nao vem | Swagger marca `userId` como required, mas backend nao bloqueia |
| GET /api/orders | 500 | `Erro ao buscar pedidos.` | Nao documentado com payload de erro |
| GET /api/orders/:orderId | 500 | `Erro ao buscar status do pedido.` | Nao documentado |
| GET /api/orders/:orderId | 404 | `Pedido não encontrado.` | Nao documentado no Swagger |
| GET /api/ultimo-pedido/:userId | 404 | `Nenhum pedido encontrado.` | Nao documentado |
| GET /api/ultimo-pedido/:userId | 500 | `Erro ao buscar o último pedido.` | Nao documentado |

### Usuarios

| Rota | Status | Mensagem real | Observacao |
| --- | --- | --- | --- |
| POST /api/users | 400 | `Email já cadastrado.` | Documentado no Swagger de forma indireta, mas nao com mensagem exata |
| POST /api/users | 500 | `Erro ao verificar o email.` | Nao documentado |
| POST /api/users | 500 | `Erro ao processar a senha.` | Nao documentado |
| POST /api/users | 500 | `Erro ao criar usuário. Verifique as regras de negócio` | Nao documentado |
| POST /api/users | 201 | `Usuário criado com sucesso.` | Swagger nao mostra schema de resposta |
| GET /api/users | 500 | `Erro ao listar usuários.` | Nao documentado com payload de erro |
| PUT /api/users/:id | 400 | `Email já cadastrado por outro usuário.` | Nao documentado |
| PUT /api/users/:id | 500 | `Erro ao verificar o email.` | Nao documentado |
| PUT /api/users/:id | 500 | `Erro ao atualizar o usuário.` | Nao documentado |
| PUT /api/users/:id | 500 | `Erro ao processar a senha.` | Nao documentado |
| PUT /api/users/:id | 200 | `Usuário atualizado com sucesso.` | Documentado, mas sem os erros acima |
| DELETE /api/users/:id | 500 | `Erro ao deletar o usuário.` | Nao documentado |
| DELETE /api/users/:id | 200 | `Usuário deletado com sucesso.` | Documentado, mas sem os erros acima |

## Bugs de documentacao detectados

1. O Swagger nao documenta endpoints que existem no backend: `/api/registrar`, `/api/limpar-carrinho`, `/api/orders/{orderId}`, `/api/ultimo-pedido/{userId}`, `/api/cart/{id}`.
2. O Swagger nao documenta varios status de erro retornados pelo backend, principalmente `500` e `403`.
3. O Swagger trata `GET /api/orders` como se `userId` fosse obrigatorio, mas o backend aceita a chamada sem parametro e retorna `200 []`.
4. O Swagger nao descreve a regra real de `PUT /api/users/:id`, onde o usuario so pode editar o proprio perfil.
5. O Swagger nao descreve a regra real de `DELETE /api/users/:id`, que exige permissao de administrador no middleware.
6. O Swagger nao informa que `POST /api/carrinho` pode retornar `200` quando a quantidade e incrementada em um item existente.
7. O Swagger nao documenta os erros dinamicos de validacao do Joi em `POST /api/checkout`.

## Possiveis bugs da aplicacao

### 1. `GET /api/orders` aceita chamada sem `userId`

- Evidencia: o backend retorna `200 []` quando o query param nao e enviado.
- Impacto: contradiz o Swagger, que marca `userId` como required.
- Classificacao: bug de contrato/documentacao. Se a regra de negocio exigir `userId`, o backend deveria validar e retornar `400`.

### 2. `POST /api/carrinho` aceita `productId` inexistente e quantidade negativa

- Evidencia: o backend pode responder `201` mesmo com `productId` inexistente e `quantity: -1`.
- Impacto: a integridade do carrinho fica inconsistente.
- Classificacao: bug de aplicacao/regra de negocio.

### 3. `POST /api/users` aceita usuario sem nome

- Evidencia: o backend cria o usuario mesmo sem o campo `name`.
- Impacto: pode gerar cadastro incompleto.
- Classificacao: bug de aplicacao/regra de negocio, se `name` for obrigatorio.

### 4. `POST /api/checkout` retorna erros de validacao dinamicos do Joi nao padronizados

- Evidencia: o backend devolve a mensagem bruta do Joi em `400`.
- Impacto: o contrato fica instavel para automacao e consumo externo.
- Classificacao: bug de padronizacao de resposta.

### 5. `PUT /api/users/:id` e `DELETE /api/users/:id` estao mais restritos do que o Swagger indica

- Evidencia: o backend bloqueia update de terceiros e delete sem admin.
- Impacto: o contrato documentado esta incorreto.
- Classificacao: bug de documentacao/contrato.

## Recomendacao de correcao

1. Atualizar o Swagger com todos os endpoints faltantes.
2. Adicionar respostas `400`, `403` e `500` reais nas rotas existentes.
3. Padronizar mensagens de erro da API em um formato unico.
4. Ajustar o backend ou o contrato de `GET /api/orders` para refletir se `userId` e realmente obrigatorio.
5. Validar regras de negocio de carrinho e usuarios para evitar entradas inconsistentes.

