# QA-Commerce

### Loja virtual Geek para simulação de testes 

## Clonando e executando em sua máquina

### Pré-requisito:

-Node.js - Você encontra em: https://nodejs.org/en/
-Visual Studio Code ( ou editor de sua prefrência) - você encontra em: https://code.visualstudio.com/download
-Git: você encontra em: https://git-scm.com/downloads

Via terminal, rode os seguintes comandos:
```  
git clone https://github.com/fabioaraujoqa/qa-commerce.git
```
```
cd qa-commerce
```

#### Para instalar as dependencias:
```
npm install 
```

#### Para subir o servidor e o banco:
```
npm start
```

No console vai aparecer os endereços do site e do banco. 
O site você acessaem: http://localhost:3000/

A documentação funciona em: http://localhost:3000/api-docs/

*Parceria: Fábio Araújo, Bruna Emerich e Tamara Fontanella




#-------------------------------------------------------------------------------------------------------------------------------#



## Automação de API com Cypress + BDD

Inclui neste projeto automação de testes de API usando Cypress com abordagem BDD em arquivos .feature e step definitions.

### Como rodar os testes de API

1. Abra o terminal na raiz do projeto.
2. Certifique-se de que a API esteja rodando:
```bash
npm start
```
3. Em outro terminal, você pode usar qualquer um destes comandos:

```bash
npm run test:e2e
```

ou

```bash
npm run cypress:run
```

> O comando `npm run test:e2e` é o mais prático porque já chama o fluxo completo da automação. O comando `npm run cypress:run` executa o Cypress diretamente.

Se quiser rodar apenas uma suíte específica, pode usar:

```bash
npx cypress run --spec "cypress/e2e/features/api_autenticacao.feature,cypress/e2e/features/api_carrinho.feature,cypress/e2e/features/api_checkout.feature,cypress/e2e/features/api_pedidos.feature,cypress/e2e/features/api_usuarios.feature" --browser electron
```

### O que é validado

- Autenticação
- Carrinho
- Checkout
- Pedidos
- Usuários

### Estrutura de automação

- Features BDD: [cypress/e2e/features](cypress/e2e/features)
- Step definitions: [cypress/support/step_definitions](cypress/support/step_definitions)
- Configuração do Cypress: [cypress.config.js](cypress.config.js)

Essa automação demonstra conhecimento em:
- testes de API
- uso de Cypress
- Gherkin / BDD
- organização de testes por funcionalidade
- uso de endpoints reais contra uma aplicação local



