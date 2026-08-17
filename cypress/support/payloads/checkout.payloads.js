function baseCheckoutPayload(overrides = {}) {
  return {
    userId: 1,
    firstName: "Maria",
    lastName: "Silva",
    address: "Rua das Flores",
    number: "123",
    cep: "12345678",
    phone: "11999999999",
    email: `checkout.${Date.now()}@example.com`,
    paymentMethod: "pix",
    createAccount: false,
    ...overrides,
  };
}

const checkoutPayloads = {
  valido: () => baseCheckoutPayload(),
  boleto: () =>
    baseCheckoutPayload({
      paymentMethod: "boleto",
      boletoCode: "34191.79001 01043.510047 91020.150008 5 95870000002000",
    }),
  cartaoCredito: () =>
    baseCheckoutPayload({
      paymentMethod: "credit_card",
      cardNumber: "1234123412341234",
      cardExpiry: "12/2030",
      cardCvc: "123",
    }),
  semNome: () => {
    const payload = baseCheckoutPayload();
    delete payload.firstName;
    return payload;
  },
  emailInvalido: () => baseCheckoutPayload({ email: "email-invalido" }),
  criarConta: () =>
    baseCheckoutPayload({
      userId: undefined,
      createAccount: true,
      password: "123456",
    }),
  criarContaEmailExistente: () =>
    baseCheckoutPayload({
      userId: undefined,
      email: "admin@admin.com",
      createAccount: true,
      password: "123456",
    }),
};

export default checkoutPayloads;