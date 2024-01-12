import { customers } from "../customers.js";

export function verifyIfExistsAccountByCpf(req, res, next) {
  const { cpf } = req.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);
  if (!customer || !cpf) {
    return res.status(400).json({ error: "User not found" });
  }

  req.customer = customer;

  return next();
}
