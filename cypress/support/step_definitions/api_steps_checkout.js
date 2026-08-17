import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CheckoutService from "../services/checkout.service";
import checkoutPayloads from "../payloads/checkout.payloads";
import ApiService from "../services/api.service";

When("eu finalizo o pedido com dados validos", () => {
  CheckoutService.finalizar(checkoutPayloads.valido()).then((res) => {
    ApiService.setResponse(res);
  });
});

When("eu finalizo o pedido com boleto", () => {
  CheckoutService.finalizar(checkoutPayloads.boleto()).then((res) => {
    ApiService.setResponse(res);
  });
});

When("eu finalizo o pedido com cartao de credito", () => {
  CheckoutService.finalizar(checkoutPayloads.cartaoCredito()).then((res) => {
    ApiService.setResponse(res);
  });
});

When("eu finalizo o pedido sem informar o nome", () => {
  CheckoutService.finalizar(checkoutPayloads.semNome()).then((res) => {
    ApiService.setResponse(res);
  });
});

When("eu finalizo o pedido com email invalido", () => {
  CheckoutService.finalizar(checkoutPayloads.emailInvalido()).then((res) => {
    ApiService.setResponse(res);
  });
});

When("eu finalizo o pedido criando uma nova conta", () => {
  CheckoutService.finalizar(checkoutPayloads.criarConta()).then((res) => {
    ApiService.setResponse(res);
  });
});

When("eu finalizo o pedido criando conta com email ja cadastrado", () => {
  CheckoutService.finalizar(checkoutPayloads.criarContaEmailExistente()).then((res) => {
    ApiService.setResponse(res);
  });
});

Then("a resposta deve conter o id do pedido e o numero do pedido", () => {
  const response = ApiService.getResponse();
  expect(response.body).to.have.property("id");
  expect(response.body).to.have.property("orderNumber");
});
