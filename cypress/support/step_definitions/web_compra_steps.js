import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../pages/home.page";
import CartPage from "../pages/cart.page";
import CheckoutPage from "../pages/checkout.page";
import "../commands";

Given("que o carrinho do usuario esteja limpo", () => {
  cy.clearCart();
});

Given("E que eu esteja na pagina inicial da loja", () => {
  HomePage.visitar();
  HomePage.primeiroProduto().should("be.visible");
  cy.screenshot("home_page");
});

When("eu adiciono {int} unidades do primeiro produto ao carrinho", (quantity) => {
  HomePage.adicionarPrimeiroProduto(quantity);
});

Then("o produto deve ser adicionado ao carrinho com quantidade {int}", (quantity) => {
  HomePage.alertaSucesso().should("contain.text", "Produto adicionado ao carrinho");
  HomePage.contadorCarrinho().should("have.text", String(quantity));
  CartPage.visitar();
  CartPage.itens().should("have.length", 1).first().should("contain.text", `Quantidade: ${quantity}`);
});

Given("eu adicione {int} unidade do primeiro produto ao carrinho", (quantity) => {
  HomePage.adicionarPrimeiroProduto(quantity);
  HomePage.alertaSucesso().should("contain.text", "Produto adicionado ao carrinho");
});

Given("eu acesso diretamente a pagina de checkout", () => {
  CheckoutPage.visitar();
  cy.url().should("include", "/checkout.html");
});

When("eu acesso o carrinho e avanço para o checkout", () => {
  CartPage.visitar();
  CartPage.linkCheckout().should("be.visible").click();
  cy.url().should("include", "/checkout.html");
});

When("eu preencho os dados de entrega, seleciono Pix e aceito os termos", () => {
  CheckoutPage.preencherDadosEntrega();
  CheckoutPage.selecionarPix();
  CheckoutPage.aceitarTermos();
});

When("eu preencho os dados de entrega, seleciono cartao de credito e aceito os termos", () => {
  CheckoutPage.preencherDadosEntrega();
  CheckoutPage.selecionarCartaoCredito();
  CheckoutPage.preencherDadosCartao();
  CheckoutPage.aceitarTermos();
});

When("eu preencho todos os dados obrigatorios do checkout", () => {
  CheckoutPage.preencherDadosEntrega();
  CheckoutPage.selecionarPix();
  CheckoutPage.aceitarTermos();
});

When("eu limpo o campo {string}", (fieldId) => {
  CheckoutPage.limparCampo(fieldId);
});

When("eu digito {string} no campo {string}", (value, fieldId) => {
  cy.get(fieldId).clear().type(value);
});

When("eu preencho os dados de entrega sem selecionar pagamento", () => {
  CheckoutPage.preencherDadosEntrega();
  CheckoutPage.aceitarTermos();
});

When("eu preencho os dados de entrega e seleciono Pix sem aceitar os termos", () => {
  CheckoutPage.preencherDadosEntrega();
  CheckoutPage.selecionarPix();
});

When("eu seleciono cartao de credito, preencho os dados e limpo o campo {string}", (fieldId) => {
  CheckoutPage.preencherDadosEntrega();
  CheckoutPage.selecionarCartaoCredito();
  CheckoutPage.preencherDadosCartao();
  CheckoutPage.aceitarTermos();
  CheckoutPage.limparCampo(fieldId);
});

When("eu ativo a criacao de conta e limpo o campo {string}", (fieldId) => {
  CheckoutPage.preencherDadosEntrega();
  CheckoutPage.selecionarPix();
  CheckoutPage.aceitarTermos();
  CheckoutPage.ativarCriacaoConta();
  CheckoutPage.preencherSenhaValida();
  CheckoutPage.limparCampo(fieldId);
});

Then("o checkout deve exibir erro de validacao no campo {string}", (fieldId) => {
  cy.get(fieldId).should("have.class", "is-invalid");
});

Then("o checkout deve exibir a mensagem {string}", (message) => {
  cy.get("#alert-container").should("be.visible").and("contain.text", message);
});

When("eu finalizo o pedido", () => {
  CheckoutPage.enviarPedido();
});

Then("devo visualizar o status do pedido criado", () => {
  cy.url().should("match", /\/status\.html\?orderId=\d+$/);
  cy.screenshot("status_pedido");
  CheckoutPage.statusPedido().should("be.visible").and("contain.text", "Status:");
});
