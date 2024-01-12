import express, { response } from "express";
import { v4 as uuidV4 } from "uuid";
// v4 numeros randomicos

const app = express();
app.use(express.json());

const customers = [];

app.post("/account", (req, res) => {
  const { cpf, name } = req.body;

  const customerExists = customers.some((customer) => customer.cpf === cpf);

  if (customerExists) {
    return res.status(400).json({ error: "Customer Already exists!" });
  }

  customers.push({
    cpf,
    name,
    id: uuidV4(),
    statement: [123],
  });
  return res.status(201).send();
});

app.get("/statement", (req, res) => {
  const { cpf } = req.headers;
  console.log(cpf);
  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return res.status(400).json({ error: "User not found" });
  }

  return res.json(customer.statement);
});

app.listen(9000);
