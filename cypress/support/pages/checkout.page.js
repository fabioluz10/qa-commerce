class CheckoutPage {
  visitar() {
    cy.visit("/checkout.html");
  }

  preencherDadosEntrega() {
    cy.get("#first-name").type("Maria");
    cy.get("#last-name").type("Silva");
    cy.get("#address").type("Rua das Flores");
    cy.get("#number").type("123");
    cy.get("#cep").type("12345678");
    cy.get("#phone").type("11999999999");
    cy.get("#email").type(`ui.checkout.${Date.now()}@example.com`);
  }

  selecionarPix() {
    cy.get("#payment-pix").check();
  }

  selecionarCartaoCredito() {
    cy.get("#payment-card").check();
  }

  preencherDadosCartao() {
    cy.get("#card-number").type("1234123412341234");
    cy.get("#card-expiry").type("12/2030");
    cy.get("#card-cvc").type("123");
  }

  limparCampo(fieldId) {
    cy.get(fieldId).clear();
  }

  ativarCriacaoConta() {
    cy.get("#create-account").check();
  }

  preencherSenhaValida() {
    cy.get("#password").type("Senha123!");
    cy.get("#confirm-password").type("Senha123!");
  }

  aceitarTermos() {
    cy.get("#terms").check();
  }

  enviarPedido() {
    cy.get("#checkout-form").submit();
  }

  statusPedido() {
    return cy.get("#order-status");
  }
}

export default new CheckoutPage();
