# QA-Commerce

### Loja virtual Geek para simulação de testes

<!-- teste do github actions pipeline -->

## Clonando e executando em sua máquina

### Pré-requisito:

-Node.js - Você encontra em: https://nodejs.org/en/
-Java/JRE 8 ou superior, necessário para o Allure Report
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
2. Execute o fluxo completo em modo headless:

```bash
npm run test:e2e
```

Esse comando limpa os relatórios antigos, inicializa o banco, sobe a API, aguarda ela ficar disponível, executa os testes Cypress e gera o relatório em `allure-report`. O relatório é gerado mesmo que algum teste falhe.

> O Allure Report depende de Java instalado e disponível no `PATH` do sistema.

Para executar o mesmo fluxo e abrir o relatório visual no navegador ao final:

```bash
npm run test:e2e:open
```

O comando `npm run cypress:run` continua disponível para executar somente o Cypress quando a API já estiver rodando.

#### Comandos individuais do Allure

```bash
npm run allure:clear      # remove allure-results/ e allure-report/
npm run allure:generate   # gera o relatório em allure-report a partir de allure-results
npm run allure:open       # abre o relatório já gerado no navegador
```

Se quiser rodar apenas uma suíte específica, pode usar:

```bash
npx cypress run --spec "cypress/e2e/features/api_autenticacao.feature,cypress/e2e/features/api_carrinho.feature,cypress/e2e/features/api_checkout.feature,cypress/e2e/features/api_pedidos.feature,cypress/e2e/features/api_produtos.feature,cypress/e2e/features/api_usuarios.feature" --browser electron
```

### O que é validado

- Autenticação
- Carrinho
- Checkout
- Pedidos
- Produtos
- Usuários

A suíte atual possui 41 cenários BDD distribuídos em 6 features. O detalhamento da cobertura e dos cenários planejados está disponível no [Plano de Teste API em BDD](PLANO_TESTE_API_BDD.md).

### Estrutura de automação

- Features BDD: [cypress/e2e/features](cypress/e2e/features)
- Step definitions: [cypress/support/step_definitions](cypress/support/step_definitions)
- Configuração do Cypress: [cypress.config.js](cypress.config.js)

Essa automação demonstra meus conhecimentos em:
- testes de API
- uso de Cypress
- Gherkin / BDD
- organização de testes por funcionalidade
- uso de endpoints reais contra uma aplicação local

### Integração contínua (GitHub Actions)

O workflow [.github/workflows/pipeline.yml](.github/workflows/pipeline.yml) roda automaticamente em push e pull requests para `main` e `feature/*`, executando `npm run test:e2e` e publicando o relatório Allure como artefato do job.



