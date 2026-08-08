import { faker } from "@faker-js/faker";

const autenticacaoPayloads = {
  admin: {
    email: "admin@admin.com",
    password: "admin",
  },
  credenciaisInexistentes: {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  semEmail: {
    password: "admin",
  },
  semSenha: {
    email: "admin@admin.com",
  },
  sembody: ''
};

export default autenticacaoPayloads;