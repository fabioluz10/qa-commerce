# QA-Commerce

Projeto de loja virtual para prática e demonstração de testes de qualidade, com API REST em Node.js/Express, banco SQLite e automação de testes BDD em Cypress.

## Visão geral

A aplicação simula uma loja online com:

- catálogo de produtos
- carrinho de compras
- checkout com múltiplas formas de pagamento
- criação de conta
- consulta de pedidos
- documentação Swagger em tempo real

Além disso, o projeto inclui automações de testes para:

- API REST
- fluxo web de compra
- validação de regras de negócio
- geração de relatório Allure

## Stack do projeto

- Node.js
- Express
- SQLite
- Swagger UI
- Cypress
- Cucumber + Gherkin
- Allure Report

## Requisitos

- Node.js 18+ recomendado
- Java JRE instalado e disponível no PATH para uso do Allure Report
- Git
- VS Code ou editor de sua preferência

## Como executar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/fabioaraujoqa/qa-commerce.git
cd qa-commerce
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicialize o banco de dados

```bash
npm run db
```

### 4. Inicie a aplicação

```bash
npm start
```

A API fica disponível em:

- Aplicação web: http://localhost:3000/
- Documentação Swagger: http://localhost:3000/api-docs/

## Scripts disponíveis

No arquivo `package.json`, o projeto já possui os seguintes comandos:

```bash
npm start
npm run db
npm run test:e2e
npm run test:e2e:open
npm run cypress:run
npm run allure:generate
npm run allure:open
npm run allure:clear
```

### Explicação dos scripts

```bash
npm start
```
Executa a API local da loja.

```bash
npm run db
```
Inicializa as tabelas do SQLite e popula dados de exemplo.

```bash
npm run test:e2e
```
Executa o fluxo completo de automação:

1. prepara o banco
2. limpa relatórios do Allure
3. inicia a API local
4. aguarda disponibilidade da aplicação
5. executa os testes com Cypress
6. gera o relatório em `allure-report`

```bash
npm run test:e2e:open
```
Executa a suíte e abre o relatório Allure ao final.

```bash
npm run cypress:run
```
Executa somente o Cypress, útil quando a aplicação já está rodando.

```bash
npm run allure:generate
```
Gera o relatório HTML a partir dos resultados em `allure-results`.

```bash
npm run allure:open
```
Abre o relatório no navegador.

```bash
npm run allure:clear
```
Remove os diretórios de resultados e relatórios antigos.

## Automação de testes

O projeto usa Cypress com abordagem BDD em arquivos `.feature` e step definitions.

### Estrutura principal

- `cypress/e2e/features` — cenários em Gherkin
- `cypress/support/step_definitions` — implementações dos passos
- `cypress/support/pages` — Page Objects do front end
- `cypress/support/payloads` — payloads de API
- `cypress/support/services` — serviços e chamadas HTTP
- `cypress.config.js` — configuração do Cypress e plugin do Allure
- `public/` — front-end da loja
- `src/` — backend Express e regras de negócio

### Features e testes cobertos

#### API

- autenticação
- usuários
- produtos
- carrinho
- checkout
- pedidos

#### Web

- adicionar produto ao carrinho
- checkout com Pix
- checkout com cartão de crédito
- validação de campos obrigatórios
- bloqueios de validação de checkout

### Executando uma feature específica

```bash
npx cypress run --spec cypress/e2e/features/web_compra.feature
```

Também é possível rodar uma suíte específica de API, por exemplo:

```bash
npx cypress run --spec cypress/e2e/features/api_checkout.feature
```

## Relatório Allure

Os testes geram resultados em `allure-results` e o HTML final em `allure-report`.

Para gerar o relatório manualmente:

```bash
npx allure generate allure-results --clean -o allure-report
```

Para abrir o relatório:

```bash
npx allure open allure-report
```

## Observações importantes

- O banco SQLite é inicializado via script de setup do projeto.
- O banco pode ser recriado executando `npm run db`.
- O comando `npm run test:e2e` foi configurado para subir a aplicação e executar os testes em modo headless.
- O projeto foi organizado para demonstrar práticas de QA e automação, incluindo BDD, page objects, payloads e relatórios visuais.

## Contribuição

Este projeto serve de base para estudo e prática de testes automatizados, com foco em:

- qualidade de software
- automação de testes
- validação de regras de negócio
- cobertura de backend e frontend
- integração de relatórios de testes



