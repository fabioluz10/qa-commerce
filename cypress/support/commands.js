Cypress.Commands.add("clearCart", (userId = 1) => {
	return cy.request({
		method: "DELETE",
		url: `${Cypress.env("apiBaseUrl")}/carrinho/${userId}`,
		failOnStatusCode: false,
	});
});