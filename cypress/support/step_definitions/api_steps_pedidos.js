import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import PedidosService from "../services/pedidos.service";
import CheckoutService from "../services/checkout.service";
import checkoutPayloads from "../payloads/checkout.payloads";
import ApiService from "../services/api.service";

let createdOrderId;

When("eu solicito os pedidos do usuario {int}", (userId) => {
  PedidosService.listar(userId).then((res) => {
    ApiService.setResponse(res);
  });
});

When("eu solicito os pedidos sem informar usuario", () => {
  PedidosService.listar().then((res) => {
    ApiService.setResponse(res);
  });
});

When("eu consulto o status de um pedido existente", () => {
  CheckoutService.finalizar(checkoutPayloads.valido()).then((checkoutResponse) => {
    createdOrderId = checkoutResponse.body.id;

    PedidosService.consultar(createdOrderId).then((res) => {
      ApiService.setResponse(res);
    });
  });
});

When("eu consulto o status do pedido {int}", (orderId) => {
  PedidosService.consultar(orderId).then((res) => {
    ApiService.setResponse(res);
  });
});

Then("a resposta deve retornar uma lista de pedidos", () => {
  const response = ApiService.getResponse();
  expect(response.body).to.be.an("array");
});

Then("a resposta deve retornar uma lista de pedidos vazia", () => {
  const response = ApiService.getResponse();
  expect(response.body).to.be.an("array");
  expect(response.body).to.have.length(0);
});

Then("a resposta deve retornar os dados do pedido consultado", () => {
  const response = ApiService.getResponse();
  expect(response.body).to.have.property("id", createdOrderId);
  expect(response.body).to.have.property("status");
  expect(response.body).to.have.property("formattedOrderId");
});
