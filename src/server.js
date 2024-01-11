import express, { response } from "express";
import { v4 as uuidV4 } from "uuid";
// v4 numeros randomicos

const app = express();
app.use(express.json());

const customers = [];

app.post("/account", (req, res) => {
  const { cpf, name } = req.body;
  const id = uuidV4();

  customers.push({
    cpf,
    name,
    id,
    statement: [],
  });

  return res.status(201).send();
});

app.listen(9000);
