import { faker } from "@faker-js/faker";

const autenticacaoPayloads = {
  admin: {
    email: "admin@admin.com",
    password: "admin",
  },
  senhaIncorreta: {
    email: "admin@admin.com",
    password: "senha-incorreta",
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
  emailEmBranco: {
    email: "",
    password: "admin",
  },
  senhaEmBranco: {
    email: "admin@admin.com",
    password: "",
  },
  sembody: ''
};

export default autenticacaoPayloads;