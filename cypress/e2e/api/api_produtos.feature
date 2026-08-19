Feature: Produtos
	Eu como cliente
	Quero consultar os produtos da API
	Para visualizar o catalogo da loja


	Background: Envio de Produtos
		Given que a API de "Produtos" esteja disponível em "http://localhost:3000/api/produtos"

	Scenario: Listar produtos com sucesso
		When eu solicito a listagem padrao de produtos
		Then o status da resposta deve ser 200
		And a resposta deve conter a estrutura paginada de produtos

	Scenario: Listar produtos com pagina e limite definidos
		When eu solicito a listagem de produtos na pagina 2 com limite 5
		Then o status da resposta deve ser 200
		And a lista de produtos deve respeitar o limite informado 5

	Scenario: Listar produtos em uma pagina sem resultados
		When eu solicito a listagem de produtos na pagina 999 com limite 5
		Then o status da resposta deve ser 200
		And a resposta deve retornar lista de produtos vazia

	Scenario: Buscar detalhes de um produto existente
		When eu solicito o detalhe do produto 1
		Then o status da resposta deve ser 200
		And a resposta deve retornar um produto com os campos esperados

	Scenario: Buscar detalhes de um produto inexistente
		When eu solicito o detalhe do produto 999999
		Then o status da resposta deve ser 404
		And a resposta deve conter a mensagem "Produto não encontrado."
