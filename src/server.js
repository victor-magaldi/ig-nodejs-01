import express, { response } from "express";
import { v4 as uuidV4 } from "uuid";
import { verifyIfExistsAccountByCpf } from "./middleware/verifyIfExistsAccountByCpf.js";
import { customers } from "./customers.js";
// v4 numeros randomicos

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
    statement: [],
  });
  return res.status(201).send();
});

app.get("/statement", verifyIfExistsAccountByCpf, (req, res) => {
  const { customer } = req;
  return res.json(customer.statement);
});

app.post("/deposit", verifyIfExistsAccountByCpf, (req, res) => {
  const { description, amount } = req.body;

  const { customer } = req;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  };

  customer.statement.push(statementOperation);

  return res.status(201).send();
});
app.post("withdraw", verifyIfExistsAccountByCpf, (req, res) => {
  const { customer } = req;
});

app.listen(9000);
