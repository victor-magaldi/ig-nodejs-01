import { expect } from "chai";
import supertest from "supertest";
import app from "./src/server.js";

const request = supertest(app);

describe("Testes de API", () => {
  it("Deve criar uma nova conta", async () => {
    const response = await request
      .post("/account")
      .send({ cpf: "12345678901", name: "Novo Cliente" });

    expect(response.status).to.equal(201);
  });

  it("Deve obter o saldo da conta", async () => {
    const response = await request
      .get("/balance")
      .query({ cpf: "12345678901" });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("balance");
  });

  // Adicione mais testes conforme necessário
});
