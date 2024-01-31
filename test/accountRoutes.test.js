import { expect } from "chai";
import supertest from "supertest";
import app from "../src/server.js";

const request = supertest(app);

describe("Testes de API", () => {
  it("Create account - POST /account", async () => {
    const response = await request
      .post("/account")
      .send({ cpf: "12345678901", name: "Novo Cliente" });

    expect(response.status).to.equal(201);
    expect(response.body).to.be.empty;
  });

  it("Search account - GET /account", async () => {
    const response = await request.get("/account").set("cpf", "12345678901");
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("cpf");
    expect(response.body).to.have.property("name");
    expect(response.body).to.have.property("id");
    expect(response.body).to.have.property("statements");
  });
});
