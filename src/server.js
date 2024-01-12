import express, { response } from "express";
import { v4 as uuidV4 } from "uuid";
// v4 numeros randomicos

import { verifyIfExistsAccountByCpf } from "./middleware/verifyIfExistsAccountByCpf.js";
import { customers } from "./customers.js";
import { getBalance } from "./utils/index.js";

const app = express();
app.use(express.json());

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
    statements: [],
  });
  return res.status(201).send();
});

app.get("/statements", verifyIfExistsAccountByCpf, (req, res) => {
  const { customer } = req;
  return res.json(customer.statements);
});

app.post("/deposit", verifyIfExistsAccountByCpf, (req, res) => {
  const { description, amount } = req.body;

  const { customer } = req;

  const statementsOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  };

  customer.statements.push(statementsOperation);

  return res.status(201).send();
});
app.post("/withdraw", verifyIfExistsAccountByCpf, (req, res) => {
  const { amount, description } = req.body;
  const { customer } = req;

  const balance = getBalance(customer.statements);

  if (balance < amount)
    return res.status(400).json({ error: "insufficient funds" });

  const statementsOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "debit",
  };
  customer.statements.push(statementsOperation);

  return res.status(201).send();
});

app.listen(9000);
