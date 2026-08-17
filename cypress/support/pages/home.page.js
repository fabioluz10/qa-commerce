class HomePage {
  visitar() {
    cy.visit("/");
  }

  primeiroProduto() {
    return cy.get("#product-list .card").first();
  }

  adicionarPrimeiroProduto(quantity = 1) {
    this.primeiroProduto().find("input[type='number']").clear().type(String(quantity));
    this.primeiroProduto().find(".add-to-cart").click();
  }

  contadorCarrinho() {
    return cy.get("#cart-count");
  }

  alertaSucesso() {
    return cy.get("#alert-container");
  }
}

export default new HomePage();
