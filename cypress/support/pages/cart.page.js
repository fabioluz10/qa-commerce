class CartPage {
  visitar() {
    cy.visit("/cart.html");
  }

  itens() {
    return cy.get("#cart-list .cart-item");
  }

  linkCheckout() {
    return cy.get("#totals a[href='/checkout.html']");
  }
}

export default new CartPage();
