import { expect } from "chai";
import supertest from "supertest";
import app from "../src/server.js";

const request = supertest(app);

describe("create account", () => {
  it("Create account - POST /account", async () => {
    const response = await request
      .post("/account")
      .send({ cpf: "9876542211", name: "Novo Cliente" });
    expect(response.status).to.equal(201);
    expect(response.body).to.be.empty;
  });
});
